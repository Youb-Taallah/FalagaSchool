import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/public/HomePage';
import CoursesPage from '../pages/public/CoursesPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import ContactPage from '../pages/public/ContactPage';
import BooksPage from '../pages/public/BooksPage';
import AboutPage from '../pages/public/AboutPage';
import Maintenance from '../pages/public/Maintenance';
import BookDetailsPage from '../pages/public/BookDetailsPage';
import CourseLandingPage from '../pages/public/CourseLandingPage';

function PublicRouter() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-arabic">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseLandingPage />} />
            <Route path="/course/:courseId/chapter/:chapterId" element={<Maintenance />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:bookId" element={<BookDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PublicRouter;