import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBooksStore } from '../../stores/public/booksStore';
import { Book } from '../../types/book';
import { Star, Calendar, User, ShoppingCart, BookOpen, Download } from 'lucide-react';
import Loading from '../../components/public/Loading';

const BookDetailsPage: React.FC = () => {
  const { getBookById } = useBooksStore();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'details' >('overview');

  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
  if (!bookId) return;

  setIsLoading(true);

  setTimeout(() => {
    const foundBook = getBookById(bookId);
    setBook(foundBook);
    setIsLoading(false);
  }, 300);
}, [bookId, getBookById]);

  if (isLoading) {
    return <Loading/>
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <p className="mb-8">The book you're looking for doesn't exist or has been removed.</p>
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Books
        </button>
      </div>
    );
  }

  // Format publish date
  const publishDate = new Date(book.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate discount percentage if needed
  const discountPercentage = book.discount 
    ? book.discount 
    : book.originalPrice && book.price < book.originalPrice
      ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
      : 0;

  // Generate star rating display
  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="text-gray-300 fill-gray-300" size={20} />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={20} />);
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 pb-8 pt-28">
      
      {/* Book header section */}
      <div className="bg-white overflow-hidden">
        <div>
          <h1 className="text-3xl px-8 text-center lg:text-start">{book.title}</h1>
          <div className="lg:flex">
            {/* Book cover */}
            <div className="lg:w-1/ flex flex-col justify-start items-center lg:items-start p-8">
              {book.cover ? (
                <img 
                  src={book.cover} 
                  alt={`${book.title} cover`} 
                  className="w-full aspect-[2/3] object-cover max-w-sm shadow-md rounded-lg"
                />
              ) : (
                <div className="w-64 h-80 flex items-center justify-center bg-gray-200 text-gray-500 border border-gray-300">
                  No Cover Available
                </div>
              )}
            </div>
            
            {/* Book info */}
            <div className="lg:w-2/3 p-8">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex-1 mr-8">                
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4 ">
                    {book.categories.map(category => (
                      <span 
                        key={category} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  {/* Rating */}
                  {book.rating && (
                    <div className="flex items-center mb-6">
                      <div className="flex mr-2">
                        {renderStars(book.rating)}
                      </div>
                      <span className="text-gray-700">{book.rating.toFixed(1)}</span>
                    </div>
                  )}
                  
                  {/* Metadata */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {/* Publication Date */}
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-500 mr-2" />
                      <span>Published: {publishDate}</span>
                    </div>
                    
                    {/* Pages */}
                    {book.pages && (
                      <div className="flex items-center">
                        <BookOpen size={18} className="text-gray-500 mr-2" />
                        <span>{book.pages} pages</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Price card */}
                <div className="w-full md:w-auto mt-6 md:mt-0">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full md:w-64">
                    {/* Price display */}
                    <div className="mb-4">
                      <div className="flex items-center">
                        {book.originalPrice && book.originalPrice > book.price ? (
                          <>
                            <span className="text-3xl font-bold text-blue-700">${book.price.toFixed(2)}</span>
                            <span className="ml-2 text-gray-500 line-through">${book.originalPrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-blue-700">${book.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {discountPercentage > 0 && (
                        <div className="mt-1 text-green-600 font-medium">
                          Save {discountPercentage}% today!
                        </div>
                      )}
                    </div>
                    
                    {/* Add to cart button */}
                    <button
                      className={`w-full py-3 px-4 rounded-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700'
                      } text-white font-medium`}
                    >
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                        Add to Cart
                    </>
                    </button>
                    
                    {/* Digital delivery info */}
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex items-center mb-2">
                        <Download size={16} className="mr-2" />
                        <span>Digital download available immediately</span>
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        <span>Access on all your devices</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabs navigation */}
              <div className="mt-4 border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setSelectedTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium ${
                      selectedTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setSelectedTab('details')}
                    className={`py-4 px-1 border-b-2 font-medium ${
                      selectedTab === 'details'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Details
                  </button>
                </nav>
              </div>
              
              {/* Tab content */}
              <div className="py-6">
                {selectedTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">About this Book</h2>
                    <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
                    
                    {/* Key features or highlights could go here */}
                    <div className="mt-8">
                      <h3 className="font-bold mb-3">Why you'll love this book:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          <span>Comprehensive coverage of the subject matter</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          <span>Clear explanations with practical examples</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          <span>Perfect for both beginners and experienced readers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {selectedTab === 'details' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Book Details</h2>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 font-medium text-gray-600">Title</td>
                          <td className="py-3">{book.title}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 font-medium text-gray-600">Publication Date</td>
                          <td className="py-3">{publishDate}</td>
                        </tr>
                        {book.pages && (
                          <tr className="border-b border-gray-200">
                            <td className="py-3 font-medium text-gray-600">Pages</td>
                            <td className="py-3">{book.pages}</td>
                          </tr>
                        )}
                        <tr className="border-b border-gray-200">
                          <td className="py-3 font-medium text-gray-600">Categories</td>
                          <td className="py-3">{book.categories.join(', ')}</td>
                        </tr>
                        {book.rating && (
                          <tr className="border-b border-gray-200">
                            <td className="py-3 font-medium text-gray-600">Rating</td>
                            <td className="py-3">{book.rating.toFixed(1)} / 5</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Related books section would go here */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        
        {/* In a real app, this would show related books based on categories */}
        <div className="text-center py-12 text-gray-500">
          Related books would be displayed here
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;