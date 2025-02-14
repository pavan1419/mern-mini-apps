const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// Helper function to format user response
const formatUserResponse = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});

const register = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      data: {
        user: formatUserResponse(user),
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials',
          status: 401,
        },
      });
    }
    const token = generateToken(user._id);
    res.json({
      success: true,
      data: {
        user: formatUserResponse(user),
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

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      data: {
        user: formatUserResponse(user),
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

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      data: {
        user: formatUserResponse(user),
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

const updateProfile = async (req, res) => {
  try {
    const { username, email, firstName, lastName } = req.body;
    const user = await User.findById(req.user.id);

    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    res.json({
      success: true,
      data: {
        user: formatUserResponse(user),
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

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Current password is incorrect',
          status: 400,
        },
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully',
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

const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({
      success: true,
      message: 'Profile deleted successfully',
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

module.exports = {
  register,
  login,
  getCurrentUser,
  getUserProfile,
  updateProfile,
  changePassword,
  deleteProfile,
};
