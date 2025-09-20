import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Error404: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <Search className="mx-auto h-16 w-16 text-primary-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;