import { CreateCompetitionDto } from './dto/competition.dto';
export declare class CompetitionService {
    constructor();
    createCompetition(userId: string, dto: CreateCompetitionDto): Promise<{
        id: string;
        title: string;
        description: string;
        tags: string[];
        capacity: number;
        regDeadline: Date;
        organizerId: string;
        seatsLeft: number;
        createdAt: Date;
    }>;
    getAllCompetitions(): Promise<{
        organizer: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: string;
            createdAt: Date;
        };
        id: string;
        title: string;
        description: string;
        tags: string[];
        capacity: number;
        regDeadline: Date;
        organizerId: string;
        seatsLeft: number;
        createdAt: Date;
    }[]>;
    registerForCompetition(competitionId: string, userId: string, idempotencyKey?: string): Promise<any>;
    getUserRegistrations(userId: string): Promise<any[]>;
    getUserMailbox(userId: string): Promise<any[]>;
}
