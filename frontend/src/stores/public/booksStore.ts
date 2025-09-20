import { create } from 'zustand';
import { Book } from '../../types/book';
import { mockBooks } from '../../data/books';

interface BooksState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  getBooksByCategory: (category: string) => Book[];
  getDiscountedBooks: () => Book[];
}

export const useBooksStore = create<BooksState>((set, get) => ({
  books: [],
  isLoading: false,
  error: null,
  
  fetchBooks: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real application, this would be an API call
      // For now, we'll just use the mock data with a small delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Filter to get only published books
      const publishedBooks = mockBooks.filter(book => book.isPublished);
      
      set({ books: publishedBooks, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch books', 
        isLoading: false 
      });
    }
  },
  
  getBookById: (id: string) => {
    return get().books.find(book => book.id === id);
  },

  getBooksByCategory: (category: string) => {
    return get().books.filter(book => 
      book.categories.includes(category)
    );
  },

  getDiscountedBooks: () => {
    return get().books.filter(book => 
      book.discount && book.discount > 0
    );
  }
}));