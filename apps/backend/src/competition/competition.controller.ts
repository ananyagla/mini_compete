import { Controller, Post, Get, Body, Param, UseGuards, Request, Headers } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CreateCompetitionDto } from './dto/competition.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('api/competitions')
export class CompetitionController {
  constructor(private competitionService: CompetitionService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(['organizer']))
  @Post()
  async createCompetition(
    @Request() req,
    @Body() dto: CreateCompetitionDto,
  ) {
    return this.competitionService.createCompetition(req.user.userId, dto);
  }

  @Get()
  async getAllCompetitions() {
    return this.competitionService.getAllCompetitions();
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(['participant']))
  @Post(':id/register')
  async register(
    @Param('id') competitionId: string,
    @Request() req,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    return this.competitionService.registerForCompetition(
      competitionId,
      req.user.userId,
      idempotencyKey,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-registrations')
  async getMyRegistrations(@Request() req) {
    return this.competitionService.getUserRegistrations(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mailbox')
  async getMailbox(@Request() req) {
    return this.competitionService.getUserMailbox(req.user.userId);
  }
}
