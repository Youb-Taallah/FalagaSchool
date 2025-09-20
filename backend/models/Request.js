const mongoose = require('mongoose');

// Base Request Schema
const baseRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  reviewedAt: {
    type: Date
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  note: {
    type: String,
    trim: true
  },
  reason: {
    type: String,
    trim: true
  },
  // Discriminator key for different request types
  type: {
    type: String,
    enum: ['course', 'chapter', 'book'],
    required: true
  }
}, { 
  discriminatorKey: 'type',
  timestamps: true 
});

// Course Request Schema
const courseRequestSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  accesType: {
    type: String,
    enum: ['temporary', 'lifetime'],
    required: true
  },
  accessUntil: {
    type: Date,
    validate: {
      validator: function(value) {
        // Only required if accesType is temporary
        return this.accesType !== 'temporary' || value !== undefined;
      },
      message: 'accessUntil is required for temporary access'
    }
  }
});

// Chapter Request Schema
const chapterRequestSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
    // Note: This references a subdocument in Course, so no ref
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  accesType: {
    type: String,
    enum: ['temporary', 'lifetime'],
    required: true
  },
  accessUntil: {
    type: Date,
    validate: {
      validator: function(value) {
        // Only required if accesType is temporary
        return this.accesType !== 'temporary' || value !== undefined;
      },
      message: 'accessUntil is required for temporary access'
    }
  }
});

// Book Request Schema
const bookRequestSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Assuming you have a Book model
    required: true
  }
});

// Create discriminators for each request type
baseRequestSchema.discriminator('course', courseRequestSchema);
baseRequestSchema.discriminator('chapter', chapterRequestSchema);
baseRequestSchema.discriminator('book', bookRequestSchema);

// Add statics on the schema
baseRequestSchema.statics.findByStudent = function(studentId) {
  return this.find({ studentId });
};

baseRequestSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Add methods on the schema
baseRequestSchema.methods.approve = function() {
  this.status = 'approved';
  this.reviewedAt = new Date();
  return this.save();
};

baseRequestSchema.methods.reject = function(reason) {
  this.status = 'rejected';
  this.reason = reason;
  this.reviewedAt = new Date();
  return this.save();
};

// Create the model
const Request = mongoose.model('Request', baseRequestSchema);


// Indexes for better query performance
baseRequestSchema.index({ studentId: 1 });
baseRequestSchema.index({ status: 1 });
baseRequestSchema.index({ submittedAt: -1 });
baseRequestSchema.index({ type: 1 });

module.exports = Request;