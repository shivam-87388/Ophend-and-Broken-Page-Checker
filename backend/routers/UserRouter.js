const express = require('express');
const UserModel = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const router = express.Router();

// CREATE ACCOUNT (SIGNUP)
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new UserModel({ firstName, lastName, email, password });
        const result = await newUser.save();

        res.status(200).json({ message: 'Account created successfully', user: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// login router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    //  check paswword is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // If everything ok then sucessfull login
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;