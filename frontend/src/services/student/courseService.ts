import { Course, Chapter, VideoLesson } from "../../types/course";
import { Student, ChapterProgress } from "../../types/student";
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/courses";

interface CourseResponse {
  success: boolean;
  course?: Course;
  progress?: ChapterProgress[];
  accessLevel?: 'public' | 'student' | 'full';
  message?: string;
  error?: string;
}

// interface CoursesListResponse {
//   success: boolean;
//   courses?: Course[];
//   pagination?: {
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//   };
//   count?: number;
//   message?: string;
//   error?: string;
// }

// Error handling helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = async (res: Response): Promise<any> => {
  const data = await res.json();
  toast.error(data.message || data.error || 'Something went wrong');
  return data;
};

/**
 * Get student course view (full data for enrolled students)
 * Returns course content with progress tracking
 */
export const getStudentCourse = async (token: string, courseId: string): Promise<CourseResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/student`, {
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

// ===== STUDENT ACCESS UTILITIES =====

/**
 * Check if student has access to a specific course
 */
export const hasAccessToCourse = (student: Student, courseId: string): boolean => {
  // Check full course enrollment
  const courseEnrollment = student.enrolledCourses?.find(
    course => course.courseId === courseId
  );
  
  if (courseEnrollment) {
    return (courseEnrollment.accessType === 'lifetime' || 
           (courseEnrollment.endAt && new Date(courseEnrollment.endAt) > new Date())) ?? false;
  }
  
  // Check chapter-level enrollments
  const chapterEnrollments = student.enrolledChapters?.filter(
    chapter => chapter.courseId === courseId
  ) || [];
  
  return chapterEnrollments.some(chapter => 
    chapter.accessType === 'lifetime' ||
    (chapter.endAt && new Date(chapter.endAt) > new Date())
  );
};

/**
 * Check if student has access to a specific chapter
 */
export const hasAccessToChapter = (student: Student, courseId: string, chapterId: string): boolean => {
  // Check if has full course access
  const courseEnrollment = student.enrolledCourses?.find(
    course => course.courseId === courseId
  );
  
  if (courseEnrollment) {
    const hasValidAccess = courseEnrollment.accessType === 'lifetime' || 
                          (courseEnrollment.endAt && new Date(courseEnrollment.endAt) > new Date());
    if (hasValidAccess) return true;
  }
  
  // Check specific chapter access
  const chapterEnrollment = student.enrolledChapters?.find(
    chapter => chapter.courseId === courseId && chapter.chapterId === chapterId
  );
  
  if (chapterEnrollment) {
    return (chapterEnrollment.accessType === 'lifetime' ||
           (chapterEnrollment.endAt && new Date(chapterEnrollment.endAt) > new Date())) ?? false;
  }
  
  return false;
};

/**
 * Get student's course progress
 */
export const getCourseProgress = (student: Student, courseId: string): ChapterProgress[] | null => {
  const courseEnrollment = student.enrolledCourses?.find(
    course => course.courseId === courseId
  );
  
  return courseEnrollment?.progress || null;
};

/**
 * Get student's chapter progress
 */
export const getChapterProgress = (
  student: Student, 
  courseId: string, 
  chapterId: string
): string[] => {
  // Check full course enrollment progress first
  const courseEnrollment = student.enrolledCourses?.find(
    course => course.courseId === courseId
  );
  
  if (courseEnrollment?.progress) {
    const chapterProgress = courseEnrollment.progress.find(
      progress => progress.chapterId === chapterId
    );
    if (chapterProgress) return chapterProgress.watchedLessons;
  }
  
  // Check individual chapter enrollment
  const chapterEnrollment = student.enrolledChapters?.find(
    chapter => chapter.courseId === courseId && chapter.chapterId === chapterId
  );
  
  return chapterEnrollment?.watchedLessons || [];
};

/**
 * Check if a lesson is watched by student
 */
export const isLessonWatched = (
  student: Student, 
  courseId: string, 
  chapterId: string, 
  lessonId: string
): boolean => {
  const watchedLessons = getChapterProgress(student, courseId, chapterId);
  return watchedLessons.includes(lessonId);
};

/**
 * Calculate course completion percentage for student
 */
export const calculateCourseCompletionPercentage = (
  student: Student, 
  course: Course
): number => {
  if (!course.chapters || course.chapters.length === 0) return 0;
  
  let totalLessons = 0;
  let watchedLessons = 0;
  
  course.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      totalLessons += section.lessons.length;
      
      const chapterProgress = getChapterProgress(student, course._id, chapter._id);
      section.lessons.forEach(lesson => {
        if (chapterProgress.includes(lesson._id)) {
          watchedLessons++;
        }
      });
    });
  });
  
  return totalLessons > 0 ? Math.round((watchedLessons / totalLessons) * 100) : 0;
};

/**
 * Calculate chapter completion percentage for student
 */
export const calculateChapterCompletionPercentage = (
  student: Student, 
  courseId: string, 
  chapter: Chapter
): number => {
  let totalLessons = 0;
  let watchedLessons = 0;
  
  chapter.sections.forEach(section => {
    totalLessons += section.lessons.length;
  });
  
  const chapterProgress = getChapterProgress(student, courseId, chapter._id);
  watchedLessons = chapterProgress.length;
  
  return totalLessons > 0 ? Math.round((watchedLessons / totalLessons) * 100) : 0;
};

/**
 * Get next unwatched lesson for student in a course
 */
export const getNextUnwatchedLesson = (
  student: Student, 
  course: Course
): { 
  chapterId: string; 
  sectionId: string; 
  lessonId: string; 
  lesson: VideoLesson;
  chapterTitle: string;
  sectionTitle: string;
} | null => {
  if (!course.chapters) return null;
  
  for (const chapter of course.chapters) {
    // Check if student has access to this chapter
    if (!hasAccessToChapter(student, course._id, chapter._id)) continue;
    
    const watchedLessons = getChapterProgress(student, course._id, chapter._id);
    
    for (const section of chapter.sections) {
      for (const lesson of section.lessons) {
        if (!watchedLessons.includes(lesson._id)) {
          return {
            chapterId: chapter._id,
            sectionId: section._id,
            lessonId: lesson._id,
            lesson,
            chapterTitle: chapter.title,
            sectionTitle: section.title
          };
        }
      }
    }
  }
  
  return null; // All lessons watched
};

/**
 * Get student's enrollment details for a course
 */
export const getEnrollmentDetails = (student: Student, courseId: string) => {
  const courseEnrollment = student.enrolledCourses?.find(
    course => course.courseId === courseId
  );
  
  if (courseEnrollment) {
    return {
      type: 'full_course',
      enrolledAt: courseEnrollment.enrolledAt,
      endAt: courseEnrollment.endAt,
      accessType: courseEnrollment.accessType,
      isActive: courseEnrollment.accessType === 'lifetime' || 
               (courseEnrollment.endAt && new Date(courseEnrollment.endAt) > new Date()),
      progress: courseEnrollment.progress || []
    };
  }
  
  const chapterEnrollments = student.enrolledChapters?.filter(
    chapter => chapter.courseId === courseId
  ) || [];
  
  if (chapterEnrollments.length > 0) {
    return {
      type: 'chapter_access',
      enrollments: chapterEnrollments.map(chapter => ({
        chapterId: chapter.chapterId,
        enrolledAt: chapter.enrolledAt,
        endAt: chapter.endAt,
        accessType: chapter.accessType,
        isActive: chapter.accessType === 'lifetime' || 
                 (chapter.endAt && new Date(chapter.endAt) > new Date()),
        watchedLessons: chapter.watchedLessons || []
      }))
    };
  }
  
  return null; // No enrollment found
};

/**
 * Get accessible chapters for student in a course
 */
export const getAccessibleChapters = (student: Student, course: Course): Chapter[] => {
  if (!course.chapters) return [];
  
  // If student has full course access, return all chapters
  const courseEnrollment = student.enrolledCourses?.find(
    courseEnroll => courseEnroll.courseId === course._id
  );
  
  if (courseEnrollment) {
    const hasValidAccess = courseEnrollment.accessType === 'lifetime' || 
                          (courseEnrollment.endAt && new Date(courseEnrollment.endAt) > new Date());
    if (hasValidAccess) return course.chapters;
  }
  
  // Filter chapters based on individual chapter access
  return course.chapters.filter(chapter => 
    hasAccessToChapter(student, course._id, chapter._id)
  );
};

/**
 * Get accessible lessons for student in a chapter
 */
export const getAccessibleLessons = (
  student: Student, 
  courseId: string, 
  chapter: Chapter
): VideoLesson[] => {
  if (!hasAccessToChapter(student, courseId, chapter._id)) {
    // Return only preview lessons if no access
    const previewLessons: VideoLesson[] = [];
    chapter.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        if (lesson.preview) {
          previewLessons.push(lesson);
        }
      });
    });
    return previewLessons;
  }
  
  // Return all lessons if has access
  const allLessons: VideoLesson[] = [];
  chapter.sections.forEach(section => {
    allLessons.push(...section.lessons);
  });
  return allLessons;
};

/**
 * Get student's learning statistics across all courses
 */
export const getStudentLearningStatistics = (student: Student) => {
  const totalCourseEnrollments = student.enrolledCourses?.length || 0;
  const totalChapterEnrollments = student.enrolledChapters?.length || 0;
  
  const activeCourseEnrollments = student.enrolledCourses?.filter(course => 
    course.accessType === 'lifetime' || 
    (course.endAt && new Date(course.endAt) > new Date())
  ).length || 0;
  
  const activeChapterEnrollments = student.enrolledChapters?.filter(chapter => 
    chapter.accessType === 'lifetime' || 
    (chapter.endAt && new Date(chapter.endAt) > new Date())
  ).length || 0;
  
  const totalWatchedLessons = (student.enrolledCourses || []).reduce((total, course) => {
    return total + (course.progress || []).reduce((courseTotal, chapter) => {
      return courseTotal + chapter.watchedLessons.length;
    }, 0);
  }, 0) + (student.enrolledChapters || []).reduce((total, chapter) => {
    return total + (chapter.watchedLessons || []).length;
  }, 0);
  
  return {
    totalCourseEnrollments,
    totalChapterEnrollments,
    activeCourseEnrollments,
    activeChapterEnrollments,
    totalEnrollments: totalCourseEnrollments + totalChapterEnrollments,
    activeEnrollments: activeCourseEnrollments + activeChapterEnrollments,
    totalWatchedLessons,
    totalBooks: student.boughtBooks?.length || 0
  };
};

/**
 * Filter course content based on student access level
 */
export const filterCourseForStudent = (course: Course, student: Student): Course => {
  const filteredCourse = { ...course };
  
  if (!course.chapters) return filteredCourse;
  
  filteredCourse.chapters = course.chapters.map(chapter => {
    const hasChapterAccess = hasAccessToChapter(student, course._id, chapter._id);
    
    return {
      ...chapter,
      sections: chapter.sections.map(section => ({
        ...section,
        lessons: section.lessons.map(lesson => ({
          ...lesson,
          // Only include video URL if student has access or it's a preview
          videoUrl: hasChapterAccess || lesson.preview ? lesson.videoUrl : undefined
        }))
      })),
      // Remove resources if no access
      ressources: hasChapterAccess ? chapter.ressources : undefined
    };
  });
  
  // Remove live sessions resources if not enrolled
  if (filteredCourse.LiveSessions && !hasAccessToCourse(student, course._id)) {
    filteredCourse.LiveSessions = filteredCourse.LiveSessions.map(session => ({
      ...session,
      ressources: [],
      link: undefined,
      note: undefined
    }));
  }
  
  return filteredCourse;
};