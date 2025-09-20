export interface pricing {
    1?: number;
    3?: number;
    10?: number;
    lifetime?: number;
}

export interface Offer {
    _id: string;
    title: string;
    description: string;
    image?: string;
    courses: string[]; // courses ID's
    features: string[];
    pricing: pricing;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
    tags?: string[];
    bestSeller?: boolean;
}