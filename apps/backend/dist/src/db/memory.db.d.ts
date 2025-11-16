export declare class InMemoryDB {
    private users;
    private competitions;
    private registrations;
    private mailbox;
    private idempotencyKeys;
    constructor();
    private seedData;
    findUserByEmail(email: string): any;
    createUser(data: any): any;
    findUserById(id: string): any;
    getAllCompetitions(): any[];
    createCompetition(data: any): any;
    findCompetitionById(id: string): any;
    findRegistration(userId: string, competitionId: string): any;
    createRegistration(userId: string, competitionId: string): {
        id: string;
        userId: string;
        competitionId: string;
        status: string;
        createdAt: Date;
    };
    decrementSeats(competitionId: string): void;
    hasIdempotencyKey(key: string): boolean;
    saveIdempotencyKey(key: string): void;
    getUserRegistrations(userId: string): any[];
    createMailboxEntry(data: any): any;
    getUserMailbox(userId: string): any[];
}
export declare const db: InMemoryDB;
