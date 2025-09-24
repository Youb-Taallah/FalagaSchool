/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { 
  Search, 
  Plus, 
  BookOpen, 
  Users, 
  Filter,
  ChevronDown,
  Edit,
  Eye,
  Loader2
} from 'lucide-react';
import { Course } from '../../../types/course';
import { mockInstructors } from '../../../data/mockData';
import { CourseCard } from './CourseCard';
import { getAllCourses, deleteCourse } from '../../../services/admin/courseService';

interface CourseListProps {
  onCreateCourse: () => void;
  onEditCourse: (course: Course) => void;
  onViewCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({
  onCreateCourse,
  onEditCourse,
  onViewCourse,
  onDeleteCourse
}) => {
  const { getToken } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null>(null);

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      const params: any = {
        page: currentPage,
        limit: 10
      };

      // Add filters
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }
      if (selectedInstructor) {
        params.instructorId = selectedInstructor;
      }
      if (statusFilter === 'published') {
        params.isPublished = true;
      } else if (statusFilter === 'draft') {
        params.isPublished = false;
      }

      const response = await getAllCourses(token, params);
      
      if (response.success && response.courses) {
        setCourses(response.courses);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        console.error('Failed to fetch courses:', response.error);
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount and when filters change
  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchTerm, selectedInstructor, statusFilter]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchCourses();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedInstructor, statusFilter]);

  // Handle course deletion
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(courseId);
      const token = await getToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      const response = await deleteCourse(token, courseId);
      
      if (response.success) {
        // Remove the course from local state
        setCourses(prev => prev.filter(course => course._id !== courseId));
        // Call parent callback
        onDeleteCourse(courseId);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      setDeleting(null);
    }
  };

  const filteredCourses = courses; // Already filtered by API

  const stats = useMemo(() => {
    const total = pagination?.total || courses.length;
    const published = courses.filter(c => c.isPublished).length;
    const draft = courses.filter(c => !c.isPublished).length;
    const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);

    return { total, published, draft, totalStudents };
  }, [courses, pagination]);

  if (loading && courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
          <span className="text-gray-600">Loading courses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <button
          onClick={onCreateCourse}
          className="btn-primary flex items-center gap-2 self-start lg:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <Edit className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalStudents.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-primary-50 text-primary-700' : ''}`}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="input-field"
              >
                <option value="">All Instructors</option>
                {mockInstructors.map(instructor => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Courses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && courses.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
            <span className="text-sm text-gray-600">Updating courses...</span>
          </div>
        </div>
      )}

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.length === 0 && !loading ? (
          <div className="card text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedInstructor || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first course'
              }
            </p>
            {!searchTerm && !selectedInstructor && statusFilter === 'all' && (
              <button onClick={onCreateCourse} className="btn-primary">
                Create Course
              </button>
            )}
          </div>
        ) : (
          filteredCourses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={onEditCourse}
              onView={onViewCourse}
              onDelete={handleDeleteCourse}
              isDeleting={deleting === course._id}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} courses
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={pagination.page <= 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                disabled={pagination.page >= pagination.pages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};