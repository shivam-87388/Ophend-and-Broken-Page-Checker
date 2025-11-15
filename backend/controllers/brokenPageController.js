const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const Check = require("../models/CheckModel");

// Helper function to construct sitemap URL
const constructSitemapUrl = (input) => {
  if (input.includes("sitemap")) {
    return input.startsWith("http") ? input : `https://${input}`;
  }
  const url = input.startsWith("http") ? input : `https://${input}`;
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  return `${cleanUrl}/sitemap.xml`;
};

exports.checkBrokenPages = async (req, res) => {
  const { url, sitemapUrl } = req.body;
  
  const inputUrl = sitemapUrl || url;

  if (!inputUrl || typeof inputUrl !== "string" || inputUrl.trim() === "") {
    return res.status(400).json({ error: "Please provide a valid website URL or sitemap URL" });
  }

  const finalSitemapUrl = constructSitemapUrl(inputUrl.trim());

  try {
    console.log(`Fetching sitemap from: ${finalSitemapUrl}`);
    
    // Fetch and parse sitemap XML with timeout
    const response = await axios.get(finalSitemapUrl, { timeout: 10000 });
    const xml = response.data;
    
    let result;
    try {
      result = await parseStringPromise(xml);
    } catch (parseErr) {
      return res.status(400).json({ error: "Invalid XML format in sitemap" });
    }

    if (!result.urlset || !result.urlset.url) {
      return res.status(400).json({ error: "Sitemap does not contain valid URL structure" });
    }

    const urls = result.urlset.url.map(u => u.loc[0]);
    const brokenLinks = [];

    // Check each URL
    for (const link of urls) {
      try {
        const check = await axios.get(link, { timeout: 5000 });
        if (check.status !== 200) {
          brokenLinks.push({ 
            url: link, 
            status: check.status, 
            type: "Broken Page ❌" 
          });
        }
      } catch (err) {
        const errorStatus = err.response?.status || "Unreachable";
        brokenLinks.push({
          url: link,
          status: errorStatus,
          type: "Broken Page ❌",
          error: err.message || "Failed to fetch",
        });
      }
    }

    // Save check results to database
    const checkRecord = new Check({
      checkedPage: inputUrl,
      totalLinks: urls.length,
      results: brokenLinks,
      brokenLinks: brokenLinks.length,
    });
    await checkRecord.save();

    res.json({
      totalLinks: urls.length,
      brokenCount: brokenLinks.length,
      accessibleCount: urls.length - brokenLinks.length,
      brokenLinks,
      savedCheckId: checkRecord._id,
    });
  } catch (error) {
    console.error("Error checking broken pages:", error.message);
    
    if (error.code === "ENOTFOUND") {
      return res.status(400).json({ error: "Website not found. Please check the URL." });
    }
    if (error.code === "ECONNREFUSED") {
      return res.status(400).json({ error: "Connection refused. Website may be down." });
    }
    if (error.code === "ECONNABORTED") {
      return res.status(408).json({ error: "Request timeout. Website took too long to respond." });
    }

    res.status(500).json({ 
      error: "Failed to process sitemap",
      details: error.message 
    });
  }
};
