const mongoose = require('mongoose');

// Chapter Progress Schema
const chapterProgressSchema = new mongoose.Schema({
  chapterId: {
    type: String,
    required: true
  },
  watchedLessons: [{
    type: String // LessonId[]
  }]
}, { _id: false });

// Enrolled Course Schema
const enrolledCourseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  enrolledAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  endAt: {
    type: Date
  },
  accessType: {
    type: String,
    enum: ['temporary', 'lifetime'],
    required: true
  },
  progress: [chapterProgressSchema]
}, { _id: false });

// Enrolled Chapter Schema
const enrolledChapterSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  chapterId: {
    type: String,
    required: true
  },
  enrolledAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  endAt: {
    type: Date
  },
  accessType: {
    type: String,
    enum: ['temporary', 'lifetime'],
    required: true
  },
  watchedLessons: [{
    type: String // LessonId[]
  }]
}, { _id: false });

// Bought Book Schema
const boughtBookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  purchasedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { _id: false });

// Main Student Schema
const studentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending'],
    required: true,
    default: 'pending'
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  educationLevel: {
    type: String,
    required: true,
    trim: true
  },
  enrolledCourses: [enrolledCourseSchema],
  enrolledChapters: [enrolledChapterSchema],
  boughtBooks: [boughtBookSchema],
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
studentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find student by userId
studentSchema.statics.findByUserId = function(userId) {
  return this.findOne({ userId });
};

// Instance method to check if student has access to a course
studentSchema.methods.hasAccessToCourse = function(courseId) {
  return this.enrolledCourses.some(course => 
    course.courseId === courseId && 
    (course.accessType === 'lifetime' || 
     (course.endAt && new Date() <= course.endAt))
  );
};

// Instance method to check if student has access to a chapter
studentSchema.methods.hasAccessToChapter = function(courseId, chapterId) {
  return this.enrolledChapters.some(chapter => 
    chapter.courseId === courseId && 
    chapter.chapterId === chapterId &&
    (chapter.accessType === 'lifetime' || 
     (chapter.endAt && new Date() <= chapter.endAt))
  );
};

// Instance method to get course progress
studentSchema.methods.getCourseProgress = function(courseId) {
  const course = this.enrolledCourses.find(c => c.courseId === courseId);
  return course ? course.progress : null;
};

// Instance method to add watched lesson - handles both enrolled courses and enrolled chapters
studentSchema.methods.addWatchedLesson = function(courseId, chapterId, lessonId) {
    let lessonAdded = false;
    
    // First, try to add to enrolled course progress
    const course = this.enrolledCourses.find(c => c.courseId === courseId);
    if (course) {
      let chapterProgress = course.progress.find(p => p.chapterId === chapterId);
      if (!chapterProgress) {
        chapterProgress = { chapterId, watchedLessons: [] };
        course.progress.push(chapterProgress);
      }
      if (!chapterProgress.watchedLessons.includes(lessonId)) {
        chapterProgress.watchedLessons.push(lessonId);
        lessonAdded = true;
      }
    }
    
    // Also try to add to enrolled chapter (if student enrolled in individual chapter)
    const enrolledChapter = this.enrolledChapters.find(c => 
      c.courseId === courseId && c.chapterId === chapterId
    );
    if (enrolledChapter) {
      if (!enrolledChapter.watchedLessons.includes(lessonId)) {
        enrolledChapter.watchedLessons.push(lessonId);
        lessonAdded = true;
      }
    }
    
    return lessonAdded;
  };

// Index for better query performance
studentSchema.index({ userId: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ 'enrolledCourses.courseId': 1 });
studentSchema.index({ 'enrolledChapters.courseId': 1, 'enrolledChapters.chapterId': 1 });

module.exports = mongoose.model('Student', studentSchema);