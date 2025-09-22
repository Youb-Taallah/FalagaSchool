import React from 'react';
import { Student } from '../../../types/student';
import { BookOpen, Play } from 'lucide-react';
import { Avatar } from '../../ui/avatar';
import { getInitials } from '../../utils';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-400';
      case 'suspended':
        return 'bg-red-400';
      case 'pending':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <Avatar 
              src={student?.avatar} 
              initials={student?.name ? getInitials(student.name) : "??"}
              className="w-10 h-10 text-sm"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {student.name || 'Unnamed Student'}
              </h3>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${getStatusDot(student.status)} mr-2`}></div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">{student.city}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4 text-primary-600" />
            <span className="font-medium">{student.enrolledCourses?.length || 0}</span>
            <span className="text-gray-500">courses</span>
          </div>
          <div className="flex items-center space-x-1">
            <Play className="w-4 h-4 text-purple-600" />
            <span className="font-medium">{student.enrolledChapters?.length || 0}</span>
            <span className="text-gray-500">chapters</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4 text-green-600" />
            <span className="font-medium">{student.boughtBooks?.length || 0}</span>
            <span className="text-gray-500">books</span>
          </div>
        </div>
      </div>
    </div>
  );
};