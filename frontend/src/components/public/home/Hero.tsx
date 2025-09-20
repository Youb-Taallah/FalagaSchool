import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <header className="relative bg-gradient-to-r from-indigo-700 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg"
          alt="Students learning"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Transform Your Future with LearnHub</h1>
          <p className="text-xl mb-12 opacity-90">
            Access world-class education from anywhere. Start learning today with our expert-led courses.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/courses"
              className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/books"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Explore Books
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;