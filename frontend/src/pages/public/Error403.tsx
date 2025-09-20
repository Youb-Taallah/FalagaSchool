import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

const Error403: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <ShieldOff className="mx-auto h-16 w-16 text-error-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, you don't have permission to access this page.
        </p>
        <Link to="/" className="btn-blue">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error403;