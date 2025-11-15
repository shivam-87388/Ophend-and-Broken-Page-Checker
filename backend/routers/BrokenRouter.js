console.log("BrokenRouter loaded!");
const express = require("express");
const router = express.Router();
const { checkBrokenPages } = require("../controllers/brokenPageController");

router.post("/check-broken", checkBrokenPages);

module.exports = router;