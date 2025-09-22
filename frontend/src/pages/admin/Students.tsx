import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Student } from '../../types/student';
import { StudentCard } from '../../components/admin/Students/StudentCard';
import { StudentProfile } from '../../components/admin/Students/StudentProfile';
import { Search, Filter, Users, UserCheck, UserX, Loader2 } from 'lucide-react';
import { getAllStudents, updateStudent, suspendStudent, activateStudent } from '../../services/admin/studentService';

const StudentDashboard = () => {
  const { getToken } = useAuth();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  
  const STUDENTS_PER_PAGE = 20;

  // Fetch students from API
  const fetchStudents = async (page = 1, resetData = false) => {
    try {
      if (resetData) setLoading(true);
      
      const token = await getToken();
      if (!token) {
        setError('Authentication token not available');
        return;
      }

      const params = {
        page,
        limit: STUDENTS_PER_PAGE,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      };

      const response = await getAllStudents(token, params);
      
      if (response.success && response.data) {
        if (resetData) {
          setStudents(response.data);
        } else {
          setStudents(prev => [...prev, ...response.data!]);
        }
        
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
          setTotalStudents(response.pagination.total);
        }
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch students');
      }
    } catch (err) {
      setError('Network error while fetching students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStudents(1, true);
  }, []);

  // Refetch when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchStudents(1, true);
  }, [statusFilter, searchTerm]);

  // Load more students (pagination)
  const loadMoreStudents = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchStudents(nextPage, false);
    }
  };

  // Filter students for display (in case of client-side filtering)
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !searchTerm || 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone?.includes(searchTerm) ||
        student.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const getStatusStats = () => {
    return {
      total: totalStudents || students.length,
      active: students.filter(s => s.status === 'active').length,
      suspended: students.filter(s => s.status === 'suspended').length,
    };
  };

  const stats = getStatusStats();

  const handleUpdateStudent = async (updatedStudent: Student) => {
    try {
      const token = await getToken();
      if (!token) {
        setError('Authentication token not available');
        return;
      }

      // Update student in database
      const response = await updateStudent(token, updatedStudent._id, {
        name: updatedStudent.name,
        phone: updatedStudent.phone,
        city: updatedStudent.city,
        educationLevel: updatedStudent.educationLevel,
        avatar: updatedStudent.avatar
      });

      if (response.success && response.data) {
        // Update local state
        setStudents(prev => 
          prev.map(student => 
            student._id === response.data!._id ? response.data! : student
          )
        );
        
        // Update selectedStudent if it's the one being updated
        if (selectedStudent && selectedStudent._id === response.data._id) {
          setSelectedStudent(response.data);
        }
      }
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const handleSuspendStudent = async (studentId: string) => {
    try {
      const token = await getToken();
      if (!token) {
        setError('Authentication token not available');
        return;
      }

      const response = await suspendStudent(token, studentId);
      
      if (response.success && response.data) {
        // Update local state
        setStudents(prev => 
          prev.map(student => 
            student._id === response.data!._id ? response.data! : student
          )
        );
        
        // Update selectedStudent if it's the one being updated
        if (selectedStudent && selectedStudent._id === response.data._id) {
          setSelectedStudent(response.data);
        }
      }
    } catch (err) {
      console.error('Error suspending student:', err);
    }
  };

  const handleActivateStudent = async (studentId: string) => {
    try {
      const token = await getToken();
      if (!token) {
        setError('Authentication token not available');
        return;
      }

      const response = await activateStudent(token, studentId);
      
      if (response.success && response.data) {
        // Update local state
        setStudents(prev => 
          prev.map(student => 
            student._id === response.data!._id ? response.data! : student
          )
        );
        
        // Update selectedStudent if it's the one being updated
        if (selectedStudent && selectedStudent._id === response.data._id) {
          setSelectedStudent(response.data);
        }
      }
    } catch (err) {
      console.error('Error activating student:', err);
    }
  };

  // Handle search with debouncing
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // In a real app, you might want to add debouncing here
  };

  // Handle filter change
  const handleFilterChange = (value: 'all' | 'active' | 'suspended') => {
    setStatusFilter(value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        onUpdateStudent={handleUpdateStudent}
        onSuspendStudent={handleSuspendStudent}
        onActivateStudent={handleActivateStudent}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
                <p className="text-sm text-gray-600">Active Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <UserX className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{stats.suspended}</p>
                <p className="text-sm text-gray-600">Suspended Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, or city..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value as 'all' | 'active' | 'suspended')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        
        {(searchTerm || statusFilter !== 'all') && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredStudents.length} students
              {totalStudents > 0 && ` of ${totalStudents} total`}
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => fetchStudents(1, true)}
            className="mt-2 text-sm text-red-700 hover:text-red-800 font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && students.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mr-2" />
          <p className="text-gray-600">Loading students...</p>
        </div>
      )}

      {/* Students Grid */}
      {!loading || students.length > 0 ? (
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onClick={() => setSelectedStudent(student)}
            />
          ))}
        </div>
      ) : null}

      {/* Load More Button */}
      {currentPage < totalPages && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreStudents}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Load More Students
          </button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loading && students.length > 0 && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600 mr-2" />
          <p className="text-gray-600">Loading more students...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredStudents.length === 0 && !error && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first student.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;