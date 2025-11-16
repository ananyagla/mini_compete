import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CompetitionController } from './competition.controller';
import { CompetitionService } from './competition.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [CompetitionController],
  providers: [CompetitionService],
})
export class CompetitionModule {}
