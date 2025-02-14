const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);

module.exports = router;