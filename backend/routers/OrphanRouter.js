const express = require("express");
const router = express.Router();
const { checkOrphanPages } = require("../controllers/OrphanController");

// POST /orphan/check
router.post("/check", checkOrphanPages);

module.exports = router;
