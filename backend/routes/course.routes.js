const express = require('express');
const CourseController = require('../controllers/course.controller');
const { 
  requireAuth, 
  syncUserData, 
  requireRole, 
  requireActiveUser 
} = require('../middleware/auth');

const router = express.Router();

// Middleware to conditionally apply auth (for getCourseById)
const conditionalAuth = (req, res, next) => {
  // Try to apply auth middleware, but don't fail if no token
  if (req.headers.authorization) {
    requireAuth(req, res, (err) => {
      if (!err) {
        syncUserData(req, res, (syncErr) => {
          if (!syncErr) {
            requireActiveUser(req, res, next);
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

// Public routes (no auth required)
router.get('/published', CourseController.getPublishedCourses);
router.get('/search', CourseController.searchCourses);
router.get('/instructor/:instructorId', CourseController.getCoursesByInstructor);

// Get course by ID (conditional auth for unpublished courses)
router.get('/:id', conditionalAuth, CourseController.getCourseById);

// Protected routes (require auth)
router.use(requireAuth);
router.use(syncUserData);
router.use(requireActiveUser);

// Get all courses (admin/instructor only)
router.get('/', requireRole(['admin', 'instructor']), CourseController.getAllCourses);

// Create course (instructor/admin only)
router.post('/', requireRole(['instructor', 'admin']), CourseController.createCourse);

// Update course (instructor/admin only - ownership checked in controller)
router.put('/:id', requireRole(['instructor', 'admin']), CourseController.updateCourse);

// Delete course (instructor/admin only - ownership checked in controller)
router.delete('/:id', requireRole(['instructor', 'admin']), CourseController.deleteCourse);

// Publish/Unpublish course (instructor/admin only - ownership checked in controller)
router.patch('/:id/publish', requireRole(['instructor', 'admin']), CourseController.publishCourse);
router.patch('/:id/unpublish', requireRole(['instructor', 'admin']), CourseController.unpublishCourse);

// Enroll student (authenticated users only)
router.post('/:id/enroll', CourseController.enrollStudent);

// ===== CHAPTER ROUTES =====
// Create chapter (instructor/admin only - ownership checked in controller)
router.post('/:courseId/chapters', requireRole(['instructor', 'admin']), CourseController.createChapter);

// Update chapter (instructor/admin only - ownership checked in controller)
router.put('/:courseId/chapters/:chapterId', requireRole(['instructor', 'admin']), CourseController.updateChapter);

// ===== SECTION ROUTES =====
// Create section (instructor/admin only - ownership checked in controller)
router.post('/:courseId/chapters/:chapterId/sections', requireRole(['instructor', 'admin']), CourseController.createSection);

// Update section (instructor/admin only - ownership checked in controller)
router.put('/:courseId/chapters/:chapterId/sections/:sectionId', requireRole(['instructor', 'admin']), CourseController.updateSection);

// ===== VIDEO LESSON ROUTES =====
// Create video lesson (instructor/admin only - ownership checked in controller)
router.post('/:courseId/chapters/:chapterId/sections/:sectionId/lessons', requireRole(['instructor', 'admin']), CourseController.createVideoLesson);

// Update video lesson (instructor/admin only - ownership checked in controller)
router.put('/:courseId/chapters/:chapterId/sections/:sectionId/lessons/:lessonId', requireRole(['instructor', 'admin']), CourseController.updateVideoLesson);

module.exports = router;