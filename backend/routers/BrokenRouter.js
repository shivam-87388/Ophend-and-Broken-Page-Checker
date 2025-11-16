const express = require("express");
const router = express.Router();
const { checkBrokenLinks } = require("../controllers/BrokenController");

router.post("/check", checkBrokenLinks);

module.exports = router;
