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
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const organizer1 = await prisma.user.create({
        data: {
            email: 'organizer1@test.com',
            password: hashedPassword,
            name: 'Organizer One',
            role: 'organizer',
        },
    });
    const organizer2 = await prisma.user.create({
        data: {
            email: 'organizer2@test.com',
            password: hashedPassword,
            name: 'Organizer Two',
            role: 'organizer',
        },
    });
    const participants = [];
    for (let i = 1; i <= 5; i++) {
        const user = await prisma.user.create({
            data: {
                email: `participant${i}@test.com`,
                password: hashedPassword,
                name: `Participant ${i}`,
                role: 'participant',
            },
        });
        participants.push(user);
    }
    const competitions = [
        {
            title: 'Web Dev Hackathon',
            description: 'Build a web app in 48 hours',
            tags: ['web', 'javascript'],
            capacity: 50,
            regDeadline: new Date('2025-12-31'),
            organizerId: organizer1.id,
            seatsLeft: 50,
        },
        {
            title: 'AI Challenge',
            description: 'Create an AI solution',
            tags: ['ai', 'ml'],
            capacity: 30,
            regDeadline: new Date('2025-12-25'),
            organizerId: organizer1.id,
            seatsLeft: 30,
        },
        {
            title: 'Mobile App Contest',
            description: 'Develop a mobile application',
            tags: ['mobile', 'app'],
            capacity: 40,
            regDeadline: new Date('2025-12-20'),
            organizerId: organizer2.id,
            seatsLeft: 40,
        },
        {
            title: 'Data Science Sprint',
            description: 'Analyze and visualize data',
            tags: ['data', 'analytics'],
            capacity: 25,
            regDeadline: new Date('2025-11-30'),
            organizerId: organizer2.id,
            seatsLeft: 25,
        },
        {
            title: 'Startup Pitch Competition',
            description: 'Pitch your startup idea',
            tags: ['startup', 'business'],
            capacity: 20,
            regDeadline: new Date('2025-12-15'),
            organizerId: organizer1.id,
            seatsLeft: 20,
        },
    ];
    for (const comp of competitions) {
        await prisma.competition.create({ data: comp });
    }
    console.log('Seed completed successfully');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map