class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
      });
    }
    
    static error(res, error, statusCode = 500, details = null) {
      return res.status(statusCode).json({
        success: false,
        error: typeof error === 'string' ? error : error.message,
        details,
        timestamp: new Date().toISOString()
      });
    }
    
    static notFound(res, resource = 'Resource') {
      return res.status(404).json({
        success: false,
        error: `${resource} not found`,
        timestamp: new Date().toISOString()
      });
    }
    
    static unauthorized(res, message = 'Unauthorized access') {
      return res.status(401).json({
        success: false,
        error: message,
        timestamp: new Date().toISOString()
      });
    }
    
    static forbidden(res, message = 'Access denied') {
      return res.status(403).json({
        success: false,
        error: message,
        timestamp: new Date().toISOString()
      });
    }
    
    static validationError(res, errors) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: Array.isArray(errors) ? errors : [errors],
        timestamp: new Date().toISOString()
      });
    }
    
    static paginated(res, data, pagination, message = 'Success') {
      return res.status(200).json({
        success: true,
        message,
        data,
        pagination,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  export default ApiResponse;