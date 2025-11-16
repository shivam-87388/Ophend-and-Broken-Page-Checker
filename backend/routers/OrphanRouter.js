const express = require("express");
const router = express.Router();
const { checkOrphanedPages } = require("../controllers/OrphanController");

router.post("/check", checkOrphanedPages);

module.exports = router;
