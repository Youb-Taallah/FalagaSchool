import React from 'react';
import { BookOpen, Share2, Heart } from 'lucide-react';
import { useCurrentCourseStore } from '../../../stores/student/currentCourseStore';

interface ChapterHeaderProps {
  className?: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ className = '' }) => {
  const { course, getCurrentChapter, getCurrentLesson, getChapterProgress } = useCurrentCourseStore();
  const currentChapter = getCurrentChapter();
  const currentLesson = getCurrentLesson();
  
  if (!course || !currentChapter) return null;
  
  const { percentage } = getChapterProgress(currentChapter.id);
  
  return (
    <div className={`mt-24 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{currentChapter.title}</h1>
            <div className="mt-1 flex items-center">
              <BookOpen className="w-4 h-4 text-indigo-600 mr-1" />
              <span className="text-sm text-gray-600">
                {currentLesson ? `Currently watching: ${currentLesson.title}` : 'Select a lesson to start learning'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium">{percentage}% chapter complete</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterHeader;