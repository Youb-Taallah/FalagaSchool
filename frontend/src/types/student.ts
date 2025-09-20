export interface ChapterProgress {
    chapterId: string;
    watchedLessons: string[]; //LessonId[]
}

export interface EnrolledCourse {
    courseId: string;
    enrolledAt: Date;
    endAt?: Date;
    accessType: "temporary" | "lifetime";
    progress?: ChapterProgress[];
}

export interface EnrolledChapter{
    courseId: string;
    chapterId: string;
    enrolledAt: Date;
    endAt?: Date;
    accessType: "temporary" | "lifetime";
    watchedLessons?: string[]; //LessonId[]
}

export interface BoughtBook {
    bookId: string;
    purchasedAt: Date;
}

export interface Student {
    _id: string;
    userId: string;
    status: 'active' | 'suspended' | 'pending';
    phone?: string;
    name?: string;
    city?: string;
    avatar?: string;
    educationLevel?: string;
    enrolledCourses?: EnrolledCourse[];
    enrolledChapters?: EnrolledChapter[];
    boughtBooks?: BoughtBook[];
};