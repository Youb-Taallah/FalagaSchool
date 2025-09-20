import { create } from 'zustand';
import { Course, Chapter } from '../../types/course';
import { mockCourses } from '../../data/courses';

interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;

  getCourseById: (id: string) => Course | undefined;
  getCoursesByInstructorId: (instructorId: string) => Course[];
  getCoursesByLevel: (level: Course['level']) => Course[];
  getCoursesByTag: (tag: string) => Course[];
  getBestsellerCourses: () => Course[];
  getCoursesOnSale: () => Course[];
  getRecentCourses: (limit?: number) => Course[];
  getCoursesByPriceRange: (min: number, max: number) => Course[];
  getCoursesWithLiveSessions: () => Course[];
  searchCourses: (query: string) => Course[];
  getChapter: (courseId: string, chapterId: string) => Chapter | undefined;
}

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,
  
  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real application, this would be an API call
      // For now, we'll just use the mock data with a small delay
      await new Promise(resolve => setTimeout(resolve, 100));

      // Filter to get only published courses
      const publishedCourses = mockCourses.filter(course => course.isPublished);

      set({ courses: publishedCourses, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch courses', 
        isLoading: false 
      });
    }
  },
  
  getCourseById: (id: string) => {
    return get().courses.find(course => course.id === id);
  },
  
  // Get courses by instructor ID
  getCoursesByInstructorId: (instructorId: string) => {
    return get().courses.filter(course => course.instructorId === instructorId);
  },
  
  // Get courses by difficulty level
  getCoursesByLevel: (level: Course['level']) => {
    return get().courses.filter(course => course.level === level);
  },
  
  // Get courses that have a specific tag
  getCoursesByTag: (tag: string) => {
    return get().courses.filter(course => course.tags.includes(tag));
  },
  
  // Get bestseller courses
  getBestsellerCourses: () => {
    return get().courses.filter(course => course.bestseller === true);
  },
  
  // Get courses currently on sale
  getCoursesOnSale: () => {
    return get().courses.filter(course => 
      course.sale === true || (course.discount !== undefined && course.discount > 0)
    );
  },
  
  // Get recently published courses, with optional limit parameter
  getRecentCourses: (limit?: number) => {
    const sortedCourses = [...get().courses].sort((a, b) => {
      return b.publishedAt.toMillis() - a.publishedAt.toMillis();
    });
    
    return limit ? sortedCourses.slice(0, limit) : sortedCourses;
  },
  
  // Get courses within a specific price range (using lifetime pricing)
  getCoursesByPriceRange: (min: number, max: number) => {
    return get().courses.filter(course => {
      const price = course.pricing.lifetime;
      return price >= min && price <= max;
    });
  },
  
  // Get courses that have live sessions
  getCoursesWithLiveSessions: () => {
    return get().courses.filter(course => 
      course.LiveSessions && course.LiveSessions.length > 0
    );
  },
  
  // Search courses by title and description
  searchCourses: (query: string) => {
    if (!query || query.trim() === '') {
      return get().courses;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return get().courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) || 
      course.description.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  // Get a specific chapter from a course
  getChapter: (courseId: string, chapterId: string) => {
    
    const course = get().courses.find(c => c.id === courseId);
    if (!course) return undefined;
    
    return course.chapters.find(chapter => chapter.id === chapterId);
  }

}));