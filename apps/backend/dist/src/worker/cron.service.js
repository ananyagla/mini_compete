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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bull_1 = require("@nestjs/bull");
const memory_db_1 = require("../db/memory.db");
let CronService = class CronService {
    constructor(emailQueue) {
        this.emailQueue = emailQueue;
    }
    async sendUpcomingReminders() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(dayAfter.getDate() + 1);
        const allCompetitions = memory_db_1.db.getAllCompetitions();
        const competitions = allCompetitions.filter(comp => {
            const deadline = new Date(comp.regDeadline);
            return deadline >= tomorrow && deadline < dayAfter;
        });
        for (const competition of competitions) {
            const registrations = memory_db_1.db.getUserRegistrations(competition.id);
            for (const registration of registrations) {
                await this.emailQueue.add('reminder', {
                    userId: registration.userId,
                    competitionId: competition.id,
                }, {
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 2000,
                    },
                });
            }
        }
        console.log(`Enqueued reminders for ${competitions.length} competitions`);
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "sendUpcomingReminders", null);
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('email')),
    __metadata("design:paramtypes", [Object])
], CronService);
//# sourceMappingURL=cron.service.js.map