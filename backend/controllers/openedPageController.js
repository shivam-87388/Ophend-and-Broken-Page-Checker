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

exports.checkOpenedPages = async (req, res) => {
  const { url, Url, sitemapUrl } = req.body;
  
  // Support multiple parameter names for flexibility
  const inputUrl = url || Url || sitemapUrl;

  if (!inputUrl || typeof inputUrl !== "string" || inputUrl.trim() === "") {
    return res.status(400).json({ error: "Please provide a valid website URL or sitemap URL" });
  }

  const finalSitemapUrl = constructSitemapUrl(inputUrl.trim());

  try {
    console.log(`Fetching sitemap from: ${finalSitemapUrl}`);
    
    // Fetch sitemap with timeout
    const response = await axios.get(finalSitemapUrl, { timeout: 10000 });
    const xml = response.data;

    // Parse sitemap XML
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
    const openedLinks = [];

    // Check each URL for status = 200
    for (const link of urls) {
      try {
        const check = await axios.get(link, { timeout: 5000 });

        if (check.status === 200) {
          openedLinks.push({
            url: link,
            status: 200,
            type: "Accessible Page ✅"
          });
        }

      } catch (err) {
        // Ignore broken/unreachable links
      }
    }

    // Save check results to database
    const checkRecord = new Check({
      checkedPage: inputUrl,
      totalLinks: urls.length,
      results: openedLinks,
      brokenLinks: urls.length - openedLinks.length,
    });
    await checkRecord.save();

    // Final Response
    res.json({
      total: urls.length,
      allLinks: urls,          // ✔ ALL URLs from sitemap
      accessibleCount: openedLinks.length,
      brokenCount: urls.length - openedLinks.length,
      accessibleLinks: openedLinks,  // ✔ ACCESSIBLE (200 OK)
      savedCheckId: checkRecord._id,
    });

  } catch (error) {
    console.error("Error checking opened pages:", error.message);
    
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
