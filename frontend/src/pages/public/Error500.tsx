import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const Error500: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-warning-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Server Error</h1>
        <p className="text-lg text-gray-600 mb-8">
          Something went wrong on our end. Please try again later.
        </p>
        <Link to="/" className="btn-primary">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error500;