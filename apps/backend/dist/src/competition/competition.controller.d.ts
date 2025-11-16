import { CompetitionService } from './competition.service';
import { CreateCompetitionDto } from './dto/competition.dto';
export declare class CompetitionController {
    private competitionService;
    constructor(competitionService: CompetitionService);
    createCompetition(req: any, dto: CreateCompetitionDto): Promise<{
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
    register(competitionId: string, req: any, idempotencyKey?: string): Promise<any>;
    getMyRegistrations(req: any): Promise<any[]>;
    getMailbox(req: any): Promise<any[]>;
}
