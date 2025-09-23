import { Course } from "../../types/course";
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/courses";

interface CourseResponse {
  success: boolean;
  course?: Course;
  accessLevel?: 'public' | 'student' | 'full';
  message?: string;
  error?: string;
}

interface CoursesListResponse {
  success: boolean;
  courses?: Course[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  count?: number;
  message?: string;
  error?: string;
}

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  instructorId?: string;
  tag?: string;
  isPublished?: boolean;
  bestseller?: boolean;
  sale?: boolean;
  arabicLanguage?: boolean;
}

interface SearchCoursesParams {
  query: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tag?: string;
}

// Error handling helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = async (res: Response): Promise<any> => {
  const data = await res.json();
  toast.error(data.message || data.error || 'Something went wrong');
  return data;
};

/**
 * Get all published courses with pagination and filtering
 */
export const getPublishedCourses = async (params?: GetCoursesParams): Promise<CoursesListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = queryString ? `${BASE_URL}/published?${queryString}` : `${BASE_URL}/published`;

    const res = await fetch(url, {
      method: 'GET'
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching published courses');
    return { success: false, error: String(error) };
  }
};

/**
 * Search published courses by query, level, and tags
 */
export const searchCourses = async (params: SearchCoursesParams): Promise<CoursesListResponse> => {
  try {
    if (!params.query || params.query.length < 2) {
      toast.error('Search query must be at least 2 characters');
      return { success: false, error: 'Search query must be at least 2 characters' };
    }

    const queryParams = new URLSearchParams();
    queryParams.append('query', params.query);
    
    if (params.level) queryParams.append('level', params.level);
    if (params.tag) queryParams.append('tag', params.tag);

    const res = await fetch(`${BASE_URL}/search?${queryParams.toString()}`, {
      method: 'GET'
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while searching courses');
    return { success: false, error: String(error) };
  }
};

/**
 * Get courses by instructor ID
 */
export const getCoursesByInstructor = async (
  instructorId: string, 
  params?: GetCoursesParams
): Promise<CoursesListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = queryString ? 
      `${BASE_URL}/instructor/${instructorId}?${queryString}` : 
      `${BASE_URL}/instructor/${instructorId}`;

    const res = await fetch(url, {
      method: 'GET'
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching instructor courses');
    return { success: false, error: String(error) };
  }
};

/**
 * Get public course view (limited data for preview)
 * Only shows preview videos and basic information
 */
export const getPublicCourse = async (courseId: string): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/public`, {
      method: 'GET'
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching course');
    return { success: false, error: String(error) };
  }
};

/**
 * Utility functions for public course data
 */

/**
 * Check if a course is currently on sale
 */
export const isCourseOnSale = (course: Course): boolean => {
  return course.sale === true && course.discount !== undefined && course.discount > 0;
};

/**
 * Calculate effective price for a course based on sale status
 */
export const getEffectivePrice = (course: Course, duration: keyof typeof course.pricing = 'lifetime'): number => {
  const basePrice = course.pricing[duration] || course.pricing.lifetime;
  
  if (isCourseOnSale(course) && course.discount) {
    return basePrice * (1 - course.discount / 100);
  }
  
  return basePrice;
};

/**
 * Get course duration in minutes from string format
 */
export const getCourseDurationInMinutes = (course: Course): number => {
  if (!course.chapters) return 0;
  
  let totalMinutes = 0;
  course.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        if (lesson.duration) {
          const [minutes, seconds] = lesson.duration.split(':').map(Number);
          totalMinutes += minutes + (seconds / 60);
        }
      });
    });
  });
  return Math.round(totalMinutes);
};

/**
 * Get count of preview lessons available in a course
 */
export const getPreviewLessonsCount = (course: Course): number => {
  if (!course.chapters) return 0;
  
  let previewCount = 0;
  course.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        if (lesson.preview) {
          previewCount++;
        }
      });
    });
  });
  return previewCount;
};

/**
 * Filter courses by multiple criteria
 */
export const filterCourses = (
  courses: Course[], 
  filters: {
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    onSale?: boolean;
    bestseller?: boolean;
    arabicLanguage?: boolean;
    tags?: string[];
  }
): Course[] => {
  return courses.filter(course => {
    // Level filter
    if (filters.level && course.level !== filters.level) return false;
    
    // Price range filter
    const price = getEffectivePrice(course);
    if (filters.minPrice && price < filters.minPrice) return false;
    if (filters.maxPrice && price > filters.maxPrice) return false;
    
    // Sale filter
    if (filters.onSale !== undefined && isCourseOnSale(course) !== filters.onSale) return false;
    
    // Bestseller filter
    if (filters.bestseller !== undefined && course.bestseller !== filters.bestseller) return false;
    
    // Arabic language filter
    if (filters.arabicLanguage !== undefined && course.arabicLanguage !== filters.arabicLanguage) return false;
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        course.tags.some(courseTag => 
          courseTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }
    
    return true;
  });
};

/**
 * Sort courses by different criteria
 */
export const sortCourses = (
  courses: Course[], 
  sortBy: 'newest' | 'oldest' | 'popular' | 'priceAsc' | 'priceDesc' | 'alphabetical'
): Course[] => {
  const sortedCourses = [...courses];
  
  switch (sortBy) {
    case 'newest':
      return sortedCourses.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'oldest':
      return sortedCourses.sort((a, b) => 
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case 'popular':
      return sortedCourses.sort((a, b) => 
        (b.enrolledStudents || 0) - (a.enrolledStudents || 0)
      );
    case 'priceAsc':
      return sortedCourses.sort((a, b) => 
        getEffectivePrice(a) - getEffectivePrice(b)
      );
    case 'priceDesc':
      return sortedCourses.sort((a, b) => 
        getEffectivePrice(b) - getEffectivePrice(a)
      );
    case 'alphabetical':
      return sortedCourses.sort((a, b) => 
        a.title.localeCompare(b.title)
      );
    default:
      return sortedCourses;
  }
};