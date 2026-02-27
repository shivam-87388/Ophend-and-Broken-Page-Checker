const Scan = require("../models/Scan");
const axios = require("axios");
const xml2js = require("xml2js");
const cheerio = require("cheerio");


const normalizeUrl = (url) => {
    try {
        const parsed = new URL(url);
        let host = parsed.hostname.replace(/^www\./, "");
        
        let path = parsed.pathname.replace(/\/$/, "") || "/";
        return host + path;
    } catch { return null; }
};


const getAllUrlsFromSitemap = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 15000
        });
        const parser = new xml2js.Parser({ explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix] });
        const result = await parser.parseStringPromise(response.data);
        let allUrls = [];

        if (result.sitemapindex && result.sitemapindex.sitemap) {
            const sitemaps = Array.isArray(result.sitemapindex.sitemap) ? result.sitemapindex.sitemap : [result.sitemapindex.sitemap];
            for (const sitemap of sitemaps) {
                const nestedUrls = await getAllUrlsFromSitemap(sitemap.loc);
                allUrls = allUrls.concat(nestedUrls);
            }
        } else if (result.urlset && result.urlset.url) {
            const urls = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];
            allUrls = urls.map(u => u.loc);
        }
        return [...new Set(allUrls)];
    } catch (error) {
        return [];
    }
};

const getInternalLinks = async (websiteUrl, maxPages = 500) => {
    const visited = new Set();
    const startUrl = websiteUrl.endsWith('/') ? websiteUrl : websiteUrl + '/';
    const toVisit = [startUrl]; 
    const internalLinks = new Set();
    const baseDomain = new URL(websiteUrl).hostname.replace(/^www\./, "");

    while (toVisit.length > 0 && visited.size < maxPages) {
        const currentUrl = toVisit.shift();
        const normalizedCurrent = normalizeUrl(currentUrl);
        
        if (visited.has(normalizedCurrent)) continue;
        visited.add(normalizedCurrent);

        try {
            console.log(`Crawling: ${currentUrl}`);
            const response = await axios.get(currentUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 10000
            });

            const $ = cheerio.load(response.data);
            
            const currentBase = currentUrl.endsWith('/') ? currentUrl : currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);

            $('a').each((i, el) => {
                let href = $(el).attr('href');
                if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

                try {
                   
                    const absoluteUrl = new URL(href, currentBase).href.split('#')[0];
                    const parsed = new URL(absoluteUrl);

                    if (parsed.hostname.replace(/^www\./, "") === baseDomain) {
                        const clean = normalizeUrl(absoluteUrl);
                        if (clean) internalLinks.add(clean);

                        if (!visited.has(clean)) {
                            toVisit.push(absoluteUrl);
                        }
                    }
                } catch (e) {}
            });
        } catch (error) {
            console.log(`Failed to fetch ${currentUrl}`);
        }
    }
    return [...internalLinks];
};


const checkOrphanPages = async (req, res) => {
    try {
        const { website } = req.body;
        if (!website) return res.status(400).json({ message: "URL required" });

        const rootUrl = website.replace(/\/$/, "");
        const sitemapUrl = website.toLowerCase().endsWith(".xml") ? website : `${rootUrl}/sitemap.xml`;

        // Get Sitemap URLs
        const rawSitemap = await getAllUrlsFromSitemap(sitemapUrl);
        if (rawSitemap.length === 0) return res.status(400).json({ message: "Sitemap empty or not found" });

        const cleanSitemap = rawSitemap.map(url => normalizeUrl(url)).filter(Boolean);

        //  Crawl Website
        let cleanInternal = await getInternalLinks(rootUrl, 500);

        
        const homePageNormalized = normalizeUrl(rootUrl);
        if (homePageNormalized && !cleanInternal.includes(homePageNormalized)) {
            cleanInternal.push(homePageNormalized);
        }

        console.log("Sitemap URLs:", cleanSitemap.length);
        console.log("Internal Links Found:", cleanInternal.length);

       
        const orphanClean = cleanSitemap.filter(sLink => !cleanInternal.includes(sLink));
        
        const finalOrphans = rawSitemap.filter(orig => 
            orphanClean.includes(normalizeUrl(orig))
        );
        await Scan.create({
        user: req.user, //
        website: rootUrl,
        type: "orphan",
        results: finalOrphans, //
        });

        return res.status(200).json({
            totalInSitemap: rawSitemap.length,
            count: finalOrphans.length,
            data: finalOrphans 
        });
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { checkOrphanPages };