const mongoose = require('mongoose');

// Pricing Schema (reusing your existing pricing schema)
const pricingSchema = new mongoose.Schema({
  1: {
    type: Number
  },
  3: {
    type: Number
  },
  10: {
    type: Number
  },
  lifetime: {
    type: Number
  }
}, { _id: false });

// Offer Schema
const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  pricing: {
    type: pricingSchema,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  bestSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
offerSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find active offers
offerSchema.statics.findActive = function() {
  const now = new Date();
  return this.find({ 
    isActive: true,
    $or: [
      { startDate: { $exists: false }, endDate: { $exists: false } },
      { startDate: { $lte: now }, endDate: { $gte: now } },
      { startDate: { $exists: false }, endDate: { $gte: now } },
      { startDate: { $lte: now }, endDate: { $exists: false } }
    ]
  });
};

// Indexes for better query performance
offerSchema.index({ isActive: 1 });
offerSchema.index({ bestSeller: 1 });
offerSchema.index({ startDate: 1 });
offerSchema.index({ endDate: 1 });
offerSchema.index({ courses: 1 });

module.exports = mongoose.model('Offer', offerSchema);