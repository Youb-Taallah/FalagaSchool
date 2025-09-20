import { Course } from "../types/course";

export const pythonBootcamp: Course = {
  _id: "course_001",
  title: "The Ultimate Python Bootcamp: From Zero to Hero",
  description: "Master Python programming through 200+ hands-on lessons covering fundamentals, web development, data science, automation, and more. This comprehensive bootcamp includes real-world projects and live coding sessions.",
  instructorId: "inst_789",
  thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  level: "Beginner",
  duration: "85 hours",
  totalLessons: 218,
  tags: ["Python", "Programming", "Data Science", "Web Development", "Automation", "Beginner", "Projects"],
  requirements: [
    "No prior programming experience needed",
    "Computer with internet access",
    "Windows/Mac/Linux OS"
  ],
  whatYouWillLearn: [
    "Python syntax and fundamentals",
    "Object-oriented programming concepts",
    "Building web applications with Django and Flask",
    "Data analysis with Pandas and NumPy",
    "Automation and scripting",
    "Working with APIs",
    "Database integration",
    "Testing and debugging",
    "Deployment strategies",
    "Real-world project development"
  ],
  pricing: {
    1: 29.99,
    3: 69.99,
    10: 129.99,
    lifetime: 149.99
  },
  originalPrice: 299.99,
  sale: true,
  bestseller: true,
  discount: 50,
  enrolledStudents: 8560,
  chapters: [
    {
      _id: "chapter_001",
      title: "Python Fundamentals",
      description: "Build a solid foundation with Python basics and core concepts",
      position: 1,
      duration: "8 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_001",
          title: "Getting Started with Python",
          position: 1,
          lessons: [
            {
              _id: "lesson_001",
              position: 1,
              title: "Introduction to Python and Its Ecosystem",
              duration: "18:22",
              videoUrl: "https://example.com/videos/python-intro-ecosystem.mp4",
              preview: true,
              description: "Overview of Python's features and popular use cases"
            },
            {
              _id: "lesson_002",
              position: 2,
              title: "Setting Up Your Python Environment",
              duration: "15:10",
              videoUrl: "https://example.com/videos/python-setup-env.mp4",
              description: "Installing Python, IDEs, and essential tools",
              preview: false
            },
            {
              _id: "lesson_003",
              position: 3,
              title: "Your First Python Program",
              duration: "12:45",
              videoUrl: "https://example.com/videos/python-first-program.mp4",
              preview: true
            }
          ]
        },
        {
          _id: "section_002",
          title: "Core Syntax and Concepts",
          position: 2,
          lessons: [
            {
              _id: "lesson_004",
              position: 1,
              title: "Variables and Data Types in Depth",
              duration: "22:30",
              videoUrl: "https://example.com/videos/python-variables-deep.mp4",
              preview: false
            },
            {
              _id: "lesson_005",
              position: 2,
              title: "Operators and Expressions",
              duration: "19:15",
              videoUrl: "https://example.com/videos/python-operators.mp4",
              preview: false
            },
            {
              _id: "lesson_006",
              position: 3,
              title: "Control Flow: Conditionals",
              duration: "25:40",
              videoUrl: "https://example.com/videos/python-conditionals.mp4",
              preview: false
            },
            {
              _id: "lesson_007",
              position: 4,
              title: "Loops and Iterations",
              duration: "28:10",
              videoUrl: "https://example.com/videos/python-loops.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_001",
          title: "Python Syntax Cheat Sheet",
          url: "https://example.com/resources/python-syntax-cheatsheet.pdf"
        },
        {
          _id: "res_002",
          title: "Recommended IDE Settings",
          url: "https://example.com/resources/python-ide-settings.pdf"
        }
      ]
    },
    {
      _id: "chapter_002",
      title: "Functions and Modules",
      description: "Learn to organize and reuse your code effectively",
      position: 2,
      duration: "6 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_003",
          title: "Working with Functions",
          position: 1,
          lessons: [
            {
              _id: "lesson_008",
              position: 1,
              title: "Defining and Calling Functions",
              duration: "20:15",
              videoUrl: "https://example.com/videos/python-functions.mp4",
              preview: true
            },
            {
              _id: "lesson_009",
              position: 2,
              title: "Parameters and Return Values",
              duration: "18:30",
              videoUrl: "https://example.com/videos/python-parameters.mp4",
              preview: false
            }
          ]
        }
      ]
    },
    {
      _id: "chapter_003",
      title: "Object-Oriented Programming",
      description: "Master classes, objects, and OOP principles in Python",
      position: 3,
      duration: "10 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_004",
      title: "Working with Files and Data",
      description: "Learn to read, write, and process different file formats",
      position: 4,
      duration: "7 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_005",
      title: "Web Development with Python",
      description: "Build web applications using Flask and Django",
      position: 5,
      duration: "15 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_006",
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis and visualization",
      position: 6,
      duration: "12 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_007",
      title: "Automation and Scripting",
      description: "Automate repetitive tasks with Python scripts",
      position: 7,
      duration: "8 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_008",
      title: "Working with APIs",
      description: "Connect your applications to web services",
      position: 8,
      duration: "6 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_009",
      title: "Testing and Debugging",
      description: "Ensure your code works as expected",
      position: 9,
      duration: "5 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_010",
      title: "Capstone Projects",
      description: "Apply everything you've learned to real-world projects",
      position: 10,
      duration: "8 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_025",
          title: "Final Projects",
          position: 1,
          lessons: [
            {
              _id: "lesson_098",
              position: 1,
              title: "Building a Web Scraper",
              duration: "45:20",
              videoUrl: "https://example.com/videos/python-web-scraper.mp4",
              preview: true
            },
            {
              _id: "lesson_099",
              position: 2,
              title: "Developing a Data Analysis Dashboard",
              duration: "52:15",
              videoUrl: "https://example.com/videos/python-dashboard.mp4",
              preview: false
            },
            {
              _id: "lesson_100",
              position: 3,
              title: "Creating an Automation Script",
              duration: "38:40",
              videoUrl: "https://example.com/videos/python-automation.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_015",
          title: "Project Ideas Catalog",
          url: "https://example.com/resources/python-project-ideas.pdf"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_001",
      title: "Python Fundamentals Q&A",
      date: "2023-12-15T18:00:00",
      duration: 60,
      link: "https://example.com/live/python-qa",
      note: "Bring your questions about Python basics",
      ressources: [
        {
          _id: "res_016",
          title: "Preparation Materials",
          url: "https://example.com/resources/python-qa-prep.pdf"
        }
      ]
    },
    {
      _id: "live_002",
      title: "Project Workshop: Web Scraping",
      date: "2023-12-22T17:00:00",
      duration: 90,
      link: "https://example.com/live/python-web-scraping",
      note: "We'll build a web scraper together - bring your code!",
      ressources: [
        {
          _id: "res_017",
          title: "Workshop Dataset",
          url: "https://example.com/resources/web-scraping-dataset.zip"
        }
      ]
    },
    {
      _id: "live_003",
      title: "Career Panel: Python Developers",
      date: "2024-01-05T19:00:00",
      duration: 120,
      link: "https://example.com/live/python-career-panel",
      note: "Hear from professional Python developers about their careers",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const advancedReactCourse: Course = {
  _id: "course_002",
  title: "Advanced React Patterns Masterclass",
  description: "Dive deep into professional React development with this comprehensive guide to advanced patterns, performance optimization, and production-ready practices. Learn from real-world scenarios and build enterprise-grade applications.",
  instructorId: "inst_456",
  thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
  level: "Advanced",
  duration: "42 hours",
  totalLessons: 156,
  tags: ["React", "JavaScript", "Frontend", "Hooks", "Performance", "Testing", "Architecture"],
  requirements: [
    "1+ years of React experience",
    "Strong JavaScript ES6+ knowledge",
    "Familiarity with basic React hooks",
    "Understanding of component lifecycle"
  ],
  whatYouWillLearn: [
    "Advanced hooks patterns and custom hooks",
    "Context API optimization strategies",
    "Performance benchmarking and optimization",
    "Advanced state management techniques",
    "Render optimization patterns",
    "Testing strategies for complex components",
    "TypeScript integration with React",
    "Micro-frontends architecture",
    "Server-side rendering with Next.js",
    "Production deployment optimizations"
  ],
  pricing: {
    1: 49.99,
    3: 89.99,
    10: 149.99,
    lifetime: 249.99
  },
  originalPrice: 299.99,
  bestseller: true,
  discount: 17,
  enrolledStudents: 3240,
  chapters: [
    {
      _id: "chapter_003",
      title: "Advanced Hooks Mastery",
      description: "Go beyond basic hooks and learn professional patterns",
      position: 1,
      duration: "8 hours",
      pricing: {
        1: 19.99,
        3: 34.99,
        10: 49.99,
        lifetime: 69.99
      },
      sections: [
        {
          _id: "section_004",
          title: "useReducer Deep Dive",
          position: 1,
          lessons: [
            {
              _id: "lesson_005",
              position: 1,
              title: "Managing Complex State with Reducer Pattern",
              duration: "28:45",
              videoUrl: "https://example.com/videos/react-reducer-advanced.mp4",
              preview: true,
              description: "Implementing finite state machines with useReducer"
            },
            {
              _id: "lesson_006",
              position: 2,
              title: "Reducer Composition Patterns",
              duration: "32:10",
              videoUrl: "https://example.com/videos/react-reducer-composition.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_005",
          title: "Custom Hooks Architecture",
          position: 2,
          lessons: [
            {
              _id: "lesson_007",
              position: 1,
              title: "Building Reusable Hook Libraries",
              duration: "35:20",
              videoUrl: "https://example.com/videos/react-custom-hooks.mp4",
              preview: true
            },
            {
              _id: "lesson_008",
              position: 2,
              title: "Hook Composition Patterns",
              duration: "24:15",
              videoUrl: "https://example.com/videos/react-hook-composition.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_101",
          title: "Advanced Hooks Cheat Sheet",
          url: "https://example.com/resources/react-hooks-cheatsheet.pdf"
        },
        {
          _id: "res_102",
          title: "State Management Decision Tree",
          url: "https://example.com/resources/react-state-management.pdf"
        }
      ]
    },
    {
      _id: "chapter_004",
      title: "Context API Optimization",
      description: "Learn professional patterns for context usage",
      position: 2,
      duration: "6 hours",
      pricing: {
        1: 17.99,
        3: 29.99,
        10: 39.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_006",
          title: "Context Performance",
          position: 1,
          lessons: [
            {
              _id: "lesson_009",
              position: 1,
              title: "Preventing Unnecessary Rerenders",
              duration: "31:45",
              videoUrl: "https://example.com/videos/react-context-performance.mp4",
              preview: true
            }
          ]
        }
      ]
    },
    {
      _id: "chapter_005",
      title: "Render Optimization",
      description: "Techniques to maximize rendering performance",
      position: 3,
      duration: "7 hours",
      pricing: {
        1: 19.99,
        3: 34.99,
        10: 49.99,
        lifetime: 69.99
      },
      sections: [
        // Additional sections on memoization, virtualization, etc.
      ]
    },
    {
      _id: "chapter_006",
      title: "Advanced State Management",
      description: "Beyond Redux - modern state solutions",
      position: 4,
      duration: "5 hours",
      pricing: {
        1: 17.99,
        3: 29.99,
        10: 39.99,
        lifetime: 59.99
      },
      sections: [
        // Sections on Zustand, Jotai, Recoil, etc.
      ]
    },
    {
      _id: "chapter_007",
      title: "TypeScript with React",
      description: "Strong typing for large-scale applications",
      position: 5,
      duration: "6 hours",
      pricing: {
        1: 19.99,
        3: 34.99,
        10: 49.99,
        lifetime: 69.99
      },
      sections: [
        // TS patterns, utility types, etc.
      ]
    },
    {
      _id: "chapter_008",
      title: "Testing Strategies",
      description: "Testing complex React applications",
      position: 6,
      duration: "4 hours",
      pricing: {
        1: 14.99,
        3: 24.99,
        10: 34.99,
        lifetime: 49.99
      },
      sections: [
        // Testing library, mocking, integration tests
      ]
    },
    {
      _id: "chapter_009",
      title: "Micro-frontends",
      description: "Architecting large-scale React applications",
      position: 7,
      duration: "3 hours",
      pricing: {
        1: 14.99,
        3: 24.99,
        10: 34.99,
        lifetime: 49.99
      },
      sections: [
        // Module federation, deployment strategies
      ]
    },
    {
      _id: "chapter_010",
      title: "Capstone Projects",
      description: "Apply everything you've learned to real-world projects",
      position: 8,
      duration: "3 hours",
      pricing: {
        1: 19.99,
        3: 34.99,
        10: 49.99,
        lifetime: 69.99
      },
      sections: [
        {
          _id: "section_020",
          title: "Enterprise Dashboard",
          position: 1,
          lessons: [
            {
              _id: "lesson_050",
              position: 1,
              title: "Building a Performant Data Grid",
              duration: "45:30",
              videoUrl: "https://example.com/videos/react-data-grid.mp4",
              preview: true
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_110",
          title: "Project Starter Kit",
          url: "https://example.com/resources/react-starter-kit.zip"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_101",
      title: "Performance Optimization Workshop",
      date: "2023-12-18T17:00:00",
      duration: 90,
      link: "https://example.com/live/react-performance",
      note: "Bring your performance questions and we'll optimize together",
      ressources: [
        {
          _id: "res_111",
          title: "Performance Checklist",
          url: "https://example.com/resources/react-performance-checklist.pdf"
        }
      ]
    },
    {
      _id: "live_102",
      title: "State Management Panel Discussion",
      date: "2024-01-08T18:00:00",
      duration: 120,
      link: "https://example.com/live/react-state-panel",
      note: "Comparing Redux, Context, Zustand and other solutions",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-14"),
};

export const javascriptBootcamp: Course = {
  _id: "course_003",
  title: "The Complete JavaScript Bootcamp: From Zero to Expert",
  description: "Master modern JavaScript through 180+ hands-on lessons covering fundamentals, web development, Node.js, frameworks, and more. Includes real-world projects, coding challenges, and live sessions.",
  instructorId: "inst_456",
  thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
  level: "All Levels",
  duration: "75 hours",
  totalLessons: 185,
  tags: ["JavaScript", "Web Development", "Node.js", "React", "Frontend", "Backend", "Full-stack", "Projects"],
  requirements: [
    "Basic computer literacy",
    "Web browser (Chrome, Firefox, etc.)",
    "Text editor (VS Code recommended)",
    "No prior programming experience required"
  ],
  whatYouWillLearn: [
    "Modern JavaScript (ES6+) syntax",
    "DOM manipulation and events",
    "Asynchronous programming",
    "Node.js and backend development",
    "React framework fundamentals",
    "Working with APIs and JSON",
    "Functional and object-oriented programming",
    "Error handling and debugging",
    "Build tools and package management",
    "Deployment strategies",
    "Real-world project development"
  ],
  pricing: {
    1: 34.99,
    3: 79.99,
    10: 139.99,
    lifetime: 159.99
  },
  originalPrice: 319.99,
  sale: true,
  bestseller: true,
  discount: 45,
  enrolledStudents: 12430,
  chapters: [
    {
      _id: "chapter_011",
      title: "JavaScript Fundamentals",
      description: "Learn the core concepts of JavaScript programming",
      position: 1,
      duration: "10 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_004",
          title: "Getting Started with JavaScript",
          position: 1,
          lessons: [
            {
              _id: "lesson_101",
              position: 1,
              title: "Introduction to JavaScript",
              duration: "15:22",
              videoUrl: "https://example.com/videos/js-intro.mp4",
              preview: true,
              description: "Overview of JavaScript and its role in web development"
            },
            {
              _id: "lesson_102",
              position: 2,
              title: "Setting Up Your Development Environment",
              duration: "12:10",
              videoUrl: "https://example.com/videos/js-setup.mp4",
              description: "Configuring VS Code, browser tools, and extensions",
              preview: false
            },
            {
              _id: "lesson_103",
              position: 3,
              title: "Your First JavaScript Program",
              duration: "10:45",
              videoUrl: "https://example.com/videos/js-first-program.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_005",
          title: "Core Concepts",
          position: 2,
          lessons: [
            {
              _id: "lesson_104",
              position: 1,
              title: "Variables and Data Types",
              duration: "20:30",
              videoUrl: "https://example.com/videos/js-variables.mp4",
              preview: true
            },
            {
              _id: "lesson_105",
              position: 2,
              title: "Operators and Expressions",
              duration: "18:15",
              videoUrl: "https://example.com/videos/js-operators.mp4",
              preview: false
            },
            {
              _id: "lesson_106",
              position: 3,
              title: "Conditional Statements",
              duration: "22:40",
              videoUrl: "https://example.com/videos/js-conditionals.mp4",
              preview: false
            },
            {
              _id: "lesson_107",
              position: 4,
              title: "Loops and Iteration",
              duration: "25:10",
              videoUrl: "https://example.com/videos/js-loops.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_101",
          title: "JavaScript Syntax Cheat Sheet",
          url: "https://example.com/resources/js-syntax-cheatsheet.pdf"
        },
        {
          _id: "res_102",
          title: "VS Code Setup Guide",
          url: "https://example.com/resources/vscode-setup.pdf"
        }
      ]
    },
    {
      _id: "chapter_012",
      title: "Functions and Scope",
      description: "Master functions, closures, and scope in JavaScript",
      position: 2,
      duration: "8 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_006",
          title: "Working with Functions",
          position: 1,
          lessons: [
            {
              _id: "lesson_108",
              position: 1,
              title: "Function Declarations and Expressions",
              duration: "18:15",
              videoUrl: "https://example.com/videos/js-functions.mp4",
              preview: true
            },
            {
              _id: "lesson_109",
              position: 2,
              title: "Arrow Functions and ES6 Features",
              duration: "16:30",
              videoUrl: "https://example.com/videos/js-arrow-functions.mp4",
              preview: false
            }
          ]
        }
      ]
    },
    {
      _id: "chapter_013",
      title: "DOM Manipulation",
      description: "Learn to interact with web pages using JavaScript",
      position: 3,
      duration: "12 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_014",
      title: "Asynchronous JavaScript",
      description: "Master promises, async/await, and AJAX",
      position: 4,
      duration: "10 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_015",
      title: "Modern JavaScript (ES6+)",
      description: "Learn all the modern features of JavaScript",
      position: 5,
      duration: "8 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_016",
      title: "Introduction to Node.js",
      description: "Build server-side applications with JavaScript",
      position: 6,
      duration: "12 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_017",
      title: "React Fundamentals",
      description: "Build interactive user interfaces with React",
      position: 7,
      duration: "15 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_018",
      title: "Working with APIs",
      description: "Connect your applications to web services",
      position: 8,
      duration: "6 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_019",
      title: "Testing and Debugging",
      description: "Ensure your JavaScript code works as expected",
      position: 9,
      duration: "5 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        // Additional sections and lessons would go here
      ]
    },
    {
      _id: "chapter_020",
      title: "Capstone Projects",
      description: "Build complete applications using everything you've learned",
      position: 10,
      duration: "10 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_026",
          title: "Final Projects",
          position: 1,
          lessons: [
            {
              _id: "lesson_198",
              position: 1,
              title: "Building a Weather App",
              duration: "50:20",
              videoUrl: "https://example.com/videos/js-weather-app.mp4",
              preview: true
            },
            {
              _id: "lesson_199",
              position: 2,
              title: "Creating a Task Management System",
              duration: "55:15",
              videoUrl: "https://example.com/videos/js-task-manager.mp4",
              preview: false
            },
            {
              _id: "lesson_200",
              position: 3,
              title: "Developing a REST API with Node.js",
              duration: "42:40",
              videoUrl: "https://example.com/videos/js-rest-api.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_115",
          title: "Project Starter Templates",
          url: "https://example.com/resources/js-project-templates.zip"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_101",
      title: "JavaScript Q&A Session",
      date: "2023-12-18T18:00:00",
      duration: 60,
      link: "https://example.com/live/js-qa",
      note: "Bring your questions about JavaScript fundamentals",
      ressources: [
        {
          _id: "res_116",
          title: "Common JavaScript Questions",
          url: "https://example.com/resources/js-common-questions.pdf"
        }
      ]
    },
    {
      _id: "live_102",
      title: "Project Workshop: Building a Quiz App",
      date: "2023-12-25T17:00:00",
      duration: 90,
      link: "https://example.com/live/js-quiz-app",
      note: "We'll build an interactive quiz application together",
      ressources: [
        {
          _id: "res_117",
          title: "Quiz App Starter Code",
          url: "https://example.com/resources/quiz-app-starter.zip"
        }
      ]
    },
    {
      _id: "live_103",
      title: "Career Paths in JavaScript Development",
      date: "2024-01-08T19:00:00",
      duration: 120,
      link: "https://example.com/live/js-career-paths",
      note: "Learn about different career opportunities with JavaScript",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const webDesignFundamentals: Course = {
  _id: "course_004",
  title: "Web Design Fundamentals: HTML & CSS Mastery",
  description: "Learn modern web design through 80+ hands-on lessons covering HTML5, CSS3, responsive design, and accessibility. Build beautiful websites from scratch.",
  instructorId: "inst_123",
  thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  level: "Beginner",
  duration: "35 hours",
  totalLessons: 82,
  tags: ["HTML", "CSS", "Web Design", "Responsive Design", "Frontend", "Beginner"],
  requirements: [
    "Basic computer skills",
    "Web browser (Chrome recommended)",
    "Text editor (VS Code preferred)",
    "No prior coding experience needed"
  ],
  whatYouWillLearn: [
    "Semantic HTML5 structure",
    "CSS styling and layouts",
    "Flexbox and CSS Grid",
    "Responsive design principles",
    "Web accessibility standards",
    "Cross-browser compatibility",
    "Design systems and variables",
    "Performance optimization",
    "Basic animations and transitions",
    "Portfolio project development"
  ],
  pricing: {
    1: 24.99,
    3: 59.99,
    10: 99.99,
    lifetime: 119.99
  },
  originalPrice: 199.99,
  sale: true,
  bestseller: false,
  discount: 40,
  enrolledStudents: 3245,
  chapters: [
    {
      _id: "chapter_021",
      title: "HTML Foundations",
      description: "Master the building blocks of web content",
      position: 1,
      duration: "8 hours",
      pricing: {
        1: 7.99,
        3: 14.99,
        10: 19.99,
        lifetime: 24.99
      },
      sections: [
        {
          _id: "section_027",
          title: "HTML Basics",
          position: 1,
          lessons: [
            {
              _id: "lesson_201",
              position: 1,
              title: "Introduction to HTML",
              duration: "12:15",
              videoUrl: "https://example.com/videos/html-intro.mp4",
              preview: true,
              description: "Understanding HTML's role in web development"
            },
            {
              _id: "lesson_202",
              position: 2,
              title: "Document Structure",
              duration: "15:30",
              videoUrl: "https://example.com/videos/html-structure.mp4",
              preview: false
            },
            {
              _id: "lesson_203",
              position: 3,
              title: "Working with Text",
              duration: "18:20",
              videoUrl: "https://example.com/videos/html-text.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_028",
          title: "HTML Elements",
          position: 2,
          lessons: [
            {
              _id: "lesson_204",
              position: 1,
              title: "Links and Navigation",
              duration: "20:10",
              videoUrl: "https://example.com/videos/html-links.mp4",
              preview: true
            },
            {
              _id: "lesson_205",
              position: 2,
              title: "Images and Media",
              duration: "22:45",
              videoUrl: "https://example.com/videos/html-media.mp4",
              preview: false
            },
            {
              _id: "lesson_206",
              position: 3,
              title: "Forms and Inputs",
              duration: "25:30",
              videoUrl: "https://example.com/videos/html-forms.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_201",
          title: "HTML5 Element Reference",
          url: "https://example.com/resources/html5-reference.pdf"
        },
        {
          _id: "res_202",
          title: "Semantic HTML Guide",
          url: "https://example.com/resources/semantic-html.pdf"
        }
      ]
    },
    {
      _id: "chapter_022",
      title: "CSS Fundamentals",
      description: "Style your web pages with modern CSS",
      position: 2,
      duration: "10 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_029",
          title: "CSS Basics",
          position: 1,
          lessons: [
            {
              _id: "lesson_207",
              position: 1,
              title: "Introduction to CSS",
              duration: "14:20",
              videoUrl: "https://example.com/videos/css-intro.mp4",
              preview: true
            },
            {
              _id: "lesson_208",
              position: 2,
              title: "Selectors and Specificity",
              duration: "18:15",
              videoUrl: "https://example.com/videos/css-selectors.mp4",
              preview: false
            },
            {
              _id: "lesson_209",
              position: 3,
              title: "Box Model Explained",
              duration: "22:40",
              videoUrl: "https://example.com/videos/css-box-model.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_030",
          title: "CSS Layouts",
          position: 2,
          lessons: [
            {
              _id: "lesson_210",
              position: 1,
              title: "Display and Positioning",
              duration: "20:25",
              videoUrl: "https://example.com/videos/css-display.mp4",
              preview: false
            },
            {
              _id: "lesson_211",
              position: 2,
              title: "Flexbox Fundamentals",
              duration: "25:10",
              videoUrl: "https://example.com/videos/css-flexbox.mp4",
              preview: true
            },
            {
              _id: "lesson_212",
              position: 3,
              title: "CSS Grid Basics",
              duration: "28:30",
              videoUrl: "https://example.com/videos/css-grid.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_203",
          title: "CSS Cheat Sheet",
          url: "https://example.com/resources/css-cheatsheet.pdf"
        },
        {
          _id: "res_204",
          title: "Flexbox Playground",
          url: "https://example.com/resources/flexbox-playground.zip"
        }
      ]
    },
    {
      _id: "chapter_023",
      title: "Responsive Design",
      description: "Create websites that work on all devices",
      position: 3,
      duration: "9 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_031",
          title: "Responsive Principles",
          position: 1,
          lessons: [
            {
              _id: "lesson_213",
              position: 1,
              title: "Mobile-First Approach",
              duration: "16:20",
              videoUrl: "https://example.com/videos/responsive-mobile-first.mp4",
              preview: true
            },
            {
              _id: "lesson_214",
              position: 2,
              title: "Media Queries",
              duration: "19:45",
              videoUrl: "https://example.com/videos/media-queries.mp4",
              preview: false
            },
            {
              _id: "lesson_215",
              position: 3,
              title: "Responsive Images",
              duration: "15:30",
              videoUrl: "https://example.com/videos/responsive-images.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_032",
          title: "Advanced Layouts",
          position: 2,
          lessons: [
            {
              _id: "lesson_216",
              position: 1,
              title: "Flexbox for Responsive Design",
              duration: "22:15",
              videoUrl: "https://example.com/videos/responsive-flexbox.mp4",
              preview: false
            },
            {
              _id: "lesson_217",
              position: 2,
              title: "CSS Grid for Complex Layouts",
              duration: "25:40",
              videoUrl: "https://example.com/videos/responsive-grid.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_205",
          title: "Breakpoint Cheat Sheet",
          url: "https://example.com/resources/breakpoints.pdf"
        },
        {
          _id: "res_206",
          title: "Responsive Design Checklist",
          url: "https://example.com/resources/responsive-checklist.pdf"
        }
      ]
    },
    {
      _id: "chapter_024",
      title: "Portfolio Project",
      description: "Build a complete responsive website",
      position: 4,
      duration: "8 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_033",
          title: "Project Development",
          position: 1,
          lessons: [
            {
              _id: "lesson_218",
              position: 1,
              title: "Planning Your Website",
              duration: "20:15",
              videoUrl: "https://example.com/videos/web-planning.mp4",
              preview: true
            },
            {
              _id: "lesson_219",
              position: 2,
              title: "Building the Structure",
              duration: "35:20",
              videoUrl: "https://example.com/videos/web-structure.mp4",
              preview: false
            },
            {
              _id: "lesson_220",
              position: 3,
              title: "Styling and Responsiveness",
              duration: "42:10",
              videoUrl: "https://example.com/videos/web-styling.mp4",
              preview: false
            },
            {
              _id: "lesson_221",
              position: 4,
              title: "Final Touches and Deployment",
              duration: "30:45",
              videoUrl: "https://example.com/videos/web-deployment.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_207",
          title: "Project Assets Pack",
          url: "https://example.com/resources/web-project-assets.zip"
        },
        {
          _id: "res_208",
          title: "Deployment Guide",
          url: "https://example.com/resources/web-deployment-guide.pdf"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_201",
      title: "HTML/CSS Q&A",
      date: "2023-12-20T17:00:00",
      duration: 60,
      link: "https://example.com/live/web-design-qa",
      note: "Get answers to your HTML and CSS questions",
      ressources: [
        {
          _id: "res_209",
          title: "Common HTML/CSS Issues",
          url: "https://example.com/resources/common-issues.pdf"
        }
      ]
    },
    {
      _id: "live_202",
      title: "Portfolio Review Session",
      date: "2023-12-27T18:00:00",
      duration: 90,
      link: "https://example.com/live/portfolio-review",
      note: "Get feedback on your final project",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const dataScienceBootcamp: Course = {
  _id: "course_005",
  title: "Data Science & Machine Learning Bootcamp",
  description: "Master data analysis, visualization, and machine learning with Python through 100+ hands-on lessons. Learn to extract insights from data and build predictive models with real-world projects.",
  instructorId: "inst_555",
  thumbnail: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
  level: "Intermediate",
  duration: "60 hours",
  totalLessons: 108,
  tags: ["Data Science", "Machine Learning", "Python", "Pandas", "NumPy", "Scikit-learn", "Data Visualization"],
  requirements: [
    "Basic Python knowledge",
    "Jupyter Notebook installed",
    "4GB RAM minimum",
    "Curiosity about data analysis"
  ],
  whatYouWillLearn: [
    "Data cleaning and preprocessing",
    "Exploratory data analysis (EDA)",
    "Statistical analysis with Python",
    "Data visualization with Matplotlib/Seaborn",
    "Machine learning fundamentals",
    "Supervised and unsupervised learning",
    "Model evaluation techniques",
    "Feature engineering",
    "Working with real-world datasets",
    "Building end-to-end data pipelines"
  ],
  pricing: {
    1: 49.99,
    3: 109.99,
    10: 179.99,
    lifetime: 199.99
  },
  originalPrice: 399.99,
  sale: true,
  bestseller: true,
  discount: 50,
  enrolledStudents: 15600,
  chapters: [
    {
      _id: "chapter_029",
      title: "Python for Data Science",
      description: "Essential Python tools and libraries for data analysis",
      position: 1,
      duration: "15 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_042",
          title: "Data Analysis Foundations",
          position: 1,
          lessons: [
            {
              _id: "lesson_401",
              position: 1,
              title: "Introduction to Data Science Workflow",
              duration: "18:22",
              videoUrl: "https://example.com/videos/ds-workflow.mp4",
              preview: true,
              description: "Understanding the data science process"
            },
            {
              _id: "lesson_402",
              position: 2,
              title: "Pandas DataFrames Deep Dive",
              duration: "32:15",
              videoUrl: "https://example.com/videos/pandas-df.mp4",
              preview: false
            },
            {
              _id: "lesson_403",
              position: 3,
              title: "Data Cleaning Techniques",
              duration: "28:40",
              videoUrl: "https://example.com/videos/data-cleaning.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_043",
          title: "Numerical Computing",
          position: 2,
          lessons: [
            {
              _id: "lesson_404",
              position: 1,
              title: "NumPy Arrays and Operations",
              duration: "25:30",
              videoUrl: "https://example.com/videos/numpy.mp4",
              preview: false
            },
            {
              _id: "lesson_405",
              position: 2,
              title: "Vectorized Operations",
              duration: "20:15",
              videoUrl: "https://example.com/videos/vectorization.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_401",
          title: "Pandas Cheat Sheet",
          url: "https://example.com/resources/pandas-cheatsheet.pdf"
        },
        {
          _id: "res_402",
          title: "Data Cleaning Checklist",
          url: "https://example.com/resources/data-cleaning-checklist.pdf"
        }
      ]
    },
    {
      _id: "chapter_030",
      title: "Data Visualization",
      description: "Communicating insights through effective visualizations",
      position: 2,
      duration: "12 hours",
      pricing: {
        1: 12.99,
        3: 24.99,
        10: 39.99,
        lifetime: 49.99
      },
      sections: [
        {
          _id: "section_044",
          title: "Visualization Tools",
          position: 1,
          lessons: [
            {
              _id: "lesson_406",
              position: 1,
              title: "Matplotlib Fundamentals",
              duration: "28:20",
              videoUrl: "https://example.com/videos/matplotlib.mp4",
              preview: true
            },
            {
              _id: "lesson_407",
              position: 2,
              title: "Advanced Seaborn Plots",
              duration: "35:10",
              videoUrl: "https://example.com/videos/seaborn.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_045",
          title: "Storytelling with Data",
          position: 2,
          lessons: [
            {
              _id: "lesson_408",
              position: 1,
              title: "Effective Dashboard Design",
              duration: "22:45",
              videoUrl: "https://example.com/videos/dashboards.mp4",
              preview: false
            },
            {
              _id: "lesson_409",
              position: 2,
              title: "Interactive Visualizations with Plotly",
              duration: "30:30",
              videoUrl: "https://example.com/videos/plotly.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_403",
          title: "Visualization Style Guide",
          url: "https://example.com/resources/viz-style-guide.pdf"
        },
        {
          _id: "res_404",
          title: "Color Palette Generator",
          url: "https://example.com/resources/color-palettes.zip"
        }
      ]
    },
    {
      _id: "chapter_031",
      title: "Machine Learning Fundamentals",
      description: "Core concepts and implementation of ML algorithms",
      position: 3,
      duration: "20 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        {
          _id: "section_046",
          title: "Supervised Learning",
          position: 1,
          lessons: [
            {
              _id: "lesson_410",
              position: 1,
              title: "Linear Regression from Scratch",
              duration: "42:15",
              videoUrl: "https://example.com/videos/linear-regression.mp4",
              preview: true
            },
            {
              _id: "lesson_411",
              position: 2,
              title: "Classification with Scikit-learn",
              duration: "38:20",
              videoUrl: "https://example.com/videos/classification.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_047",
          title: "Model Evaluation",
          position: 2,
          lessons: [
            {
              _id: "lesson_412",
              position: 1,
              title: "Train-Test Split & Cross-Validation",
              duration: "32:10",
              videoUrl: "https://example.com/videos/cross-validation.mp4",
              preview: false
            },
            {
              _id: "lesson_413",
              position: 2,
              title: "Metrics for Regression & Classification",
              duration: "36:45",
              videoUrl: "https://example.com/videos/ml-metrics.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_405",
          title: "Scikit-learn Algorithm Cheat Sheet",
          url: "https://example.com/resources/sklearn-cheatsheet.pdf"
        },
        {
          _id: "res_406",
          title: "ML Project Template",
          url: "https://example.com/resources/ml-template.zip"
        }
      ]
    },
    {
      _id: "chapter_032",
      title: "Capstone Projects",
      description: "Apply your skills to real-world data challenges",
      position: 4,
      duration: "13 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_048",
          title: "End-to-End Projects",
          position: 1,
          lessons: [
            {
              _id: "lesson_414",
              position: 1,
              title: "Predictive Analytics Project",
              duration: "55:20",
              videoUrl: "https://example.com/videos/predictive-analytics.mp4",
              preview: true
            },
            {
              _id: "lesson_415",
              position: 2,
              title: "Customer Segmentation Analysis",
              duration: "48:30",
              videoUrl: "https://example.com/videos/customer-segmentation.mp4",
              preview: false
            },
            {
              _id: "lesson_416",
              position: 3,
              title: "Time Series Forecasting",
              duration: "52:15",
              videoUrl: "https://example.com/videos/time-series.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_407",
          title: "Project Datasets Collection",
          url: "https://example.com/resources/project-datasets.zip"
        },
        {
          _id: "res_408",
          title: "Deployment Guide for Models",
          url: "https://example.com/resources/model-deployment.pdf"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_401",
      title: "Data Cleaning Workshop",
      date: "2023-12-28T17:00:00",
      duration: 90,
      link: "https://example.com/live/data-cleaning",
      note: "Hands-on session for messy real-world datasets",
      ressources: [
        {
          _id: "res_409",
          title: "Workshop Dataset",
          url: "https://example.com/resources/workshop-data.csv"
        }
      ]
    },
    {
      _id: "live_402",
      title: "Machine Learning Q&A",
      date: "2024-01-10T18:00:00",
      duration: 120,
      link: "https://example.com/live/ml-qa",
      note: "Get your machine learning questions answered",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const flutterBootcamp: Course = {
  _id: "course_006",
  title: "Flutter & Dart Mobile Development Bootcamp",
  description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Master Flutter framework through 120+ hands-on lessons with real-world projects.",
  instructorId: "inst_777",
  thumbnail: "https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg",
  level: "Intermediate",
  duration: "70 hours",
  totalLessons: 125,
  tags: ["Flutter", "Dart", "Mobile Development", "iOS", "Android", "Cross-Platform", "Firebase"],
  requirements: [
    "Basic programming knowledge helpful but not required",
    "Computer with 8GB RAM recommended",
    "Android Studio/VSCode installed",
    "Emulator or physical device for testing"
  ],
  whatYouWillLearn: [
    "Dart programming language fundamentals",
    "Flutter widget system and UI building",
    "State management solutions",
    "Navigation and routing",
    "Working with APIs and JSON",
    "Firebase integration (Auth, Firestore)",
    "Animations and custom painting",
    "Platform-specific code implementation",
    "Testing and debugging Flutter apps",
    "Publishing to App Store and Play Store"
  ],
  pricing: {
    1: 44.99,
    3: 99.99,
    10: 169.99,
    lifetime: 189.99
  },
  originalPrice: 379.99,
  sale: true,
  bestseller: true,
  discount: 50,
  enrolledStudents: 14300,
  chapters: [
    {
      _id: "chapter_033",
      title: "Dart Programming & Flutter Basics",
      description: "Master Dart language and Flutter fundamentals",
      position: 1,
      duration: "18 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_049",
          title: "Getting Started",
          position: 1,
          lessons: [
            {
              _id: "lesson_501",
              position: 1,
              title: "Introduction to Flutter Ecosystem",
              duration: "15:45",
              videoUrl: "https://example.com/videos/flutter-intro.mp4",
              preview: true,
              description: "Understanding Flutter's architecture and advantages"
            },
            {
              _id: "lesson_502",
              position: 2,
              title: "Setting Up Development Environment",
              duration: "22:30",
              videoUrl: "https://example.com/videos/flutter-setup.mp4",
              preview: true
            },
            {
              _id: "lesson_503",
              position: 3,
              title: "Your First Flutter App",
              duration: "18:15",
              videoUrl: "https://example.com/videos/first-flutter-app.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_050",
          title: "Dart Fundamentals",
          position: 2,
          lessons: [
            {
              _id: "lesson_504",
              position: 1,
              title: "Dart Syntax and Variables",
              duration: "25:20",
              videoUrl: "https://example.com/videos/dart-syntax.mp4",
              preview: true
            },
            {
              _id: "lesson_505",
              position: 2,
              title: "Control Flow and Functions",
              duration: "28:10",
              videoUrl: "https://example.com/videos/dart-functions.mp4",
              preview: false
            },
            {
              _id: "lesson_506",
              position: 3,
              title: "Object-Oriented Programming in Dart",
              duration: "32:45",
              videoUrl: "https://example.com/videos/dart-oop.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_501",
          title: "Flutter Installation Guide",
          url: "https://example.com/resources/flutter-install.pdf"
        },
        {
          _id: "res_502",
          title: "Dart Language Cheat Sheet",
          url: "https://example.com/resources/dart-cheatsheet.pdf"
        }
      ]
    },
    {
      _id: "chapter_034",
      title: "Building User Interfaces",
      description: "Create beautiful, responsive UIs with Flutter widgets",
      position: 2,
      duration: "20 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        {
          _id: "section_051",
          title: "Core Widgets",
          position: 1,
          lessons: [
            {
              _id: "lesson_507",
              position: 1,
              title: "Understanding Widget Tree",
              duration: "24:15",
              videoUrl: "https://example.com/videos/widget-tree.mp4",
              preview: true
            },
            {
              _id: "lesson_508",
              position: 2,
              title: "Layout Widgets (Row, Column, Stack)",
              duration: "35:20",
              videoUrl: "https://example.com/videos/layout-widgets.mp4",
              preview: true
            },
            {
              _id: "lesson_509",
              position: 3,
              title: "Material & Cupertino Widgets",
              duration: "28:45",
              videoUrl: "https://example.com/videos/material-widgets.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_052",
          title: "Advanced UI",
          position: 2,
          lessons: [
            {
              _id: "lesson_510",
              position: 1,
              title: "Custom Widgets and Composition",
              duration: "30:10",
              videoUrl: "https://example.com/videos/custom-widgets.mp4",
              preview: false
            },
            {
              _id: "lesson_511",
              position: 2,
              title: "Responsive Design Principles",
              duration: "26:30",
              videoUrl: "https://example.com/videos/responsive-ui.mp4",
              preview: true
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_503",
          title: "Flutter Widget Catalog",
          url: "https://example.com/resources/widget-catalog.pdf"
        },
        {
          _id: "res_504",
          title: "UI Design Templates",
          url: "https://example.com/resources/ui-templates.zip"
        }
      ]
    },
    {
      _id: "chapter_035",
      title: "State Management & Data",
      description: "Manage app state and work with backend services",
      position: 3,
      duration: "18 hours",
      pricing: {
        1: 19.99,
        3: 39.99,
        10: 59.99,
        lifetime: 79.99
      },
      sections: [
        {
          _id: "section_053",
          title: "State Management",
          position: 1,
          lessons: [
            {
              _id: "lesson_512",
              position: 1,
              title: "setState and InheritedWidget",
              duration: "28:20",
              videoUrl: "https://example.com/videos/setstate.mp4",
              preview: true
            },
            {
              _id: "lesson_513",
              position: 2,
              title: "Riverpod for State Management",
              duration: "42:15",
              videoUrl: "https://example.com/videos/riverpod.mp4",
              preview: true
            }
          ]
        },
        {
          _id: "section_054",
          title: "Data Handling",
          position: 2,
          lessons: [
            {
              _id: "lesson_514",
              position: 1,
              title: "Working with REST APIs",
              duration: "35:30",
              videoUrl: "https://example.com/videos/rest-api.mp4",
              preview: false
            },
            {
              _id: "lesson_515",
              position: 2,
              title: "Firebase Integration",
              duration: "38:45",
              videoUrl: "https://example.com/videos/firebase.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_505",
          title: "State Management Comparison",
          url: "https://example.com/resources/state-management.pdf"
        },
        {
          _id: "res_506",
          title: "API Testing Collection",
          url: "https://example.com/resources/api-testing.postman_collection.json"
        }
      ]
    },
    {
      _id: "chapter_036",
      title: "Advanced Topics & Deployment",
      description: "Polish your apps and prepare them for production",
      position: 4,
      duration: "14 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_055",
          title: "Advanced Features",
          position: 1,
          lessons: [
            {
              _id: "lesson_516",
              position: 1,
              title: "Animations with Flutter",
              duration: "45:20",
              videoUrl: "https://example.com/videos/animations.mp4",
              preview: true
            },
            {
              _id: "lesson_517",
              position: 2,
              title: "Platform-Specific Code",
              duration: "32:15",
              videoUrl: "https://example.com/videos/platform-code.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_056",
          title: "Deployment",
          position: 2,
          lessons: [
            {
              _id: "lesson_518",
              position: 1,
              title: "Building for iOS/Android",
              duration: "38:30",
              videoUrl: "https://example.com/videos/building-apps.mp4",
              preview: true
            },
            {
              _id: "lesson_519",
              position: 2,
              title: "App Store Submission Process",
              duration: "42:10",
              videoUrl: "https://example.com/videos/app-store.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_507",
          title: "App Store Checklist",
          url: "https://example.com/resources/app-store-checklist.pdf"
        },
        {
          _id: "res_508",
          title: "Performance Optimization Guide",
          url: "https://example.com/resources/flutter-performance.pdf"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_501",
      title: "Flutter Q&A and Live Coding",
      date: "2024-01-15T18:00:00",
      duration: 90,
      link: "https://example.com/live/flutter-qa",
      note: "Get your Flutter questions answered with live examples",
      ressources: [
        {
          _id: "res_509",
          title: "Session Code Samples",
          url: "https://example.com/resources/live-session-code.zip"
        }
      ]
    },
    {
      _id: "live_502",
      title: "App Design Review Workshop",
      date: "2024-01-22T17:00:00",
      duration: 120,
      link: "https://example.com/live/design-review",
      note: "Get feedback on your Flutter app designs",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const awsCloudComputing: Course = {
  _id: "course_007",
  title: "AWS Cloud Computing: From Beginner to Certified",
  description: "Master Amazon Web Services through 150+ hands-on lessons covering compute, storage, networking, security, and serverless architectures. Prepare for AWS certifications with real-world scenarios.",
  instructorId: "inst_888",
  thumbnail: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  level: "Advanced",
  duration: "90 hours",
  totalLessons: 158,
  tags: ["AWS", "Cloud Computing", "DevOps", "Serverless", "Certification", "Infrastructure"],
  requirements: [
    "Basic understanding of IT concepts",
    "AWS Free Tier account",
    "Windows/Mac/Linux machine",
    "No prior cloud experience needed"
  ],
  whatYouWillLearn: [
    "AWS core services (EC2, S3, VPC, Lambda)",
    "Identity and Access Management (IAM)",
    "Database solutions (RDS, DynamoDB)",
    "Networking fundamentals",
    "Security best practices",
    "Serverless architectures",
    "Infrastructure as Code (CloudFormation)",
    "Monitoring and logging",
    "Cost optimization strategies",
    "AWS certification exam preparation"
  ],
  pricing: {
    1: 59.99,
    3: 129.99,
    10: 219.99,
    lifetime: 249.99
  },
  originalPrice: 499.99,
  sale: true,
  bestseller: true,
  discount: 50,
  enrolledStudents: 18700,
  chapters: [
    {
      _id: "chapter_037",
      title: "AWS Fundamentals",
      description: "Core concepts and essential services",
      position: 1,
      duration: "20 hours",
      sections: [
        {
          _id: "section_057",
          title: "Cloud Concepts",
          position: 1,
          lessons: [
            {
              _id: "lesson_601",
              position: 1,
              title: "Introduction to Cloud Computing",
              duration: "22:15",
              videoUrl: "https://example.com/videos/cloud-concepts.mp4",
              preview: true, // Fundamental concept
              description: "Understanding cloud service models and benefits"
            },
            {
              _id: "lesson_602",
              position: 2,
              title: "AWS Global Infrastructure",
              duration: "18:30",
              videoUrl: "https://example.com/videos/aws-infrastructure.mp4",
              preview: false
            },
            {
              _id: "lesson_603",
              position: 3,
              title: "AWS Console Walkthrough",
              duration: "25:45",
              videoUrl: "https://example.com/videos/aws-console.mp4",
              preview: true // Visual demonstration
            }
          ]
        },
        {
          _id: "section_058",
          title: "Core Services",
          position: 2,
          lessons: [
            {
              _id: "lesson_604",
              position: 1,
              title: "EC2 Instances Deep Dive",
              duration: "35:20",
              videoUrl: "https://example.com/videos/ec2-deepdive.mp4",
              preview: true // Key AWS service
            },
            {
              _id: "lesson_605",
              position: 2,
              title: "S3 Storage Classes",
              duration: "28:10",
              videoUrl: "https://example.com/videos/s3-storage.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_601",
          title: "AWS Services Cheat Sheet",
          url: "https://example.com/resources/aws-services.pdf"
        },
        {
          _id: "res_602",
          title: "Free Tier Usage Tracker",
          url: "https://example.com/resources/free-tier-tracker.xlsx"
        }
      ]
    },
    {
      _id: "chapter_038",
      title: "Security & Identity",
      description: "IAM, security policies, and compliance",
      position: 2,
      duration: "15 hours",
      sections: [
        {
          _id: "section_059",
          title: "IAM Fundamentals",
          position: 1,
          lessons: [
            {
              _id: "lesson_606",
              position: 1,
              title: "IAM Users, Groups, and Roles",
              duration: "32:15",
              videoUrl: "https://example.com/videos/iam-basics.mp4",
              preview: true // Critical security topic
            },
            {
              _id: "lesson_607",
              position: 2,
              title: "Policy Documents Explained",
              duration: "38:20",
              videoUrl: "https://example.com/videos/iam-policies.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_060",
          title: "Security Tools",
          position: 2,
          lessons: [
            {
              _id: "lesson_608",
              position: 1,
              title: "GuardDuty Threat Detection",
              duration: "25:30",
              videoUrl: "https://example.com/videos/guardduty.mp4",
              preview: true // Visual security demo
            },
            {
              _id: "lesson_609",
              position: 2,
              title: "Config and Compliance",
              duration: "28:45",
              videoUrl: "https://example.com/videos/aws-config.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_603",
          title: "IAM Policy Generator",
          url: "https://example.com/resources/iam-generator.zip"
        },
        {
          _id: "res_604",
          title: "Security Best Practices",
          url: "https://example.com/resources/security-best-practices.pdf"
        }
      ]
    },
    {
      _id: "chapter_039",
      title: "Serverless Architectures",
      description: "Build applications without managing servers",
      position: 3,
      duration: "25 hours",
      sections: [
        {
          _id: "section_061",
          title: "Lambda & API Gateway",
          position: 1,
          lessons: [
            {
              _id: "lesson_610",
              position: 1,
              title: "Creating Your First Lambda Function",
              duration: "28:20",
              videoUrl: "https://example.com/videos/lambda-first.mp4",
              preview: false
            },
            {
              _id: "lesson_611",
              position: 2,
              title: "API Gateway Integrations",
              duration: "32:10",
              videoUrl: "https://example.com/videos/api-gateway.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_062",
          title: "Advanced Serverless",
          position: 2,
          lessons: [
            {
              _id: "lesson_612",
              position: 1,
              title: "Step Functions Workflows",
              duration: "35:45",
              videoUrl: "https://example.com/videos/step-functions.mp4",
              preview: false
            },
            {
              _id: "lesson_613",
              position: 2,
              title: "EventBridge Event Patterns",
              duration: "30:20",
              videoUrl: "https://example.com/videos/eventbridge.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_605",
          title: "Serverless Application Repository",
          url: "https://example.com/resources/serverless-samples.zip"
        },
        {
          _id: "res_606",
          title: "Cold Start Optimization Guide",
          url: "https://example.com/resources/lambda-coldstart.pdf"
        }
      ]
    },
    {
      _id: "chapter_040",
      title: "Certification Preparation",
      description: "Get ready for AWS certification exams",
      position: 4,
      duration: "30 hours",
      sections: [
        {
          _id: "section_063",
          title: "Exam Strategies",
          position: 1,
          lessons: [
            {
              _id: "lesson_614",
              position: 1,
              title: "Certification Path Overview",
              duration: "25:15",
              videoUrl: "https://example.com/videos/cert-path.mp4",
              preview: true // Valuable for all students
            },
            {
              _id: "lesson_615",
              position: 2,
              title: "Practice Exam Walkthrough",
              duration: "45:30",
              videoUrl: "https://example.com/videos/practice-exam.mp4",
              preview: true // Demonstrates exam format
            }
          ]
        },
        {
          _id: "section_064",
          title: "Hands-On Labs",
          position: 2,
          lessons: [
            {
              _id: "lesson_616",
              position: 1,
              title: "Multi-Tier Architecture Lab",
              duration: "52:20",
              videoUrl: "https://example.com/videos/multi-tier-lab.mp4",
              preview: false
            },
            {
              _id: "lesson_617",
              position: 2,
              title: "Disaster Recovery Scenario",
              duration: "48:15",
              videoUrl: "https://example.com/videos/disaster-recovery.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_607",
          title: "Certification Study Guide",
          url: "https://example.com/resources/aws-study-guide.pdf"
        },
        {
          _id: "res_608",
          title: "Exam Question Bank",
          url: "https://example.com/resources/exam-questions.zip"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_601",
      title: "AWS Architecture Review",
      date: "2024-01-18T19:00:00",
      duration: 90,
      link: "https://example.com/live/aws-architecture",
      note: "Live design and review of AWS solutions",
      ressources: [
        {
          _id: "res_609",
          title: "Architecture Diagram Templates",
          url: "https://example.com/resources/aws-diagrams.zip"
        }
      ]
    },
    {
      _id: "live_602",
      title: "Certification Q&A",
      date: "2024-01-25T18:00:00",
      duration: 120,
      link: "https://example.com/live/cert-qa",
      note: "Get your AWS certification questions answered",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const cybersecurityEssentials: Course = {
  _id: "course_009",
  title: "Cybersecurity Essentials: From Zero to Defender",
  description: "Master fundamental cybersecurity concepts through 90+ hands-on lessons covering threats, defenses, ethical hacking, and risk management. Gain practical skills to protect systems and networks.",
  instructorId: "inst_333",
  thumbnail: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  level: "Beginner",
  duration: "50 hours",
  totalLessons: 95,
  tags: ["Cybersecurity", "Ethical Hacking", "Network Security", "Encryption", "Risk Management", "Beginner"],
  requirements: [
    "Basic computer literacy",
    "Windows/Linux/Mac OS",
    "4GB RAM minimum for lab exercises",
    "No prior security knowledge required"
  ],
  whatYouWillLearn: [
    "Fundamentals of information security",
    "Common cyber threats and attack vectors",
    "Network security principles",
    "Cryptography basics",
    "Vulnerability assessment",
    "Incident response fundamentals",
    "Security tools (Wireshark, Nmap, Metasploit)",
    "Defensive security techniques",
    "Security policies and compliance",
    "Hands-on penetration testing labs"
  ],
  pricing: {
    1: 39.99,
    3: 89.99,
    10: 149.99,
    lifetime: 179.99
  },
  originalPrice: 349.99,
  sale: true,
  bestseller: true,
  discount: 48,
  enrolledStudents: 11200,
  chapters: [
    {
      _id: "chapter_025",
      title: "Security Foundations",
      description: "Core principles of cybersecurity and threat landscape",
      position: 1,
      duration: "12 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_034",
          title: "Introduction to Cybersecurity",
          position: 1,
          lessons: [
            {
              _id: "lesson_301",
              position: 1,
              title: "The Cybersecurity Landscape",
              duration: "22:15",
              videoUrl: "https://example.com/videos/cyber-landscape.mp4",
              preview: true,
              description: "Understanding modern threats and defense strategies"
            },
            {
              _id: "lesson_302",
              position: 2,
              title: "CIA Triad Explained",
              duration: "18:30",
              videoUrl: "https://example.com/videos/cia-triad.mp4",
              preview: false
            },
            {
              _id: "lesson_303",
              position: 3,
              title: "Types of Cyber Threats",
              duration: "25:45",
              videoUrl: "https://example.com/videos/cyber-threats.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_035",
          title: "Security Frameworks",
          position: 2,
          lessons: [
            {
              _id: "lesson_304",
              position: 1,
              title: "NIST Cybersecurity Framework",
              duration: "20:10",
              videoUrl: "https://example.com/videos/nist-framework.mp4",
              preview: false
            },
            {
              _id: "lesson_305",
              position: 2,
              title: "OWASP Top 10",
              duration: "24:20",
              videoUrl: "https://example.com/videos/owasp-top10.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_301",
          title: "Cybersecurity Glossary",
          url: "https://example.com/resources/cyber-glossary.pdf"
        },
        {
          _id: "res_302",
          title: "Threat Matrix Cheat Sheet",
          url: "https://example.com/resources/threat-matrix.pdf"
        }
      ]
    },
    {
      _id: "chapter_026",
      title: "Network Security",
      description: "Protecting networks from intrusions and attacks",
      position: 2,
      duration: "15 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_036",
          title: "Network Fundamentals",
          position: 1,
          lessons: [
            {
              _id: "lesson_306",
              position: 1,
              title: "Network Protocols and Vulnerabilities",
              duration: "28:15",
              videoUrl: "https://example.com/videos/network-protocols.mp4",
              preview: true
            },
            {
              _id: "lesson_307",
              position: 2,
              title: "Firewalls and IDS/IPS Systems",
              duration: "32:40",
              videoUrl: "https://example.com/videos/firewalls-ids.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_037",
          title: "Hands-On Tools",
          position: 2,
          lessons: [
            {
              _id: "lesson_308",
              position: 1,
              title: "Wireshark for Traffic Analysis",
              duration: "35:20",
              videoUrl: "https://example.com/videos/wireshark.mp4",
              preview: false
            },
            {
              _id: "lesson_309",
              position: 2,
              title: "Nmap Network Scanning",
              duration: "29:10",
              videoUrl: "https://example.com/videos/nmap.mp4",
              preview: true
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_303",
          title: "Wireshark Filters Guide",
          url: "https://example.com/resources/wireshark-filters.pdf"
        },
        {
          _id: "res_304",
          title: "Network Security Checklist",
          url: "https://example.com/resources/network-checklist.pdf"
        }
      ]
    },
    {
      _id: "chapter_027",
      title: "Ethical Hacking Basics",
      description: "Offensive security techniques for defense",
      position: 3,
      duration: "14 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_038",
          title: "Penetration Testing",
          position: 1,
          lessons: [
            {
              _id: "lesson_310",
              position: 1,
              title: "The Hacker Methodology",
              duration: "25:30",
              videoUrl: "https://example.com/videos/hacker-method.mp4",
              preview: true
            },
            {
              _id: "lesson_311",
              position: 2,
              title: "Metasploit Framework Basics",
              duration: "38:15",
              videoUrl: "https://example.com/videos/metasploit.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_039",
          title: "Vulnerability Assessment",
          position: 2,
          lessons: [
            {
              _id: "lesson_312",
              position: 1,
              title: "Scanning for Vulnerabilities",
              duration: "30:20",
              videoUrl: "https://example.com/videos/vuln-scanning.mp4",
              preview: false
            },
            {
              _id: "lesson_313",
              position: 2,
              title: "Exploitation Techniques",
              duration: "33:45",
              videoUrl: "https://example.com/videos/exploitation.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_305",
          title: "Kali Linux Setup Guide",
          url: "https://example.com/resources/kali-setup.pdf"
        },
        {
          _id: "res_306",
          title: "PenTest Lab Environment",
          url: "https://example.com/resources/pentest-vm.ova"
        }
      ]
    },
    {
      _id: "chapter_028",
      title: "Defensive Security",
      description: "Implementing protections and responding to incidents",
      position: 4,
      duration: "9 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_040",
          title: "Security Operations",
          position: 1,
          lessons: [
            {
              _id: "lesson_314",
              position: 1,
              title: "SIEM Fundamentals",
              duration: "28:10",
              videoUrl: "https://example.com/videos/siem.mp4",
              preview: false
            },
            {
              _id: "lesson_315",
              position: 2,
              title: "Incident Response Process",
              duration: "22:45",
              videoUrl: "https://example.com/videos/incident-response.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_041",
          title: "Security Best Practices",
          position: 2,
          lessons: [
            {
              _id: "lesson_316",
              position: 1,
              title: "Password Security & MFA",
              duration: "20:30",
              videoUrl: "https://example.com/videos/password-security.mp4",
              preview: true
            },
            {
              _id: "lesson_317",
              position: 2,
              title: "Secure Configuration Guides",
              duration: "25:15",
              videoUrl: "https://example.com/videos/secure-config.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_307",
          title: "Incident Response Playbook",
          url: "https://example.com/resources/ir-playbook.pdf"
        },
        {
          _id: "res_308",
          title: "Security Policy Templates",
          url: "https://example.com/resources/security-policies.zip"
        }
      ]
    }
  ],
  LiveSessions: [
    {
      _id: "live_301",
      title: "Live Hack Demonstration",
      date: "2023-12-22T19:00:00",
      duration: 90,
      link: "https://example.com/live/hack-demo",
      note: "Watch real attack techniques and defenses in action",
      ressources: [
        {
          _id: "res_309",
          title: "Demo Lab Setup Guide",
          url: "https://example.com/resources/demo-lab.pdf"
        }
      ]
    },
    {
      _id: "live_302",
      title: "Career Path in Cybersecurity",
      date: "2024-01-05T18:00:00",
      duration: 60,
      link: "https://example.com/live/cyber-careers",
      note: "Learn about different cybersecurity roles and certifications",
      ressources: []
    }
  ],
  isPublished: true,
  publishedAt: new Date("2023-07-15")
};

export const cyberSecurity: Course = {
  _id: "course_010", 
  title: "Cybersecurity Essentials: From Zero to Defender",
  arabicLanguage: true,
  description: "إتقان مفاهيم الأمن السيبراني الأساسية من خلال أكثر من 90 درسًا عمليًا يغطي التهديدات والدفاعات والاختراق الأخلاقي وإدارة المخاطر.",
  instructorId: "inst_334",
  thumbnail: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  level: "Beginner",
  duration: "50 hours",
  totalLessons: 95,
  tags: ["Cybersecurity", "Ethical Hacking", "Network Security", "Encryption", "Risk Management", "Beginner"],
  requirements: [
  ],
  whatYouWillLearn: [
    "أساسيات أمن المعلومات",
    "التهديدات السيبرانية الشائعة",
    "مبادئ أمان الشبكات",
    "أساسيات التشفير",
    "تقييم الثغرات الأمنية"
  ],
  pricing: {
    lifetime: 599.99
  },
  originalPrice: 999.99,
  sale: true,
  bestseller: true,
  discount: 40,
  enrolledStudents: 8500,
  isPublished: true,
  publishedAt: new Date("2023-07-15"),
  chapters: [
    {
      _id: "chapter_025",
      title: "Security Foundations",
      description: "Core principles of cybersecurity and threat landscape",
      position: 1,
      duration: "12 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_034",
          title: "Introduction to Cybersecurity",
          position: 1,
          lessons: [
            {
              _id: "lesson_301",
              position: 1,
              title: "The Cybersecurity Landscape",
              duration: "22:15",
              videoUrl: "https://example.com/videos/cyber-landscape.mp4",
              preview: true,
              description: "Understanding modern threats and defense strategies"
            },
            {
              _id: "lesson_302",
              position: 2,
              title: "CIA Triad Explained",
              duration: "18:30",
              videoUrl: "https://example.com/videos/cia-triad.mp4",
              preview: false
            },
            {
              _id: "lesson_303",
              position: 3,
              title: "Types of Cyber Threats",
              duration: "25:45",
              videoUrl: "https://example.com/videos/cyber-threats.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_035",
          title: "Security Frameworks",
          position: 2,
          lessons: [
            {
              _id: "lesson_304",
              position: 1,
              title: "NIST Cybersecurity Framework",
              duration: "20:10",
              videoUrl: "https://example.com/videos/nist-framework.mp4",
              preview: false
            },
            {
              _id: "lesson_305",
              position: 2,
              title: "OWASP Top 10",
              duration: "24:20",
              videoUrl: "https://example.com/videos/owasp-top10.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_301",
          title: "Cybersecurity Glossary",
          url: "https://example.com/resources/cyber-glossary.pdf"
        },
        {
          _id: "res_302",
          title: "Threat Matrix Cheat Sheet",
          url: "https://example.com/resources/threat-matrix.pdf"
        }
      ]
    },
    {
      _id: "chapter_026",
      title: "Network Security",
      description: "Protecting networks from intrusions and attacks",
      position: 2,
      duration: "15 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_036",
          title: "Network Fundamentals",
          position: 1,
          lessons: [
            {
              _id: "lesson_306",
              position: 1,
              title: "Network Protocols and Vulnerabilities",
              duration: "28:15",
              videoUrl: "https://example.com/videos/network-protocols.mp4",
              preview: true
            },
            {
              _id: "lesson_307",
              position: 2,
              title: "Firewalls and IDS/IPS Systems",
              duration: "32:40",
              videoUrl: "https://example.com/videos/firewalls-ids.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_037",
          title: "Hands-On Tools",
          position: 2,
          lessons: [
            {
              _id: "lesson_308",
              position: 1,
              title: "Wireshark for Traffic Analysis",
              duration: "35:20",
              videoUrl: "https://example.com/videos/wireshark.mp4",
              preview: false
            },
            {
              _id: "lesson_309",
              position: 2,
              title: "Nmap Network Scanning",
              duration: "29:10",
              videoUrl: "https://example.com/videos/nmap.mp4",
              preview: true
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_303",
          title: "Wireshark Filters Guide",
          url: "https://example.com/resources/wireshark-filters.pdf"
        },
        {
          _id: "res_304",
          title: "Network Security Checklist",
          url: "https://example.com/resources/network-checklist.pdf"
        }
      ]
    },
    {
      _id: "chapter_027",
      title: "Ethical Hacking Basics",
      description: "Offensive security techniques for defense",
      position: 3,
      duration: "14 hours",
      pricing: {
        1: 14.99,
        3: 29.99,
        10: 44.99,
        lifetime: 59.99
      },
      sections: [
        {
          _id: "section_038",
          title: "Penetration Testing",
          position: 1,
          lessons: [
            {
              _id: "lesson_310",
              position: 1,
              title: "The Hacker Methodology",
              duration: "25:30",
              videoUrl: "https://example.com/videos/hacker-method.mp4",
              preview: true
            },
            {
              _id: "lesson_311",
              position: 2,
              title: "Metasploit Framework Basics",
              duration: "38:15",
              videoUrl: "https://example.com/videos/metasploit.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_039",
          title: "Vulnerability Assessment",
          position: 2,
          lessons: [
            {
              _id: "lesson_312",
              position: 1,
              title: "Scanning for Vulnerabilities",
              duration: "30:20",
              videoUrl: "https://example.com/videos/vuln-scanning.mp4",
              preview: false
            },
            {
              _id: "lesson_313",
              position: 2,
              title: "Exploitation Techniques",
              duration: "33:45",
              videoUrl: "https://example.com/videos/exploitation.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_305",
          title: "Kali Linux Setup Guide",
          url: "https://example.com/resources/kali-setup.pdf"
        },
        {
          _id: "res_306",
          title: "PenTest Lab Environment",
          url: "https://example.com/resources/pentest-vm.ova"
        }
      ]
    },
    {
      _id: "chapter_028",
      title: "Defensive Security",
      description: "Implementing protections and responding to incidents",
      position: 4,
      duration: "9 hours",
      pricing: {
        1: 9.99,
        3: 19.99,
        10: 29.99,
        lifetime: 39.99
      },
      sections: [
        {
          _id: "section_040",
          title: "Security Operations",
          position: 1,
          lessons: [
            {
              _id: "lesson_314",
              position: 1,
              title: "SIEM Fundamentals",
              duration: "28:10",
              videoUrl: "https://example.com/videos/siem.mp4",
              preview: false
            },
            {
              _id: "lesson_315",
              position: 2,
              title: "Incident Response Process",
              duration: "22:45",
              videoUrl: "https://example.com/videos/incident-response.mp4",
              preview: false
            }
          ]
        },
        {
          _id: "section_041",
          title: "Security Best Practices",
          position: 2,
          lessons: [
            {
              _id: "lesson_316",
              position: 1,
              title: "Password Security & MFA",
              duration: "20:30",
              videoUrl: "https://example.com/videos/password-security.mp4",
              preview: true
            },
            {
              _id: "lesson_317",
              position: 2,
              title: "Secure Configuration Guides",
              duration: "25:15",
              videoUrl: "https://example.com/videos/secure-config.mp4",
              preview: false
            }
          ]
        }
      ],
      ressources: [
        {
          _id: "res_307",
          title: "Incident Response Playbook",
          url: "https://example.com/resources/ir-playbook.pdf"
        },
        {
          _id: "res_308",
          title: "Security Policy Templates",
          url: "https://example.com/resources/security-policies.zip"
        }
      ]
    }
  ]
};

// export const mockCourses: Course[] = [pythonBootcamp, advancedReactCourse]
export const mockCourses: Course[] = [pythonBootcamp, advancedReactCourse, javascriptBootcamp, webDesignFundamentals, flutterBootcamp, awsCloudComputing, cybersecurityEssentials, cyberSecurity]