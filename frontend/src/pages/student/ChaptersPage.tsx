import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCoursesStore } from '../../stores/public/coursesStore';
import { BookOpen, Clock, Search, Filter, Tags, DollarSign, Award } from 'lucide-react';
import images from '../../utils/images';

const CoursesPage = () => {
  const { courses, fetchCourses, isLoading } = useCoursesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  
  const allTags = Array.from(
    new Set(courses.flatMap(course => course.tags))
  ).sort();
  
  const allLevels = Array.from(
    new Set(courses.map(course => course.level))
  ).sort();
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const handleLevelChange = (level: string) => {
    setSelectedLevel(prev => prev === level ? '' : level);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => course.tags.includes(tag));
    
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    
    const price = course.pricing.lifetime || 0;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesTags && matchesLevel && matchesPrice;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Accelerate Your Career with Our Courses</h1>
          <p className="text-lg text-gray-600">Invest in your future with our expert-led professional courses</p>
        </div>

        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by course title, description, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <Filter className={`h-5 w-5 ${showFilters ? 'text-indigo-600' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Tags className="h-5 w-5 mr-2 text-indigo-600" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                          ${selectedTags.includes(tag)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-indigo-600" />
                    Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => handleLevelChange(level)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                          ${selectedLevel === level
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
                    Price Range
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="10"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <>
            <p className="text-center mb-8 text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <Link 
                  key={course.id} 
                  to={`/course/${course.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {course.bestseller && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold rounded">
                        BESTSELLER
                      </div>
                    )}
                    {course.sale && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                        {course.level}
                      </span>
                      {course.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="flex items-center mr-3">
                        <BookOpen className="w-4 h-4 mr-1 text-indigo-600" />
                        {course.totalLessons} lessons
                      </span>
                      <span className="flex items-center mr-3">
                        <Clock className="w-4 h-4 mr-1 text-indigo-600" />
                        {course.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={images.public.halim}
                          alt={course.instructorId} //instructor name
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                        <span className="text-sm text-gray-700">{course.instructorId}</span> //instructor name
                      </div>
                      
                      <div className="text-right">
                        {course.originalPrice && course.originalPrice > course.pricing.lifetime ? (
                          <div className="flex items-center">
                            <span className="text-gray-500 line-through text-sm mr-2">
                              ${course.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-lg font-bold text-indigo-600">
                              ${course.pricing.lifetime.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-indigo-600">
                            ${course.pricing.lifetime ? course.pricing.lifetime.toFixed(2) : 'Free'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                      Enroll Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;