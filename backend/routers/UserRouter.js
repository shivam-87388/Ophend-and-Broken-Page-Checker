const express = require('express');
const UserModel = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const router = express.Router();

/* =======================================================
   🟢 REGISTER (CREATE ACCOUNT)
======================================================= */
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists. Please login.' });
    }

    // 2️⃣ Create a new user
    const newUser = new UserModel({ firstName, lastName, email, password });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Register error:', error);
    res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
});

/* =======================================================
   🟢 LOGIN USER
======================================================= */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email and password
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Account does not exist or wrong credentials' });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { _id: user._id, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
});

/* =======================================================
   🟢 GET ALL USERS (optional for testing)
======================================================= */
router.get('/all', async (req, res) => {
  try {
    const users = await UserModel.find().select('-password'); // hide passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
