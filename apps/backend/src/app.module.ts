import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { CompetitionModule } from './competition/competition.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    CompetitionModule,
    WorkerModule,
  ],
})
export class AppModule {}
