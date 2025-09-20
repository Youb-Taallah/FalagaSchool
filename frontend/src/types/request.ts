type BaseRequest = {
  _id: string;
  studentId: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  price: number;
  note?: string;
  reason?: string;
};

type CourseRequest = BaseRequest & {
  type: 'course';
  courseId: string;
  accesType: "temporary" | "lifetime";
  accessUntil?: Date;
};

type ChapterRequest = BaseRequest & {
  type: 'chapter';
  chapterId: string;
  courseId: string;
  accesType: "temporary" | "lifetime";
  accessUntil?: Date;
};

type BookRequest = BaseRequest & {
  type: 'book';
  bookId: string;
};

export type Request = CourseRequest | ChapterRequest | BookRequest;