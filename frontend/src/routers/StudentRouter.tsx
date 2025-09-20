import { Routes, Route, Navigate } from 'react-router-dom';
import CourseChaptersPage from '../pages/student/CourseChaptersPage';
import ChaptersPage from '../pages/student/ChaptersPage';

import { MainLayout } from '../components/student/layout/main-layout';
import { HomePage } from '../pages/student/HomePage';
import { ProfilePage } from '../pages/student/ProfilePage';
import { RequestsPage } from '../pages/student/RequestsPage';
import { BlankPage } from '../pages/student/BlankPage';
import { LibraryPage } from '../pages/student/LibraryPage';
import useStudentStore from '../stores/student/studentStore';
import { ProfileCompletionModal } from '../components/student/ProdileCompletionModal';
import { useAuthStore } from '../stores/authStore';

const StudentRouter: React.FC = () => {
  const { currentStudent } = useStudentStore();
  const { currentUser } = useAuthStore();

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-arabic">
        <main>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/assistance" element={<BlankPage title="Assistance" />} />
              <Route path="/course/:courseId" element={<CourseChaptersPage />} />
              <Route path="/course/:courseId/chapter/:chapterId" element={<ChaptersPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </MainLayout>
        </main>
      </div>
      
      {/* Render the profile completion modal if the student status is pending */}
      {( currentUser && !currentStudent ) && <ProfileCompletionModal />}
    </>
  );
};

export default StudentRouter;