// /routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  guestLogin,
} = require('../controllers/authController');

// POST /register - Register a new user
router.post('/register', registerUser);

// POST /login - Login an existing user
router.post('/login', loginUser);

// POST /guest-login - Guest login
router.post('/guest-login', guestLogin);

module.exports = router;
