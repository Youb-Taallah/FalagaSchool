import { create } from 'zustand';
import { Student } from '../../types/student';
import { Request } from '../../types/request';

// Define the store's state interface
interface StudentState {
  // Student data
  currentStudent: Student | null;
  loading: boolean;
  error: string | null;
  
  // Requests data
  requests: Request[];
  requestsLoading: boolean;
  requestsError: string | null;
  
  // Student actions
  setCurrentStudent: (student: Student | null) => void;
  updateStudentDetails: (details: Partial<Student>) => void;
  updateCourseProgress: (courseId: string, chapterId: string, lessonId: string) => void;
  updateChapterProgress: (chapterId: string, lessonId: string) => void;
  
  // Request actions
  setRequests: (requests: Request[]) => void;
  addRequest: (request: Request) => void;
  getRequestsByStatus: (status: 'pending' | 'approved' | 'rejected') => Request[];
  getRequestsByType: (type: 'course' | 'chapter' | 'book') => Request[];
}

// Create the store
const useStudentStore = create<StudentState>()(
    (set, get) => ({
      // Initial state
      currentStudent: null,
      loading: false,
      error: null,
      
      requests: [],
      requestsLoading: false,
      requestsError: null,
      
      // Student actions
      setCurrentStudent: (student) => set({ currentStudent: student }),
      
      updateStudentDetails: (details) => set((state) => {
        if (!state.currentStudent) return state;
        
        return {
          currentStudent: {
            ...state.currentStudent,
            ...details,
          }
        };
      }),
      
      updateCourseProgress: (courseId, chapterId, lessonId) => set((state) => {
        if (!state.currentStudent || !state.currentStudent.enrolledCourses) return state;
        
        const enrolledCourses = [...state.currentStudent.enrolledCourses];
        const courseIndex = enrolledCourses.findIndex(c => c.courseId === courseId);
        
        if (courseIndex < 0) return state;
        
        const course = enrolledCourses[courseIndex];
        const progress = course.progress || [];
        
        const chapterProgress = progress.find(p => p.chapterId === chapterId);
        
        if (chapterProgress) {
          // Update existing chapter progress
          if (!chapterProgress.watchedLessons.includes(lessonId)) {
            chapterProgress.watchedLessons = [...chapterProgress.watchedLessons, lessonId];
          }
        } else {
          // Create new chapter progress
          progress.push({
            chapterId,
            watchedLessons: [lessonId]
          });
        }
        
        enrolledCourses[courseIndex] = {
          ...course,
          progress
        };
        
        return {
          currentStudent: {
            ...state.currentStudent,
            enrolledCourses
          }
        };
      }),
      
      updateChapterProgress: (chapterId, lessonId) => set((state) => {
        if (!state.currentStudent || !state.currentStudent.enrolledChapters) return state;
        
        const enrolledChapters = [...state.currentStudent.enrolledChapters];
        const chapterIndex = enrolledChapters.findIndex(c => c.chapterId === chapterId);
        
        if (chapterIndex < 0) return state;
        
        const chapter = enrolledChapters[chapterIndex];
        const watchedLessons = chapter.watchedLessons || [];
        
        if (!watchedLessons.includes(lessonId)) {
          enrolledChapters[chapterIndex] = {
            ...chapter,
            watchedLessons: [...watchedLessons, lessonId]
          };
        }
        
        return {
          currentStudent: {
            ...state.currentStudent,
            enrolledChapters
          }
        };
      }),
      
      // Request actions
      setRequests: (requests) => set({ requests }),
      
      addRequest: (request) => set((state) => ({
        requests: [...state.requests, request]
      })),
      
      getRequestsByStatus: (status) => {
        const { currentStudent, requests } = get();
        if (!currentStudent) return [];
        
        return requests.filter(request => 
          request.status === status && 
          request.studentId === currentStudent._id
        );
      },
      
      getRequestsByType: (type) => {
        const { currentStudent, requests } = get();
        if (!currentStudent) return [];
        
        return requests.filter(request => 
          request.type === type && 
          request.studentId === currentStudent._id
        );
      },
    })
);

export default useStudentStore;