import { Clock, Star } from 'lucide-react';

const CourseSection = () => {
  const courses = [
    {
      title: 'Introduction to Web Development',
      category: 'Programming',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      rating: 4.8,
      students: 1845,
      duration: '8 weeks',
    },
    {
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
      rating: 4.7,
      students: 1253,
      duration: '10 weeks',
    },
    {
      title: 'Graphic Design Principles',
      category: 'Design',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      rating: 4.9,
      students: 2156,
      duration: '6 weeks',
    },
    {
      title: 'Business Strategy & Marketing',
      category: 'Business',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      rating: 4.6,
      students: 1578,
      duration: '8 weeks',
    },
    {
      title: 'Mobile App Development',
      category: 'Programming',
      image: 'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg',
      rating: 4.8,
      students: 1352,
      duration: '12 weeks',
    },
    {
      title: 'Digital Photography Masterclass',
      category: 'Photography',
      image: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg',
      rating: 4.7,
      students: 1854,
      duration: '6 weeks',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-700">
            Explore our most popular courses and start your learning journey today with content created by industry experts.
          </p>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
              All Courses
            </button>
            <button className="px-4 py-2 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
              Programming
            </button>
            <button className="px-4 py-2 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
              Design
            </button>
            <button className="px-4 py-2 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
              Business
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {course.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                  <span className="text-sm text-gray-500">({course.students} students)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 font-medium py-3 px-6 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;