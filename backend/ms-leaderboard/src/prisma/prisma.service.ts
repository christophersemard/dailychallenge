import { PrismaClient } from "database"; // 👈 Import du PrismaClient depuis `database`

const prisma = new PrismaClient(); // 👈 Chaque microservice instancie son propre client

export default prisma;
