const Student = require('../models/Student');
const { validationResult } = require('express-validator');

class StudentController {
  // Get all students (admin only)
  static async getAllStudents(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        status, 
        educationLevel,
        city,
        search 
      } = req.query;

      const filter = {};
      
      if (status) filter.status = status;
      if (educationLevel) filter.educationLevel = educationLevel;
      if (city) filter.city = new RegExp(city, 'i');
      if (search) {
        filter.$or = [
          { name: new RegExp(search, 'i') },
          { phone: new RegExp(search, 'i') }
        ];
      }

      const students = await Student.find(filter)
        .populate('userId', 'email firstName lastName')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Student.countDocuments(filter);

      res.json({
        success: true,
        data: students,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching students',
        error: error.message
      });
    }
  }

  // Get student by ID
  static async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id)
        .populate('userId', 'email firstName lastName imageUrl');

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student',
        error: error.message
      });
    }
  }

  // Get student by userId
  static async getStudentByUserId(req, res) {
    try {
      const student = await Student.findByUserId(req.params.userId)
        .populate('userId', 'email firstName lastName imageUrl');

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student',
        error: error.message
      });
    }
  }

  // Create student
  static async createStudent(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const studentData = {
        ...req.body,
        userId: req.user._id.toString(),
        status: "active"
      };
      
      const student = new Student(studentData);
      await student.save();

      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: student
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Student with this userId already exists'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating student',
        error: error.message
      });
    }
  }

  // Update student
  static async updateStudent(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }
  
      // First find the student to check ownership
      const existingStudent = await Student.findById(req.params.id);
      
      if (!existingStudent) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }
  
      // Check if the authenticated user is the owner of this student record
      if ( req.user.role !== 'admin' && existingStudent.userId.toString() !== req.user._id.toString() ) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only update your own student record'
        });
      }
  
      // Update the student record
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      res.json({
        success: true,
        message: 'Student updated successfully',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating student',
        error: error.message
      });
    }
  }

  // Delete student
  static async deleteStudent(req, res) {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        message: 'Student deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting student',
        error: error.message
      });
    }
  }

  // Suspend student (admin only)
  static async suspendStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { status: 'suspended' },
        { new: true }
      );

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        message: 'Student suspended successfully',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error suspending student',
        error: error.message
      });
    }
  }

  // Activate student (admin only)
  static async activateStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { status: 'active' },
        { new: true }
      );

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        message: 'Student activated successfully',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error activating student',
        error: error.message
      });
    }
  }

  // Enroll student in course
  static async enrollInCourse(req, res) {
    try {
      const { courseId, accessType, endAt } = req.body;
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Check if the authenticated user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only enroll in courses as admin'
        });
      }

      // Check if already enrolled
      const existingEnrollment = student.enrolledCourses.find(
        course => course.courseId === courseId
      );

      if (existingEnrollment) {
        return res.status(409).json({
          success: false,
          message: 'Student already enrolled in this course'
        });
      }

      const enrollment = {
        courseId,
        accessType,
        enrolledAt: new Date(),
        ...(endAt && { endAt: new Date(endAt) }),
        progress: []
      };

      student.enrolledCourses.push(enrollment);
      await student.save();

      res.json({
        success: true,
        message: 'Student enrolled in course successfully',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error enrolling student in course',
        error: error.message
      });
    }
  }

  // Enroll student in chapter
  static async enrollInChapter(req, res) {
    try {
      const { courseId, chapterId, accessType, endAt } = req.body;
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Check if the authenticated user is the owner of this student record
      if (req.user.role !== 'admin' && student.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only update your own student record'
        });
      }

      // Check if already enrolled
      const existingEnrollment = student.enrolledChapters.find(
        chapter => chapter.courseId === courseId && chapter.chapterId === chapterId
      );

      if (existingEnrollment) {
        return res.status(409).json({
          success: false,
          message: 'Student already enrolled in this chapter'
        });
      }

      const enrollment = {
        courseId,
        chapterId,
        accessType,
        enrolledAt: new Date(),
        ...(endAt && { endAt: new Date(endAt) }),
        watchedLessons: []
      };

      student.enrolledChapters.push(enrollment);
      await student.save();

      res.json({
        success: true,
        message: 'Student enrolled in chapter successfully',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error enrolling student in chapter',
        error: error.message
      });
    }
  }
  
  // Mark lesson as watched
  static async markLessonWatched(req, res) {
    try {
      const { courseId, chapterId, lessonId } = req.body;
      const student = await Student.findById(req.params.id);
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Check if the authenticated user is the owner of this student record
      if (student.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only update your own student record'
        });
      }
  
      const lessonAdded = student.addWatchedLesson(courseId, chapterId, lessonId);
      
      if (!lessonAdded) {
        return res.status(403).json({
          success: false,
          message: 'Student does not have access to this lesson or lesson is already watched'
        });
      }
  
      await student.save();
  
      res.json({
        success: true,
        message: 'Lesson marked as watched',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error marking lesson as watched',
        error: error.message
      });
    }
  }

  // Get course progress
  static async getCourseProgress(req, res) {
    try {
      const { courseId } = req.params;
      const student = await Student.findById(req.params.id);
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Check if the authenticated user is the owner of this student record
      if (req.user.role !== 'admin' && student.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only update your own student record'
        });
      }
  
      const progress = student.getCourseProgress(courseId);
  
      if (progress === null) {
        return res.status(404).json({
          success: false,
          message: 'Student is not enrolled in this course'
        });
      }
  
      res.json({
        success: true,
        data: {
          studentId: student._id,
          courseId,
          progress
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student progress',
        error: error.message
      });
    }
  }

  // Get chapter progress
  static async getChapterProgress(req, res) {
    try {
      const { courseId, chapterId } = req.params;
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Check if the authenticated user is the owner of this student record
      if (req.user.role !== 'admin' && student.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only view your own student record'
        });
      }

      let chapterProgress = null;
      let accessType = null;
      let enrolledAt = null;
      let endAt = null;

      // First, check if student has individual chapter enrollment
      const enrolledChapter = student.enrolledChapters.find(chapter => 
        chapter.courseId === courseId && chapter.chapterId === chapterId
      );

      if (enrolledChapter) {
        chapterProgress = {
          chapterId: enrolledChapter.chapterId,
          watchedLessons: enrolledChapter.watchedLessons
        };
        accessType = enrolledChapter.accessType;
        enrolledAt = enrolledChapter.enrolledAt;
        endAt = enrolledChapter.endAt;
      } else {
        // Check if student has access through full course enrollment
        const enrolledCourse = student.enrolledCourses.find(course => course.courseId === courseId);
        
        if (enrolledCourse) {
          const courseChapterProgress = enrolledCourse.progress.find(p => p.chapterId === chapterId);
          
          if (courseChapterProgress) {
            chapterProgress = courseChapterProgress;
            accessType = enrolledCourse.accessType;
            enrolledAt = enrolledCourse.enrolledAt;
            endAt = enrolledCourse.endAt;
          }
        }
      }

      if (!chapterProgress) {
        return res.status(404).json({
          success: false,
          message: 'Student is not enrolled in this chapter'
        });
      }

      // Check if access is still valid (for temporary access)
      const hasValidAccess = accessType === 'lifetime' || (endAt && new Date() <= endAt);

      res.json({
        success: true,
        data: {
          studentId: student._id,
          courseId,
          chapterId,
          progress: chapterProgress,
          accessInfo: {
            accessType,
            enrolledAt,
            endAt,
            hasValidAccess
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student chapter progress',
        error: error.message
      });
    }
  }

  // Buy book
  static async buyBook(req, res) {
    try {
      const { bookId } = req.body;
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Check if the authenticated user is the owner of this student record
      if (req.user.role !== 'admin' && student.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: You can only update your own student record'
        });
      }

      // Check if book already purchased
      const existingPurchase = student.boughtBooks.find(
        book => book.bookId === bookId
      );

      if (existingPurchase) {
        return res.status(409).json({
          success: false,
          message: 'Book already purchased'
        });
      }

      student.boughtBooks.push({
        bookId,
        purchasedAt: new Date()
      });

      await student.save();

      res.json({
        success: true,
        message: 'Book purchased successfully',
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error purchasing book',
        error: error.message
      });
    }
  }
}

module.exports = StudentController;