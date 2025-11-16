import { Process, Processor, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Processor('email')
@Injectable()
export class EmailProcessor {
  constructor(private prisma: PrismaService) {}

  @Process('confirmation')
  async handleConfirmation(job: Job) {
    const { to, subject, body, userId } = job.data;

    try {
      await this.prisma.mailBox.create({
        data: {
          userId,
          to,
          subject,
          body,
        },
      });

      return { success: true };
    } catch (error) {
      await this.prisma.failedJob.create({
        data: {
          jobData: JSON.stringify(job.data),
          error: error.message,
        },
      });
      throw error;
    }
  }

  @Process('reminder')
  async handleReminder(job: Job) {
    const { userId, competitionId } = job.data;

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      const competition = await this.prisma.competition.findUnique({
        where: { id: competitionId },
      });

      if (!user || !competition) {
        throw new Error('User or competition not found');
      }

      await this.prisma.mailBox.create({
        data: {
          userId,
          to: user.email,
          subject: 'Competition Reminder',
          body: `Reminder: ${competition.title} registration deadline is approaching on ${new Date(competition.regDeadline).toLocaleDateString()}`,
        },
      });

      return { success: true };
    } catch (error) {
      await this.prisma.failedJob.create({
        data: {
          jobData: JSON.stringify(job.data),
          error: error.message,
        },
      });
      throw error;
    }
  }

  @OnQueueFailed()
  async handleFailure(job: Job, error: Error) {
    console.error('Job failed:', job.id, error.message);
    try {
      await this.prisma.failedJob.create({
        data: {
          jobData: JSON.stringify(job.data),
          error: error.message,
        },
      });
    } catch (dbError) {
      console.error('Failed to log failed job:', dbError);
    }
  }
}
