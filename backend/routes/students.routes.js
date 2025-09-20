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

// Get all students (admin/instructor only)
router.get('/', requireRole(['admin', 'instructor']), StudentController.getAllStudents);

// Get student by ID
router.get('/:id', StudentController.getStudentById);

// Get student by userId
router.get('/user/:userId', StudentController.getStudentByUserId);

// Create student
router.post('/', requireRole(['student']), validateStudent, StudentController.createStudent);

// Update student
router.put('/:id', requireRole(['admin', 'student']), validateUpdateStudent, StudentController.updateStudent);

// Delete student (admin only)
router.delete('/:id', requireRole(['admin']), StudentController.deleteStudent);

// Suspend student (admin only)
router.patch('/:id/suspend', requireRole(['admin']), StudentController.suspendStudent);

// Activate student (admin only)
router.patch('/:id/activate', requireRole(['admin']), StudentController.activateStudent);

// Enroll student in course
router.post('/:id/enroll/course', validateEnrollment, StudentController.enrollInCourse);

// Enroll student in chapter
router.post('/:id/enroll/chapter', validateChapterEnrollment, StudentController.enrollInChapter);

// Mark lesson as watched
router.post('/:id/progress/lesson', validateLessonProgress, StudentController.markLessonWatched);

// Get student progress for a course
router.get('/:id/progress/:courseId', StudentController.getStudentProgress);

// Buy book
router.post('/:id/books', [body('bookId').notEmpty().withMessage('Book ID is required')], StudentController.buyBook);

module.exports = router;