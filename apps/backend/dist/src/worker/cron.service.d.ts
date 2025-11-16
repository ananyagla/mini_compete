import { Queue } from 'bull';
export declare class CronService {
    private emailQueue;
    constructor(emailQueue: Queue);
    sendUpcomingReminders(): Promise<void>;
}
