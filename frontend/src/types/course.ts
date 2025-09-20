export interface pricing {
  1?: number;
  3?: number;
  10?: number;
  lifetime: number;
}

export interface ressource {
  _id: string;
  title: string;
  url: string;
}

export interface VideoLesson {
  _id: string;
  position: number,
  title: string;
  description?: string;
  duration: string; // Format: "MM:SS"
  videoUrl: string;
  preview: boolean;
}

export interface Section {
  _id: string;
  position: number;
  title: string;
  lessons: VideoLesson[];
}

export interface Chapter {
  _id: string;
  position: number;
  title: string;
  description?: string;
  sections: Section[];
  ressources?: ressource[];
  pricing?: pricing;
  duration?: string;
}

export interface LiveSession {
  _id: string;
  title: string;
  date: string;
  duration: number;
  ressources: ressource[];
  note?: string;
  link?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructorId: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  totalLessons: number;
  chapters: Chapter[]; // Changed from sections to chapters
  tags: string[];
  requirements: string[];
  whatYouWillLearn: string[];
  publishedAt: Date;
  pricing: pricing;
  originalPrice?: number;
  sale?: boolean;
  bestseller?: boolean;
  discount?: number; // Percentage discount
  enrolledStudents?: number;
  LiveSessions?: LiveSession[];
  arabicLanguage? : boolean;
  isPublished: boolean;
}