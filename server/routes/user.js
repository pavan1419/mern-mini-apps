const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/me', auth.protect, userController.getCurrentUser);
router.get('/profile', auth.protect, userController.getUserProfile);
router.put('/profile', auth.protect, userController.updateProfile);
router.put('/change-password', auth.protect, userController.changePassword);
router.delete('/profile', auth.protect, userController.deleteProfile);

module.exports = router;