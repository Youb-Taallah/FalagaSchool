const mongoose = require('mongoose');

// Main Instructor Schema
const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  shortBio: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    trim: true
  },
  areasOfExpertise: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
    default: 'active'
  },
  coursesTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
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
instructorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find active instructors
instructorSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

// Static method to find instructors by expertise area
instructorSchema.statics.findByExpertise = function(expertise) {
  return this.find({ areasOfExpertise: { $in: [expertise] } });
};

// Instance method to add course to instructor
instructorSchema.methods.addCourse = function(courseId) {
  if (!this.coursesTaught.includes(courseId)) {
    this.coursesTaught.push(courseId);
  }
  return this.save();
};

// Instance method to remove course from instructor
instructorSchema.methods.removeCourse = function(courseId) {
  this.coursesTaught = this.coursesTaught.filter(id => id.toString() !== courseId);
  return this.save();
};

// Instance method to check if instructor is active
instructorSchema.methods.isActive = function() {
  return this.status === 'active';
};

// Instance method to get courses count
instructorSchema.methods.getCoursesCount = function() {
  return this.coursesTaught.length;
};

// Indexes for better query performance
instructorSchema.index({ name: 1 });
instructorSchema.index({ status: 1 });
instructorSchema.index({ areasOfExpertise: 1 });
instructorSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Instructor', instructorSchema);