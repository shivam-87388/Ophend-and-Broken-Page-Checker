const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { runBrokenScan } = require("../controllers/brokenController");

router.post("/", protect, runBrokenScan);

module.exports = router;
