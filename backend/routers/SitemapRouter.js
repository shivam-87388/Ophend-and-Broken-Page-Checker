const express = require("express");
const { checkSitemap } = require("../controllers/SitemapController");
const router = express.Router();

router.post("/scan", checkSitemap);

module.exports = router;
