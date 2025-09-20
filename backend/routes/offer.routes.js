const express = require('express');
const OfferController = require('../controllers/offer.controller');
const { 
  requireAuth, 
  syncUserData, 
  requireRole, 
  requireActiveUser 
} = require('../middleware/auth');

const router = express.Router();

// Public routes (no auth required)
router.get('/active', OfferController.getActiveOffers);
router.get('/bestseller', OfferController.getBestSellerOffers);
router.get('/search', OfferController.searchOffers);
router.get('/:id', OfferController.getOfferById);

// Protected routes (require auth)
router.use(requireAuth);
router.use(syncUserData);
router.use(requireActiveUser);

// Admin only routes
router.use(requireRole(['admin']));

// Get all offers (admin only)
router.get('/', OfferController.getAllOffers);

// Create offer (admin only)
router.post('/', OfferController.createOffer);

// Update offer (admin only)
router.put('/:id', OfferController.updateOffer);

// Delete offer (admin only)
router.delete('/:id', OfferController.deleteOffer);

// Activate/Deactivate offer (admin only)
router.patch('/:id/activate', OfferController.activateOffer);
router.patch('/:id/deactivate', OfferController.deactivateOffer);

module.exports = router;