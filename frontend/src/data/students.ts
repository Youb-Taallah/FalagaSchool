import { Student } from "../types/student";

export const mockStudents: Student[] = [];



export const createDefaultStudent = () => {
    
    // Create a default student object
    const student: Student = {
        id: "stu-12345",
        userId: "user-67890",
        status: "active",
        phone: "+1234567890",
        name: "John Doe",
        city: "New York",
        avatar: "https://example.com/avatars/john.jpg",
        educationLevel: "High School",
        enrolledCourses: [
            {
                courseId: "course_001", // Python Bootcamp course ID
                enrolledAt: new Date("2023-11-01"),
                endAt: new Date("2024-05-01"), // 6 months access
                accessType: "temporary",
                progress: [
                    {
                        chapterId: "chapter_001", // Python Fundamentals chapter
                        watchedLessons: [
                            "lesson_001", // Introduction to Python and Its Ecosystem
                            "lesson_002", // Setting Up Your Python Environment
                            "lesson_004"  // Variables and Data Types in Depth
                        ]
                    },
                    {
                        chapterId: "chapter_002", // Functions and Modules chapter
                        watchedLessons: [
                            "lesson_008"  // Defining and Calling Functions
                        ]
                    }
                ]
            }
        ],
        enrolledChapters: [
            {
                courseId: "course_002",
                chapterId: "chapter_005",
                enrolledAt: new Date("2023-02-10"),
                accessType: "lifetime",
                watchedLessons: ["lesson_010"]
            }
        ],
        boughtBooks: [
            {
                bookId: "book_001",
                purchasedAt: new Date("2023-03-05")
            }
        ]
    };
    
    return student;
};