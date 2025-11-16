import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import { CronService } from './cron.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    PrismaModule,
  ],
  providers: [EmailProcessor, CronService],
})
export class WorkerModule {}
