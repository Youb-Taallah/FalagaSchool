export interface User {
    id: string;
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    fullName: string;
    imageUrl?: string;
    role: 'student' | 'instructor' | 'admin';
    isActive: boolean;
    createdAt: Date;
    profile?: {
      bio?: string;
      phone?: string;
      dateOfBirth?: Date;
      location?: string;
    };
    preferences?: {
      notifications: {
        email: boolean;
        push: boolean;
      };
      theme: 'light' | 'dark' | 'auto';
    };
  }