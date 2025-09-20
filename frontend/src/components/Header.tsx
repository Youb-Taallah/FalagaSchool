import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import images from '../utils/images';
import { useAuthStore } from '../stores/authStore';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    
  }

  const handleSignUp = () => {
    navigate("/signup");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الدورات', href: '/courses' },
    { name: 'الكتب', href: '/books' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  return (
    <header 
      dir='rtl'
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src={images.public.fgLogo}
              alt='Falaga School'
              className='h-16'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-base transition-all mx-10 duration-200 hover:text-blue-600 relative pb-1 ${
                  location.pathname === link.href 
                    ? 'text-blue-600 after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-blue-600' 
                    : isScrolled ? 'text-gray-700' : 'text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sign In / Sign Up Buttons or Start Now Button depending on user status */}
          <div className="hidden lg:flex lg:min-w-72 justify-center space-x-4 mr-2">
            {currentUser ? (
              // Start Now button if user is logged in
              <button className="bg-blue-600 text-white text-sm font-medium mx-2 py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200">
                اِبدأ الآن
              </button>
            ) : (
              // Login/Signup buttons if no user
              <>
                <button
                  className="text-sm font-medium mx-2 py-2 px-6 text-blue-600 bg-blue-50 border border-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200"
                  onClick={handleLogin}
                >
                  تسجيل الدخول
                </button>
                <button 
                  onClick={handleSignUp} 
                  className="bg-blue-600 text-white text-sm font-medium mx-2 py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200">
                  إنشاء حساب
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-base font-medium transition-all duration-200 hover:text-blue-600 relative pb-1 ${
                    location.pathname === link.href 
                      ? 'text-blue-600 after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-blue-600' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 flex flex-col">
                {currentUser ? (
                  // Start Now button in mobile menu if user is logged in
                  <button className="w-full my-2 bg-blue-600 text-white text-base font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    اِبدأ الآن
                  </button>
                ) : (
                  // Login/Signup buttons in mobile menu if no user
                  <>
                    <button 
                      onClick={handleLogin}
                      className="w-full my-2 text-center text-base font-medium text-blue-600 bg-blue-50 border border-blue-600 rounded-full py-2 hover:bg-blue-100 transition-colors duration-200">
                      تسجيل الدخول
                    </button>
                    <button 
                      onClick={handleSignUp}
                      className="w-full my-2 bg-blue-600 text-white text-base font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-200">
                      إنشاء حساب
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;