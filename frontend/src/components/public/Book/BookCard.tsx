import React from 'react';
import { Book } from '../../../types/book';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const navigate = useNavigate();
  
  // Calculate discount percentage if both prices are available
  const discountPercentage = book.discount
    ? `${book.discount}%`
    : book.originalPrice && book.price < book.originalPrice
      ? `${Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%`
      : null;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/books/${book.id}`);
    }
  };
  
  return (
    <div className="relative flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="relative h-48 bg-gray-200">
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={`${book.title} cover`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Cover Available
          </div>
        )}
        {discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            -{discountPercentage}
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
        
        <div className="flex flex-wrap gap-2 mt-1 mb-2">
          {book.rating && (
            <span className="inline-flex items-center text-sm text-yellow-500">
              ★
              <span className="ml-1">{book.rating.toFixed(1)}</span>
            </span>
          )}
          
          {book.categories.length > 0 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {book.categories[0]}
              {book.categories.length > 1 && "..."}
            </span>
          )}
        </div>
        
        <div className="mt-auto pt-2 flex justify-between items-end">
          <div className="font-medium">
            {book.originalPrice && book.originalPrice > book.price ? (
              <>
                <span className="text-red-600">${book.price.toFixed(2)}</span>
                <span className="text-gray-500 text-sm line-through ml-2">${book.originalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span>${book.price.toFixed(2)}</span>
            )}
          </div>
          
          {book.pages && (
            <span className="text-xs text-gray-500">{book.pages} pages</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;