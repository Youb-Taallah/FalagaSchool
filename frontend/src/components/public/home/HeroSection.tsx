import images from '../../../utils/images'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
      
      {/* Decorative Elements - Static */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-300 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute top-40 left-20 w-32 h-32 bg-teal-300 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-pink-200 rounded-full filter blur-3xl opacity-30"></div> 
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image with entry animation */}
          <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="absolute"></div>
              <img 
                src={images.homePage.taki}
                alt="Students learning online" 
                className="relative mb-12 lg:mb-0 w-full max-w-2xl object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
          
          {/* Text content with entry animation */}
          <div 
            dir='rtl' 
            className={`w-full lg:w-1/2 lg:pt-24 text-center lg:text-start leading-normal transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className='mb-4 text-5xl md:text-5xl lg:text-7xl text-gray-900'>
                مرحبا بك<br/>
            </div>

            <div className='text-4xl md:text-4xl lg:text-5xl text-gray-900 mb-10 leading-relaxed lg:leading-relaxed'>
              <span className="bg-clip-text ">
                إلى منصة فلّاقة سكول للتدريس عن بعد بالفلاّقي
              </span>
            </div>

            <div className="flex flex-col justify-center lg:justify-start sm:flex-row my-4 space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => navigate('/student')}
                className={`
                  text-5xl py-5 px-20 my-8 rounded-full cursor-pointer text-center font-medium
                  whitespace-nowrap bg-gradient-to-r from-blue-400 to-blue-600 text-white border-none
                  transition-all duration-300 ease-in-out hover:-translate-y-1
                  hover:shadow-lg hover:shadow-blue-400/40 relative overflow-hidden group
                `}
                style={{
                  textShadow: '0 0 1px #fff, 0 0 2px #fff'
                }}
              >
                {/* Button shine effect on hover only */}
                <span className="absolute top-0 left-0 w-32 h-full bg-white transform -skew-x-12 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                اِبدأ الآن
              </button>
            </div>
            
            <p className={`text-lg md:text-xl text-gray-700 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '600ms' }}>
              ✨ يمكنك التمتع بحصص مجانية قبل التسجيل ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;