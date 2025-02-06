// /controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'yourSecretKey', { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Guest Login
const guestLogin = (req, res) => {
  const guestToken = jwt.sign(
    { role: 'guest', permissions: ['limitedFeature1', 'limitedFeature2'] },
    'yourSecretKey',
    { expiresIn: '24h' }
  );
  res.json({ token: guestToken });
};

module.exports = { registerUser, loginUser, guestLogin };
