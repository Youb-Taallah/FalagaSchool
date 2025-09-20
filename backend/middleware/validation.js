const { body } = require('express-validator');

  // Validation middleware
  const validateStudent = [
    body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number'),

    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('city')
      .notEmpty().withMessage('City is required')
      .isLength({ min: 2 }).withMessage('City must be at least 2 characters'),

    body('educationLevel')
      .notEmpty().withMessage('Education level is required')
      .isLength({ min: 2 }).withMessage('Education level must be at least 2 characters')
  ];

  const validateUpdateStudent = [
    body('phone')
      .optional()
      .notEmpty().withMessage('Phone number cannot be empty')
      .isMobilePhone().withMessage('Invalid phone number'),
  
    body('name')
      .optional()
      .notEmpty().withMessage('Name cannot be empty')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  
    body('city')
      .optional()
      .notEmpty().withMessage('City cannot be empty')
      .isLength({ min: 2 }).withMessage('City must be at least 2 characters'),
  
    body('educationLevel')
      .optional()
      .notEmpty().withMessage('Education level cannot be empty')
      .isLength({ min: 2 }).withMessage('Education level must be at least 2 characters'),
  
    body('status')
      .optional()
      .isIn(['active', 'suspended', 'pending']).withMessage('Invalid status value'),
  
    body('avatar')
      .optional()
      .isURL().withMessage('Avatar must be a valid URL'),
  ];
  
  const validateEnrollment = [
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('accessType').isIn(['temporary', 'lifetime']).withMessage('Invalid access type'),
    body('endAt').optional().isISO8601().withMessage('Invalid end date'),
  ];
  
  const validateChapterEnrollment = [
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('chapterId').notEmpty().withMessage('Chapter ID is required'),
    body('accessType').isIn(['temporary', 'lifetime']).withMessage('Invalid access type'),
    body('endAt').optional().isISO8601().withMessage('Invalid end date'),
  ];
  
  const validateLessonProgress = [
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('chapterId').notEmpty().withMessage('Chapter ID is required'),
    body('lessonId').notEmpty().withMessage('Lesson ID is required'),
  ];

module.exports = {
  validateStudent,
  validateUpdateStudent,
  validateEnrollment,
  validateChapterEnrollment,
  validateLessonProgress,
};


