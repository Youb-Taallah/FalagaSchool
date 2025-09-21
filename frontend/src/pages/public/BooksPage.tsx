import React, { useEffect, useState, useCallback } from 'react';
import { useBooksStore } from '../../stores/public/booksStore';
import BookCard from '../../components/public/Book/BookCard';
import { Book } from '../../types/book';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/public/Loading';


const BooksPage: React.FC = () => {
  const { books, isLoading, error, fetchBooks } = useBooksStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const navigate = useNavigate();
  
  const BOOKS_PER_PAGE = 8;

  // Extract all unique categories
  const allCategories = [...new Set(books.flatMap(book => book.categories))].sort();

  // Debounce search term to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Apply filters and sorting to books
  const getFilteredBooks = useCallback(() => {
    let results = [...books];
    
    // Apply search filter
    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      results = results.filter(book => 
        book.title.toLowerCase().includes(lowerSearchTerm) || 
        book.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(book => 
        book.categories.includes(selectedCategory)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        results = results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results = results.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        results = results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date-desc':
        results = results.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        break;
      case 'rating-desc':
        results = results.sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
        break;
      default:
        // Default sorting - newest first
        results = results.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
    }
    
    return results;
  }, [books, debouncedSearchTerm, selectedCategory, sortOption]);

  // Update filtered books and reset pagination when filters change
  useEffect(() => {
    const filtered = getFilteredBooks();
    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [getFilteredBooks]);

  // Calculate total pages
  const totalBooks = filteredBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalBooks / BOOKS_PER_PAGE));
  
  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Get current page of books
  const getCurrentPageBooks = () => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  };

  const paginatedBooks = getCurrentPageBooks();

  // Handle book click - in a real app, this would navigate to the book details page
  const handleBookClick = (bookId: string) => {
    console.log(`Navigate to book with ID: ${bookId}`);
    // Implementation would depend on your routing solution (e.g., React Router)
    navigate(`/books/${bookId}`);
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

  return (
    <div className="container mx-auto px-4 pb-8 pt-36 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Explore Books</h1>
      
      {/* Search and filter section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search books by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          {/* Category filter */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Sort options */}
          <div className="w-full md:w-64">
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
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <Loading/>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>{error}</p>
          <button 
            onClick={() => fetchBooks()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Results count */}
      {!isLoading && !error && (
        <div className="mb-6 text-gray-600">
          {totalBooks > 0 ? (
            <>
              Showing {((currentPage - 1) * BOOKS_PER_PAGE) + 1} to{' '}
              {Math.min(currentPage * BOOKS_PER_PAGE, totalBooks)} of {totalBooks} books
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
              {selectedCategory && ` in "${selectedCategory}"`}
            </>
          ) : (
            <>
              No books found
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
              {selectedCategory && ` in "${selectedCategory}"`}
            </>
          )}
        </div>
      )}
      
      {/* No results */}
      {!isLoading && !error && totalBooks === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Filter size={48} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-gray-500 max-w-md">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          {(debouncedSearchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setDebouncedSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      {/* Books grid */}
      {!isLoading && !error && totalBooks > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedBooks.map(book => (
            <BookCard 
              key={book._id} 
              book={book} 
              onClick={() => handleBookClick(book._id)}
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

export default BooksPage;