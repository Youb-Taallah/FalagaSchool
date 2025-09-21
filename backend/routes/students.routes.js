// routes/studentRoutes.js
const express = require('express');
const StudentController = require('../controllers/student.controller');
const { body } = require('express-validator');
const { 
  requireAuth, 
  syncUserData, 
  requireRole, 
  requireActiveUser 
} = require('../middleware/auth');

const {
  validateStudent,
  validateUpdateStudent,
  validateEnrollment,
  validateChapterEnrollment,
  validateLessonProgress
} = require('../middleware/validation');

const router = express.Router();

// Apply auth middleware to all routes
router.use(requireAuth);
router.use(syncUserData);
router.use(requireActiveUser);

// -------------------------- Admin accessible Routes --------------------------

// Get all students (admin only)
router.get('/', requireRole(['admin']), StudentController.getAllStudents);

// Get student by ID
router.get('/:id',requireRole(['admin', 'student']), StudentController.getStudentById);

// Get student by userId
router.get('/user/:userId',requireRole(['admin', 'student']), StudentController.getStudentByUserId);

// Update student
router.put('/:id', requireRole(['admin', 'student']), validateUpdateStudent, StudentController.updateStudent);

// Delete student (admin only)
router.delete('/:id', requireRole(['admin', 'student']), StudentController.deleteStudent);

// Suspend student (admin only)
router.patch('/:id/suspend', requireRole(['admin']), StudentController.suspendStudent);

// Activate student (admin only)
router.patch('/:id/activate', requireRole(['admin']), StudentController.activateStudent);

// Enroll student in course (admin only)
router.post('/:id/enroll/course', requireRole(['admin']), validateEnrollment, StudentController.enrollInCourse);

// Enroll student in chapter (admin only)
router.post('/:id/enroll/chapter', requireRole(['admin']), validateChapterEnrollment, StudentController.enrollInChapter);

// Buy book (admin only)
router.post('/:id/books', requireRole(['admin']), [body('bookId').notEmpty().withMessage('Book ID is required')], StudentController.buyBook);

// Get student progress for a course
router.get('/:id/progress/:courseId', requireRole(['admin', 'student']), StudentController.getCourseProgress);

// Get student progress for a chapter
router.get('/:id/progress/:courseId/:chapterId', requireRole(['admin', 'student']), StudentController.getChapterProgress);



// -------------------------- Student accessible Routes --------------------------

// Get student by ID
router.get('/:id',requireRole(['admin', 'student']), StudentController.getStudentById);

// Get student by userId
router.get('/user/:userId',requireRole(['admin', 'student']), StudentController.getStudentByUserId);

// Create student
router.post('/', requireRole(['student']), validateStudent, StudentController.createStudent);

// Update student
router.put('/:id', requireRole(['admin', 'student']), validateUpdateStudent, StudentController.updateStudent);

// Delete student (admin only)
router.delete('/:id', requireRole(['admin', 'student']), StudentController.deleteStudent);

// Mark lesson as watched
router.post('/:id/progress/lesson', requireRole(['student']), validateLessonProgress, StudentController.markLessonWatched);

// Get student progress for a course
router.get('/:id/progress/:courseId', requireRole(['admin', 'student']), StudentController.getCourseProgress);

// Get student progress for a chapter
router.get('/:id/progress/:courseId/:chapterId', requireRole(['admin', 'student']), StudentController.getChapterProgress);


module.exports = router;