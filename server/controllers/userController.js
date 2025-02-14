const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'User already exists',
          status: 400,
        },
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: error.message,
        status: 400,
      },
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials',
          status: 401,
        },
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials',
          status: 401,
        },
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message,
        status: 500,
      },
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferences: user.preferences,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message,
        status: 500,
      },
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, preferences },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferences: user.preferences,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message,
        status: 500,
      },
    });
  }
};
