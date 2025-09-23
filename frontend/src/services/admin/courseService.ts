/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Course, Chapter, Section, VideoLesson } from "../../types/course";
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

interface ChapterResponse {
  success: boolean;
  chapter?: Chapter;
  message?: string;
  error?: string;
}

interface SectionResponse {
  success: boolean;
  section?: Section;
  message?: string;
  error?: string;
}

interface LessonResponse {
  success: boolean;
  lesson?: VideoLesson;
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

interface CreateCourseData {
  title: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  totalLessons: number;
  tags: string[];
  requirements: string[];
  whatYouWillLearn: string[];
  pricing: {
    1?: number;
    3?: number;
    10?: number;
    lifetime: number;
  };
  originalPrice?: number;
  sale?: boolean;
  bestseller?: boolean;
  discount?: number;
  arabicLanguage?: boolean;
}

interface UpdateCourseData extends Partial<CreateCourseData> {}

interface CreateChapterData {
  title: string;
  description?: string;
  position?: number;
  duration?: string;
  ressources?: Array<{
    title: string;
    url: string;
  }>;
  pricing?: {
    1?: number;
    3?: number;
    10?: number;
    lifetime: number;
  };
}

interface UpdateChapterData extends Partial<CreateChapterData> {}

interface CreateSectionData {
  title: string;
  position?: number;
}

interface UpdateSectionData extends Partial<CreateSectionData> {}

interface CreateLessonData {
  title: string;
  description?: string;
  duration: string;
  videoUrl: string;
  preview?: boolean;
  position?: number;
}

interface UpdateLessonData extends Partial<CreateLessonData> {}

// Error handling helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = async (res: Response): Promise<any> => {
  const data = await res.json();
  toast.error(data.message || data.error || 'Something went wrong');
  return data;
};

// ===== COURSE MANAGEMENT =====

/**
 * Get all courses with admin filtering capabilities
 */
export const getAllCourses = async (
  token: string,
  params?: GetCoursesParams
): Promise<CoursesListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.level) queryParams.append('level', params.level);
    if (params?.instructorId) queryParams.append('instructorId', params.instructorId);
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
    if (params?.bestseller !== undefined) queryParams.append('bestseller', params.bestseller.toString());
    if (params?.sale !== undefined) queryParams.append('sale', params.sale.toString());
    if (params?.arabicLanguage !== undefined) queryParams.append('arabicLanguage', params.arabicLanguage.toString());

    const queryString = queryParams.toString();
    const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching courses');
    return { success: false, error: String(error) };
  }
};

/**
 * Get course by ID with full access (admin/instructor view)
 */
export const getCourseById = async (token: string, courseId: string): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching course');
    return { success: false, error: String(error) };
  }
};

/**
 * Create a new course
 */
export const createCourse = async (
  token: string,
  courseData: CreateCourseData
): Promise<CourseResponse> => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(courseData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Course created successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while creating course');
    return { success: false, error: String(error) };
  }
};

/**
 * Update an existing course
 */
export const updateCourse = async (
  token: string,
  courseId: string,
  courseData: UpdateCourseData
): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(courseData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Course updated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while updating course');
    return { success: false, error: String(error) };
  }
};

/**
 * Delete a course
 */
export const deleteCourse = async (token: string, courseId: string): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Course deleted successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deleting course');
    return { success: false, error: String(error) };
  }
};

/**
 * Publish a course
 */
export const publishCourse = async (token: string, courseId: string): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/publish`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Course published successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while publishing course');
    return { success: false, error: String(error) };
  }
};

/**
 * Unpublish a course
 */
export const unpublishCourse = async (token: string, courseId: string): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/unpublish`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Course unpublished successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while unpublishing course');
    return { success: false, error: String(error) };
  }
};

// ===== CHAPTER MANAGEMENT =====

/**
 * Create a new chapter in a course
 */
export const createChapter = async (
  token: string,
  courseId: string,
  chapterData: CreateChapterData
): Promise<ChapterResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(chapterData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Chapter created successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while creating chapter');
    return { success: false, error: String(error) };
  }
};

/**
 * Update a chapter
 */
export const updateChapter = async (
  token: string,
  courseId: string,
  chapterId: string,
  chapterData: UpdateChapterData
): Promise<ChapterResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(chapterData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Chapter updated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while updating chapter');
    return { success: false, error: String(error) };
  }
};

/**
 * Delete a chapter
 */
export const deleteChapter = async (
  token: string,
  courseId: string,
  chapterId: string
): Promise<ChapterResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Chapter deleted successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deleting chapter');
    return { success: false, error: String(error) };
  }
};

// ===== SECTION MANAGEMENT =====

/**
 * Create a new section in a chapter
 */
export const createSection = async (
  token: string,
  courseId: string,
  chapterId: string,
  sectionData: CreateSectionData
): Promise<SectionResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sectionData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Section created successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while creating section');
    return { success: false, error: String(error) };
  }
};

/**
 * Update a section
 */
