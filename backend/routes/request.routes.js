  const express = require('express');
  const RequestController = require('../controllers/request.controller');
  const { 
    requireAuth, 
    syncUserData, 
    requireRole, 
    requireActiveUser 
  } = require('../middleware/auth');

  const router = express.Router();

  // All routes require authentication
  router.use(requireAuth);
  router.use(syncUserData);
  router.use(requireActiveUser);

  // Student routes (authenticated users can access their own requests)
  router.get('/my-requests', RequestController.getMyRequests);
  router.post('/', RequestController.createRequest);

  // Get specific request (student can view their own, admin can view all)
  router.get('/:id', RequestController.getRequestById);

  // Update/Delete request (student can modify their own pending requests)
  router.put('/:id', RequestController.updateRequest);
  router.delete('/:id', RequestController.deleteRequest);

  // Admin only routes
  router.use(requireRole(['admin']));

  // Get all requests (admin only)
  router.get('/', RequestController.getAllRequests);

  // Get requests by student (admin only)
  router.get('/student/:studentId', RequestController.getRequestsByStudent);

  // Get requests by status (admin only)
  router.get('/status/:status', RequestController.getRequestsByStatus);

  // Approve/Reject requests (admin only)
  router.patch('/:id/approve', RequestController.approveRequest);
  router.patch('/:id/reject', RequestController.rejectRequest);

  module.exports = router;