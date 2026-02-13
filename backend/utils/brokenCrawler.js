const puppeteer = require("puppeteer");

const checkBrokenLinks = async (baseUrl) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle2" });

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a")).map(a => a.href)
  );

  const uniqueLinks = [...new Set(links)];
  const brokenLinks = [];

  for (let link of uniqueLinks) {
    try {
      const response = await page.goto(link, { timeout: 10000 });

      if (!response || response.status() >= 400) {
        brokenLinks.push({
          url: link,
          status: response ? response.status() : "No Response",
        });
      }
    } catch (err) {
      brokenLinks.push({
        url: link,
        status: "Error",
      });
    }
  }

  await browser.close();

  return {
    totalLinks: uniqueLinks.length,
    brokenLinks,
  };
};

module.exports = checkBrokenLinks;
