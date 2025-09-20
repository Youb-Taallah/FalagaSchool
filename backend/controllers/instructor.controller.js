const Instructor = require('../models/Instructor');

class InstructorController {
  static async getAllInstructors(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || '';
      const status = req.query.status;
      const expertise = req.query.expertise;
      
      // Build search query
      let query = {};
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { bio: { $regex: search, $options: 'i' } },
          { areasOfExpertise: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (status) {
        query.status = status;
      }
      
      if (expertise) {
        query.areasOfExpertise = { $in: [expertise] };
      }
      
      const instructors = await Instructor.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Instructor.countDocuments(query);
      
      res.json({
        success: true,
        instructors,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get instructors error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch instructors'
      });
    }
  }
  
  static async getInstructorById(req, res) {
    try {
      const { id } = req.params;
      
      const instructor = await Instructor.findById(id).populate('coursesTaught');
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      res.json({
        success: true,
        instructor
      });
    } catch (error) {
      console.error('Get instructor error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch instructor'
      });
    }
  }
  
  static async createInstructor(req, res) {
    try {
      const instructor = new Instructor(req.body);
      await instructor.save();
      
      res.status(201).json({
        success: true,
        message: 'Instructor created successfully',
        instructor
      });
    } catch (error) {
      console.error('Create instructor error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create instructor'
      });
    }
  }
  
  static async updateInstructor(req, res) {
    try {
      const { id } = req.params;
      
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      Object.assign(instructor, req.body);
      await instructor.save();
      
      res.json({
        success: true,
        message: 'Instructor updated successfully',
        instructor
      });
    } catch (error) {
      console.error('Update instructor error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update instructor'
      });
    }
  }
  
  static async deleteInstructor(req, res) {
    try {
      const { id } = req.params;
      
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      await Instructor.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'Instructor deleted successfully'
      });
    } catch (error) {
      console.error('Delete instructor error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete instructor'
      });
    }
  }
  
  static async activateInstructor(req, res) {
    try {
      const { id } = req.params;
      
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      instructor.status = 'active';
      await instructor.save();
      
      res.json({
        success: true,
        message: 'Instructor activated successfully',
        instructor
      });
    } catch (error) {
      console.error('Activate instructor error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to activate instructor'
      });
    }
  }
  
  static async deactivateInstructor(req, res) {
    try {
      const { id } = req.params;
      
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      instructor.status = 'inactive';
      await instructor.save();
      
      res.json({
        success: true,
        message: 'Instructor deactivated successfully',
        instructor
      });
    } catch (error) {
      console.error('Deactivate instructor error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to deactivate instructor'
      });
    }
  }
  
  static async getActiveInstructors(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const instructors = await Instructor.findActive()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Instructor.countDocuments({ status: 'active' });
      
      res.json({
        success: true,
        instructors,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get active instructors error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch active instructors'
      });
    }
  }
  
  static async getInstructorsByExpertise(req, res) {
    try {
      const { expertise } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const instructors = await Instructor.findByExpertise(expertise)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Instructor.countDocuments({ areasOfExpertise: { $in: [expertise] } });
      
      res.json({
        success: true,
        instructors,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get instructors by expertise error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch instructors by expertise'
      });
    }
  }
  
  static async searchInstructors(req, res) {
    try {
      const { query, status, expertise, limit = 10 } = req.query;
      
      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 2 characters'
        });
      }
      
      let searchQuery = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { title: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } },
          { areasOfExpertise: { $regex: query, $options: 'i' } }
        ]
      };
      
      if (status) {
        searchQuery.status = status;
      }
      
      if (expertise) {
        searchQuery.areasOfExpertise = { $in: [expertise] };
      }
      
      const instructors = await Instructor.find(searchQuery)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
      
      res.json({
        success: true,
        instructors,
        count: instructors.length
      });
    } catch (error) {
      console.error('Search instructors error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search instructors'
      });
    }
  }
  
  static async addCourseToInstructor(req, res) {
    try {
      const { id } = req.params;
      const { courseId } = req.body;
      
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      await instructor.addCourse(courseId);
      
      res.json({
        success: true,
        message: 'Course added to instructor successfully',
        instructor
      });
    } catch (error) {
      console.error('Add course to instructor error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to add course to instructor'
      });
    }
  }
  
  static async removeCourseFromInstructor(req, res) {
    try {
      const { id, courseId } = req.params;
      
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({
          success: false,
          error: 'Instructor not found'
        });
      }
      
      await instructor.removeCourse(courseId);
      
      res.json({
        success: true,
        message: 'Course removed from instructor successfully',
        instructor
      });
    } catch (error) {
      console.error('Remove course from instructor error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove course from instructor'
      });
    }
  }
}

module.exports = InstructorController;