import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Course, Chapter } from '../../types/course';
import { Book } from '../../types/book';
import { EnrolledCourse, EnrolledChapter, ChapterProgress } from '../../types/student';
import { cn } from '../utils';
import { Play, Eye } from 'lucide-react';
import { useCoursesStore } from '../../stores/public/coursesStore';

type ViewMode = 'grid' | 'list';


const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};


// Calculate the percentage of completed lessons
const calculateProgress = (course: Course, progress?: ChapterProgress[]): number => {
    if (!progress || progress.length === 0) return 0;
    
    // Count total lessons in the course
    let totalLessons = 0;
    let watchedLessonsCount = 0;
    
    course.chapters?.forEach(chapter => {
      chapter.sections?.forEach(section => {
        totalLessons += section.lessons.length;
        
        // Find progress for this chapter
        const chapterProgress = progress.find(p => p.chapterId === chapter.id);
        if (chapterProgress) {
          section.lessons.forEach(lesson => {
            if (chapterProgress.watchedLessons.includes(lesson.id)) {
              watchedLessonsCount++;
            }
          });
        }
      });
    });
    
    return totalLessons > 0 ? (watchedLessonsCount / totalLessons) * 100 : 0;
};

// Course Card Component
interface CourseCardProps {
  course: Course;
  enrollment: EnrolledCourse;
  viewMode: ViewMode;
}

// Course Card Component
interface CourseCardProps {
    course: Course;
    enrollment: EnrolledCourse;
    viewMode: ViewMode;
    onContinue?: (courseId: string) => void;
  }
  
