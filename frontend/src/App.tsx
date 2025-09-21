import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser, useAuth,  } from "@clerk/clerk-react";
import PublicRouter from "./routers/PublicRouter";
import StudentRouter from "./routers/StudentRouter";
import Error404 from "./pages/public/Error404";
import Error403 from "./pages/public/Error403";
import Error500 from "./pages/public/Error500";
import FAQ from "./pages/public/FAQ";
import LoginPage from "./pages/public/LoginPage";
import SignUpPage from "./pages/public/SignUpPage";
import Loading from "./components/public/Loading.tsx";
import AdminRouter from "./routers/AdminRouter.tsx";
import { useBooksStore } from "./stores/public/booksStore";
import { useCoursesStore } from "./stores/public/coursesStore";
import { useAuthStore } from "./stores/authStore";
import useStudentStore from "./stores/student/studentStore.ts";
import { ToastContainer } from 'react-toastify';
import { getProfile } from "./services/auth/authService.ts";
import { getStudentByUserId } from "./services/student/studentService.ts"

import "./App.css";

function App() {
  // Track loading state for books and courses separately
  const [booksLoading, setBooksLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  
  // Clerk hooks
  const { isSignedIn: clerkIsSignedIn, user, isLoaded } = useUser();

  const { getToken } = useAuth();
  
  // Zustand store
  const { currentUser, signIn, signOut } = useAuthStore();
  const { currentStudent, setCurrentStudent } = useStudentStore();

  const { fetchBooks } = useBooksStore();
  const { fetchCourses } = useCoursesStore();

  // Sync Clerk auth state with Zustand store
  useEffect(() => {
    const syncAuthState = async () => {
      if (isLoaded) {
        if (clerkIsSignedIn && user) {      

          // User is signed in with Clerk, fetch their profile
          setProfileLoading(true);
          
          try {
            // Get the JWT token from Clerk
            const token = await getToken();

            console.log(token);
            
            
            if (token) {
              const response = await getProfile(token);
              
              if (response.success && response.user) {            
                // Update Zustand store with user data
                signIn(response.user);
              } else {
                console.error('Failed to fetch user profile:', response.error);
                // If profile fetch fails, sign out
                signOut();
              }
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            signOut();
          } finally {
            setProfileLoading(false);
          }
        } else {
          // User is not signed in, clear the store
          signOut();
          setProfileLoading(false);
        }
      }
    };

    syncAuthState();
  }, [isLoaded, clerkIsSignedIn, user, getToken, signIn, signOut]);

  useEffect ( ()=> {

    const syncStudentState = async ()=> {
      
      setProfileLoading(true);

      const token = await getToken();
  
      if (token && currentUser?.id) {
        try {
          // Await the async function call
          const res = await getStudentByUserId(token, currentUser.id);

          // Ensure we pass null if res?.data is undefined
          setCurrentStudent(res?.data ?? null);

        } catch (error) {
          console.error("Error fetching student:", error);
        }
      }

      setProfileLoading(false);
  
    }
  
    if (currentUser?.role === "student") syncStudentState();
  
    console.log("user role :", currentUser?.role);
  
  }, [currentUser, getToken, setCurrentStudent]);

  useEffect(() => {
    console.log(currentStudent);
    
  }, [currentStudent]);

  // Fetch books on component mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setBooksLoading(false);
      }
    };

    loadBooks();
  }, [fetchBooks]);

  // Fetch courses when component mounts
  useEffect(() => {
    const loadCourses = async () => {
      try {
        await fetchCourses();
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    loadCourses();
  }, [fetchCourses]);

  // Calculate overall loading state
  const isLoading = booksLoading || coursesLoading || !isLoaded || profileLoading ;

  const isAuthenticated = isLoaded && clerkIsSignedIn && currentUser && !profileLoading

  // Show loading spinner while data is being fetched or auth is initializing
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Routes>
        <Route 
          path="/student/*" 
          element={
            isAuthenticated && currentUser.role === 'student' ? 
              <StudentRouter /> : 
              <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            isAuthenticated && currentUser.role === 'admin' ? 
              <AdminRouter /> : 
              <Navigate to="/403" replace />
          } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/*" element={<PublicRouter />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;