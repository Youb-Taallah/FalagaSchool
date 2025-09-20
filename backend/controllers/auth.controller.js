const { ClerkExpressRequireAuth, clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

class AuthController {
  static async register(req, res) {
    try {
      const { userId } = req.auth;
      
      // Get user data from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);
      
      // Check if user already exists in MongoDB
      let user = await User.findByClerkId(userId);
      
      if (user) {
        return res.json({
          success: true,
          message: 'User already registered',
          user: user.getPublicProfile()
        });
      }
      
      // Create new user in MongoDB
      user = new User({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        lastLoginAt: new Date()
      });
      
      await user.save();
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: user.getPublicProfile()
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Registration failed'
      });
    }
  }
  
  static async login(req, res) {
    try {
      res.json({
        success: true,
        message: 'Login successful',
        user: req.user.getPublicProfile()
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed'
      });
    }
  }
  
  static async getProfile(req, res) {
    try {
      res.json({
        success: true,
        user: {
          ...req.user.getPublicProfile(),
          profile: req.user.profile,
          preferences: req.user.preferences
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get user profile'
      });
    }
  }
  
  static async logout(req, res) {
    try {
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Logout failed'
      });
    }
  }
}

module.exports = AuthController;