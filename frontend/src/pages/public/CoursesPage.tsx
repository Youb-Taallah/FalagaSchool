import React, { useEffect, useState, useCallback } from 'react';
import { useCoursesStore } from '../../stores/public/coursesStore';
import CourseCard from '../../components/public/Course/CourseCard';
import { Course } from '../../types/course';
import { Search, Filter, ChevronLeft, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/public/Loading';

const CoursesPage: React.FC = () => {
  const { courses, isLoading, error, fetchCourses } = useCoursesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const navigate = useNavigate();
  
  const COURSES_PER_PAGE = 8;

  // Extract all unique tags
  const allTags = [...new Set(courses.flatMap(course => course.tags))].sort();

  // Debounce search term to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchTerm]);

// Apply filters and sorting to courses
const getFilteredCourses = useCallback(() => {
  let results = [...courses];
  
  // Apply search filter
  if (debouncedSearchTerm && debouncedSearchTerm.trim() !== '') {
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    results = results.filter(course => 
      course.title.toLowerCase().includes(lowerSearchTerm) || 
      course.description.toLowerCase().includes(lowerSearchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }
  
  // Apply level filter
  if (selectedLevel && selectedLevel !== '') {
    results = results.filter(course => course.level === selectedLevel);
  }
  
  // Apply tag filter
  if (selectedTag && selectedTag !== '') {
    results = results.filter(course => course.tags.includes(selectedTag));
  }
  
  // Apply price range filter
  if (priceRange && priceRange !== '') {
    switch (priceRange) {
      case 'free':
        results = results.filter(course => course.pricing.lifetime === 0);
        break;
      case 'under50':
        results = results.filter(course => course.pricing.lifetime > 0 && course.pricing.lifetime < 50);
        break;
      case '50to100':
        results = results.filter(course => course.pricing.lifetime >= 50 && course.pricing.lifetime <= 100);
        break;
      case 'over100':
        results = results.filter(course => course.pricing.lifetime > 100);
        break;
    }
  }
  
  // Apply sorting
switch (sortOption) {
  case 'price-asc':
    results = results.sort((a, b) => a.pricing.lifetime - b.pricing.lifetime);
    break;
  case 'price-desc':
    results = results.sort((a, b) => b.pricing.lifetime - a.pricing.lifetime);
    break;
  case 'title-asc':
    results = results.sort((a, b) => a.title.localeCompare(b.title));
    break;
  case 'date-desc':
    results = results.sort((a, b) => {
      const aTime = a.publishedAt?.getTime ? a.publishedAt.getTime() : 
                   new Date(a.publishedAt).getTime();
      const bTime = b.publishedAt?.getTime ? b.publishedAt.getTime() : 
                   new Date(b.publishedAt).getTime();
      return bTime - aTime;
    });
    break;
  case 'students-desc':
    results = results.sort((a, b) => 
      (b.enrolledStudents || 0) - (a.enrolledStudents || 0)
    );
    break;
  case 'lessons-desc':
    results = results.sort((a, b) => b.totalLessons - a.totalLessons);
    break;
  default:
    // Default sorting - newest first
    results = results.sort((a, b) => {
      const aTime = a.publishedAt?.getTime ? a.publishedAt.getTime() : 
                   new Date(a.publishedAt).getTime();
      const bTime = b.publishedAt?.getTime ? b.publishedAt.getTime() : 
                   new Date(b.publishedAt).getTime();
      return bTime - aTime;
    });
}
  
  return results;
}, [courses, debouncedSearchTerm, selectedLevel, selectedTag, priceRange, sortOption]);


// Update filtered courses and reset pagination when filters change
useEffect(() => {
  const filtered = getFilteredCourses();
  
  setFilteredCourses(filtered);
  setCurrentPage(1);
}, [getFilteredCourses, courses.length]);

  // Calculate total pages
  const totalCourses = filteredCourses.length;
  const totalPages = Math.max(1, Math.ceil(totalCourses / COURSES_PER_PAGE));
  
  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Get current page of courses
  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);
  };

  const paginatedCourses = getCurrentPageCourses();

  // Handle course click - navigate to the course details page
  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  // Handle page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // If current page is among first 3 pages
      if (currentPage <= 3) {
        pages.push(2, 3, 4);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
      // If current page is among last 3 pages
      else if (currentPage >= totalPages - 2) {
        pages.push('ellipsis');
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      }
      // If current page is in the middle
      else {
        pages.push('ellipsis');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSelectedLevel('');
    setSelectedTag('');
    setPriceRange('');
    setSortOption('');
  };

  return (
    <div className="container mx-auto px-4 pb-8 pt-36 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold">Explore Courses</h1>
      </div>
      
      {/* Search and filter section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search courses by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Level filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  console.log("Selected level:", e.target.value);
                  setSelectedLevel(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            {/* Tag filter */}
            <div>
              <select
                value={selectedTag}
                onChange={(e) => {
                  console.log("Selected tag:", e.target.value);
                  setSelectedTag(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Topics</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Price range filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => {
                  console.log("Selected price range:", e.target.value);
                  setPriceRange(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="under50">Under $50</option>
                <option value="50to100">$50 to $100</option>
                <option value="over100">Over $100</option>
              </select>
            </div>
            
            {/* Sort options */}
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">Sort by: Latest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="date-desc">Newest First</option>
                <option value="students-desc">Most Popular</option>
                <option value="lessons-desc">Most Content</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <Loading />
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>{error}</p>
          <button 
            onClick={() => fetchCourses()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Results count */}
      {!isLoading && !error && (
        <div className="mb-6 text-gray-600 flex justify-between items-center">
          <div>
            {totalCourses > 0 ? (
              <>
                Showing {((currentPage - 1) * COURSES_PER_PAGE) + 1} to{' '}
                {Math.min(currentPage * COURSES_PER_PAGE, totalCourses)} of {totalCourses} courses
                {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
                {selectedLevel && ` with level "${selectedLevel}"`}
                {selectedTag && ` in topic "${selectedTag}"`}
              </>
            ) : (
              <>
                No courses found
                {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
                {selectedLevel && ` with level "${selectedLevel}"`}
                {selectedTag && ` in topic "${selectedTag}"`}
              </>
            )}
          </div>
          
          {/* Clear filters button */}
          {(debouncedSearchTerm || selectedLevel || selectedTag || priceRange || sortOption) && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Filter size={14} />
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      {/* No results */}
      {!isLoading && !error && totalCourses === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-50 rounded-lg">
          <BookOpen size={48} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-gray-500 max-w-md">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          {(debouncedSearchTerm || selectedLevel || selectedTag || priceRange) && (
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      {/* Courses grid */}
      {!isLoading && !error && totalCourses > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCourses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              onClick={() => handleCourseClick(course._id)}
            />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-1">
            {/* Previous page button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* Page numbers */}
            {getPaginationNumbers().map((page, index) => (
              page === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} className="px-2">...</span>
              ) : (
                <button
                  key={`page-${page}`}
                  onClick={() => goToPage(page as number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            ))}
            
            {/* Next page button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;