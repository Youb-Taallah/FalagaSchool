export interface Instructor {
    _id: string;
    name: string;
    phone: string;
    title: string;
    bio: string;
    shortBio?: string;
    avatar?: string;
    areasOfExpertise: string[];  // e.g., ["Python", "Machine Learning"]
    status: 'active' | 'inactive';
    coursesTaught?: string[];    // Array of course IDs
}