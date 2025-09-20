const User = require('../models/User');
const { validateUserUpdate } = require('../utils/validators');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || '';
      const role = req.query.role;
      const isActive = req.query.isActive;
      
      // Build search query
      let query = {};
      
      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (role) {
        query.role = role;
      }
      
      if (isActive !== undefined) {
        query.isActive = isActive === 'true';
      }
      
      const users = await User.find(query)
        .select('-profile -preferences')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await User.countDocuments(query);
      
      res.json({
        success: true,
        users: users.map(user => user.getPublicProfile()),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users'
      });
    }
  }
  
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      // Users can only view their own profile unless they're admin
      if (req.user._id.toString() !== id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.json({
        success: true,
        user: req.user.role === 'admin' ? {
          ...user.getPublicProfile(),
          profile: user.profile,
          preferences: user.preferences,
          lastLoginAt: user.lastLoginAt,
          updatedAt: user.updatedAt
        } : user.getPublicProfile()
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  }
  
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      // Users can delete their own account, admins can delete any account
      if (req.user._id.toString() !== id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      // Delete user from Clerk
      try {
        await req.auth.clerkClient.users.deleteUser(user.clerkId);
      } catch (clerkError) {
        console.error('Clerk deletion error:', clerkError);
        // Continue with MongoDB deletion even if Clerk deletion fails
      }
      
      await User.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
  }
  
  static async deactivateUser(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.json({
        success: true,
        message: 'User deactivated successfully',
        user: user.getPublicProfile()
      });
    } catch (error) {
      console.error('Deactivate user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to deactivate user'
      });
    }
  }
  
  static async activateUser(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      res.json({
        success: true,
        message: 'User activated successfully',
        user: user.getPublicProfile()
      });
    } catch (error) {
      console.error('Activate user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to activate user'
      });
    }
  }

  static async searchUsers(req, res) {
    try {
      const { query, role, isActive, limit = 10 } = req.query;
      
      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 2 characters'
        });
      }
      
      let searchQuery = {
        $or: [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      };
      
      if (role) {
        searchQuery.role = role;
      }
      
      if (isActive !== undefined) {
        searchQuery.isActive = isActive === 'true';
      }
      
      const users = await User.find(searchQuery)
        .select('firstName lastName email imageUrl role isActive createdAt')
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
      
      res.json({
        success: true,
        users: users.map(user => user.getPublicProfile()),
        count: users.length
      });
    } catch (error) {
      console.error('Search users error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search users'
      });
    }
  }
  
}

module.exports = UserController;