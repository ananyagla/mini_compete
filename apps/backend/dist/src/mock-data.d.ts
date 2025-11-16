export declare const mockUsers: {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    createdAt: Date;
}[];
export declare const mockCompetitions: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    capacity: number;
    regDeadline: Date;
    organizerId: string;
    seatsLeft: number;
    createdAt: Date;
}[];
export declare const mockRegistrations: any[];
export declare const mockMailbox: any[];
export declare const mockIdempotencyKeys: Set<unknown>;
