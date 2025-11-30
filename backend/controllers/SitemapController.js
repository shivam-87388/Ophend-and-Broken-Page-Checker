const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const Check = require("../models/CheckModel");

// Timeout configuration (in milliseconds)
const TIMEOUT_CONFIG = {
  sitemapFetch: 10000,   // 10 seconds for sitemap fetch
  pageFetch: 5000        // 5 seconds per page check
};

// Axios config with User-Agent header
const axiosConfig = {
  timeout: TIMEOUT_CONFIG.sitemapFetch,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  }
};

const axiosPageConfig = {
  timeout: TIMEOUT_CONFIG.pageFetch,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  }
};

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
  const { url, sitemapUrl, timeout, pageTimeout } = req.body;

  // Accept either url or sitemapUrl for flexibility
  const inputUrl = sitemapUrl || url;

  if (!inputUrl || typeof inputUrl !== "string" || inputUrl.trim() === "") {
    return res.status(400).json({ error: "Please provide a valid website URL or sitemap URL" });
  }

  const finalSitemapUrl = constructSitemapUrl(inputUrl.trim());

  // Allow custom timeouts from client, otherwise use defaults
  const sitemapTimeout = timeout || TIMEOUT_CONFIG.sitemapFetch;
  const pageCheckTimeout = pageTimeout || TIMEOUT_CONFIG.pageFetch;

  // Create custom axios configs with custom timeouts
  const customAxiosConfig = {
    ...axiosConfig,
    timeout: sitemapTimeout
  };

  const customAxiosPageConfig = {
    ...axiosPageConfig,
    timeout: pageCheckTimeout
  };

  try {
    console.log(`Fetching sitemap from: ${finalSitemapUrl}`);

    // Fetch sitemap XML with User-Agent header and custom timeout
    const response = await axios.get(finalSitemapUrl, customAxiosConfig);
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

    // Check each page link with custom timeout
    for (const link of urls) {
      try {
        const check = await axios.get(link, customAxiosPageConfig);
        const status = check.status;

        if (status === 200) {
          checkedUrls.push({ url: link, status, type: "Accessible Page ✅" });
        } else {
          checkedUrls.push({ url: link, status, type: "Broken Page ❌" });
        }
      } catch (err) {
        const errorStatus = err.response?.status || "Unreachable";
        const errorMessage = err.code === "ECONNABORTED" ? "Request timeout" : err.message;
        
        checkedUrls.push({
          url: link,
          status: errorStatus,
          type: "Broken Page ❌",
          error: errorMessage
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
    if (error.response?.status === 403) {
      return res.status(403).json({ error: "Access forbidden. Website may block automated requests." });
    }
    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Authentication required. Website needs credentials." });
    }

    res.status(500).json({
      error: "Failed to process sitemap",
      details: error.message
    });
  }
};
