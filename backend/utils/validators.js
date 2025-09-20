const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };
  
  const sanitizeUserInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  };
  
  const validateUserUpdate = (data) => {
    const errors = [];
    
    if (data.firstName && data.firstName.length < 2) {
      errors.push('First name must be at least 2 characters');
    }
    
    if (data.lastName && data.lastName.length < 2) {
      errors.push('Last name must be at least 2 characters');
    }
    
    if (data.email && !validateEmail(data.email)) {
      errors.push('Invalid email format');
    }
    
    if (data.profile?.phone && !validatePhone(data.profile.phone)) {
      errors.push('Invalid phone number format');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  const validateObjectId = (id) => {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
  };
  
  const validateBulkUpdate = (data) => {
    const errors = [];
    
    if (!data.userIds || !Array.isArray(data.userIds)) {
      errors.push('userIds must be an array');
    }
    
    if (data.userIds && data.userIds.length === 0) {
      errors.push('userIds array cannot be empty');
    }
    
    if (data.userIds && data.userIds.some(id => !validateObjectId(id))) {
      errors.push('All userIds must be valid ObjectIds');
    }
    
    if (!data.updates || typeof data.updates !== 'object') {
      errors.push('updates must be an object');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  const validateRoleUpdate = (role) => {
    const validRoles = ['user', 'admin', 'moderator'];
    return {
      isValid: validRoles.includes(role),
      errors: validRoles.includes(role) ? [] : [`Role must be one of: ${validRoles.join(', ')}`]
    };
  };
  
  const validateSearchQuery = (query) => {
    const errors = [];
    
    if (!query || typeof query !== 'string') {
      errors.push('Search query must be a string');
    }
    
    if (query && query.length < 2) {
      errors.push('Search query must be at least 2 characters long');
    }
    
    if (query && query.length > 50) {
      errors.push('Search query must be less than 50 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  const validatePagination = (page, limit) => {
    const errors = [];
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    
    if (parsedPage < 1) {
      errors.push('Page must be a positive number');
    }
    
    if (parsedLimit < 1 || parsedLimit > 100) {
      errors.push('Limit must be between 1 and 100');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      page: parsedPage,
      limit: parsedLimit
    };
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
    validatePhone,
    sanitizeUserInput,
    validateUserUpdate,
    validateObjectId,
    validateBulkUpdate,
    validateRoleUpdate,
    validateSearchQuery,
    validatePagination
  };