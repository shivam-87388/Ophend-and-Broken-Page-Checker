const axios = require("axios");
const xml2js = require("xml2js");
const puppeteer = require("puppeteer");
const OrphanReport = require("../models/OrphanModel");

exports.checkOrphanedPages = async (req, res) => {
  try {
    const websiteUrl = req.body.url;

    if (!websiteUrl) {
      return res.status(400).json({ message: "URL is required" });
    }

    console.log("Checking orphaned pages on:", websiteUrl);

    // ------------------------------------
    // STEP 1 → CHECK IF SITEMAP EXISTS
    // ------------------------------------
    const sitemapUrls = [
      websiteUrl + "/sitemap.xml",
      websiteUrl + "/sitemap_index.xml",
      websiteUrl + "/sitemap/",
    ];

    let sitemapFound = null;

    for (let sm of sitemapUrls) {
      try {
        await axios.get(sm);
        sitemapFound = sm;
        break;
      } catch (e) {}
    }

    let sitemapPages = [];
    let linkedPages = new Set();

    // ------------------------------------
    // STEP 2 → IF SITEMAP EXISTS → READ IT
    // ------------------------------------
    if (sitemapFound) {
      console.log("Sitemap found:", sitemapFound);

      const { data } = await axios.get(sitemapFound);
      const parsed = await xml2js.parseStringPromise(data);

      if (parsed.urlset && parsed.urlset.url) {
        sitemapPages = parsed.urlset.url.map(u => u.loc[0]);
      } else if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
        for (const sm of parsed.sitemapindex.sitemap) {
          try {
            const smData = await axios.get(sm.loc[0]);
            const smParsed = await xml2js.parseStringPromise(smData.data);

            const childUrls = smParsed.urlset.url.map(u => u.loc[0]);
            sitemapPages.push(...childUrls);
          } catch (e) {}
        }
      }

      sitemapPages = [...new Set(sitemapPages)];
    }

    // --------------------------------------------------
    // STEP 3 → CRAWL ALL PAGES WITH PUPPETEER TO FIND LINKS
    // --------------------------------------------------
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    const crawlQueue = sitemapFound ? [...sitemapPages] : [websiteUrl];
    const visited = new Set();

    while (crawlQueue.length > 0) {
      const currentUrl = crawlQueue.shift();

      if (visited.has(currentUrl)) continue;
      visited.add(currentUrl);

      try {
        await page.goto(currentUrl, { waitUntil: "networkidle2", timeout: 20000 });

        // extract internal links
        const internalLinks = await page.evaluate(() => {
          const anchors = Array.from(document.querySelectorAll("a[href]"));
          return anchors.map(a => a.href);
        });

        internalLinks.forEach((l) => {
          if (l.startsWith(websiteUrl)) {
            linkedPages.add(l);
            if (!visited.has(l)) crawlQueue.push(l);
          }
        });

      } catch (e) {}
    }

    await browser.close();

    // --------------------------------------------
    // STEP 4 → FIND ORPHANED PAGES
    // --------------------------------------------
    let orphanedPages = [];

    if (sitemapFound) {
      orphanedPages = sitemapPages.filter(p => !linkedPages.has(p));
    } else {
      const allPages = [...visited];
      orphanedPages = allPages.filter(p => !linkedPages.has(p));
    }

    // --------------------------------------------
    // STEP 5 → SAVE RESULT
    // --------------------------------------------
    const report = await OrphanReport.create({
  userId: req.body.userId,   // <-- ADD HERE
  websiteUrl,
  totalPages: sitemapFound ? sitemapPages.length : visited.size,
  orphanedPages,
});
    // --------------------------------------------
    // STEP 6 → RETURN RESULT
    // --------------------------------------------
    res.json({
      message: "Orphaned page scan completed",
      totalPages: sitemapFound ? sitemapPages.length : visited.size,
      orphanedPages,
      reportId: report._id
    });

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

