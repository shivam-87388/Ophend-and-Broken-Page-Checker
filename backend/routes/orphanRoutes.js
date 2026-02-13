const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { checkOrphanPages } = require("../controllers/orphanController");

router.post("/", protect, checkOrphanPages);

module.exports = router;
