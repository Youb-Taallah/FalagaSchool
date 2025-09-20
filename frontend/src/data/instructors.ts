import { Instructor } from "../types/Instructor";


export const mockInstructors: Instructor[] = [
    {
        _id: "inst_789",
        name: "Dr. Sarah Chen",
        phone: "+21652634589",
        title: "Senior Machine Learning Engineer",
        bio: "10+ years experience at Google. Specialized in developing large-scale machine learning systems for search algorithms.",
        shortBio: "ML expert & Python enthusiast",
        avatar: "https://example.com/avatars/sarah-chen.jpg",
        areasOfExpertise: ["Python", "TensorFlow", "Neural Networks"],
        status: 'active',
    },
    {
        _id: "inst_456",
        name: "Prof. James Wilson",
        phone: "+21652652842",
        title: "Full Stack Developer & Educator",
        bio: "Former CTO at a successful startup, now passionate about teaching web development. Creator of several popular open-source libraries.",
        shortBio: "Web dev guru & JavaScript specialist",
        avatar: "https://example.com/avatars/james-wilson.jpg",
        areasOfExpertise: ["JavaScript", "React", "Node.js", "TypeScript"],
        status: 'active',
    },
    {
        _id: "inst_123",
        name: "Dr. Maria Rodriguez",
        phone: "+21696234529",
        title: "Data Science Lead",
        bio: "PhD in Computer Science with publications in top AI journals. Leads data science teams to extract insights from complex datasets.",
        shortBio: "Data scientist & R/Python expert",
        avatar: "https://example.com/avatars/maria-rodriguez.jpg",
        areasOfExpertise: ["Python", "R", "Pandas", "Data Visualization"],
        status: 'active',
    }
]