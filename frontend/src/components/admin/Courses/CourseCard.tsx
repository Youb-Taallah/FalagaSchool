import React from 'react';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Star,
  Tag,
  Loader2
} from 'lucide-react';
import { Course } from '../../../types/course';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onView: (course: Course) => void;
  onDelete: (courseId: string) => void;
  isDeleting?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onView,
  onDelete,
  isDeleting = false
}) => {
  return (
    <div className={`group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default ${
      isDeleting ? 'opacity-50 pointer-events-none' : ''
    }`}>
      {/* Deleting Overlay */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-red-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">Deleting...</span>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {!course.isPublished && (
          <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200 shadow-sm">
            Draft
          </span>
        )}
        {course.bestseller && (
          <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Bestseller
          </span>
        )}
        {course.sale && (
          <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {course.discount}% OFF
          </span>
        )}
      </div>

      {/* Actions Menu */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-2">
          <button
            onClick={() => onView(course)}
            disabled={isDeleting}
            className="p-2.5 bg-white/90 backdrop-blur-sm hover:bg-primary-50 rounded-xl shadow-lg border border-white/20 transition-all duration-200 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            title="View course"
          >
            <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-primary-600" />
          </button>
          <button
            onClick={() => onEdit(course)}
            disabled={isDeleting}
            className="p-2.5 bg-white/90 backdrop-blur-sm hover:bg-blue-50 rounded-xl shadow-lg border border-white/20 transition-all duration-200 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit course"
          >
            <Edit className="w-4 h-4 text-gray-600 group-hover/btn:text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(course._id)}
            disabled={isDeleting}
            className="p-2.5 bg-white/90 backdrop-blur-sm hover:bg-red-50 rounded-xl shadow-lg border border-white/20 transition-all duration-200 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete course"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 text-gray-600 group-hover/btn:text-red-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full lg:w-80 flex-shrink-0 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 transition-colors duration-200">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {course.description}
            </p>

            {/* Instructor & Level */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{course.instructorId}</span>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                {course.level}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {course.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{course.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Pricing & Actions */}
          <div className="mt-auto">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {course.pricing.lifetime} dt
                  </span>
                  {course.sale && course.originalPrice && (
                    <span className="text-lg line-through text-gray-400">
                      {course.originalPrice} dt
                    </span>
                  )}
                </div>
                {course.pricing[1] && (
                  <div className="text-sm text-gray-600">
                    or {course.pricing[1]} dt/month
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};