import React from 'react';
import { Course } from '../../../types/course';
import { Star, Clock, Users } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  // Calculate the display price (accounting for discounts if any)
  const calculateDisplayPrice = () => {
    const lifetimePrice = course.pricing.lifetime;
    if (course.sale && course.discount && course.originalPrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-600">${lifetimePrice.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through">${course.originalPrice.toFixed(2)}</span>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md font-medium">
            {course.discount}% OFF
          </span>
        </div>
      );
    }
    return <span className="text-lg font-bold text-blue-600">${lifetimePrice.toFixed(2)}</span>;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Course thumbnail with level badge */}
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {course.level}
        </div>
        {course.bestseller && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">
            Bestseller
          </div>
        )}
      </div>
      
      {/* Course details */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{course.title}</h3>
        
        {/* Course info badges */}
        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            <span>{course.chapters.length} chapters</span>
          </div>
          {course.enrolledStudents && (
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{course.enrolledStudents} students</span>
            </div>
          )}
        </div>
        
        {/* Course description - truncated */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{course.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{course.tags.length - 3} more</span>
          )}
        </div>
        
        {/* Price */}
        <div className="mt-auto">
          {calculateDisplayPrice()}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;