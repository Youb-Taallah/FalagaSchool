const Offer = require('../models/Offer');

class OfferController {
  static async getAllOffers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || '';
      const isActive = req.query.isActive;
      const bestSeller = req.query.bestSeller;
      const tag = req.query.tag;
      
      // Build search query
      let query = {};
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (isActive !== undefined) {
        query.isActive = isActive === 'true';
      }
      
      if (bestSeller !== undefined) {
        query.bestSeller = bestSeller === 'true';
      }
      
      if (tag) {
        query.tags = { $in: [tag] };
      }
      
      const offers = await Offer.find(query)
        .populate('courses', 'title description image level')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Offer.countDocuments(query);
      
      res.json({
        success: true,
        offers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get offers error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch offers'
      });
    }
  }
  
  static async getOfferById(req, res) {
    try {
      const { id } = req.params;
      
      const offer = await Offer.findById(id)
        .populate('courses', 'title description image level duration');
      
      if (!offer) {
        return res.status(404).json({
          success: false,
          error: 'Offer not found'
        });
      }
      
      res.json({
        success: true,
        offer
      });
    } catch (error) {
      console.error('Get offer error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch offer'
      });
    }
  }
  
  static async createOffer(req, res) {
    try {
      const offer = new Offer(req.body);
      await offer.save();
      
      res.status(201).json({
        success: true,
        message: 'Offer created successfully',
        offer
      });
    } catch (error) {
      console.error('Create offer error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create offer'
      });
    }
  }
  
  static async updateOffer(req, res) {
    try {
      const { id } = req.params;
      
      const offer = await Offer.findById(id);
      
      if (!offer) {
        return res.status(404).json({
          success: false,
          error: 'Offer not found'
        });
      }
      
      Object.assign(offer, req.body);
      await offer.save();
      
      res.json({
        success: true,
        message: 'Offer updated successfully',
        offer
      });
    } catch (error) {
      console.error('Update offer error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update offer'
      });
    }
  }
  
  static async deleteOffer(req, res) {
    try {
      const { id } = req.params;
      
      const offer = await Offer.findById(id);
      
      if (!offer) {
        return res.status(404).json({
          success: false,
          error: 'Offer not found'
        });
      }
      
      await Offer.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'Offer deleted successfully'
      });
    } catch (error) {
      console.error('Delete offer error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete offer'
      });
    }
  }
  
  static async activateOffer(req, res) {
    try {
      const { id } = req.params;
      
      const offer = await Offer.findById(id);
      
      if (!offer) {
        return res.status(404).json({
          success: false,
          error: 'Offer not found'
        });
      }
      
      offer.isActive = true;
      await offer.save();
      
      res.json({
        success: true,
        message: 'Offer activated successfully',
        offer
      });
    } catch (error) {
      console.error('Activate offer error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to activate offer'
      });
    }
  }
  
  static async deactivateOffer(req, res) {
    try {
      const { id } = req.params;
      
      const offer = await Offer.findById(id);
      
      if (!offer) {
        return res.status(404).json({
          success: false,
          error: 'Offer not found'
        });
      }
      
      offer.isActive = false;
      await offer.save();
      
      res.json({
        success: true,
        message: 'Offer deactivated successfully',
        offer
      });
    } catch (error) {
      console.error('Deactivate offer error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to deactivate offer'
      });
    }
  }
  
  static async getActiveOffers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const offers = await Offer.findActive()
        .populate('courses', 'title description image level')
        .skip(skip)
        .limit(limit)
        .sort({ bestSeller: -1, createdAt: -1 });
      
      const total = await Offer.countDocuments({ isActive: true });
      
      res.json({
        success: true,
        offers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get active offers error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch active offers'
      });
    }
  }
  
  static async getBestSellerOffers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const offers = await Offer.find({ bestSeller: true, isActive: true })
        .populate('courses', 'title description image level')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Offer.countDocuments({ bestSeller: true, isActive: true });
      
      res.json({
        success: true,
        offers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get bestseller offers error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch bestseller offers'
      });
    }
  }
  
  static async searchOffers(req, res) {
    try {
      const { query, tag, limit = 10 } = req.query;
      
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
        isActive: true
      };
      
      if (tag) {
        searchQuery.tags = { $in: [tag] };
      }
      
      const offers = await Offer.find(searchQuery)
        .populate('courses', 'title description image level')
        .limit(parseInt(limit))
        .sort({ bestSeller: -1, createdAt: -1 });
      
      res.json({
        success: true,
        offers,
        count: offers.length
      });
    } catch (error) {
      console.error('Search offers error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search offers'
      });
    }
  }
}

module.exports = OfferController;