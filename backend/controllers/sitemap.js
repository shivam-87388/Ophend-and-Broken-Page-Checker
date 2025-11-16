const axios = require("axios");
const xml2js = require("xml2js");

async function fetchSitemap(url) {
    try {
        const { data } = await axios.get(url);
        const parsed = await xml2js.parseStringPromise(data);
        let urls = parsed.urlset.url.map(u => u.loc[0]);
        return urls;
    } catch (err) {
        throw new Error("Unable to fetch sitemap: " + err.message);
    }
}

async function checkURL(url) {
    try {
        const res = await axios.get(url, { timeout: 8000 });
        return { url, status: res.status, broken: false };
    } catch (err) {
        return { url, status: err.response?.status || 500, broken: true };
    }
}

module.exports = {
    fetchSitemap,
    checkURL
};
