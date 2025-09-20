const mongoose = require('mongoose');

// Main Book Schema
const bookSchema = new mongoose.Schema({
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
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
    index: true
  },
  cover: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  pages: {
    type: Number,
    min: 1
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  categories: [{
    type: String,
    trim: true
  }],
  publishDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  isPublished: {
    type: Boolean,
    required: true,
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
bookSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find books by instructor
bookSchema.statics.findByInstructor = function(instructorId) {
  return this.find({ instructorId });
};

// Static method to find published books
bookSchema.statics.findPublished = function() {
  return this.find({ isPublished: true });
};

// Static method to find books by category
bookSchema.statics.findByCategory = function(category) {
  return this.find({ categories: { $in: [category] } });
};

// Instance method to check if book is on sale
bookSchema.methods.isOnSale = function() {
  return this.discount && this.discount > 0 && this.originalPrice;
};

// Instance method to get effective price
bookSchema.methods.getEffectivePrice = function() {
  if (this.isOnSale()) {
    return this.originalPrice * (1 - this.discount / 100);
  }
  return this.price;
};

// Instance method to get discount amount
bookSchema.methods.getDiscountAmount = function() {
  if (this.isOnSale()) {
    return this.originalPrice - this.getEffectivePrice();
  }
  return 0;
};

// Instance method to toggle publish status
bookSchema.methods.togglePublishStatus = function() {
  this.isPublished = !this.isPublished;
  return this.save();
};

// Indexes for better query performance
bookSchema.index({ instructorId: 1 });
bookSchema.index({ isPublished: 1 });
bookSchema.index({ categories: 1 });
bookSchema.index({ publishDate: -1 });
bookSchema.index({ rating: -1 });
bookSchema.index({ price: 1 });
bookSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);