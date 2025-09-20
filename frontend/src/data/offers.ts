import { Offer } from "../types/offer";

export const mockOffers: Offer[] = [
  {
    _id: "offer_001",
    title: "Frontend Mastery Bundle",
    description: "Everything you need to become a professional frontend developer. Save 40% compared to buying courses separately.",
    image: "https://example.com/offers/frontend-bundle.jpg",
    courses: ["course_001", "course_002", "course_005"],
    features: [
      "3 complete courses",
      "50+ hours of content",
      "3 live Q&A sessions",
      "Downloadable resources",
      "Certificate of completion"
    ],
    pricing: {
      1: 89.99,
      3: 79.99,
      10: 69.99,
      lifetime: 199.99
    },
    startDate: new Date("2023-11-01"),
    endDate: new Date("2023-12-31"),
    isActive: true,
    tags: ["frontend", "bundle", "best-value"],
    bestSeller: true
  },
  {
    _id: "offer_002",
    title: "Black Friday Special",
    description: "Limited-time offer for our annual best sale. Get lifetime access to all courses at an unprecedented price.",
    image: "https://example.com/offers/black-friday.jpg",
    courses: ["course_001", "course_002", "course_003", "course_004", "course_005"],
    features: [
      "Full platform access",
      "All current and future courses",
      "Priority support",
      "Exclusive community access"
    ],
    pricing: {
      1: 0, // Not available
      3: 0, // Not available
      10: 0, // Not available
      lifetime: 499.99
    },
    startDate: new Date("2023-11-24"),
    endDate: new Date("2023-11-27"),
    isActive: true,
    tags: ["limited", "all-access"]
  },
  {
    _id: "offer_003",
    title: "Data Science Starter Pack",
    description: "Begin your data science journey with these essential courses at a special student price.",
    courses: ["course_003", "course_006"],
    features: [
      "2 comprehensive courses",
      "Python fundamentals",
      "Machine learning basics",
      "Real-world projects"
    ],
    pricing: {
      1: 49.99,
      3: 44.99,
      10: 39.99,
      lifetime: 129.99
    },
    startDate: new Date("2023-12-01"),
    endDate: new Date("2024-01-31"),
    isActive: true,
    tags: ["data-science", "beginner"]
  },
];