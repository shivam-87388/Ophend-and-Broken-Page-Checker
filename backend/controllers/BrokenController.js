const puppeteer = require("puppeteer");
const BrokenReport = require("../models/BrokenModel");

// Timeout configuration (in milliseconds)
const TIMEOUT_CONFIG = {
  pageGoto: 15000,       // 15 seconds per page check
  pageNavigation: 15000, // 15 seconds for navigation
  overallCheck: 300000   // 5 minutes for overall check
};

exports.checkBroken = async (req, res) => {
  let browser;
  let timeoutId;

  try {
    const { urls, websiteUrl, userId, timeout } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ message: "urls array is required" });
    }

    // Allow custom timeout from client
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

    // Set page timeouts
    page.setDefaultNavigationTimeout(TIMEOUT_CONFIG.pageGoto);
    page.setDefaultTimeout(TIMEOUT_CONFIG.pageNavigation);

    let broken = [];

    for (const link of urls) {
      try {
        const response = await Promise.race([
          page.goto(link, { waitUntil: "load" }),
          timeoutPromise
        ]);
        const status = response.status();

        if (status >= 400) {
          broken.push({ url: link, status });
        }
      } catch (err) {
        // Handle timeout and other errors
        if (err.message.includes("timeout")) {
          broken.push({ url: link, status: 0, error: "Timeout" });
        } else {
          broken.push({ url: link, status: 0, error: err.message });
        }
      }
    }

    if (browser) await browser.close();
    if (timeoutId) clearTimeout(timeoutId);

    const report = await BrokenReport.create({
      userId,
      websiteUrl,
      totalLinks: urls.length,
      brokenLinks: broken,
    });

    res.json({
      message: "Broken links checked",
      brokenLinks: broken,
      totalLinks: urls.length,
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

    res.status(500).json({ message: "Error", error: error.message });
  }
};
