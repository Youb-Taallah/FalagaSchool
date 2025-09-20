const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { requireAuth, syncUserData } = require('../middleware/auth');

const router = express.Router();

// Register user (webhook or post-signup)
router.post('/register', requireAuth, syncUserData, AuthController.register);

// Login (sync user data)
router.post('/login', requireAuth, syncUserData, AuthController.login);

// Get current user profile
router.get('/me', requireAuth, syncUserData, AuthController.getProfile);

// Logout (optional - mainly handled by frontend)
router.post('/logout', requireAuth, AuthController.logout);

module.exports = router;