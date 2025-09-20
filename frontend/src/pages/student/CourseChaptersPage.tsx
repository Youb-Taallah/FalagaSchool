import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import { useCoursesStore } from '../../stores/public/coursesStore';
import { useCurrentCourseStore } from '../../stores/student/currentCourseStore';
import CourseHeader from '../../components/public/Course/CourseHeader';

const CourseChaptersPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, fetchCourses, getCourseById } = useCoursesStore();
  const { setCourse, course, getProgress } = useCurrentCourseStore();
  
  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, [courses.length, fetchCourses]);
  
  useEffect(() => {
    if (courseId && courses.length > 0) {
      const fetchedCourse = getCourseById(courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
      }
    }
    console.log(courses);
    console.log(courseId);
    
  }, [courseId, courses, getCourseById, setCourse]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }
  
  const { percentage } = getProgress();
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <CourseHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Chapters</h1>
          <p className="text-gray-600">
            This course contains {course.chapters.length} chapters with {course.totalLessons} lessons in total
          </p>
          
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium mr-2">{percentage}% complete</span>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.chapters.map((chapter, index) => {
            // Calculate chapter completion percentage
            const totalLessons = chapter.sections.reduce(
              (acc, section) => acc + section.lessons.length, 0
            );
            
            const chapterPercentage = 20;
              
            return (
              <Link 
                key={chapter.id}
                to={`/student/course/${courseId}/chapter/${chapter.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      Chapter {index + 1}
                    </span>
                    <span className="text-sm text-gray-500">
                      {2} lessons
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {chapter.title}
                  </h3>
                  
                  {chapter.description && (
                    <p className="text-gray-700 mb-4">
                      {chapter.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="flex items-center mr-4">
                      <BookOpen className="w-4 h-4 mr-1 text-blue-600" />
                      {chapter.sections.length} sections
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-blue-600" />
                      {totalLessons} lessons
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className={chapterPercentage === 100 ? "text-green-600 font-medium" : "text-gray-600"}>
                        {chapterPercentage}% complete
                      </span>
                      <span className="text-blue-600 font-medium group-hover:underline">
                        Continue learning
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ease-in-out ${
                          chapterPercentage === 100 ? "bg-green-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${chapterPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseChaptersPage;