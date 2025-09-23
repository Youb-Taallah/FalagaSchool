  const express = require('express');
  const CourseController = require('../controllers/course.controller');
  const { 
    requireAuth, 
    syncUserData, 
    requireRole, 
    requireActiveUser 
  } = require('../middleware/auth');

  const router = express.Router();

  // Public routes (no auth required)
  router.get('/published', CourseController.getPublishedCourses);
  router.get('/search', CourseController.searchCourses);
  router.get('/instructor/:instructorId', CourseController.getCoursesByInstructor);

  // Public course view (limited data for preview)
  router.get('/:id/public', CourseController.getPublicCourse);


  // Protected routes (require auth)
  router.use(requireAuth);
  router.use(syncUserData);
  router.use(requireActiveUser);

  // Student course view (full data for enrolled students)
  router.get('/:id/student',requireRole(['student']), CourseController.getStudentCourse);

  // Full course view (instructor/admin - for management)
  router.get('/:id', requireRole(['admin']), CourseController.getCourseById);

  // Get all courses (admin/instructor only)
  router.get('/', requireRole(['admin']), CourseController.getAllCourses);

  // Create course (instructor/admin only)
  router.post('/', requireRole(['admin']), CourseController.createCourse);

  // Update course (instructor/admin only - ownership checked in controller)
  router.put('/:id', requireRole(['admin']), CourseController.updateCourse);

  // Delete course (instructor/admin only - ownership checked in controller)
  router.delete('/:id', requireRole(['admin']), CourseController.deleteCourse);

  // Publish/Unpublish course (instructor/admin only - ownership checked in controller)
  router.patch('/:id/publish', requireRole(['admin']), CourseController.publishCourse);
  router.patch('/:id/unpublish', requireRole(['admin']), CourseController.unpublishCourse);

  // ===== CHAPTER ROUTES =====
  // create/update/delete chapter (instructor/admin only - ownership checked in controller)
  router.post('/:courseId/chapters', requireRole(['admin']), CourseController.createChapter);
  router.put('/:courseId/chapters/:chapterId', requireRole(['admin']), CourseController.updateChapter);
  router.delete('/:courseId/chapters/:chapterId', requireRole(['admin']), CourseController.deleteChapter);

  // ===== SECTION ROUTES =====
  // create/update/delete section (instructor/admin only - ownership checked in controller)
  router.post('/:courseId/chapters/:chapterId/sections', requireRole(['admin']), CourseController.createSection);
  router.put('/:courseId/chapters/:chapterId/sections/:sectionId', requireRole(['admin']), CourseController.updateSection);
  router.delete('/:courseId/chapters/:chapterId/sections/:sectionId', requireRole(['admin']), CourseController.deleteSection);

  // ===== VIDEO LESSON ROUTES =====
  // create/update/delete video lesson (instructor/admin only - ownership checked in controller)
  router.post('/:courseId/chapters/:chapterId/sections/:sectionId/lessons', requireRole(['admin']), CourseController.createVideoLesson);
  router.put('/:courseId/chapters/:chapterId/sections/:sectionId/lessons/:lessonId', requireRole(['admin']), CourseController.updateVideoLesson);
  router.delete('/:courseId/chapters/:chapterId/sections/:sectionId/lessons/:lessonId', requireRole(['admin']), CourseController.deleteVideoLesson);

  module.exports = router;