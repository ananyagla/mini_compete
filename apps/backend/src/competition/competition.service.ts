import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateCompetitionDto } from './dto/competition.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompetitionService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async createCompetition(userId: string, dto: CreateCompetitionDto) {
    const competition = await this.prisma.competition.create({
      data: {
        title: dto.title,
        description: dto.description,
        tags: dto.tags || [],
        capacity: dto.capacity,
        regDeadline: new Date(dto.regDeadline),
        organizerId: userId,
        seatsLeft: dto.capacity,
      },
    });

    return competition;
  }

  async getAllCompetitions() {
    return this.prisma.competition.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async registerForCompetition(
    competitionId: string,
    userId: string,
    idempotencyKey?: string,
  ) {
    if (idempotencyKey) {
      const existing = await this.prisma.idempotencyKey.findUnique({
        where: { key: idempotencyKey },
        include: { registration: true },
      });

      if (existing) {
        return existing.registration;
      }
    }

    return await this.prisma.$transaction(async (tx) => {
      const competition = await tx.competition.findUnique({
        where: { id: competitionId },
      });

      if (!competition) {
        throw new NotFoundException('Competition not found');
      }

      if (new Date() > competition.regDeadline) {
        throw new BadRequestException('Registration deadline has passed');
      }

      if (competition.seatsLeft <= 0) {
        throw new BadRequestException('No seats available');
      }

      const existingReg = await tx.registration.findFirst({
        where: {
          userId,
          competitionId,
        },
      });

      if (existingReg) {
        throw new ConflictException('Already registered');
      }

      const registration = await tx.registration.create({
        data: {
          userId,
          competitionId,
          status: 'confirmed',
        },
      });

      await tx.competition.update({
        where: { id: competitionId },
        data: { seatsLeft: { decrement: 1 } },
      });

      if (idempotencyKey) {
        await tx.idempotencyKey.create({
          data: {
            key: idempotencyKey,
            registrationId: registration.id,
          },
        });
      }

      const user = await tx.user.findUnique({ where: { id: userId } });
      
      await this.emailQueue.add('confirmation', {
        to: user.email,
        subject: 'Registration Confirmation',
        body: `You have successfully registered for ${competition.title}`,
        userId: user.id,
      });

      return registration;
    });
  }

  async getUserRegistrations(userId: string) {
    return this.prisma.registration.findMany({
      where: { userId },
      include: {
        competition: true,
      },
    });
  }

  async getUserMailbox(userId: string) {
    return this.prisma.mailBox.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
    });
  }
}
