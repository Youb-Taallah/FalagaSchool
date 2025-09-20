const Book = require('../models/Book');

class BookController {
  static async getAllBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || '';
      const instructorId = req.query.instructorId;
      const category = req.query.category;
      const isPublished = req.query.isPublished;
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const minRating = req.query.minRating;
      const onSale = req.query.onSale;
      
      // Build search query
      let query = {};
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { categories: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (instructorId) {
        query.instructorId = instructorId;
      }
      
      if (category) {
        query.categories = { $in: [category] };
      }
      
      if (isPublished !== undefined) {
        query.isPublished = isPublished === 'true';
      }
      
      if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) {
          query.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
          query.price.$lte = parseFloat(maxPrice);
        }
      }
      
      if (minRating !== undefined) {
        query.rating = { $gte: parseFloat(minRating) };
      }
      
      if (onSale !== undefined) {
        if (onSale === 'true') {
          query.discount = { $gt: 0 };
          query.originalPrice = { $exists: true };
        }
      }
      
      const books = await Book.find(query)
        .populate('instructorId', 'name title')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Book.countDocuments(query);
      
      res.json({
        success: true,
        books,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get books error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch books'
      });
    }
  }
  
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findById(id).populate('instructorId', 'name title bio');
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      // If book is not published, check if user has permission to view it
      if (!book.isPublished) {
        // Check if user is authenticated
        if (!req.user) {
          return res.status(403).json({
            success: false,
            error: 'Access denied. Book is not published.'
          });
        }
        
        // Check if user is admin or the instructor of the book
        if (req.user.role !== 'admin' && 
            req.user.role !== 'instructor' && 
            book.instructorId._id.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            error: 'Access denied. Book is not published.'
          });
        }
      }
      
      res.json({
        success: true,
        book
      });
    } catch (error) {
      console.error('Get book error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch book'
      });
    }
  }
  
  static async createBook(req, res) {
    try {
      const bookData = {
        ...req.body,
        instructorId: req.user.role === 'admin' ? req.body.instructorId : req.user._id.toString()
      };
      
      const book = new Book(bookData);
      await book.save();
      
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        book
      });
    } catch (error) {
      console.error('Create book error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create book'
      });
    }
  }
  
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findById(id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (book.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      Object.assign(book, req.body);
      await book.save();
      
      res.json({
        success: true,
        message: 'Book updated successfully',
        book
      });
    } catch (error) {
      console.error('Update book error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update book'
      });
    }
  }
  
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findById(id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (book.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      await Book.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      console.error('Delete book error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete book'
      });
    }
  }
  
  static async publishBook(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findById(id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (book.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      book.isPublished = true;
      await book.save();
      
      res.json({
        success: true,
        message: 'Book published successfully',
        book
      });
    } catch (error) {
      console.error('Publish book error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to publish book'
      });
    }
  }
  
  static async unpublishBook(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findById(id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (book.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      book.isPublished = false;
      await book.save();
      
      res.json({
        success: true,
        message: 'Book unpublished successfully',
        book
      });
    } catch (error) {
      console.error('Unpublish book error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to unpublish book'
      });
    }
  }
  
  static async getPublishedBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const books = await Book.findPublished()
        .populate('instructorId', 'name title')
        .skip(skip)
        .limit(limit)
        .sort({ publishDate: -1 });
      
      const total = await Book.countDocuments({ isPublished: true });
      
      res.json({
        success: true,
        books,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get published books error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch published books'
      });
    }
  }
  
  static async getBooksByInstructor(req, res) {
    try {
      const { instructorId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const books = await Book.findByInstructor(instructorId)
        .populate('instructorId', 'name title')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Book.countDocuments({ instructorId });
      
      res.json({
        success: true,
        books,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get instructor books error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch instructor books'
      });
    }
  }
  
  static async getBooksByCategory(req, res) {
    try {
      const { category } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const books = await Book.findByCategory(category)
        .populate('instructorId', 'name title')
        .skip(skip)
        .limit(limit)
        .sort({ rating: -1, publishDate: -1 });
      
      const total = await Book.countDocuments({ categories: { $in: [category] } });
      
      res.json({
        success: true,
        books,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get books by category error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch books by category'
      });
    }
  }
  
  static async searchBooks(req, res) {
    try {
      const { query, category, minPrice, maxPrice, minRating, limit = 10 } = req.query;
      
      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 2 characters'
        });
      }
      
      let searchQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { categories: { $regex: query, $options: 'i' } }
        ],
        isPublished: true
      };
      
      if (category) {
        searchQuery.categories = { $in: [category] };
      }
      
      if (minPrice !== undefined || maxPrice !== undefined) {
        searchQuery.price = {};
        if (minPrice !== undefined) {
          searchQuery.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
          searchQuery.price.$lte = parseFloat(maxPrice);
        }
      }
      
      if (minRating !== undefined) {
        searchQuery.rating = { $gte: parseFloat(minRating) };
      }
      
      const books = await Book.find(searchQuery)
        .populate('instructorId', 'name title')
        .limit(parseInt(limit))
        .sort({ rating: -1, publishDate: -1 });
      
      res.json({
        success: true,
        books,
        count: books.length
      });
    } catch (error) {
      console.error('Search books error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search books'
      });
    }
  }
  
  static async getBooksOnSale(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const books = await Book.find({
        isPublished: true,
        discount: { $gt: 0 },
        originalPrice: { $exists: true }
      })
        .populate('instructorId', 'name title')
        .skip(skip)
        .limit(limit)
        .sort({ discount: -1, publishDate: -1 });
      
      const total = await Book.countDocuments({
        isPublished: true,
        discount: { $gt: 0 },
        originalPrice: { $exists: true }
      });
      
      res.json({
        success: true,
        books,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get books on sale error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch books on sale'
      });
    }
  }
  
  static async togglePublishStatus(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findById(id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }
      
      // Check if user is the instructor or admin
      if (book.instructorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied'
        });
      }
      
      await book.togglePublishStatus();
      
      res.json({
        success: true,
        message: `Book ${book.isPublished ? 'published' : 'unpublished'} successfully`,
        book
      });
    } catch (error) {
      console.error('Toggle publish status error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to toggle publish status'
      });
    }
  }
}

module.exports = BookController;