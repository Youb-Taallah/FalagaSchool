import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '../components/admin/layout/main-layout';
import { HomePage } from '../pages/student/HomePage';
import RequestsPage from '../pages/admin/Requests';
import LiveSessionsPage from '../pages/admin/LiveSessions';
import { BlankPage } from '../pages/admin/BlankPage';


function StudentRouter() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 font-arabic">
        <main>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/live-sessions" element={<LiveSessionsPage />} />
              <Route path="/instructors" element={<BlankPage title="Instructors" />} />
              <Route path="/students" element={<BlankPage title="Students" />} />
              <Route path="/courses" element={<BlankPage title="Courses" />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </MainLayout>
        </main>
      </div>
    </>
  );
}

export default StudentRouter;