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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionController = void 0;
const common_1 = require("@nestjs/common");
const competition_service_1 = require("./competition.service");
const competition_dto_1 = require("./dto/competition.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_guard_1 = require("../auth/role.guard");
let CompetitionController = class CompetitionController {
    constructor(competitionService) {
        this.competitionService = competitionService;
    }
    async createCompetition(req, dto) {
        return this.competitionService.createCompetition(req.user.userId, dto);
    }
    async getAllCompetitions() {
        return this.competitionService.getAllCompetitions();
    }
    async register(competitionId, req, idempotencyKey) {
        return this.competitionService.registerForCompetition(competitionId, req.user.userId, idempotencyKey);
    }
    async getMyRegistrations(req) {
        return this.competitionService.getUserRegistrations(req.user.userId);
    }
    async getMailbox(req) {
        return this.competitionService.getUserMailbox(req.user.userId);
    }
};
exports.CompetitionController = CompetitionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new role_guard_1.RoleGuard(['organizer'])),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, competition_dto_1.CreateCompetitionDto]),
    __metadata("design:returntype", Promise)
], CompetitionController.prototype, "createCompetition", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompetitionController.prototype, "getAllCompetitions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new role_guard_1.RoleGuard(['participant'])),
    (0, common_1.Post)(':id/register'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('idempotency-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], CompetitionController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my-registrations'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompetitionController.prototype, "getMyRegistrations", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('mailbox'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompetitionController.prototype, "getMailbox", null);
exports.CompetitionController = CompetitionController = __decorate([
    (0, common_1.Controller)('api/competitions'),
    __metadata("design:paramtypes", [competition_service_1.CompetitionService])
], CompetitionController);
//# sourceMappingURL=competition.controller.js.map