export const CourseCard = ({ course, enrollment, viewMode, onContinue }: CourseCardProps) => {
    const progressPercentage = calculateProgress(course, enrollment.progress);
    const formattedProgress = Math.round(progressPercentage);
    
    const handleContinue = () => {
      if (onContinue) {
        onContinue(course.id);
      }
    };
  
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        {viewMode === 'grid' ? (
          <>
            <div className="aspect-video relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover aspect-[3/2]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/400/225';
                }}
              />
              {progressPercentage > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-3">
                  <div className="flex items-center justify-between px-2">
                    <span>Progress: {formattedProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{course.title}</h3>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-3 mt-auto flex-wrap gap-y-1">
                {enrollment.endAt && <span className='text-red-500'>Acces ends at : {formatDate((enrollment.endAt))}</span>}
              </div>
              
              <Button 
                onClick={handleContinue}
                variant="primary" 
                className="w-full"
                size="sm"
              >
                <Play size={16} className="mr-1" />
                {progressPercentage > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            </CardContent>
          </>
        ) : (
          <div className="flex h-full">
            <div className="w-48 h-48 flex-shrink-0 relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className=" object-cover aspect-[1/1]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/400/225';
                }}
              />
              {progressPercentage > 0 && (
                <div className="absolute bottom-2 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <CardContent className="flex-1 p-4 flex flex-col">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{course.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-2 flex-wrap">
                    {enrollment.endAt && <span className='text-red-500'>Acces ends at : {formatDate((enrollment.endAt))}</span>}
                  </div>
                  {progressPercentage > 0 && (
                    <div className="mt-1">
                      <span className="text-blue-600 font-medium">{formattedProgress}% complete</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleContinue}
                  variant="primary" 
                  size="sm"
                >
                  <Play size={16} className="mr-1" />
                  {progressPercentage > 0 ? "Continue" : "Start Course"}
                </Button>
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    );
};


// Updated Chapter Card Component with Progress Tracking
interface ChapterCardProps {
  chapter: Chapter;
  enrollment: EnrolledChapter;
  viewMode: ViewMode;
  onContinue?: (chapterId: string) => void;
}

export const ChapterCard = ({ chapter, enrollment, viewMode, onContinue }: ChapterCardProps) => {
  const { getCourseById } = useCoursesStore();
  const course = getCourseById(chapter.courseId);
  
  // Calculate progress for this chapter based on watchedLessons
  const calculateChapterProgress = (chapter: Chapter, watchedLessons?: string[]): number => {
    if (!watchedLessons || watchedLessons.length === 0) return 0;
    
    let totalLessons = 0;
    let watchedLessonsCount = 0;
    
    chapter.sections?.forEach(section => {
      totalLessons += section.lessons.length;
      
      section.lessons.forEach(lesson => {
        if (watchedLessons.includes(lesson.id)) {
          watchedLessonsCount++;
        }
      });
    });
    
    return totalLessons > 0 ? (watchedLessonsCount / totalLessons) * 100 : 0;
  };
  
  // Calculate progress from enrollment's watchedLessons
  const progressPercentage = calculateChapterProgress(chapter, enrollment.watchedLessons);
  const formattedProgress = Math.round(progressPercentage);
  
  const handleContinue = () => {
    if (onContinue) {
      onContinue(chapter.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {viewMode === 'grid' ? (
        <>
          <div className="aspect-video relative">
            <img
              src={course?.thumbnail}
              alt={chapter.title}
              className="w-full h-full object-cover aspect-[3/2]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/225';
              }}
            />
            <div className="absolute top-3 left-3">
              <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                Chapter {chapter.position}
              </span>
            </div>
            {progressPercentage > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-3">
                <div className="flex items-center justify-between px-2">
                  <span>Progress: {formattedProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <CardContent className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{chapter.title}</h3>
            <p className="text-sm text-gray-800 mb-2 line-clamp-3">Course: <br/> {course?.title}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3 mt-auto flex-wrap gap-y-1">
              {enrollment.endAt && <span className='text-red-500'>Acces ends at : {formatDate((enrollment.endAt))}</span>}
            </div>
            
            <Button 
              onClick={handleContinue}
              variant="primary" 
              className="w-full"
              size="sm"
            >
              <Play size={16} className="mr-1" />
              {progressPercentage > 0 ? "Continue Learning" : "Start Chapter"}
            </Button>
          </CardContent>
        </>
      ) : (
        <div className="flex h-full">
          <div className="w-48 h-48 flex-shrink-0 relative">
            <img
              src={course?.thumbnail}
              alt={chapter.title}
              className="object-cover aspect-[1/1]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/225';
              }}
            />
            <div className="absolute top-3 left-3">
              <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                Chapter {chapter.position}
              </span>
            </div>
            {progressPercentage > 0 && (
              <div className="absolute bottom-2 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-3">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <CardContent className="flex-1 p-4 flex flex-col">
            <h3 className="font-semibold text-lg mb-2">{chapter.title}</h3>
            <p className="text-sm text-gray-800 mb-2">
              Course: {course?.title}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{chapter.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="text-sm text-gray-500">
                <div className="flex items-center gap-2 flex-wrap">
                  {enrollment.endAt && <span className='text-red-500'>Acces ends at : {formatDate(enrollment.endAt)}</span>}
                </div>
                {progressPercentage > 0 && (
                  <div className="mt-1">
                    <span className="text-blue-600 font-medium">{formattedProgress}% complete</span>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleContinue}
                variant="primary" 
                size="sm"
              >
                <Play size={16} className="mr-1" />
                {progressPercentage > 0 ? "Continue" : "Start Chapter"}
              </Button>
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
};

// Updated Book Card Component with Preview Button
interface BookCardProps {
  book: Book;
  viewMode: ViewMode;
  onPreview?: (bookId: string) => void;
}

export const BookCard = ({ book, viewMode, onPreview }: BookCardProps) => {
  const handlePreview = () => {
    if (onPreview) {
      onPreview(book.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {viewMode === 'grid' ? (
        <>
          <div className="aspect-video relative">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover aspect-[3/2]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/225';
              }}
            />
          </div>
          <CardContent className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{book.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4 mt-auto flex-wrap gap-y-1">
              <span> {book.description} </span>
            </div>
            
            <Button 
              onClick={handlePreview}
              variant="primary" 
              className="w-full"
              size="sm"
            >
              <Eye className='mr-2' />
              Preview Book
            </Button>
          </CardContent>
        </>
      ) : (
        <div className="flex h-full">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={book.cover}
              alt={book.title}
              className="object-cover aspect-[1/1]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/225';
              }}
            />
          </div>
          <CardContent className="flex-1 p-4 flex flex-col">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{book.description}</p>
            
            <div className="flex items-center justify-end mt-auto">
              <Button 
                onClick={handlePreview}
                variant="primary" 
                size="sm"
              >
                <Eye className='mr-2' />
                Preview Book
              </Button>
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
};

// Main Library Cards Component
interface LibraryCardsProps {
  viewMode: ViewMode;
  activeTab: 'courses' | 'chapters' | 'books';
  courses: Course[];
  chapters: Chapter[];
  books: Book[];
  enrollments: {
    courses: EnrolledCourse[];
    chapters: EnrolledChapter[];
    books: { bookId: string; purchasedAt: Date }[];
  };
}

export const LibraryCards = ({ 
  viewMode, 
  activeTab, 
  courses, 
  chapters, 
  books, 
  enrollments 
}: LibraryCardsProps) => {

  // Create a map of enrolled course IDs to enrollment data
  const courseEnrollmentMap = new Map(
    enrollments.courses.map(enrollment => [enrollment.courseId, enrollment])
  );

  // Create a map of enrolled chapter IDs to enrollment data
  const chapterEnrollmentMap = new Map(
    enrollments.chapters.map(enrollment => [enrollment.chapterId, enrollment])
  );

  return (
    <div className={cn(
      "grid gap-6",
      viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
    )}>
      {activeTab === 'courses' && courses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          enrollment={courseEnrollmentMap.get(course.id) as EnrolledCourse} 
          viewMode={viewMode} 
        />
      ))}
      
      {activeTab === 'chapters' && chapters.map(chapter => (
        <ChapterCard 
          key={chapter.id} 
          chapter={chapter} 
          enrollment={chapterEnrollmentMap.get(chapter.id) as EnrolledChapter}
          viewMode={viewMode} 
        />
      ))}
      
      {activeTab === 'books' && books.map(book => (
        <BookCard 
          key={book.id} 
          book={book} 
          viewMode={viewMode} 
        />
      ))}
      
      {/* Empty state */}
      {((activeTab === 'courses' && courses.length === 0) ||
        (activeTab === 'chapters' && chapters.length === 0) ||
        (activeTab === 'books' && books.length === 0)) && (
        <div className="col-span-full">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-700 font-medium mb-2">No {activeTab} found in your library</p>
              <p className="text-gray-500">
                {activeTab === 'courses' && "Enroll in courses to see them here."}
                {activeTab === 'chapters' && "Purchase individual chapters to see them here."}
                {activeTab === 'books' && "Buy books to access them in your library."}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};