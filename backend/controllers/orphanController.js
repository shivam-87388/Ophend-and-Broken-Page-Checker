const axios = require("axios");
const xml2js = require("xml2js");
const cheerio = require("cheerio");

// ===============================
// URL NORMALIZER (Universal Fix)
// ===============================
const normalizeUrl = (url) => {
    try {
        const parsed = new URL(url);
        // Protocol aur www hatayein, lekin pathname (folder path) ko bachayein
        let host = parsed.hostname.replace(/^www\./, "");
        let path = parsed.pathname.replace(/\/$/, "");
        return host + path;
    } catch { return null; }
};

// ===============================
// 1️⃣ Deep Sitemap Scraper
// ===============================
const getAllUrlsFromSitemap = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });

        const parser = new xml2js.Parser({
            explicitArray: false,
            tagNameProcessors: [xml2js.processors.stripPrefix]
        });

        const result = await parser.parseStringPromise(response.data);
        let allUrls = [];

        if (result.sitemapindex && result.sitemapindex.sitemap) {
            const sitemaps = Array.isArray(result.sitemapindex.sitemap)
                ? result.sitemapindex.sitemap
                : [result.sitemapindex.sitemap];

            for (const sitemap of sitemaps) {
                const nestedUrls = await getAllUrlsFromSitemap(sitemap.loc);
                allUrls = allUrls.concat(nestedUrls);
            }
        } else if (result.urlset && result.urlset.url) {
            const urls = Array.isArray(result.urlset.url)
                ? result.urlset.url
                : [result.urlset.url];

            allUrls = urls.map(u => u.loc);
        }

        return [...new Set(allUrls)];
    } catch (error) {
        console.log("Sitemap fetch error:", error.message);
        return [];
    }
};

// ===============================
// 2️⃣ Internal Crawler (100% Fixed & Deep)
// ===============================
const getInternalLinks = async (websiteUrl, maxPages = 500) => {
    const visited = new Set();
    const toVisit = [websiteUrl.replace(/\/$/, "")]; 
    const internalLinks = new Set();

    const baseDomain = new URL(websiteUrl).hostname.replace(/^www\./, "");

    while (toVisit.length > 0 && visited.size < maxPages) {
        const currentUrl = toVisit.shift();
        
        // 🟢 FIX: URL ko normalize karke hi visited mein check karein
        const normalizedCurrent = currentUrl.split('#')[0].replace(/\/$/, "");
        
        if (visited.has(normalizedCurrent)) continue;
        visited.add(normalizedCurrent);

        try {
            console.log(`Crawling: ${currentUrl}`); 
            const response = await axios.get(currentUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 15000
            });

            const $ = cheerio.load(response.data);

            $('a').each((i, el) => {
                let href = $(el).attr('href');
                if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

                try {
                    const absoluteUrl = new URL(href, websiteUrl).href.split('#')[0];
                    const parsed = new URL(absoluteUrl);
                    const linkDomain = parsed.hostname.replace(/^www\./, "");

                    if (linkDomain === baseDomain) {
                        const clean = normalizeUrl(absoluteUrl);
                        if (clean) internalLinks.add(clean);

                        // 🟢 FIX: Check karein agar ye link pehle visited nahi hai toh queue mein daalein
                        const queueUrl = absoluteUrl.replace(/\/$/, "");
                        if (!visited.has(queueUrl) && !toVisit.includes(absoluteUrl)) {
                            toVisit.push(absoluteUrl);
                        }
                    }
                } catch (e) { return; }
            });

        } catch (error) {
            console.log(`Failed to fetch ${currentUrl}: ${error.message}`);
            continue;
        }
    }

    return [...internalLinks];
};

// ===============================
// 3️⃣ Orphan Page Checker
// ===============================
const checkOrphanPages = async (req, res) => {
    try {
        const { website } = req.body;

        if (!website)
            return res.status(400).json({ message: "URL required" });

        const rootUrl = website.replace(/\/$/, "");
        const sitemapUrl = website.toLowerCase().endsWith(".xml")
            ? website
            : `${rootUrl}/sitemap.xml`;

        // 1️⃣ Get sitemap URLs
        const rawSitemap = await getAllUrlsFromSitemap(sitemapUrl);

        if (rawSitemap.length === 0) {
            return res.status(400).json({
                message: "No sitemap found or empty sitemap."
            });
        }

        const cleanSitemap = rawSitemap
            .map(url => normalizeUrl(url))
            .filter(Boolean);

        // 2️⃣ Crawl website (Deep Scan up to 500 pages)
        const cleanInternal = await getInternalLinks(rootUrl, 500);

        console.log("Sitemap URLs:", cleanSitemap.length);
        console.log("Internal Links Found:", cleanInternal.length);

        // 3️⃣ Compare Logic
        const orphanClean = cleanSitemap.filter(
            sLink => !cleanInternal.includes(sLink)
        );

        const finalOrphans = rawSitemap.filter(orig =>
            orphanClean.includes(normalizeUrl(orig))
        );

        // 🟢 Final accurate count for browser
        const actualOrphanCount = finalOrphans.length;

        return res.status(200).json({
            totalInSitemap: rawSitemap.length,
            count: actualOrphanCount,
            data: finalOrphans 
        });

    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { checkOrphanPages };