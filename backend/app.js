const connectDB = require('./config/db');
const cors = require('cors');
const express = require('express');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const studentRoutes = require('./routes/students.routes');
const courseRoutes = require('./routes/course.routes');
const requestRoutes = require('./routes/request.routes');

const { errorHandler, requestLogger, createRateLimit } = require('./middleware/error');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(ClerkExpressWithAuth());


// Use your request logger middleware early
app.use(requestLogger);

// Rate limiting example: limit to 100 requests per 5 minutes
const rateLimiter = createRateLimit(5 * 60 * 1000, 100, 'Too many requests from this IP');
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/requests', requestRoutes);

// Error handling middleware (always last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Clerk authentication enabled');
});

module.exports = app;
