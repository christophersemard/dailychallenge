import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { Prisma, VipStatus, VipPlan } from "database";

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
                    vipSubscriptions: {
                        where: {
                            status: { in: ["active", "cancelled"] },
                        },
                        orderBy: { startDate: "desc" },
                        take: 1,
                        select: {
                            endDate: true,
                            status: true,
                        },
                    },
                },
            }),
        ]);

        const now = new Date();

        const formatted = users.map((u) => {
            const vipSub = u.vipSubscriptions[0];

            const hasValidVip =
                vipSub &&
                ["active", "cancelled"].includes(vipSub.status) &&
                vipSub.endDate &&
                vipSub.endDate > now;

            const vip = hasValidVip
                ? {
                      status: vipSub.status,
                      until: vipSub.endDate!.toISOString(),
                      renewing: vipSub.status === "active",
                  }
                : null;

            return {
                id: u.id,
                pseudo: u.pseudo,
                email: u.email,
                vip,
                isActive: u.deletedAt === null,
                xp: u.userStats?.xp ?? 0,
                level: u.userStats?.level ?? 1,
                streak: u.userStats?.streak ?? 0,
                avatarUrl: u.avatar?.url ?? null,
            };
        });

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
        vipUntil,
    }: {
        id: number;
        pseudo?: string;
        email?: string;
        isVip?: boolean;
        isActive?: boolean;
        vipUntil?: Date;
    }) {
        const data: Prisma.UserUpdateInput = {};
        if (pseudo !== undefined) data.pseudo = pseudo;
        if (email !== undefined) data.email = email;
        if (isActive !== undefined)
            data.deletedAt = isActive ? null : new Date();

        if (isVip === true) {
            // Vérifie s’il existe déjà un abonnement actif
            const existing = await prisma.vipSubscription.findFirst({
                where: {
                    userId: id,
                    status: VipStatus.active,
                },
            });

            if (!existing) {
                // Création d’un VIP manuel avec une date de fin personnalisée
                await prisma.vipSubscription.create({
                    data: {
                        userId: id,
                        plan: VipPlan.manual,
                        status: VipStatus.active,
                        startDate: new Date(),
                        endDate:
                            vipUntil ??
                            new Date(
                                new Date().setFullYear(
                                    new Date().getFullYear() + 1
                                )
                            ),
                    },
                });
            } else if (existing.plan === VipPlan.manual && vipUntil) {
                // Mise à jour éventuelle de la date de fin
                await prisma.vipSubscription.update({
                    where: { id: existing.id },
                    data: {
                        endDate: vipUntil,
                    },
                });
            }
        }

        if (isVip === false) {
            await prisma.vipSubscription.updateMany({
                where: {
                    userId: id,
                    status: VipStatus.active,
                    plan: VipPlan.manual,
                },
                data: {
                    status: VipStatus.cancelled,
                    cancelledAt: new Date(),
                },
            });
        }

        const updated = await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                pseudo: true,
                email: true,
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

    async countUsers(): Promise<number> {
        return prisma.user.count({
            where: {
                deletedAt: null,
            },
        });
    }

    async countActiveVip(): Promise<number> {
        return prisma.vipSubscription.count({
            where: {
                status: { in: ["active", "cancelled"] },
                plan: { not: VipPlan.manual }, // Exclut les VIP manuels
                endDate: {
                    gt: new Date(), // encore valable
                },
            },
        });
    }
}
