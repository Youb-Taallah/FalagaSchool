import { useState } from 'react';
import { Clock, CheckCircle, Award, Users, ChevronRight, ChevronDown, Play, Star, BarChart2 } from 'lucide-react';
import { useParams } from "react-router-dom"
import { useCoursesStore } from '../../stores/public/coursesStore';
import images from '../../utils/images';


// Mock instructor data
const instructorData = {
  id: "instructor-456",
  name: "Halim Chaouch",
  role: "Senior Frontend Engineer",
  bio: "Halim has over 10 years of experience in web development and has worked with companies like Google and Microsoft. He specializes in React and TypeScript and has taught over 50,000 students worldwide.",
  profileImage: images.public.halim,
  rating: 4.8,
  reviews: 1248,
  courses: 12
};

export default function CourseLandingPage() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>("chapter-1");
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById } = useCoursesStore();
  const course = getCourseById(courseId ?? '');

  const toggleChapter = (chapterId: string) => {
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterId);
    }
  };
  
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    course?.chapters.forEach(chapter => {
      chapter.sections.forEach(section => {
        section.lessons.forEach(lesson => {
          const [minutes, seconds] = lesson.duration.split(':').map(Number);
          totalMinutes += minutes + seconds / 60;
        });
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <div className={`bg-gray-50 font-sans pt-20`}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Side - Course Info */}
          <div className="w-full">
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {course?.title}
            </h1>
            
            <div className="mb-4">
              {course?.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
            
            <p dir={course?.arabicLanguage ? 'rtl' : 'ltr'} className="text-gray-700 mb-6">
              {course?.description}
            </p>
            
          </div>
          
          {/* Right Side - Hero Image */}
          <div className="h-64 lg:hidden flex justify-center items-center ">
            <img 
              src={course?.thumbnail}
              alt="Person working at desk" 
              className="h-full aspect-[3/2] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-8">
        {/* Left Side - Main Content */}
        <div className="lg:w-2/3">
          {/* What You'll Learn */}
          <div className={`bg-white p-6 rounded-lg shadow-sm mb-8 `}>
            <h2 className="text-xl font-bold mb-4" dir={course?.arabicLanguage ? 'rtl' : 'ltr'} >
              {course?.arabicLanguage ? "ما سوف تتعلمه" : "What You'll Learn"}
            </h2>
            <div className={`grid md:grid-cols-2 gap-3 ${course?.arabicLanguage ? 'rtl' : 'ltr'}`} dir={course?.arabicLanguage ? 'rtl' : 'ltr'}>
              {course?.whatYouWillLearn?.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle size={20} className="mx-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Course Content */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="mb-4 text-sm">
              <span>{course?.chapters.length} chapters • </span>
              <span>{course?.totalLessons} lessons • </span>
              <span>{calculateTotalDuration()} total length</span>
            </div>
            
            <div className="space-y-4">
              {course?.chapters.map((chapter) => (
                <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <div className="flex items-center">
                      {expandedChapter === chapter.id ? 
                        <ChevronDown size={20} className="mr-2 text-blue-600" /> : 
                        <ChevronRight size={20} className="mr-2 text-blue-600" />
                      }
                      <h3 className="font-medium">{chapter.position}. {chapter.title}</h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      {chapter.sections.reduce((total, section) => total + section.lessons.length, 0)} lessons • {chapter.duration}
                    </div>
                  </div>
                  
                  {expandedChapter === chapter.id && (
                    <div className="border-t border-gray-200">
                      {chapter.sections.map((section) => (
                        <div key={section.id} className="border-b border-gray-200 last:border-b-0">
                          <div className="p-4 bg-gray-50">
                            <h4 className="font-medium">{chapter.position}.{section.position} {section.title}</h4>
                          </div>
                          
                          <div>
                            {section.lessons.map((lesson) => (
                              <div key={lesson.id} className="p-4 flex justify-between items-center border-t border-gray-100">
                                <div className="flex items-center">
                                  {lesson.preview ? (
                                    <Play size={16} className="mr-3 text-blue-600" />
                                  ) : (
                                    <div className="w-4 h-4 mr-3" />
                                  )}
                                  <span className="text-sm">
                                    {lesson.title}
                                    {lesson.preview && <span className="ml-2 text-xs text-blue-600">(Preview)</span>}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                    { chapter.pricing &&
                        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                          <div>
                            <span className="font-medium text-blue-600">{chapter.pricing?.lifetime.toFixed(2)} dt</span>
                            <span className="text-sm text-gray-500 ml-2">to purchase this chapter only</span>
                          </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                              Get Chapter
                            </button>
                        </div>
                      }
                        
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to Action Box */}
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Get the Complete Course</h3>
                <p className="text-blue-700">
                  Access all {course?.totalLessons} lessons, downloadable resources, and certificate of completion.
                </p>
              </div>
              <div className="ml-4">
                <div className="text-xl font-bold text-blue-800">
                  {(course?.pricing.lifetime ?? 0 * (1 - ( course?.discount ?? 0 ) / 100)).toFixed(2)} dt
                </div>
                { course?.sale && course?.originalPrice &&
                  <div className="text-sm line-through text-gray-500">
                    {course?.originalPrice.toFixed(2)} dt
                  </div>}
              </div>
            </div>
            <button className="mt-4 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium">
              Get the Course with {course?.discount}% Discount
            </button>
          </div>
          
          {/* Requirements */}
          { course?.requirements && course.requirements.length > 0 &&
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          }
          
          {/* Instructor Profile */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Your Instructor</h2>
            <div className="flex items-start">
              <img 
                src={instructorData.profileImage} 
                alt={instructorData.name} 
                className="w-20 h-20 rounded-full mr-6"
              />
              <div>
                <h3 className="text-lg font-medium">{instructorData.name}</h3>
                <p className="text-gray-500 mb-2">{instructorData.role}</p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(instructorData.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">{instructorData.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({instructorData.reviews} reviews)</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{instructorData.courses} courses</span>
                </div>
                <p className="text-gray-700">
                  {instructorData.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
            <div className="mb-4">
              <img 
                src={course?.thumbnail} 
                alt={course?.title} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl font-bold">
                  {(course?.pricing.lifetime ?? 0 * (1 - ( course?.discount ?? 0 ) / 100)).toFixed(2)} dt
                </div>
                { course?.sale && course?.originalPrice &&
                  <div className="text-gray-500 line-through text-lg">
                    {course?.originalPrice.toFixed(2)} dt
                  </div>
                }
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {course?.discount}% discount!
              </div>
              
              <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium mb-4">
                 Get the Course
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-4">This course includes:</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm">
                  <Clock size={16} className="mr-3 text-gray-500" />
                  <span>{course?.duration} on-demand video</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle size={16} className="mr-3 text-gray-500" />
                  <span>{course?.totalLessons} lessons</span>
                </li>
                <li className="flex items-center text-sm">
                  <Users size={16} className="mr-3 text-gray-500" />
                  <span>Access on mobile and desktop</span>
                </li>
                <li className="flex items-center text-sm">
                  <Award size={16} className="mr-3 text-gray-500" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center text-sm">
                  <BarChart2 size={16} className="mr-3 text-gray-500" />
                  <span>{course?.level} level</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium mb-4">Training options:</h3>
              <div className="space-y-3">
                {course?.pricing[1] !== undefined && (
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                  <span>1 Month Access</span>
                  <span className="font-medium">{course?.pricing[1].toFixed(2)} dt</span>
                </div>
                )}
                {course?.pricing[3] !== undefined && (
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                  <span>3 Months Access</span>
                  <span className="font-medium">{course?.pricing[3].toFixed(2)} dt</span>
                </div>
                )}
                {course?.pricing[10] !== undefined && (
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
                  <span>10 Months Access</span>
                  <span className="font-medium">{course?.pricing[10].toFixed(2)} dt</span>
                </div>
                )}
                {course?.pricing.lifetime !== undefined && (
                <div className="flex justify-between items-center p-3 border border-blue-500 bg-blue-50 rounded-md cursor-pointer">
                  <div>
                    <span className="font-medium">Lifetime Access</span>
                    <div className="text-xs text-blue-700">Best value</div>
                  </div>
                  <span className="font-medium">{course?.pricing.lifetime.toFixed(2)} dt</span>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}