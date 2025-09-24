import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  ChevronDown,
  ChevronRight,
  Eye,
  Star,
  Tag,
  Globe,
  Calendar,
  DollarSign,
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Course, Chapter, Section, VideoLesson } from '../../../types/course';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onEditCourse: (course: Course) => void;
  onCreateChapter: (courseId: string) => void;
  onEditChapter: (courseId: string, chapter: Chapter) => void;
  onDeleteChapter: (courseId: string, chapterId: string) => void;
  onCreateSection: (courseId: string, chapterId: string) => void;
  onEditSection: (courseId: string, chapterId: string, section: Section) => void;
  onDeleteSection: (courseId: string, chapterId: string, sectionId: string) => void;
  onCreateLesson: (courseId: string, chapterId: string, sectionId: string) => void;
  onEditLesson: (courseId: string, chapterId: string, sectionId: string, lesson: VideoLesson) => void;
  onDeleteLesson: (courseId: string, chapterId: string, sectionId: string, lessonId: string) => void;
  onPublishCourse: (courseId: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  onBack,
  onEditCourse,
  onCreateChapter,
  onEditChapter,
  onDeleteChapter,
  onCreateSection,
  onEditSection,
  onDeleteSection,
  onCreateLesson,
  onEditLesson,
  onDeleteLesson,
  onPublishCourse
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const calculateChapterDuration = (chapter: Chapter): string => {
    let totalMinutes = 0;
    chapter.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        if (lesson.duration) {
          const [minutes, seconds] = lesson.duration.split(':').map(Number);
          totalMinutes += minutes + (seconds / 60);
        }
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTotalStats = () => {
    if (!course.chapters) return { chapters: 0, sections: 0, lessons: 0, previewLessons: 0 };
    
    const chapters = course.chapters.length;
    const sections = course.chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
    const lessons = course.chapters.reduce((sum, chapter) => 
      sum + chapter.sections.reduce((sectionSum, section) => sectionSum + section.lessons.length, 0), 0
    );
    const previewLessons = course.chapters.reduce((sum, chapter) => 
      sum + chapter.sections.reduce((sectionSum, section) => 
        sectionSum + section.lessons.filter(lesson => lesson.preview).length, 0), 0
    );
    
    return { chapters, sections, lessons, previewLessons };
  };

  const stats = getTotalStats();
  const canPublish = stats.chapters > 0 && stats.lessons > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => onEditCourse(course)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Course
            </button>
            {!course.isPublished && canPublish && (
              <button
                onClick={() => onPublishCourse(course._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Publish Course
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <div className="flex gap-2">
                {!course.isPublished && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-100 text-sm font-medium rounded-full border border-yellow-400/30">
                    Draft
                  </span>
                )}
                {course.bestseller && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-100 text-sm font-medium rounded-full border border-yellow-400/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Bestseller
                  </span>
                )}
                {course.sale && (
                  <span className="px-3 py-1 bg-red-500/20 text-red-100 text-sm font-medium rounded-full border border-red-400/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Sale
                  </span>
                )}
                {course.arabicLanguage && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-100 text-sm font-medium rounded-full border border-blue-400/30 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Arabic
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-primary-100 text-lg mb-6 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-primary-100">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {course.instructorId}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {course.level}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(course.publishedAt).toLocaleDateString()}
              </span>
              {course.enrolledStudents && (
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {course.enrolledStudents.toLocaleString()} students
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <BookOpen className="w-5 h-5 text-primary-100 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{course.totalLessons}</div>
                  <div className="text-xs text-primary-200">Lessons</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Clock className="w-5 h-5 text-primary-100 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{course.duration}</div>
                  <div className="text-xs text-primary-200">Duration</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Users className="w-5 h-5 text-primary-100 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {course.enrolledStudents ? course.enrolledStudents.toLocaleString() : '0'}
                  </div>
                  <div className="text-xs text-primary-200">Students</div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold mb-1">
                  {course.pricing.lifetime} dt
                  {course.sale && course.originalPrice && (
                    <span className="text-lg line-through text-primary-200 ml-2">
                      {course.originalPrice} dt
                    </span>
                  )}
                </div>
                {course.sale && course.discount && (
                  <div className="text-green-300 font-medium">
                    {course.discount}% OFF
                  </div>
                )}
              </div>
              
              {course.pricing[1] && (
                <div className="text-center text-primary-100 text-sm mb-4">
                  Or {course.pricing[1]}dt/month
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-primary-200">Chapters:</span>
                  <span className="font-medium">{stats.chapters}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-200">Lessons:</span>
                  <span className="font-medium">{stats.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-200">Preview Lessons:</span>
                  <span className="font-medium">{stats.previewLessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-200">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Status */}
      {!course.isPublished && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Course Not Published</h3>
              <p className="text-yellow-700 mb-4">
                This course is currently in draft mode and not visible to students. 
                {!canPublish && " Add at least one chapter with lessons to publish."}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {stats.chapters > 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="text-sm text-yellow-700">
                    {stats.chapters > 0 ? 'Has chapters' : 'Needs chapters'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {stats.lessons > 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="text-sm text-yellow-700">
                    {stats.lessons > 0 ? 'Has lessons' : 'Needs lessons'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
            <p className="text-gray-600 mt-1">
              {stats.chapters} chapters • {stats.sections} sections • {stats.lessons} lessons
            </p>
          </div>
          <button
            onClick={() => onCreateChapter(course._id)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Chapter
          </button>
        </div>

        {!course.chapters || course.chapters.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No chapters yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start building your course by adding your first chapter. Organize your content into logical sections with engaging video lessons.
            </p>
            <button
              onClick={() => onCreateChapter(course._id)}
              className="btn-primary"
            >
              Create Your First Chapter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {course.chapters.map((chapter, chapterIndex) => (
              <div key={chapter._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <button
                      onClick={() => toggleChapter(chapter._id)}
                      className="flex items-start gap-4 text-left flex-1 group"
                    >
                      <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                        {expandedChapters.has(chapter._id) ? (
                          <ChevronDown className="w-5 h-5 text-primary-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-primary-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Chapter {chapterIndex + 1}: {chapter.title}
                          </h3>
                          {chapter.pricing && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              Paid
                            </span>
                          )}
                        </div>
                        {chapter.description && (
                          <p className="text-gray-600 mb-3 leading-relaxed">{chapter.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {chapter.sections.length} sections
                          </span>
                          <span className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            {chapter.sections.reduce((sum, section) => sum + section.lessons.length, 0)} lessons
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {calculateChapterDuration(chapter)}
                          </span>
                          {chapter.ressources && chapter.ressources.length > 0 && (
                            <span className="flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              {chapter.ressources.length} resources
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => onEditChapter(course._id, chapter)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="Edit chapter"
                      >
                        <Edit className="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
                      </button>
                      <button
                        onClick={() => onDeleteChapter(course._id, chapter._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  {expandedChapters.has(chapter._id) && (
                    <div className="pl-12 space-y-4">
                      {/* Add Section Button */}
                      <button
                        onClick={() => onCreateSection(course._id, chapter._id)}
                        className="w-full text-left p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 flex items-center justify-center gap-3 group"
                      >
                        <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                          <Plus className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-primary-600 font-medium">Add Section</span>
                      </button>

                      {/* Sections */}
                      {chapter.sections.map((section, sectionIndex) => (
                        <div key={section._id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => toggleSection(section._id)}
                                className="flex items-center gap-3 text-left flex-1 group"
                              >
                                <div className="p-1.5 bg-white rounded-lg group-hover:bg-gray-50 transition-colors shadow-sm">
                                  {expandedSections.has(section._id) ? (
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    Section {sectionIndex + 1}: {section.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {section.lessons.length} lessons • {section.lessons.filter(l => l.preview).length} preview
                                  </p>
                                </div>
                              </button>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onEditSection(course._id, chapter._id, section)}
                                  className="p-2 hover:bg-white rounded-lg transition-colors group"
                                  title="Edit section"
                                >
                                  <Edit className="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
                                </button>
                                <button
                                  onClick={() => onDeleteSection(course._id, chapter._id, section._id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                  title="Delete section"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {expandedSections.has(section._id) && (
                            <div className="p-4 space-y-3">
                              {/* Add Lesson Button */}
                              <button
                                onClick={() => onCreateLesson(course._id, chapter._id, section._id)}
                                className="w-full text-left p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 flex items-center justify-center gap-2 group"
                              >
                                <div className="p-1.5 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                                  <Plus className="w-3 h-3 text-primary-600" />
                                </div>
                                <span className="text-primary-600 font-medium text-sm">Add Video Lesson</span>
                              </button>

                              {/* Lessons */}
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson._id}
                                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 group"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm">
                                      <Play className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-3 mb-1">
                                        <h5 className="font-medium text-gray-900">
                                          {lessonIndex + 1}. {lesson.title}
                                        </h5>
                                        {lesson.preview && (
                                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            Preview
                                          </span>
                                        )}
                                      </div>
                                      {lesson.description && (
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
                                      )}
                                      <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1 text-sm text-gray-500">
                                          <Clock className="w-3 h-3" />
                                          {lesson.duration}
                                        </span>
                                        {lesson.videoUrl && (
                                          <span className="text-xs text-green-600 font-medium">
                                            Video Ready
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => onEditLesson(course._id, chapter._id, section._id, lesson)}
                                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                      title="Edit lesson"
                                    >
                                      <Edit className="w-4 h-4 text-gray-600 hover:text-primary-600" />
                                    </button>
                                    <button
                                      onClick={() => onDeleteLesson(course._id, chapter._id, section._id, lesson._id)}
                                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Delete lesson"
                                    >
                                      <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};