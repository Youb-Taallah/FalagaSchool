import { Student} from "../types/student"

import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/students";

interface StudentResponse {
  success: boolean;
  message?: string;
  data?: Student;
  error?: string;
  errors?: unknown[];
}

interface StudentsListResponse {
  success: boolean;
  data: Student[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
  message?: string;
  error?: string;
}

interface ProgressResponse {
  success: boolean;
  data?: {
    studentId: string;
    courseId: string;
    progress: unknown;
  };
  message?: string;
  error?: string;
}

// Request parameter interfaces
interface GetAllStudentsParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'suspended';
  educationLevel?: string;
  city?: string;
  search?: string;
}

interface CreateStudentData {
  name: string;
  phone: string;
  educationLevel: string;
  city: string;
}

interface UpdateStudentData {
  name?: string;
  phone?: string;
  educationLevel?: string;
  city?: string;
  avatar?: string;
}

interface CourseEnrollmentData {
  courseId: string;
  accessType: string;
  endAt?: string;
}

interface ChapterEnrollmentData {
  courseId: string;
  chapterId: string;
  accessType: string;
  endAt?: string;
}

interface LessonProgressData {
  courseId: string;
  chapterId: string;
  lessonId: string;
}

interface BookPurchaseData {
  bookId: string;
}

// Error handling helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = async (res: Response): Promise<any> => {
  const data = await res.json();
  toast.error(data.message || data.error || 'Something went wrong');
  return data;
};

// Service functions
export const getAllStudents = async ( token: string, params: GetAllStudentsParams = {} ): Promise<StudentsListResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.educationLevel) searchParams.append('educationLevel', params.educationLevel);
    if (params.city) searchParams.append('city', params.city);
    if (params.search) searchParams.append('search', params.search);

    const url = `${BASE_URL}?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching students');
    return {
      success: false,
      error: String(error),
      data: [],
      pagination: { current: 1, pages: 0, total: 0 }
    };
  }
};

export const getStudentById = async (token: string, id: string): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching student');
    return { success: false, error: String(error) };
  }
};

export const getStudentByUserId = async (token: string, userId: string): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching student');
    return { success: false, error: String(error) };
  }
};

export const createStudent = async ( token: string, studentData: CreateStudentData ): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(studentData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Student created successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while creating student');
    return { success: false, error: String(error) };
  }
};

export const updateStudent = async ( token: string, id: string, studentData: UpdateStudentData ): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(studentData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Student updated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while updating student');
    return { success: false, error: String(error) };
  }
};

export const deleteStudent = async (token: string, id: string): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Student deleted successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while deleting student');
    return { success: false, error: String(error) };
  }
};

export const suspendStudent = async (token: string, id: string): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/suspend`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Student suspended successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while suspending student');
    return { success: false, error: String(error) };
  }
};

export const activateStudent = async (token: string, id: string): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/activate`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Student activated successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while activating student');
    return { success: false, error: String(error) };
  }
};

export const enrollInCourse = async ( token: string, studentId: string, enrollmentData: CourseEnrollmentData ): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/enroll/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(enrollmentData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Student enrolled in course successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while enrolling in course');
    return { success: false, error: String(error) };
  }
};

export const enrollInChapter = async ( token: string, studentId: string, chapterData: ChapterEnrollmentData ): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/enroll/chapter`, {
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
      toast.success(result.message || 'Student enrolled in chapter successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while enrolling in chapter');
    return { success: false, error: String(error) };
  }
};

export const markLessonWatched = async ( token: string, studentId: string, lessonData: LessonProgressData ): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/progress/lesson`, {
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
      toast.success(result.message || 'Lesson marked as watched');
    }
    return result;
  } catch (error) {
    toast.error('Network error while marking lesson as watched');
    return { success: false, error: String(error) };
  }
};

export const getStudentProgress = async ( token: string, studentId: string, courseId: string ): Promise<ProgressResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/progress/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching student progress');
    return { success: false, error: String(error) };
  }
};

export const buyBook = async ( token: string, studentId: string, bookData: BookPurchaseData ): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookData)
    });

    if (!res.ok) return await handleError(res);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message || 'Book purchased successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while purchasing book');
    return { success: false, error: String(error) };
  }
};

// Utility functions
// export const getCurrentStudent = async (token: string, userId: string): Promise<StudentResponse> => {
//   return getStudentByUserId(token, userId);
// };

// export const isStudentEnrolledInCourse = (student: Student, courseId: string): boolean => {
//   return student.enrolledCourses.some(course => course.courseId === courseId);
// };

// export const isStudentEnrolledInChapter = (student: Student, courseId: string, chapterId: string): boolean => {
//   return student.enrolledChapters.some(
//     chapter => chapter.courseId === courseId && chapter.chapterId === chapterId
//   );
// };

// export const hasStudentPurchasedBook = (student: Student, bookId: string): boolean => {
//   return student.boughtBooks.some(book => book.bookId === bookId);
// };

// export const getStudentEnrollmentStatus = (student: Student, courseId: string) => {
//   const courseEnrollment = student.enrolledCourses.find(course => course.courseId === courseId);
//   if (courseEnrollment) {
//     return {
//       type: 'course',
//       enrollment: courseEnrollment,
//       hasAccess: !courseEnrollment.endAt || new Date(courseEnrollment.endAt) > new Date()
//     };
//   }

//   const chapterEnrollments = student.enrolledChapters.filter(chapter => chapter.courseId === courseId);
//   if (chapterEnrollments.length > 0) {
//     return {
//       type: 'chapters',
//       enrollments: chapterEnrollments,
//       hasAccess: chapterEnrollments.some(chapter => 
//         !chapter.endAt || new Date(chapter.endAt) > new Date()
//       )
//     };
//   }

//   return {
//     type: 'none',
//     hasAccess: false
//   };
// };