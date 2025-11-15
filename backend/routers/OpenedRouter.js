const express = require("express");
const router = express.Router();
const { checkOpenedPages } = require("../controllers/openedPageController");

router.post("/opened/check", checkOpenedPages);

module.exports = router;
