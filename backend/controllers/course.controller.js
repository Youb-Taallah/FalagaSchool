const Course = require('../models/Course');

class CourseController {
  static async getAllCourses(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || '';
      const level = req.query.level;
      const instructorId = req.query.instructorId;
      const tag = req.query.tag;
      const isPublished = req.query.isPublished;
      const bestseller = req.query.bestseller;
      const sale = req.query.sale;
      const arabicLanguage = req.query.arabicLanguage;
      
      // Build search query
      let query = {};
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (level) {
        query.level = level;
      }
      
      if (instructorId) {
        query.instructorId = instructorId;
      }
      
      if (tag) {
        query.tags = { $in: [tag] };
      }
      
      if (isPublished !== undefined) {
        query.isPublished = isPublished === 'true';
      }
      
      if (bestseller !== undefined) {
        query.bestseller = bestseller === 'true';
      }
      
      if (sale !== undefined) {
        query.sale = sale === 'true';
      }
      
      if (arabicLanguage !== undefined) {
        query.arabicLanguage = arabicLanguage === 'true';
      }
      
      // Exclude chapters from the response for performance
      const courses = await Course.find(query)
        .select('-chapters')
        .skip(skip)
        .limit(limit)
        .sort({ publishedAt: -1 });
      
      const total = await Course.countDocuments(query);
      
      res.json({
        success: true,
        courses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get courses error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch courses'
      });
    }
  }
  
  static async getCourseById(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // If course is not published, check if user has permission to view it
      if (!course.isPublished) {
        // Check if user is authenticated
        if (!req.user) {
          return res.status(403).json({
            success: false,
            error: 'Access denied. Course is not published.'
          });
        }
        
        // Check if user is admin or the instructor of the course
        if (req.user.role !== 'admin' && 
            req.user.role !== 'instructor' && 
            course.instructorId !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            error: 'Access denied. Course is not published.'
          });
        }
      }
      
      res.json({
        success: true,
        course
      });
    } catch (error) {
      console.error('Get course error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch course'
      });
    }
  }
  
  static async createCourse(req, res) {
    try {
      const courseData = {
        ...req.body,
        instructorId: req.user._id.toString(),
        publishedAt: new Date()
      };
      
      const course = new Course(courseData);
      await course.save();
      
      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course
      });
    } catch (error) {
      console.error('Create course error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          error: 'Course ID already exists'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create course'
      });
    }
  }
  
  static async updateCourse(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      Object.assign(course, req.body);
      await course.save();
      
      res.json({
        success: true,
        message: 'Course updated successfully',
        course
      });
    } catch (error) {
      console.error('Update course error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update course'
      });
    }
  }
  
  static async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      await Course.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete course'
      });
    }
  }
  
  static async publishCourse(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      course.isPublished = true;
      await course.save();
      
      res.json({
        success: true,
        message: 'Course published successfully',
        course
      });
    } catch (error) {
      console.error('Publish course error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to publish course'
      });
    }
  }
  
  static async unpublishCourse(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      course.isPublished = false;
      await course.save();
      
      res.json({
        success: true,
        message: 'Course unpublished successfully',
        course
      });
    } catch (error) {
      console.error('Unpublish course error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to unpublish course'
      });
    }
  }
  
  static async getPublishedCourses(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const courses = await Course.findPublished()
        .select('-chapters')
        .skip(skip)
        .limit(limit)
        .sort({ publishedAt: -1 });
      
      const total = await Course.countDocuments({ isPublished: true });
      
      res.json({
        success: true,
        courses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get published courses error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch published courses'
      });
    }
  }
  
  static async getCoursesByInstructor(req, res) {
    try {
      const { instructorId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const courses = await Course.findByInstructor(instructorId)
        .select('-chapters')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Course.countDocuments({ instructorId });
      
      res.json({
        success: true,
        courses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get instructor courses error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch instructor courses'
      });
    }
  }
  
  static async searchCourses(req, res) {
    try {
      const { query, level, tag } = req.query;
      
      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 2 characters'
        });
      }
      
      let searchQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $regex: query, $options: 'i' } }
        ],
        isPublished: true
      };
      
      if (level) {
        searchQuery.level = level;
      }
      
      if (tag) {
        searchQuery.tags = { $in: [tag] };
      }
      
      const courses = await Course.find(searchQuery)
        .select('-chapters')
        .sort({ enrolledStudents: -1, publishedAt: -1 });
      
      res.json({
        success: true,
        courses,
        count: courses.length
      });
    } catch (error) {
      console.error('Search courses error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search courses'
      });
    }
  }
  
  static async enrollStudent(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      if (!course.isPublished) {
        return res.status(400).json({
          success: false,
          error: 'Course is not published'
        });
      }
      
      await course.incrementEnrolledStudents();
      
      res.json({
        success: true,
        message: 'Student enrolled successfully',
        enrolledStudents: course.enrolledStudents
      });
    } catch (error) {
      console.error('Enroll student error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to enroll student'
      });
    }
  }

  // ===== CHAPTER METHODS =====

  static async createChapter(req, res) {
    try {
      const { courseId } = req.params;
      const chapterData = req.body;
      
      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      // Set position if not provided
      if (!chapterData.position) {
        chapterData.position = course.chapters.length + 1;
      }
      
      course.chapters.push(chapterData);
      await course.save();
      
      const newChapter = course.chapters[course.chapters.length - 1];
      
      res.status(201).json({
        success: true,
        message: 'Chapter created successfully',
        chapter: newChapter
      });
    } catch (error) {
      console.error('Create chapter error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create chapter'
      });
    }
  }

  static async updateChapter(req, res) {
    try {
      const { courseId, chapterId } = req.params;
      const updateData = req.body;
      
      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const chapter = course.getChapterById(chapterId);
      
      if (!chapter) {
        return res.status(404).json({
          success: false,
          error: 'Chapter not found'
        });
      }
      
      Object.assign(chapter, updateData);
      await course.save();
      
      res.json({
        success: true,
        message: 'Chapter updated successfully',
        chapter
      });
    } catch (error) {
      console.error('Update chapter error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update chapter'
      });
    }
  }

  // ===== SECTION METHODS =====

  static async createSection(req, res) {
    try {
      const { courseId, chapterId } = req.params;
      const sectionData = req.body;
      
      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const chapter = course.getChapterById(chapterId);
      
      if (!chapter) {
        return res.status(404).json({
          success: false,
          error: 'Chapter not found'
        });
      }
      
      // Set position if not provided
      if (!sectionData.position) {
        sectionData.position = chapter.sections.length + 1;
      }
      
      chapter.sections.push(sectionData);
      await course.save();
      
      const newSection = chapter.sections[chapter.sections.length - 1];
      
      res.status(201).json({
        success: true,
        message: 'Section created successfully',
        section: newSection
      });
    } catch (error) {
      console.error('Create section error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create section'
      });
    }
  }

  static async updateSection(req, res) {
    try {
      const { courseId, chapterId, sectionId } = req.params;
      const updateData = req.body;
      
      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const chapter = course.getChapterById(chapterId);
      
      if (!chapter) {
        return res.status(404).json({
          success: false,
          error: 'Chapter not found'
        });
      }
      
      const section = chapter.sections.find(section => section._id.toString() === sectionId);
      
      if (!section) {
        return res.status(404).json({
          success: false,
          error: 'Section not found'
        });
      }
      
      Object.assign(section, updateData);
      await course.save();
      
      res.json({
        success: true,
        message: 'Section updated successfully',
        section
      });
    } catch (error) {
      console.error('Update section error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update section'
      });
    }
  }

  // ===== VIDEO LESSON METHODS =====

  static async createVideoLesson(req, res) {
    try {
      const { courseId, chapterId, sectionId } = req.params;
      const lessonData = req.body;
      
      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const chapter = course.getChapterById(chapterId);
      
      if (!chapter) {
        return res.status(404).json({
          success: false,
          error: 'Chapter not found'
        });
      }
      
      const section = chapter.sections.find(section => section._id.toString() === sectionId);
      
      if (!section) {
        return res.status(404).json({
          success: false,
          error: 'Section not found'
        });
      }
      
      // Set position if not provided
      if (!lessonData.position) {
        lessonData.position = section.lessons.length + 1;
      }
      
      section.lessons.push(lessonData);
      
      // Update total lessons count
      course.totalLessons = course.chapters.reduce((total, ch) => {
        return total + ch.sections.reduce((sectionTotal, sec) => {
          return sectionTotal + sec.lessons.length;
        }, 0);
      }, 0);
      
      await course.save();
      
      const newLesson = section.lessons[section.lessons.length - 1];
      
      res.status(201).json({
        success: true,
        message: 'Video lesson created successfully',
        lesson: newLesson
      });
    } catch (error) {
      console.error('Create video lesson error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create video lesson'
      });
    }
  }

  static async updateVideoLesson(req, res) {
    try {
      const { courseId, chapterId, sectionId, lessonId } = req.params;
      const updateData = req.body;
      
      const course = await Course.findById(courseId);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (course.instructorId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      const lesson = course.getLessonById(chapterId, sectionId, lessonId);
      
      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: 'Video lesson not found'
        });
      }
      
      Object.assign(lesson, updateData);
      await course.save();
      
      res.json({
        success: true,
        message: 'Video lesson updated successfully',
        lesson
      });
    } catch (error) {
      console.error('Update video lesson error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update video lesson'
      });
    }
  }
}

module.exports = CourseController;