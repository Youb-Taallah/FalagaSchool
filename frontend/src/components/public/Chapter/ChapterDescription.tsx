import React, { useState } from 'react';
import { Clock, BarChart, CheckCircle } from 'lucide-react';
import { useCurrentCourseStore } from '../../../stores/student/currentCourseStore';

interface ChapterDescriptionProps {
  className?: string;
}

const ChapterDescription: React.FC<ChapterDescriptionProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { course, getCurrentChapter, getChapterProgress } = useCurrentCourseStore();
  const currentChapter = getCurrentChapter();
  
  if (!course || !currentChapter) return null;
  
  const { title, description } = currentChapter;
  const { percentage } = getChapterProgress(currentChapter.id);
  
  // Calculate total chapter duration
  const totalDuration = currentChapter.sections.reduce((acc, section) => {
    return acc + section.lessons.reduce((secAcc, lesson) => {
      const [min, sec] = lesson.duration.split(':').map(Number);
      return secAcc + (min * 60 + sec);
    }, 0);
  }, 0);
  
  // Format total duration to hours and minutes
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const formattedDuration = hours > 0 
    ? `${hours}h ${minutes}m`
    : `${minutes} minutes`;
  
  // Calculate total lessons
  const totalLessons = currentChapter.sections.reduce(
    (acc, section) => acc + section.lessons.length, 0
  );
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content' }
  ];
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-1 text-gray-500" /> 
            <span>{formattedDuration}</span>
          </div>
          <div className="flex items-center text-sm">
            <BarChart className="w-4 h-4 mr-1 text-gray-500" /> 
            <span>{totalLessons} lessons</span>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 border min-h-[400px] border-gray-200 rounded-b-lg rounded-tr-lg">
          {activeTab === 'overview' && (
            <div>
              <p className="text-gray-700 mb-6">{description || "This chapter doesn't have a description."}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Progress</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">{percentage}% complete</span>
                  <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-300 ease-in-out" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Continue learning to complete this chapter.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Chapter Content</h3>
              <p className="text-gray-700 mb-4">
                This chapter includes {totalLessons} lessons organized into {currentChapter.sections.length} sections.
              </p>
              
              {currentChapter.sections.map((section, index) => (
                <div key={section.id} className="mb-4 border-b border-gray-100 pb-3 last:border-b-0">
                  <h4 className="font-medium mb-2">Section {index + 1}: {section.title}</h4>
                  <ul className="space-y-2">
                    {section.lessons.map(lesson => (
                      <li key={lesson.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          {lesson.completed ? 
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> : 
                            <div className="w-4 h-4 border border-gray-300 rounded-full mr-2"></div>
                          }
                          <span className={lesson.completed ? "text-gray-600" : "text-gray-800"}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-gray-500">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterDescription;