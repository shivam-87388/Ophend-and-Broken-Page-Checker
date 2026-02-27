const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserHistory } = require("../controllers/userController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/history", protect, getUserHistory);
module.exports = router;

