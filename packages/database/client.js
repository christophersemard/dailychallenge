"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("./generated/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const globalForPrisma = global;
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
