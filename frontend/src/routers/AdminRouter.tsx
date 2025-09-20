import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '../components/admin/layout/main-layout';
import { HomePage } from '../pages/student/HomePage';
import RequestsPage from '../pages/admin/Requests';
import LiveSessionsPage from '../pages/admin/LiveSessions';

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
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </MainLayout>
        </main>
      </div>
    </>
  );
}

export default StudentRouter;