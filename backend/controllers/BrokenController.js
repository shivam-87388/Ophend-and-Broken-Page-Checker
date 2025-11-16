const axios = require("axios");
const xml2js = require("xml2js");
const puppeteer = require("puppeteer");
const BrokenReport = require("../models/BrokenModel");

exports.checkBrokenLinks = async (req, res) => {
  try {
    const websiteUrl = req.body.url;

    if (!websiteUrl) {
      return res.status(400).json({ message: "URL is required" });
    }

    console.log("Checking website:", websiteUrl);

    //-------------------------------
    // STEP 1 → CHECK SITEMAP EXISTS
    //-------------------------------
    const sitemapUrls = [
      websiteUrl + "/sitemap.xml",
      websiteUrl + "/sitemap_index.xml",
      websiteUrl + "/sitemap/",
    ];

    let foundSitemap = null;

    for (let sm of sitemapUrls) {
      try {
        await axios.get(sm);
        foundSitemap = sm;
        break;
      } catch (e) {}
    }

    let linksToCheck = [];

    //--------------------------------------------
    // STEP 2 → IF SITEMAP FOUND → READ ALL LINKS
    //--------------------------------------------
    if (foundSitemap) {
      console.log("Sitemap found:", foundSitemap);

      const { data } = await axios.get(foundSitemap);
      const parsed = await xml2js.parseStringPromise(data);

      let urls = [];

      if (parsed.urlset && parsed.urlset.url) {
        urls = parsed.urlset.url.map(u => u.loc[0]);
      } else if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
        for (const sm of parsed.sitemapindex.sitemap) {
          try {
            const smData = await axios.get(sm.loc[0]);
            const smParsed = await xml2js.parseStringPromise(smData.data);

            const childUrls = smParsed.urlset.url.map(u => u.loc[0]);
            urls.push(...childUrls);
          } catch (e) {}
        }
      }

      linksToCheck = [...new Set(urls)];
    }

    //---------------------------------------------------------
    // STEP 3 → IF NO SITEMAP → INTERNAL CRAWLING WITH PUPPETEER
    //---------------------------------------------------------
    if (!foundSitemap) {
      console.log("No sitemap found → Internal crawling starting…");

      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });

      const page = await browser.newPage();
      const toVisit = [websiteUrl];
      const visited = new Set();

      while (toVisit.length > 0) {
        const currentUrl = toVisit.shift();

        if (visited.has(currentUrl)) continue;
        visited.add(currentUrl);

        try {
          await page.goto(currentUrl, { waitUntil: "networkidle2", timeout: 20000 });

          const internalLinks = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll("a[href]"));
            return anchors
              .map(a => a.href)
              .filter(h => h.startsWith(window.location.origin));
          });

          internalLinks.forEach((link) => {
            if (!visited.has(link)) toVisit.push(link);
          });

        } catch (e) {}

      }

      await browser.close();

      linksToCheck = [...visited];
    }

    //---------------------------------------------------------
    // STEP 4 → NOW CHECK STATUS OF ALL LINKS USING PUPPETEER
    //---------------------------------------------------------
    const browser2 = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page2 = await browser2.newPage();

    let brokenLinks = [];

    for (const url of linksToCheck) {
      try {
        const response = await page2.goto(url, { waitUntil: "load", timeout: 20000 });
        const status = response.status();

        if (status >= 400) {
          brokenLinks.push({ url, status });
        }

      } catch (err) {
        brokenLinks.push({ url, status: 0 }); // 0 = connection fail
      }
    }

    await browser2.close();

    //---------------------------------------------------------
    // STEP 5 → SAVE & SEND RESULT
    //---------------------------------------------------------
    const report = await BrokenReport.create({
  userId: req.body.userId,    // <-- ADD HERE
  websiteUrl,
  totalLinks: linksToCheck.length,
  brokenLinks,
});


    res.json({
      message: "Broken links checked successfully",
      totalLinks: linksToCheck.length,
      brokenLinks,
      reportId: report._id
    });

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
