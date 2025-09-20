const { ClerkExpressRequireAuth, clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

// Middleware to require authentication
const requireAuth = ClerkExpressRequireAuth();

// Middleware to sync user data with MongoDB
const syncUserData = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    
    // Get user data from Clerk using the clerkClient
    const clerkUser = await clerkClient.users.getUser(userId);
    
    // Find or create user in MongoDB
    let user = await User.findByClerkId(userId);
    
    if (!user) {
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
    } else {
      // Update existing user with latest data from Clerk
      user.lastLoginAt = new Date();
      await user.save();
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Error syncing user data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to sync user data' 
    });
  }
};

// Middleware to check user role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }
    
    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }
    
    next();
  };
};

// Middleware to check if user is active
const requireActiveUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'User not authenticated'
    });
  }
  
  if (!req.user.isActive) {
    return res.status(403).json({
      success: false,
      error: 'Account is deactivated'
    });
  }
  next();
};

module.exports = {
  requireAuth,
  syncUserData,
  requireRole,
  requireActiveUser
};