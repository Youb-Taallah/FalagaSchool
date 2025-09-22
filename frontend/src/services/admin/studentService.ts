import { Student } from "../../types/student";
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
  data?: Student[];
  pagination?: {
    current: number;
    pages: number;
    total: number;
  };
  message?: string;
  error?: string;
}

interface UpdateStudentData {
  name?: string;
  phone?: string;
  educationLevel?: string;
  city?: string;
  avatar?: string;
}

interface EnrollCourseData {
  courseId: string;
  accessType: 'temporary' | 'lifetime';
  endAt?: string; // ISO date string for temporary access
}

interface EnrollChapterData {
  courseId: string;
  chapterId: string;
  accessType: 'temporary' | 'lifetime';
  endAt?: string; // ISO date string for temporary access
}

interface BuyBookData {
  bookId: string;
}

interface GetStudentsParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'suspended' | 'pending';
  educationLevel?: string;
  city?: string;
  search?: string;
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

// Error handling helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = async (res: Response): Promise<any> => {
  const data = await res.json();
  toast.error(data.message || data.error || 'Something went wrong');
  return data;
};

export const getAllStudents = async (
  token: string,
  params?: GetStudentsParams
): Promise<StudentsListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.educationLevel) queryParams.append('educationLevel', params.educationLevel);
    if (params?.city) queryParams.append('city', params.city);
    if (params?.search) queryParams.append('search', params.search);

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
    toast.error('Network error while fetching students');
    return { success: false, error: String(error) };
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

export const suspendStudent = async (
  token: string,
  studentId: string
): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/suspend`, {
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

export const activateStudent = async (
  token: string,
  studentId: string
): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/activate`, {
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

export const enrollStudentInCourse = async (
  token: string,
  studentId: string,
  enrollmentData: EnrollCourseData
): Promise<StudentResponse> => {
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
    toast.error('Network error while enrolling student in course');
    return { success: false, error: String(error) };
  }
};

export const enrollStudentInChapter = async (
  token: string,
  studentId: string,
  enrollmentData: EnrollChapterData
): Promise<StudentResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/enroll/chapter`, {
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
      toast.success(result.message || 'Student enrolled in chapter successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while enrolling student in chapter');
    return { success: false, error: String(error) };
  }
};

export const buyBookForStudent = async (
  token: string,
  studentId: string,
  bookData: BuyBookData
): Promise<StudentResponse> => {
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
      toast.success(result.message || 'Book purchased for student successfully');
    }
    return result;
  } catch (error) {
    toast.error('Network error while purchasing book for student');
    return { success: false, error: String(error) };
  }
};

export const getCourseProgress = async ( token: string, studentId: string, courseId: string ): Promise<ProgressResponse> => {
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

export const getChapterProgress = async ( token: string, studentId: string, courseId: string, chapterId: string ): Promise<ProgressResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/${studentId}/progress/${courseId}/${chapterId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) return await handleError(res);
    return await res.json();
  } catch (error) {
    toast.error('Network error while fetching chapter progress');
    return { success: false, error: String(error) };
  }
};

// Utility functions for admin use
export const isStudentEnrolledInCourse = (student: Student, courseId: string): boolean => {
  return student.enrolledCourses?.some(course => course.courseId === courseId) ?? false;
};

export const isStudentEnrolledInChapter = (student: Student, courseId: string, chapterId: string): boolean => {
  return student.enrolledChapters?.some(
    chapter => chapter.courseId === courseId && chapter.chapterId === chapterId
  ) ?? false;
};

export const hasStudentPurchasedBook = (student: Student, bookId: string): boolean => {
  return student.boughtBooks?.some(book => book.bookId === bookId) ?? false;
};

export const getStudentEnrollmentStatus = (student: Student, courseId: string) => {
  const courseEnrollment = student.enrolledCourses?.find(course => course.courseId === courseId) ?? false;
  if (courseEnrollment) {
    return {
      type: 'course',
      enrollment: courseEnrollment,
      hasAccess: courseEnrollment.accessType === 'lifetime' || 
                 (courseEnrollment.endAt && new Date(courseEnrollment.endAt) > new Date())
    };
  }

  const chapterEnrollments = student.enrolledChapters?.filter(chapter => chapter.courseId === courseId) ?? [];
  if (chapterEnrollments.length > 0) {
    return {
      type: 'chapters',
      enrollments: chapterEnrollments,
      hasAccess: chapterEnrollments.some(chapter => 
        chapter.accessType === 'lifetime' ||
        (chapter.endAt && new Date(chapter.endAt) > new Date())
      )
    };
  }

  return {
    type: 'none',
    hasAccess: false
  };
};

export const getStudentSummary = (student: Student) => {
  return {
    totalCourses: student.enrolledCourses?.length ?? 0,
    totalChapters: student.enrolledChapters?.length ?? 0,
    totalBooks: student.boughtBooks?.length ?? 0,
    activeCourses: student.enrolledCourses?.filter(course => 
      course.accessType === 'lifetime' || 
      (course.endAt && new Date(course.endAt) > new Date())
    ).length ?? 0,
    activeChapters: student.enrolledChapters?.filter(chapter => 
      chapter.accessType === 'lifetime' || 
      (chapter.endAt && new Date(chapter.endAt) > new Date())
    ).length ?? 0,
    status: student.status
  };
};