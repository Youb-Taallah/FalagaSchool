import React from 'react';
import { useCurrentCourseStore } from '../../../stores/student/currentCourseStore';
import images from '../../../utils/images';

interface CourseHeaderProps {
  className?: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ className = '' }) => {
  const { course } = useCurrentCourseStore();
  
  if (!course) return null;
  
  return (
    <div className={`mt-24 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {/* Title and lesson info */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
            </div>
            
          </div>
          
          {/* Instructor information */}
          <div className="flex items-center">
            <img 
              src={images.public.halim} 
              alt={course.instructorId} //instructor id
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{course.instructorId}</p>
              <p className="text-xs text-gray-500">{course.instructorId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;