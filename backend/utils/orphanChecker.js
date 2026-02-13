const axios = require("axios");
const xml2js = require("xml2js");
const puppeteer = require("puppeteer");

const checkOrphanPages = async (baseUrl) => {
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  const sitemapData = await axios.get(sitemapUrl);
  const parsed = await xml2js.parseStringPromise(sitemapData.data);

  const sitemapUrls = parsed.urlset.url.map(u => u.loc[0]);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle2" });

  const internalLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a")).map(a => a.href)
  );

  const orphanPages = sitemapUrls.filter(
    url => !internalLinks.includes(url)
  );

  await browser.close();

  return orphanPages;
};

module.exports = checkOrphanPages;
