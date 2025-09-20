import { Request } from "../types/request";

export const mockRequests: Request[] = [
  // Course Requests
  {
    _id: "req_c_001",
    studentId: "stud_123",
    title: "Enrollment in Advanced Python Course",
    status: "approved",
    type: "course",
    courseId: "course_789",
    price: 149.99,
    accesType: "lifetime",
    submittedAt: new Date("2023-10-05"),
    reviewedAt: new Date("2023-10-06"),
    reason: "Automatically approved for premium members"
  },
  {
    _id: "req_c_002",
    studentId: "stud_456",
    title: "Request for Machine Learning Fundamentals",
    status: "pending",
    type: "course",
    courseId: "course_456",
    price: 99.99,
    accesType: "temporary",
    accessUntil: new Date("2023-12-18T23:59:59"),
    submittedAt: new Date("2023-11-18T11:45:00")
  },
  {
    _id: "req_c_003",
    studentId: "stud_789",
    title: "Data Science Specialization Access",
    status: "rejected",
    type: "course",
    courseId: "course_123",
    price: 179.99,
    accesType: "lifetime",
    submittedAt: new Date("2023-11-10T16:20:00"),
    reviewedAt: new Date("2023-11-12T10:15:00"),
    reason: "Prerequisite courses not completed"
  },

  // Chapter Requests
  {
    _id: "req_ch_004",
    studentId: "stud_123",
    title: "Access to Neural Networks Chapter",
    status: "approved",
    type: "chapter",
    chapterId: "chap_789",
    courseId: "course_456",
    price: 29.99,
    accesType: "temporary",
    accessUntil: new Date("2023-12-15T23:59:59"),
    submittedAt: new Date("2023-11-15T13:10:00"),
    reviewedAt: new Date("2023-11-15T15:45:00")
  },
  {
    _id: "req_ch_005",
    studentId: "stud_321",
    title: "Request for React Hooks Chapter",
    status: "pending",
    type: "chapter",
    chapterId: "chap_123",
    courseId: "course_789",
    price: 24.99,
    accesType: "lifetime",
    submittedAt: new Date("2023-11-19T09:30:00")
  },
  {
    _id: "req_ch_006",
    studentId: "stud_456",
    title: "Advanced Algorithms Chapter Access",
    status: "rejected",
    type: "chapter",
    chapterId: "chap_456",
    courseId: "course_123",
    price: 34.99,
    accesType: "temporary",
    accessUntil: new Date("2023-12-31T23:59:59"),
    submittedAt: new Date("2023-11-17T14:15:00"),
    reviewedAt: new Date("2023-11-18T11:00:00"),
    reason: "Course not purchased"
  },

  // Book Requests
  {
    _id: "req_b_007",
    studentId: "stud_789",
    title: "Request for Clean Code eBook",
    status: "approved",
    type: "book",
    bookId: "book_123",
    price: 39.99,
    submittedAt: new Date("2023-11-12T10:30:00"),
    reviewedAt: new Date("2023-11-12T12:45:00")
  },
  {
    _id: "req_b_008",
    studentId: "stud_123",
    title: "Design Patterns Book Access",
    status: "pending",
    type: "book",
    bookId: "book_456",
    price: 29.99,
    submittedAt: new Date("2023-11-19T08:20:00")
  },
  {
    _id: "req_b_009",
    studentId: "stud_321",
    title: "Request for System Architecture Book",
    status: "rejected",
    type: "book",
    bookId: "book_789",
    price: 49.99,
    submittedAt: new Date("2023-11-15T16:40:00"),
    reviewedAt: new Date("2023-11-16T09:15:00"),
    reason: "Book not available in your region"
  },
  // Additional sample requests
  {
    _id: "req_c_010",
    studentId: "stud_456",
    title: "Web Development Bootcamp Enrollment",
    status: "approved",
    type: "course",
    courseId: "course_101",
    price: 199.99,
    accesType: "lifetime",
    submittedAt: new Date("2023-11-20T14:25:00"),
    reviewedAt: new Date("2023-11-21T10:15:00")
  },
  {
    _id: "req_ch_011",
    studentId: "stud_789",
    title: "Advanced State Management Chapter",
    status: "pending",
    type: "chapter",
    chapterId: "chap_202",
    courseId: "course_303",
    price: 19.99,
    accesType: "temporary",
    accessUntil: new Date("2023-12-10T23:59:59"),
    submittedAt: new Date("2023-11-22T16:40:00")
  }
];