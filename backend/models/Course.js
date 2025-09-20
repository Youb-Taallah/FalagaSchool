const mongoose = require('mongoose');

// Pricing Schema
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
    type: Number,
    required: true
  }
}, { _id: false });

// Resource Schema
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  }
});

// Video Lesson Schema
const videoLessonSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true
  },
  preview: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Section Schema
const sectionSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  lessons: [videoLessonSchema]
});

// Chapter Schema
const chapterSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  sections: [sectionSchema],
  ressources: [resourceSchema],
  pricing: pricingSchema,
  duration: {
    type: String,
    trim: true
  }
});

// Live Session Schema
const liveSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  ressources: [resourceSchema],
  note: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  }
});

// Main Course Schema
const courseSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    index: true
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    required: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  totalLessons: {
    type: Number,
    required: true,
    min: 0
  },
  chapters: [chapterSchema],
  tags: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  whatYouWillLearn: [{
    type: String,
    trim: true
  }],
  publishedAt: {
    type: Date,
    required: true
  },
  pricing: {
    type: pricingSchema,
    required: true
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  sale: {
    type: Boolean,
    default: false
  },
  bestseller: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  enrolledStudents: {
    type: Number,
    default: 0,
    min: 0
  },
  LiveSessions: [liveSessionSchema],
  arabicLanguage: {
    type: Boolean,
    default: false
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
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find courses by instructor
courseSchema.statics.findByInstructor = function(instructorId) {
  return this.find({ instructorId });
};

// Static method to find published courses
courseSchema.statics.findPublished = function() {
  return this.find({ isPublished: true });
};

// Instance method to get total course duration in minutes
courseSchema.methods.getTotalDurationInMinutes = function() {
  let totalMinutes = 0;
  this.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        const [minutes, seconds] = lesson.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });
  });
  return Math.round(totalMinutes);
};

// Instance method to get chapter by id
courseSchema.methods.getChapterById = function(chapterId) {
  return this.chapters.find(chapter => chapter._id.toString() === chapterId);
};

// Instance method to get lesson by ids
courseSchema.methods.getLessonById = function(chapterId, sectionId, lessonId) {
  const chapter = this.getChapterById(chapterId);
  if (!chapter) return null;
  
  const section = chapter.sections.find(section => section._id.toString() === sectionId);
  if (!section) return null;
  
  return section.lessons.find(lesson => lesson._id.toString() === lessonId);
};

// Instance method to check if course is on sale
courseSchema.methods.isOnSale = function() {
  return this.sale && this.discount && this.discount > 0;
};

// Instance method to get effective price for a duration
courseSchema.methods.getEffectivePrice = function(duration = 'lifetime') {
  let basePrice = this.pricing[duration] || this.pricing.lifetime;
  
  if (this.isOnSale()) {
    return basePrice * (1 - this.discount / 100);
  }
  
  return basePrice;
};

// Instance method to increment enrolled students
courseSchema.methods.incrementEnrolledStudents = function() {
  this.enrolledStudents = (this.enrolledStudents || 0) + 1;
  return this.save();
};

// Indexes for better query performance
courseSchema.index({ instructorId: 1 });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ bestseller: 1 });
courseSchema.index({ sale: 1 });
courseSchema.index({ publishedAt: -1 });
courseSchema.index({ enrolledStudents: -1 });

module.exports = mongoose.model('Course', courseSchema);