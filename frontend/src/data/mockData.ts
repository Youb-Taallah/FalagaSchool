import { Course } from '../types/course';

export const mockInstructors = [
  { _id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@example.com' },
  { _id: '2', name: 'Prof. Michael Chen', email: 'michael.chen@example.com' },
  { _id: '3', name: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@example.com' },
  { _id: '4', name: 'Dr. Ahmed Hassan', email: 'ahmed.hassan@example.com' },
  { _id: '5', name: 'Prof. Lisa Wang', email: 'lisa.wang@example.com' },
];

export const mockCourses: Course[] = [
  {
    _id: '1',
    title: 'Complete React Development Course',
    description: 'Master React.js from beginner to advanced level with hands-on projects and real-world applications.',
    instructorId: '1',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
    level: 'Intermediate',
    duration: '24:30:00',
    totalLessons: 89,
    chapters: [
      {
        _id: 'c1-1',
        position: 1,
        title: 'React Fundamentals',
        description: 'Learn the core concepts of React including components, JSX, and state management.',
        duration: '6:45:00',
        sections: [
          {
            _id: 's1-1',
            position: 1,
            title: 'Getting Started with React',
            lessons: [
              {
                _id: 'l1-1',
                position: 1,
                title: 'Introduction to React',
                description: 'Overview of React and its ecosystem',
                duration: '15:30',
                videoUrl: 'https://example.com/video1',
                preview: true
              },
              {
                _id: 'l1-2',
                position: 2,
                title: 'Setting up Development Environment',
                description: 'Configure your workspace for React development',
                duration: '12:45',
                videoUrl: 'https://example.com/video2',
                preview: false
              }
            ]
          }
        ],
        ressources: [
          {
            _id: 'r1-1',
            title: 'React Documentation',
            url: 'https://react.dev'
          }
        ]
      }
    ],
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    requirements: ['Basic JavaScript knowledge', 'HTML & CSS fundamentals'],
    whatYouWillLearn: [
      'Build modern React applications',
      'Understand component lifecycle',
      'Master state management',
      'Work with React Hooks'
    ],
    publishedAt: new Date('2024-01-15'),
    pricing: {
      1: 49.99,
      3: 39.99,
      10: 29.99,
      lifetime: 149.99
    },
    originalPrice: 199.99,
    sale: true,
    bestseller: true,
    discount: 25,
    enrolledStudents: 1247,
    arabicLanguage: false,
    isPublished: true
  },
  {
    _id: '2',
    title: 'Advanced Python Programming',
    description: 'Deep dive into advanced Python concepts, data structures, algorithms, and best practices.',
    instructorId: '2',
    thumbnail: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=500',
    level: 'Advanced',
    duration: '18:15:00',
    totalLessons: 67,
    chapters: [],
    tags: ['Python', 'Programming', 'Data Structures', 'Algorithms'],
    requirements: ['Intermediate Python knowledge', 'Basic computer science concepts'],
    whatYouWillLearn: [
      'Advanced Python patterns',
      'Performance optimization',
      'Data structures and algorithms',
      'Best practices and code review'
    ],
    publishedAt: new Date('2024-02-01'),
    pricing: {
      1: 59.99,
      3: 49.99,
      10: 39.99,
      lifetime: 179.99
    },
    sale: false,
    bestseller: false,
    enrolledStudents: 892,
    arabicLanguage: false,
    isPublished: true
  },
  {
    _id: '3',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the foundations of machine learning with practical examples and hands-on projects.',
    instructorId: '3',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
    level: 'Beginner',
    duration: '32:00:00',
    totalLessons: 124,
    chapters: [],
    tags: ['Machine Learning', 'Python', 'Data Science', 'AI'],
    requirements: ['Basic Python programming', 'High school mathematics'],
    whatYouWillLearn: [
      'ML algorithms and concepts',
      'Data preprocessing techniques',
      'Model evaluation and validation',
      'Real-world ML projects'
    ],
    publishedAt: new Date('2024-01-20'),
    pricing: {
      lifetime: 299.99
    },
    originalPrice: 399.99,
    sale: true,
    bestseller: true,
    discount: 25,
    enrolledStudents: 2341,
    arabicLanguage: true,
    isPublished: true
  },
  {
    _id: '4',
    title: 'Web Development Bootcamp - Draft',
    description: 'Complete full-stack web development course covering frontend and backend technologies.',
    instructorId: '4',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    level: 'All Levels',
    duration: '45:30:00',
    totalLessons: 156,
    chapters: [],
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Node.js'],
    requirements: ['No prior experience required'],
    whatYouWillLearn: [
      'HTML, CSS, and JavaScript',
      'Frontend frameworks',
      'Backend development with Node.js',
      'Database design and management'
    ],
    publishedAt: new Date('2024-03-01'),
    pricing: {
      1: 79.99,
      3: 69.99,
      10: 59.99,
      lifetime: 249.99
    },
    sale: false,
    bestseller: false,
    enrolledStudents: 0,
    arabicLanguage: false,
    isPublished: false
  },
  {
    _id: '5',
    title: 'Data Science with R',
    description: 'Comprehensive course on statistical computing and data visualization using R programming language.',
    instructorId: '5',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=500',
    level: 'Intermediate',
    duration: '28:45:00',
    totalLessons: 98,
    chapters: [],
    tags: ['R Programming', 'Data Science', 'Statistics', 'Visualization'],
    requirements: ['Basic statistics knowledge', 'Some programming experience'],
    whatYouWillLearn: [
      'R programming fundamentals',
      'Statistical analysis techniques',
      'Data visualization with ggplot2',
      'Advanced data manipulation'
    ],
    publishedAt: new Date('2024-02-15'),
    pricing: {
      1: 69.99,
      3: 59.99,
      10: 49.99,
      lifetime: 199.99
    },
    sale: false,
    bestseller: false,
    enrolledStudents: 567,
    arabicLanguage: false,
    isPublished: true
  }
];