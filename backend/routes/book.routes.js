const express = require('express');
const BookController = require('../controllers/book.controller');
const { 
  requireAuth, 
  syncUserData, 
  requireRole, 
  requireActiveUser 
} = require('../middleware/auth');

const router = express.Router();

// Middleware to conditionally apply auth (for getBookById)
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
router.get('/published', BookController.getPublishedBooks);
router.get('/search', BookController.searchBooks);
router.get('/instructor/:instructorId', BookController.getBooksByInstructor);
router.get('/category/:category', BookController.getBooksByCategory);
router.get('/sale', BookController.getBooksOnSale);

// Get book by ID (conditional auth for unpublished books)
router.get('/:id', conditionalAuth, BookController.getBookById);

// Protected routes (require auth)
router.use(requireAuth);
router.use(syncUserData);
router.use(requireActiveUser);

// Get all books (admin/instructor only)
router.get('/', requireRole(['admin']), BookController.getAllBooks);

// Create book (instructor/admin only)
router.post('/', requireRole(['instructor', 'admin']), BookController.createBook);

// Update book (instructor/admin only - ownership checked in controller)
router.put('/:id', requireRole(['instructor', 'admin']), BookController.updateBook);

// Delete book (instructor/admin only - ownership checked in controller)
router.delete('/:id', requireRole(['instructor', 'admin']), BookController.deleteBook);

// Publish/Unpublish book (instructor/admin only - ownership checked in controller)
router.patch('/:id/publish', requireRole(['instructor', 'admin']), BookController.publishBook);
router.patch('/:id/unpublish', requireRole(['instructor', 'admin']), BookController.unpublishBook);

// Toggle publish status (instructor/admin only - ownership checked in controller)
router.patch('/:id/toggle-publish', requireRole(['instructor', 'admin']), BookController.togglePublishStatus);

module.exports = router;