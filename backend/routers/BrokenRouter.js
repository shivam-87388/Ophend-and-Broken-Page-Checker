const express = require("express");
const { checkBroken } = require("../controllers/BrokenController");
const router = express.Router();

router.post("/scan", checkBroken);

module.exports = router;