export const updateSection = async (
  token: string,
  courseId: string,
  chapterId: string,
  sectionId: string,
  sectionData: UpdateSectionData
): Promise<SectionResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}/sections/${sectionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sectionData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Section updated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while updating section');
    return { success: false, error: String(error) };
  }
};

/**
 * Delete a section
 */
export const deleteSection = async (
  token: string,
  courseId: string,
  chapterId: string,
  sectionId: string
): Promise<SectionResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}/sections/${sectionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Section deleted successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deleting section');
    return { success: false, error: String(error) };
  }
};

// ===== VIDEO LESSON MANAGEMENT =====

/**
 * Create a new video lesson in a section
 */
export const createVideoLesson = async (
  token: string,
  courseId: string,
  chapterId: string,
  sectionId: string,
  lessonData: CreateLessonData
): Promise<LessonResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}/sections/${sectionId}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(lessonData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Video lesson created successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while creating video lesson');
    return { success: false, error: String(error) };
  }
};

/**
 * Update a video lesson
 */
export const updateVideoLesson = async (
  token: string,
  courseId: string,
  chapterId: string,
  sectionId: string,
  lessonId: string,
  lessonData: UpdateLessonData
): Promise<LessonResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}/sections/${sectionId}/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(lessonData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Video lesson updated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while updating video lesson');
    return { success: false, error: String(error) };
  }
};

/**
 * Delete a video lesson
 */
export const deleteVideoLesson = async (
  token: string,
  courseId: string,
  chapterId: string,
  sectionId: string,
  lessonId: string
): Promise<LessonResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/chapters/${chapterId}/sections/${sectionId}/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Video lesson deleted successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deleting video lesson');
    return { success: false, error: String(error) };
  }
};

// ===== UTILITY FUNCTIONS =====

/**
 * Calculate total duration of all lessons in a course
 */
export const calculateCourseTotalDuration = (course: Course): number => {
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
 * Get course statistics
 */
export const getCourseStatistics = (course: Course) => {
  if (!course.chapters) {
    return {
      totalChapters: 0,
      totalSections: 0,
      totalLessons: 0,
      totalDurationMinutes: 0,
      previewLessons: 0
    };
  }

  let totalSections = 0;
  let totalLessons = 0;
  let totalDurationMinutes = 0;
  let previewLessons = 0;

  course.chapters.forEach(chapter => {
    totalSections += chapter.sections.length;
    
    chapter.sections.forEach(section => {
      totalLessons += section.lessons.length;
      
      section.lessons.forEach(lesson => {
        if (lesson.preview) previewLessons++;
        
        if (lesson.duration) {
          const [minutes, seconds] = lesson.duration.split(':').map(Number);
          totalDurationMinutes += minutes + (seconds / 60);
        }
      });
    });
  });

  return {
    totalChapters: course.chapters.length,
    totalSections,
    totalLessons,
    totalDurationMinutes: Math.round(totalDurationMinutes),
    previewLessons
  };
};

/**
 * Validate course data before creation/update
 */
export const validateCourseData = (courseData: CreateCourseData | UpdateCourseData): string[] => {
  const errors: string[] = [];

  if ('title' in courseData && (!courseData.title || courseData.title.trim().length < 3)) {
    errors.push('Course title must be at least 3 characters long');
  }

  if ('description' in courseData && (!courseData.description || courseData.description.trim().length < 10)) {
    errors.push('Course description must be at least 10 characters long');
  }

  if ('pricing' in courseData && courseData.pricing) {
    if (!courseData.pricing.lifetime || courseData.pricing.lifetime <= 0) {
      errors.push('Lifetime pricing is required and must be greater than 0');
    }
  }

  if ('discount' in courseData && courseData.discount !== undefined) {
    if (courseData.discount < 0 || courseData.discount > 100) {
      errors.push('Discount must be between 0 and 100');
    }
  }

  if ('totalLessons' in courseData && courseData.totalLessons !== undefined) {
    if (courseData.totalLessons < 0) {
      errors.push('Total lessons must be 0 or greater');
    }
  }

  return errors;
};

/**
 * Check if user can manage course (ownership or admin role)
 */
export const canManageCourse = (course: Course, userId: string, userRole: string): boolean => {
  return userRole === 'admin' || course.instructorId === userId;
};

/**
 * Get course content summary for admin dashboard
 */
export const getCourseSummary = (courses: Course[]) => {
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.isPublished).length;
  const draftCourses = totalCourses - publishedCourses;
  const coursesOnSale = courses.filter(course => course.sale).length;
  const bestsellerCourses = courses.filter(course => course.bestseller).length;
  const totalEnrollments = courses.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);

  const levelDistribution = courses.reduce((acc, course) => {
    acc[course.level] = (acc[course.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalCourses,
    publishedCourses,
    draftCourses,
    coursesOnSale,
    bestsellerCourses,
    totalEnrollments,
    levelDistribution,
    averageEnrollments: totalCourses > 0 ? Math.round(totalEnrollments / totalCourses) : 0
  };
};