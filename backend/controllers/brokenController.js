const Scan = require("../models/Scan");
const checkBrokenLinks = require("../utils/brokenCrawler");
const axios = require("axios");

exports.runBrokenScan = async (req, res) => {
  try {
    const { website } = req.body;
    const rootUrl = website.replace(/\/$/, "");

    
    let sitemapFound = true;
    try {
      await axios.get(`${rootUrl}/sitemap.xml`, { timeout: 5000 });
    } catch (e) {
      sitemapFound = false;
    }

    
    if (!sitemapFound) {
      return res.json({
        sitemapExists: false, 
        message: "Sitemap file is not available. Please ensure your website has a sitemap.xml for accurate scanning.",
        totalLinks: 0,
        brokenLinks: []
      });
    }

    
    const result = await checkBrokenLinks(website);

    await Scan.create({
      user: req.user,
      website,
      type: "broken",
      results: result.brokenLinks,
    });

    res.json({
      ...result,
      sitemapExists: true
    });

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Server error during scan" });
  }
};