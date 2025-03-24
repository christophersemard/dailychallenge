import prisma from "../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UsersService {
    async getUserById(userId: number) {
        if (!userId) {
            throw new BadRequestException("ID utilisateur requis.");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId, deletedAt: null },
            select: {
                id: true,
                pseudo: true,
                createdAt: true,
                avatar: { select: { url: true } },
                userStats: {
                    select: {
                        level: true,
                        xp: true,
                        streak: true,
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException("Utilisateur introuvable.");
        }

        return user;
    }

    async getUserList() {
        return prisma.user.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                pseudo: true,
                createdAt: true,
                avatar: { select: { url: true } },
            },
        });
    }
}
