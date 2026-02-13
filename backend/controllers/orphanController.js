const axios = require("axios");
const xml2js = require("xml2js");

const checkOrphanPages = async (req, res) => {
  try {
    const { website } = req.body;
    if (!website) return res.status(400).json({ message: "Website URL required" });

    // 1. Sitemap URL fix karna
    let sitemapUrl = website.toLowerCase().endsWith(".xml") 
      ? website 
      : website.replace(/\/$/, "") + "/sitemap.xml";

    console.log("Scanning:", sitemapUrl);

    // 2. Request with Headers (taaki security block na kare)
    const response = await axios.get(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/xml, text/xml, */*'
      },
      timeout: 15000
    });

    // 3. XML Parser settings (Strip Namespaces is the key!)
    const parser = new xml2js.Parser({ 
      explicitArray: false, 
      tagNameProcessors: [xml2js.processors.stripPrefix] 
    });

    parser.parseString(response.data, (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to parse XML" });

      let links = [];

      // A. Agar ye Sitemap Index hai (Badi sites)
      if (result.sitemapindex && result.sitemapindex.sitemap) {
        const sitemaps = Array.isArray(result.sitemapindex.sitemap) 
          ? result.sitemapindex.sitemap 
          : [result.sitemapindex.sitemap];
        links = sitemaps.map(s => s.loc);
        return res.status(200).json({ type: "Sitemap Index", count: links.length, data: links });
      } 
      
      // B. Agar ye Standard Sitemap hai (Choti sites)
      else if (result.urlset && result.urlset.url) {
        const urlEntries = Array.isArray(result.urlset.url) 
          ? result.urlset.url 
          : [result.urlset.url];
        links = urlEntries.map(u => u.loc);
        return res.status(200).json({ type: "Standard Sitemap", count: links.length, data: links });
      }

      // C. Agar format bilkul hi ajeeb hai
      else {
        return res.status(404).json({ message: "Unknown Sitemap structure. Data might be hidden." });
      }
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Could not reach sitemap", error: error.message });
  }
};

module.exports = { checkOrphanPages };