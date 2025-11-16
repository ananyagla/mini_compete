"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionService = void 0;
const common_1 = require("@nestjs/common");
const mock_data_1 = require("../mock-data");
let CompetitionService = class CompetitionService {
    constructor() { }
    async createCompetition(userId, dto) {
        const competition = {
            id: `comp${Date.now()}`,
            title: dto.title,
            description: dto.description,
            tags: dto.tags || [],
            capacity: dto.capacity,
            regDeadline: new Date(dto.regDeadline),
            organizerId: userId,
            seatsLeft: dto.capacity,
            createdAt: new Date(),
        };
        mock_data_1.mockCompetitions.push(competition);
        return competition;
    }
    async getAllCompetitions() {
        return mock_data_1.mockCompetitions.map(comp => ({
            ...comp,
            organizer: mock_data_1.mockUsers.find(u => u.id === comp.organizerId),
        }));
    }
    async registerForCompetition(competitionId, userId, idempotencyKey) {
        if (idempotencyKey && mock_data_1.mockIdempotencyKeys.has(idempotencyKey)) {
            const registration = mock_data_1.mockRegistrations.find(r => r.userId === userId && r.competitionId === competitionId);
            if (registration) {
                return registration;
            }
        }
        const competition = mock_data_1.mockCompetitions.find(c => c.id === competitionId);
        if (!competition) {
            throw new common_1.NotFoundException('Competition not found');
        }
        if (new Date() > competition.regDeadline) {
            throw new common_1.BadRequestException('Registration deadline has passed');
        }
        if (competition.seatsLeft <= 0) {
            throw new common_1.BadRequestException('No seats available');
        }
        const existingReg = mock_data_1.mockRegistrations.find(r => r.userId === userId && r.competitionId === competitionId);
        if (existingReg) {
            throw new common_1.ConflictException('Already registered');
        }
        const registration = {
            id: `reg${Date.now()}`,
            userId,
            competitionId,
            status: 'confirmed',
            createdAt: new Date(),
        };
        mock_data_1.mockRegistrations.push(registration);
        competition.seatsLeft--;
        if (idempotencyKey) {
            mock_data_1.mockIdempotencyKeys.add(idempotencyKey);
        }
        const user = mock_data_1.mockUsers.find(u => u.id === userId);
        mock_data_1.mockMailbox.push({
            id: `mail${Date.now()}`,
            userId,
            to: user.email,
            subject: 'Registration Confirmation',
            body: `You have successfully registered for ${competition.title}`,
            sentAt: new Date(),
        });
        return registration;
    }
    async getUserRegistrations(userId) {
        return mock_data_1.mockRegistrations
            .filter(r => r.userId === userId)
            .map(r => ({
            ...r,
            competition: mock_data_1.mockCompetitions.find(c => c.id === r.competitionId),
        }));
    }
    async getUserMailbox(userId) {
        return mock_data_1.mockMailbox
            .filter(m => m.userId === userId)
            .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
    }
};
exports.CompetitionService = CompetitionService;
exports.CompetitionService = CompetitionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CompetitionService);
//# sourceMappingURL=competition.service.js.map