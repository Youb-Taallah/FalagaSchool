import React from 'react';
import { Wrench } from 'lucide-react';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <Wrench className="mx-auto h-16 w-16 text-primary-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Under Maintenance</h1>
        <p className="text-lg text-gray-600 mb-8">
          We're making some improvements to our system.<br />
          We'll be back soon!
        </p>
      </div>
    </div>
  );
};

export default Maintenance;