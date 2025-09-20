export interface Book {
    _id: string;
    title: string;
    description: string;
    instructorId: string;
    cover: string;
    url: string,
    pages?: number
    rating?: number;
    categories: string[];
    publishDate: Date;
    price: number;
    originalPrice?: number;
    discount?: number;
    isPublished: boolean;
  }