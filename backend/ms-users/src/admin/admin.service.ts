import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { Prisma } from "database";

@Injectable()
export class AdminService {
    async findAll({
        page = 1,
        limit = 20,
        search = "",
    }: {
        page: number;
        limit: number;
        search: string;
    }) {
        const where: Prisma.UserWhereInput = search
            ? {
                  OR: [
                      { pseudo: { contains: search, mode: "insensitive" } },
                      { email: { contains: search, mode: "insensitive" } },
                  ],
              }
            : {};

        const [total, users] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: Number(limit),
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    pseudo: true,
                    email: true,
                    isVip: true,
                    deletedAt: true,
                    userStats: {
                        select: {
                            xp: true,
                            level: true,
                            streak: true,
                        },
                    },
                    avatar: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            }),
        ]);

        const formatted = users.map((u) => ({
            id: u.id,
            pseudo: u.pseudo,
            email: u.email,
            isVip: u.isVip,
            isActive: u.deletedAt === null,
            xp: u.userStats?.xp ?? 0,
            level: u.userStats?.level ?? 1,
            streak: u.userStats?.streak ?? 0,
            avatarUrl: u.avatar?.url ?? null,
        }));

        return {
            data: formatted,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async update({
        id,
        pseudo,
        email,
        isVip,
        isActive,
    }: {
        id: number;
        pseudo?: string;
        email?: string;
        isVip?: boolean;
        isActive?: boolean;
    }) {
        const data: Prisma.UserUpdateInput = {};

        if (pseudo !== undefined) data.pseudo = pseudo;
        if (email !== undefined) data.email = email;
        if (isVip !== undefined) data.isVip = isVip;
        if (isActive !== undefined)
            data.deletedAt = isActive ? null : new Date();

        const updated = await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                pseudo: true,
                email: true,
                isVip: true,
                deletedAt: true,
            },
        });

        return {
            message: "Utilisateur mis à jour",
            user: {
                ...updated,
                isActive: updated.deletedAt === null,
            },
        };
    }
}
