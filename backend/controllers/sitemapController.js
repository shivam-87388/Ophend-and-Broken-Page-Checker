const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const Check = require("../models/CheckModel");

// Helper function to construct sitemap URL
const constructSitemapUrl = (input) => {
  // If input already contains /sitemap, assume it's a full sitemap URL
  if (input.includes("sitemap")) {
    return input.startsWith("http") ? input : `https://${input}`;
  }

  // Otherwise, append /sitemap.xml to the domain
  const url = input.startsWith("http") ? input : `https://${input}`;
  // Remove trailing slash if present
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  return `${cleanUrl}/sitemap.xml`;
};

exports.checkSitemap = async (req, res) => {
  const { url, sitemapUrl } = req.body;

  // Accept either url or sitemapUrl for flexibility
  const inputUrl = sitemapUrl || url;

  if (!inputUrl || typeof inputUrl !== "string" || inputUrl.trim() === "") {
    return res.status(400).json({ error: "Please provide a valid website URL or sitemap URL" });
  }

  const finalSitemapUrl = constructSitemapUrl(inputUrl.trim());

  try {
    console.log(`Fetching sitemap from: ${finalSitemapUrl}`);

    // Fetch sitemap XML with timeout
    const response = await axios.get(finalSitemapUrl, { timeout: 10000 });
    const xml = response.data;

    // Parse XML to JSON
    let result;
    try {
      result = await parseStringPromise(xml);
    } catch (parseErr) {
      return res.status(400).json({ error: "Invalid XML format in sitemap" });
    }

    // Validate sitemap structure
    if (!result.urlset || !result.urlset.url) {
      return res.status(400).json({ error: "Sitemap does not contain valid URL structure" });
    }

    const urls = result.urlset.url.map(u => u.loc[0]);
    const checkedUrls = [];

    // Check each page link
    for (const link of urls) {
      try {
        const check = await axios.get(link, { timeout: 5000 });
        const status = check.status;

        if (status === 200) {
          checkedUrls.push({ url: link, status, type: "Accessible Page ✅" });
        } else {
          checkedUrls.push({ url: link, status, type: "Broken Page ❌" });
        }
      } catch (err) {
        const errorStatus = err.response?.status || "Unreachable";
        checkedUrls.push({
          url: link,
          status: errorStatus,
          type: "Broken Page ❌",
          error: err.message
        });
      }
    }

    // Save check results to database
    const checkRecord = new Check({
      checkedPage: inputUrl,
      totalLinks: urls.length,
      results: checkedUrls,
      brokenLinks: checkedUrls.filter(u => u.type === "Broken Page ❌").length,
    });
    await checkRecord.save();

    res.json({
      total: urls.length,
      accessibleCount: checkedUrls.filter(u => u.type === "Accessible Page ✅").length,
      brokenCount: checkedUrls.filter(u => u.type === "Broken Page ❌").length,
      results: checkedUrls,
      savedCheckId: checkRecord._id,
    });
  } catch (error) {
    console.error("Error checking sitemap:", error.message);

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
