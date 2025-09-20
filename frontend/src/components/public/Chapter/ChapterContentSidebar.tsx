import React from 'react';
import { ChevronRight, ChevronDown, CheckCircle, Circle, Clock } from 'lucide-react';
import { useCurrentCourseStore } from '../../../stores/student/currentCourseStore';
import { Section, VideoLesson } from '../../../types/course';

interface ChapterContentSidebarProps {
  className?: string;
}

const ChapterContentSidebar: React.FC<ChapterContentSidebarProps> = ({ className = '' }) => {
  const { 
    course,
    getCurrentChapter,
    currentSectionId,
    currentLessonId,
    expandedSections,
    toggleSectionExpanded,
    setCurrentLesson,
    getChapterProgress
  } = useCurrentCourseStore();

  const currentChapter = getCurrentChapter();
  
  if (!course || !currentChapter) return null;

  const { percentage, total } = getChapterProgress(currentChapter.id);
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Chapter Content</h2>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <span>{currentChapter.sections.length} sections • {total} lessons</span>
          <span>{percentage}% complete</span>
        </div>
        <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300 ease-in-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {currentChapter.sections.map((section: Section) => (
          <SectionItem 
            key={section.id} 
            section={section} 
            isExpanded={expandedSections.includes(section.id)}
            isActive={currentSectionId === section.id}
            currentLessonId={currentLessonId}
            toggleSection={() => toggleSectionExpanded(section.id)}
            onSelectLesson={(lessonId) => setCurrentLesson(lessonId)}
          />
        ))}
      </div>
    </div>
  );
};

interface SectionItemProps {
  section: Section;
  isExpanded: boolean;
  isActive: boolean;
  currentLessonId: string | null;
  toggleSection: () => void;
  onSelectLesson: (lessonId: string) => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  isExpanded,
  isActive,
  currentLessonId,
  toggleSection,
  onSelectLesson
}) => {
  // Calculate how many lessons are completed in this section
  const completedLessons = section.lessons.filter(lesson => lesson.completed).length;
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button 
        onClick={toggleSection}
        className={`w-full p-4 flex items-center justify-between transition-colors duration-200 
          ${isActive ? 'bg-indigo-50 hover:bg-indigo-100' : 'hover:bg-gray-50'}`}
      >
        <div className="flex items-center">
          {isExpanded ? 
            <ChevronDown className="w-5 h-5 text-indigo-600 mr-2" /> : 
            <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
          }
          <span className="font-medium text-gray-800">{section.title}</span>
        </div>
        <div className="text-sm text-gray-500">
          {completedLessons}/{section.lessons.length} lessons
        </div>
      </button>
      
      {isExpanded && (
        <div className="bg-gray-50 pl-6">
          {section.lessons.map((lesson: VideoLesson) => (
            <LessonItem 
              key={lesson.id} 
              lesson={lesson}
              isActive={currentLessonId === lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface LessonItemProps {
  lesson: VideoLesson;
  isActive: boolean;
  onClick: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full py-3 px-4 flex items-center justify-between text-left transition-colors duration-200
        ${isActive ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
    >
      <div className="flex items-center">
        {lesson.completed ? 
          <CheckCircle className="w-4 h-4 text-green-500 mr-3" /> : 
          <Circle className="w-4 h-4 text-gray-300 mr-3" />
        }
        <span className={`${isActive ? 'text-indigo-700 font-medium' : 'text-gray-700'}`}>
          {lesson.title}
        </span>
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        {lesson.duration}
      </div>
    </button>
  );
};

export default ChapterContentSidebar;