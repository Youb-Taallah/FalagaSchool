const express = require('express');
const InstructorController = require('../controllers/instructor.controller');
const { 
  requireAuth, 
  syncUserData, 
  requireRole, 
  requireActiveUser 
} = require('../middleware/auth');

const router = express.Router();

// Public routes (no auth required)
router.get('/active', InstructorController.getActiveInstructors);
router.get('/search', InstructorController.searchInstructors);
router.get('/expertise/:expertise', InstructorController.getInstructorsByExpertise);
router.get('/:id', InstructorController.getInstructorById);

// Protected routes (require auth)
router.use(requireAuth);
router.use(syncUserData);
router.use(requireActiveUser);

// Admin only routes
router.get('/', requireRole(['admin']), InstructorController.getAllInstructors);
router.post('/', requireRole(['admin']), InstructorController.createInstructor);
router.put('/:id', requireRole(['admin']), InstructorController.updateInstructor);
router.delete('/:id', requireRole(['admin']), InstructorController.deleteInstructor);

// Instructor status management (admin only)
router.patch('/:id/activate', requireRole(['admin']), InstructorController.activateInstructor);
router.patch('/:id/deactivate', requireRole(['admin']), InstructorController.deactivateInstructor);

// Course management for instructors (admin only)
router.post('/:id/courses', requireRole(['admin']), InstructorController.addCourseToInstructor);
router.delete('/:id/courses/:courseId', requireRole(['admin']), InstructorController.removeCourseFromInstructor);

module.exports = router;