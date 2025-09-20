const express = require('express');
const UserController = require('../controllers/user.controller');
const { 
  requireAuth, 
  syncUserData, 
  requireRole, 
  requireActiveUser 
} = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(requireAuth);
router.use(syncUserData);
router.use(requireActiveUser);

// Get all users (admin only)
router.get('/', requireRole(['admin']), UserController.getAllUsers);

// Get user by ID
router.get('/:id', UserController.getUserById);

// Search users (admin only)
router.get('/search', requireRole(['admin']), UserController.searchUsers);

// Delete user
router.delete('/:id', UserController.deleteUser);

// Deactivate user (admin only)
router.patch('/:id/deactivate', requireRole(['admin']), UserController.deactivateUser);

// Activate user (admin only)
router.patch('/:id/activate', requireRole(['admin']), UserController.activateUser);

module.exports = router;