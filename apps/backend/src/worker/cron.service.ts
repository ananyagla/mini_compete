import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    private prisma: PrismaService,
  ) {}

  @Cron('0 0 * * *')
  async sendUpcomingReminders() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const competitions = await this.prisma.competition.findMany({
      where: {
        regDeadline: {
          gte: tomorrow,
          lt: dayAfter,
        },
      },
      include: {
        registrations: {
          include: {
            user: true,
          },
        },
      },
    });

    let totalReminders = 0;

    for (const competition of competitions) {
      for (const registration of competition.registrations) {
        await this.emailQueue.add(
          'reminder',
          {
            userId: registration.userId,
            competitionId: competition.id,
          },
          {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 2000,
            },
          },
        );
        totalReminders++;
      }
    }

    console.log(`Enqueued ${totalReminders} reminders for ${competitions.length} competitions`);
  }
}
