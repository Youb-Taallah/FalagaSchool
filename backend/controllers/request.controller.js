const Request = require('../models/Request');

class RequestController {
  static async getAllRequests(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || '';
      const status = req.query.status;
      const type = req.query.type;
      const studentId = req.query.studentId;
      
      // Build search query
      let query = {};
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { note: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (status) {
        query.status = status;
      }
      
      if (type) {
        query.type = type;
      }
      
      if (studentId) {
        query.studentId = studentId;
      }
      
      const requests = await Request.find(query)
        .populate('studentId', 'name email')
        .populate('courseId', 'title description image')
        .populate('bookId', 'title author')
        .skip(skip)
        .limit(limit)
        .sort({ submittedAt: -1 });
      
      const total = await Request.countDocuments(query);
      
      res.json({
        success: true,
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get requests error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch requests'
      });
    }
  }
  
  static async getRequestById(req, res) {
    try {
      const { id } = req.params;
      
      const request = await Request.findById(id)
        .populate('studentId', 'name email')
        .populate('courseId', 'title description image')
        .populate('bookId', 'title author');
      
      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Request not found'
        });
      }
      
      // Check if user has permission to view this request
      if (req.user.role !== 'admin' && 
          request.studentId._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      res.json({
        success: true,
        request
      });
    } catch (error) {
      console.error('Get request error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch request'
      });
    }
  }
  
  static async createRequest(req, res) {
    try {
      const requestData = {
        ...req.body,
        studentId: req.user._id
      };
      
      const request = new Request(requestData);
      await request.save();
      
      res.status(201).json({
        success: true,
        message: 'Request submitted successfully',
        request
      });
    } catch (error) {
      console.error('Create request error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create request'
      });
    }
  }
  
  static async updateRequest(req, res) {
    try {
      const { id } = req.params;
      
      const request = await Request.findById(id);
      
      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Request not found'
        });
      }
      
      // Check if user has permission to update this request
      if (req.user.role !== 'admin' && 
          request.studentId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      // Only allow updates if request is still pending
      if (request.status !== 'pending') {
        return res.status(400).json({
          success: false,
          error: 'Cannot update request that has been reviewed'
        });
      }
      
      Object.assign(request, req.body);
      await request.save();
      
      res.json({
        success: true,
        message: 'Request updated successfully',
        request
      });
    } catch (error) {
      console.error('Update request error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update request'
      });
    }
  }
  
  static async deleteRequest(req, res) {
    try {
      const { id } = req.params;
      
      const request = await Request.findById(id);
      
      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Request not found'
        });
      }
      
      // Check if user has permission to delete this request
      if (req.user.role !== 'admin' && 
          request.studentId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      // Only allow deletion if request is still pending
      if (request.status !== 'pending') {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete request that has been reviewed'
        });
      }
      
      await Request.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'Request deleted successfully'
      });
    } catch (error) {
      console.error('Delete request error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete request'
      });
    }
  }
  
  static async approveRequest(req, res) {
    try {
      const { id } = req.params;
      
      const request = await Request.findById(id);
      
      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Request not found'
        });
      }
      
      if (request.status !== 'pending') {
        return res.status(400).json({
          success: false,
          error: 'Request has already been reviewed'
        });
      }
      
      await request.approve();
      
      res.json({
        success: true,
        message: 'Request approved successfully',
        request
      });
    } catch (error) {
      console.error('Approve request error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to approve request'
      });
    }
  }
  
  static async rejectRequest(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      const request = await Request.findById(id);
      
      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Request not found'
        });
      }
      
      if (request.status !== 'pending') {
        return res.status(400).json({
          success: false,
          error: 'Request has already been reviewed'
        });
      }
      
      await request.reject(reason);
      
      res.json({
        success: true,
        message: 'Request rejected successfully',
        request
      });
    } catch (error) {
      console.error('Reject request error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to reject request'
      });
    }
  }
  
  static async getRequestsByStudent(req, res) {
    try {
      const { studentId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      // Check if user has permission to view these requests
      if (req.user.role !== 'admin' && 
          studentId !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const requests = await Request.findByStudent(studentId)
        .populate('courseId', 'title description image')
        .populate('bookId', 'title author')
        .skip(skip)
        .limit(limit)
        .sort({ submittedAt: -1 });
      
      const total = await Request.countDocuments({ studentId });
      
      res.json({
        success: true,
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get student requests error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch student requests'
      });
    }
  }
  
  static async getRequestsByStatus(req, res) {
    try {
      const { status } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status'
        });
      }
      
      const requests = await Request.findByStatus(status)
        .populate('studentId', 'name email')
        .populate('courseId', 'title description image')
        .populate('bookId', 'title author')
        .skip(skip)
        .limit(limit)
        .sort({ submittedAt: -1 });
      
      const total = await Request.countDocuments({ status });
      
      res.json({
        success: true,
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get requests by status error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch requests by status'
      });
    }
  }
  
  static async getMyRequests(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const status = req.query.status;
      
      let query = { studentId: req.user._id };
      
      if (status) {
        query.status = status;
      }
      
      const requests = await Request.find(query)
        .populate('courseId', 'title description image')
        .populate('bookId', 'title author')
        .skip(skip)
        .limit(limit)
        .sort({ submittedAt: -1 });
      
      const total = await Request.countDocuments(query);
      
      res.json({
        success: true,
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get my requests error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch requests'
      });
    }
  }
}

module.exports = RequestController;