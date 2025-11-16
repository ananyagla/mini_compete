import { Job } from 'bull';
export declare class EmailProcessor {
    constructor();
    handleConfirmation(job: Job): Promise<{
        success: boolean;
    }>;
    handleReminder(job: Job): Promise<{
        success: boolean;
    }>;
    handleFailure(job: Job, error: Error): Promise<void>;
}
