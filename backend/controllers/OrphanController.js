const puppeteer = require("puppeteer");
const OrphanReport = require("../models/OrphanModel");

// Timeout configuration (in milliseconds)
const TIMEOUT_CONFIG = {
  pageNavigation: 30000, // 30 seconds for page navigation
  pageGoto: 30000,       // 30 seconds for goto
  overallCheck: 300000   // 5 minutes for overall check
};

exports.checkOrphanPages = async (req, res) => {
  let browser;
  let timeoutId;

  try {
    const { url, userId, timeout } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // Allow custom timeout from client, otherwise use defaults
    const overallTimeout = timeout || TIMEOUT_CONFIG.overallCheck;

    // Create promise that rejects after overall timeout
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Overall check timeout exceeded"));
      }, overallTimeout);
    });

    // Launch browser with timeout
    browser = await Promise.race([
      puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
      }),
      timeoutPromise
    ]);

    const page = await Promise.race([
      browser.newPage(),
      timeoutPromise
    ]);

    // Set page timeout
    page.setDefaultNavigationTimeout(TIMEOUT_CONFIG.pageGoto);
    page.setDefaultTimeout(TIMEOUT_CONFIG.pageNavigation);

    let visited = new Set();
    let queue = [url];
    let parentLinks = {};

    while (queue.length > 0 && visited.size < 100) {
      const currentUrl = queue.shift();
      visited.add(currentUrl);

      try {
        await Promise.race([
          page.goto(currentUrl, { waitUntil: "networkidle2" }),
          timeoutPromise
        ]);

        const internalLinks = await Promise.race([
          page.evaluate(() => {
            return Array.from(document.querySelectorAll("a[href]"))
              .map(a => a.href)
              .filter(link => link.startsWith(location.origin));
          }),
          timeoutPromise
        ]);

        internalLinks.forEach(link => {
          if (!parentLinks[link]) parentLinks[link] = [];
          parentLinks[link].push(currentUrl);
        });

        internalLinks.forEach(link => {
          if (!visited.has(link)) queue.push(link);
        });

      } catch (err) {
        console.log("Error visiting:", currentUrl);
      }
    }

    if (browser) await browser.close();
    if (timeoutId) clearTimeout(timeoutId);

    const allPages = Array.from(visited);

    const orphanPages = allPages.filter(p => !parentLinks[p] || parentLinks[p].length === 0);

    const report = await OrphanReport.create({
      userId,
      websiteUrl: url,
      totalPages: allPages.length,
      orphanedPages: orphanPages.map(o => ({ url: o }))
    });

    res.json({
      success: true,
      message: "Orphan pages scanned successfully",
      totalPages: allPages.length,
      orphanPages,
      reportId: report._id,
    });

  } catch (error) {
    // Clean up resources
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.log("Error closing browser:", e.message);
      }
    }
    if (timeoutId) clearTimeout(timeoutId);

    // Handle timeout errors
    if (error.message.includes("timeout")) {
      return res.status(408).json({ 
        message: "Check timeout exceeded", 
        error: error.message 
      });
    }

    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
