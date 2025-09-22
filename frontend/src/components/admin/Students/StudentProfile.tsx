/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Student } from '../../../types/student';
import { Avatar } from '../../ui/avatar';
import { getInitials } from '../../utils';
import { 
  ArrowLeft,
  Edit, 
  BookOpen,
  Play,
  Plus,
  UserCheck,
  UserX,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { Course } from '../../../types/course';
import { Book } from '../../../types/book';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
  onUpdateStudent: (updatedStudent: Student) => void;
  onSuspendStudent: (studentId: string) => void;
  onActivateStudent: (studentId: string) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ 
  student, 
  onBack, 
  onUpdateStudent,
  onSuspendStudent,
  onActivateStudent
}) => {

const mockCourses: Course[] = [
  {
    _id: 'course_1',
    title: 'Advanced JavaScript Development',
    description: 'Master modern JavaScript concepts and frameworks',
    instructorId: 'instructor_1',
    thumbnail: 'https://example.com/thumbnail1.jpg',
    level: 'Intermediate',
    duration: '8h 30m',
    totalLessons: 45,
    chapters: [
      {
        _id: 'ch_1_1',
        position: 1,
        title: 'ES6+ Features',
        description: 'Learn modern JavaScript features',
        sections: [
          {
            _id: 'sec_1_1_1',
            position: 1,
            title: 'Modern Syntax',
            lessons: [
              { 
                _id: 'lesson_1_1_1', 
                position: 1,
                title: 'Arrow Functions', 
                duration: '15:30',
                videoUrl: 'https://example.com/video1',
                preview: false
              },
              { 
                _id: 'lesson_1_1_2', 
                position: 2,
                title: 'Destructuring', 
                duration: '20:15',
                videoUrl: 'https://example.com/video2',
                preview: true
              },
              { 
                _id: 'lesson_1_1_3', 
                position: 3,
                title: 'Promises & Async/Await', 
                duration: '25:45',
                videoUrl: 'https://example.com/video3',
                preview: false
              }
            ]
          }
        ],
        pricing: {
          1: 29.99,
          3: 79.99,
          10: 199.99,
          lifetime: 299.99
        }
      },
      {
        _id: 'ch_1_2',
        position: 2,
        title: 'React Fundamentals',
        description: 'Introduction to React library',
        sections: [
          {
            _id: 'sec_1_2_1',
            position: 1,
            title: 'Core Concepts',
            lessons: [
              { 
                _id: 'lesson_1_2_1', 
                position: 1,
                title: 'Components', 
                duration: '30:00',
                videoUrl: 'https://example.com/video4',
                preview: false
              },
              { 
                _id: 'lesson_1_2_2', 
                position: 2,
                title: 'State Management', 
                duration: '35:20',
                videoUrl: 'https://example.com/video5',
                preview: false
              }
            ]
          }
        ],
        pricing: {
          lifetime: 199.99
        }
      }
    ],
    tags: ['JavaScript', 'React', 'Frontend'],
    requirements: ['Basic HTML/CSS knowledge', 'Programming fundamentals'],
    whatYouWillLearn: ['Modern JavaScript features', 'React development', 'Component architecture'],
    publishedAt: new Date('2024-01-15'),
    pricing: {
      1: 49.99,
      3: 129.99,
      10: 299.99,
      lifetime: 399.99
    },
    enrolledStudents: 1250,
    arabicLanguage: false,
    isPublished: true
  },
  {
    _id: 'course_2',
    title: 'Data Science with Python',
    description: 'Learn data analysis and machine learning with Python',
    instructorId: 'instructor_2',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    level: 'Beginner',
    duration: '12h 45m',
    totalLessons: 67,
    chapters: [
      {
        _id: 'ch_2_1',
        position: 1,
        title: 'Python Basics',
        description: 'Foundation concepts in Python',
        sections: [
          {
            _id: 'sec_2_1_1',
            position: 1,
            title: 'Getting Started',
            lessons: [
              { 
                _id: 'lesson_2_1_1', 
                position: 1,
                title: 'Variables and Data Types', 
                duration: '20:30',
                videoUrl: 'https://example.com/video6',
                preview: true
              },
              { 
                _id: 'lesson_2_1_2', 
                position: 2,
                title: 'Control Structures', 
                duration: '25:15',
                preview: false
              },
              { 
                _id: 'lesson_2_1_3', 
                position: 3,
                title: 'Functions', 
                duration: '30:45',
                preview: false
              }
            ]
          }
        ],
        pricing: {
          1: 19.99,
          lifetime: 149.99
        }
      }
    ],
    tags: ['Python', 'Data Science', 'Machine Learning'],
    requirements: ['Basic computer skills'],
    whatYouWillLearn: ['Python programming', 'Data analysis', 'Machine learning basics'],
    publishedAt: new Date('2024-02-01'),
    pricing: {
      1: 39.99,
      3: 99.99,
      lifetime: 249.99
    },
    enrolledStudents: 890,
    arabicLanguage: false,
    isPublished: true
  }
];

const mockBooks: Book[] = [
  {
    _id: 'book_1',
    title: 'JavaScript: The Definitive Guide',
    description: 'Comprehensive guide to JavaScript programming',
    instructorId: 'instructor_1',
    cover: 'https://example.com/book1-cover.jpg',
    url: 'https://example.com/book1.pdf',
    pages: 687,
    rating: 4.5,
    categories: ['Programming', 'JavaScript', 'Web Development'],
    publishDate: new Date('2023-05-15'),
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    isPublished: true
  },
  {
    _id: 'book_2',
    title: 'Python for Data Analysis',
    description: 'Essential tools for working with data in Python',
    instructorId: 'instructor_2',
    cover: 'https://example.com/book2-cover.jpg',
    url: 'https://example.com/book2.pdf',
    pages: 544,
    rating: 4.7,
    categories: ['Data Science', 'Python', 'Analytics'],
    publishDate: new Date('2023-08-20'),
    price: 49.99,
    isPublished: true
  },
  {
    _id: 'book_3',
    title: 'Clean Code',
    description: 'A handbook of agile software craftsmanship',
    instructorId: 'instructor_3',
    cover: 'https://example.com/book3-cover.jpg',
    url: 'https://example.com/book3.pdf',
    pages: 464,
    rating: 4.8,
    categories: ['Software Engineering', 'Best Practices'],
    publishDate: new Date('2023-03-10'),
    price: 44.99,
    originalPrice: 54.99,
    discount: 18,
    isPublished: true
  }
];

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'chapters' | 'books'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student>({ ...student });
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollType, setEnrollType] = useState<'course' | 'chapter' | 'book'>('course');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'suspend' | 'activate' | null>(null);

  // Update editedStudent when student prop changes
  React.useEffect(() => {
    setEditedStudent({ ...student });
  }, [student]);

  const handleSave = () => {
    onUpdateStudent(editedStudent);
    setIsEditing(false);
  };

  const handleSuspendClick = () => {
    setConfirmAction('suspend');
    setShowConfirmModal(true);
  };

  const handleActivateClick = () => {
    setConfirmAction('activate');
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction === 'suspend') {
      onSuspendStudent(student._id);
    } else if (confirmAction === 'activate') {
      onActivateStudent(student._id);
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCourseProgress = (courseId: string) => {
    const enrollment = student.enrolledCourses?.find(c => c.courseId === courseId);
    const course = mockCourses.find(c => c._id === courseId);
    
    if (!enrollment || !course) return { watched: 0, total: 0, percentage: 0 };
    
    const totalLessons = course.chapters?.reduce((acc, chapter) => {
      return acc + chapter.sections.reduce((sectionAcc, section) => sectionAcc + section.lessons.length, 0);
    }, 0) ?? 0;
    
    const watchedLessons = enrollment.progress?.reduce((acc, ch) => acc + ch.watchedLessons.length, 0) || 0;
    const percentage = totalLessons > 0 ? Math.round((watchedLessons / totalLessons) * 100) : 0;
    
    return { watched: watchedLessons, total: totalLessons, percentage };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Actions Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="flex flex-wrap gap-3">
          {student.status === 'active' ? (
            <button
              onClick={handleSuspendClick}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <UserX className="w-4 h-4" />
              <span>Suspend Student</span>
            </button>
          ) : (
            <button
              onClick={handleActivateClick}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Activate Student</span>
            </button>
          )}
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-md">
            <Shield className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Current Status:</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student.status)}`}>
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.name || ''}
                  onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{student.name || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.phone || ''}
                  onChange={(e) => setEditedStudent({ ...editedStudent, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{student.phone || 'Not provided'}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.city || ''}
                  onChange={(e) => setEditedStudent({ ...editedStudent, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{student.city || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
              {isEditing ? (
                <select
                  value={editedStudent.educationLevel || ''}
                  onChange={(e) => setEditedStudent({ ...editedStudent, educationLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select level</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              ) : (
                <p className="text-gray-900">{student.educationLevel || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {student.enrolledCourses?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Play className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {student.enrolledChapters?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Individual Chapters</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {student.boughtBooks?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Purchased Books</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Enrolled Courses</h3>
        <button
          onClick={() => {
            setEnrollType('course');
            setShowEnrollModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll in Course</span>
        </button>
      </div>

      <div className="space-y-4">
        {student.enrolledCourses?.map((enrollment) => {
          const course = mockCourses.find(c => c._id === enrollment.courseId);
          const progress = getCourseProgress(enrollment.courseId);
          
          if (!course) return null;

          return (
            <div key={enrollment.courseId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Level: {course.level}</span>
                    <span>Duration: {course.duration}</span>
                    <span>Lessons: {course.totalLessons}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    enrollment.accessType === 'lifetime' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {enrollment.accessType}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress: {progress.watched}/{progress.total} lessons</span>
                  <span>{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                {enrollment.endAt && (
                  <span>Expires: {new Date(enrollment.endAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          );
        })}
        
        {(!student.enrolledCourses || student.enrolledCourses.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No enrolled courses</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderChapters = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Individual Chapters</h3>
        <button
          onClick={() => {
            setEnrollType('chapter');
            setShowEnrollModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll in Chapter</span>
        </button>
      </div>

      <div className="space-y-4">
        {student.enrolledChapters?.map((enrollment) => {
          const course = mockCourses.find(c => c._id === enrollment.courseId);
          const chapter = course?.chapters?.find(ch => ch._id === enrollment.chapterId) ?? null;
          
          if (!course || !chapter) return null;

          const totalLessons = chapter.sections.reduce((acc, section) => acc + section.lessons.length, 0);
          const watchedLessons = enrollment.watchedLessons?.length || 0;
          const percentage = Math.round((watchedLessons / totalLessons) * 100);

          return (
            <div key={`${enrollment.courseId}-${enrollment.chapterId}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{chapter.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">From: {course.title}</p>
                  {chapter.description && (
                    <p className="text-gray-500 text-sm mt-1">{chapter.description}</p>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    <span>Sections: {chapter.sections.length}</span>
                    {chapter.duration && <span className="ml-4">Duration: {chapter.duration}</span>}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  enrollment.accessType === 'lifetime' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {enrollment.accessType}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress: {watchedLessons}/{totalLessons} lessons</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                {enrollment.endAt && (
                  <span>Expires: {new Date(enrollment.endAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          );
        })}
        
        {(!student.enrolledChapters || student.enrolledChapters.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <Play className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No enrolled chapters</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Purchased Books</h3>
        <button
          onClick={() => {
            setEnrollType('book');
            setShowEnrollModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Purchase Book</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {student.boughtBooks?.map((purchase) => {
          const book = mockBooks.find(b => b._id === purchase.bookId);
          
          if (!book) return null;

          return (
            <div key={purchase.bookId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{book.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {book.categories.slice(0, 3).map((category, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-semibold text-primary-600">${book.price}</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">${book.originalPrice}</span>
                      )}
                    </div>
                    {book.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">{book.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}
                    </span>
                    {book.pages && (
                      <span className="text-sm text-gray-500">{book.pages} pages</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {(!student.boughtBooks || student.boughtBooks.length === 0) && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No purchased books</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <Avatar 
            src={student?.avatar} 
            initials={student?.name ? getInitials(student.name) : "??"}
            className="w-16 h-16 text-lg"
          />
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {student.name || 'Unnamed Student'}
            </h1>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 border ${getStatusColor(student.status)}`}>
              {student.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'courses', label: 'Courses' },
            { id: 'chapters', label: 'Chapters' },
            { id: 'books', label: 'Books' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'courses' && renderCourses()}
      {activeTab === 'chapters' && renderChapters()}
      {activeTab === 'books' && renderBooks()}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className={`w-6 h-6 mr-3 ${
                confirmAction === 'suspend' ? 'text-red-500' : 'text-green-500'
              }`} />
              <h3 className="text-lg font-semibold text-gray-900">
                {confirmAction === 'suspend' ? 'Suspend Student' : 'Activate Student'}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              {confirmAction === 'suspend' 
                ? `Are you sure you want to suspend ${student.name}? They will lose access to all courses and content.`
                : `Are you sure you want to activate ${student.name}? They will regain access to their enrolled content.`
              }
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                  confirmAction === 'suspend' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {confirmAction === 'suspend' ? 'Suspend' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {enrollType === 'course' ? 'Enroll in Course' : 
               enrollType === 'chapter' ? 'Enroll in Chapter' : 'Purchase Book'}
            </h3>
            
            <div className="space-y-4">
              {enrollType === 'course' && mockCourses.map(course => (
                <button
                  key={course._id}
                  className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Add enrollment logic here
                    alert(`Would enroll in: ${course.title}`);
                    setShowEnrollModal(false);
                  }}
                >
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{course.level} • {course.duration}</span>
                    <span className="font-semibold text-primary-600">${course.pricing.lifetime}</span>
                  </div>
                </button>
              ))}

              {enrollType === 'chapter' && mockCourses.map(course => 
                course.chapters?.map(chapter => (
                  <button
                    key={chapter._id}
                    className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      // Add chapter enrollment logic here
                      alert(`Would enroll in chapter: ${chapter.title} from ${course.title}`);
                      setShowEnrollModal(false);
                    }}
                  >
                    <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                    <p className="text-sm text-gray-600">From: {course.title}</p>
                    {chapter.description && (
                      <p className="text-xs text-gray-500 mt-1">{chapter.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{chapter.sections.length} sections</span>
                      <span className="font-semibold text-primary-600">
                        ${chapter.pricing?.lifetime || 'N/A'}
                      </span>
                    </div>
                  </button>
                ))
              )}
              
              {enrollType === 'book' && mockBooks.map(book => (
                <button
                  key={book._id}
                  className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Add purchase logic here
                    alert(`Would purchase: ${book.title}`);
                    setShowEnrollModal(false);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{book.title}</h4>
                      <p className="text-sm text-gray-600">{book.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {book.categories.slice(0, 2).map((category, index) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <span className="font-semibold text-primary-600">${book.price}</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <div className="text-xs text-gray-500 line-through">${book.originalPrice}</div>
                      )}
                      {book.rating && (
                        <div className="text-xs text-gray-500">★ {book.rating}</div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEnrollModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};