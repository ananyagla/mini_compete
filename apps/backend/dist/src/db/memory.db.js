"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.InMemoryDB = void 0;
const bcrypt = __importStar(require("bcrypt"));
class InMemoryDB {
    constructor() {
        this.users = new Map();
        this.competitions = new Map();
        this.registrations = new Map();
        this.mailbox = new Map();
        this.idempotencyKeys = new Set();
        this.seedData();
    }
    async seedData() {
        const hashedPassword = await bcrypt.hash('password123', 10);
        this.users.set('org1', { id: 'org1', email: 'organizer1@test.com', password: hashedPassword, name: 'Organizer One', role: 'organizer' });
        this.users.set('org2', { id: 'org2', email: 'organizer2@test.com', password: hashedPassword, name: 'Organizer Two', role: 'organizer' });
        this.users.set('part1', { id: 'part1', email: 'participant1@test.com', password: hashedPassword, name: 'Participant 1', role: 'participant' });
        this.users.set('part2', { id: 'part2', email: 'participant2@test.com', password: hashedPassword, name: 'Participant 2', role: 'participant' });
        this.users.set('part3', { id: 'part3', email: 'participant3@test.com', password: hashedPassword, name: 'Participant 3', role: 'participant' });
        this.competitions.set('comp1', {
            id: 'comp1',
            title: 'Web Dev Hackathon',
            description: 'Build a web app in 48 hours',
            tags: ['web', 'javascript'],
            capacity: 50,
            regDeadline: new Date('2025-12-31'),
            organizerId: 'org1',
            seatsLeft: 50,
            createdAt: new Date(),
        });
        this.competitions.set('comp2', {
            id: 'comp2',
            title: 'AI Challenge',
            description: 'Create an AI solution',
            tags: ['ai', 'ml'],
            capacity: 30,
            regDeadline: new Date('2025-12-25'),
            organizerId: 'org1',
            seatsLeft: 30,
            createdAt: new Date(),
        });
        this.competitions.set('comp3', {
            id: 'comp3',
            title: 'Mobile App Contest',
            description: 'Develop a mobile application',
            tags: ['mobile', 'app'],
            capacity: 40,
            regDeadline: new Date('2025-12-20'),
            organizerId: 'org2',
            seatsLeft: 40,
            createdAt: new Date(),
        });
    }
    findUserByEmail(email) {
        return Array.from(this.users.values()).find(u => u.email === email);
    }
    createUser(data) {
        const id = 'user_' + Date.now();
        const user = { id, ...data };
        this.users.set(id, user);
        return user;
    }
    findUserById(id) {
        return this.users.get(id);
    }
    getAllCompetitions() {
        return Array.from(this.competitions.values()).map(comp => ({
            ...comp,
            organizer: this.users.get(comp.organizerId),
        }));
    }
    createCompetition(data) {
        const id = 'comp_' + Date.now();
        const competition = { id, ...data, createdAt: new Date() };
        this.competitions.set(id, competition);
        return competition;
    }
    findCompetitionById(id) {
        return this.competitions.get(id);
    }
    findRegistration(userId, competitionId) {
        const key = `${userId}_${competitionId}`;
        return this.registrations.get(key);
    }
    createRegistration(userId, competitionId) {
        const id = 'reg_' + Date.now();
        const key = `${userId}_${competitionId}`;
        const registration = {
            id,
            userId,
            competitionId,
            status: 'confirmed',
            createdAt: new Date(),
        };
        this.registrations.set(key, registration);
        return registration;
    }
    decrementSeats(competitionId) {
        const comp = this.competitions.get(competitionId);
        if (comp) {
            comp.seatsLeft--;
        }
    }
    hasIdempotencyKey(key) {
        return this.idempotencyKeys.has(key);
    }
    saveIdempotencyKey(key) {
        this.idempotencyKeys.add(key);
    }
    getUserRegistrations(userId) {
        return Array.from(this.registrations.values())
            .filter(r => r.userId === userId)
            .map(r => ({
            ...r,
            competition: this.competitions.get(r.competitionId),
        }));
    }
    createMailboxEntry(data) {
        const id = 'mail_' + Date.now();
        const entry = { id, ...data, sentAt: new Date() };
        this.mailbox.set(id, entry);
        return entry;
    }
    getUserMailbox(userId) {
        return Array.from(this.mailbox.values())
            .filter(m => m.userId === userId)
            .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
    }
}
exports.InMemoryDB = InMemoryDB;
exports.db = new InMemoryDB();
//# sourceMappingURL=memory.db.js.map