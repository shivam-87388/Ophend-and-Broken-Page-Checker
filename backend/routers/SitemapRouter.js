// routers/SitemapRouter.js
const express = require("express");
const { checkSitemap } = require("../controllers/sitemapController");

const router = express.Router();

// Route: POST /api/check-sitemap
router.post("/check-sitemap", checkSitemap);

module.exports = router;
