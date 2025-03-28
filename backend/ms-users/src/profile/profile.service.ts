import {
    Injectable,
    ConflictException,
    NotFoundException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
    async getProfile(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                avatar: {
                    include: {
                        shape: true,
                        eyes: true,
                        mouth: true,
                        pattern: true,
                        colorShape: true,
                        colorEyes: true,
                        colorMouth: true,
                        colorPattern: true,
                    },
                },
                userStats: true,
            },
        });

        if (!user || user.deletedAt) {
            throw new NotFoundException("Utilisateur introuvable");
        }

        // On a besoin de compter le nombre de demandes d'ami en attente
        const friendRequests = await prisma.friend.findMany({
            where: { friendId: Number(userId), status: "pending" },
        });

        return {
            id: user.id,
            pseudo: user.pseudo,
            firstName: user.firstName,
            lastName: user.lastName,
            birthdate: user.birthdate,
            createdAt: user.createdAt,
            avatar:
                (user.avatar && {
                    id: user.avatar.id,
                    url: user.avatar.url,
                }) ||
                null,
            userStats:
                (user.userStats && {
                    id: user.userStats.id,
                    xp: user.userStats.xp,
                    level: user.userStats.level,
                    streak: user.userStats.streak,
                    lastPlayedAt: user.userStats.lastPlayedAt,
                }) ||
                null,
            pendingFriendRequests: friendRequests.length,
        };
    }

    async updateProfile(userId: number, dto: UpdateProfileDto) {
        if (dto.pseudo) {
            const existing = await prisma.user.findFirst({
                where: {
                    pseudo: dto.pseudo,
                    id: { not: userId },
                },
            });
            if (existing) {
                throw new ConflictException("Ce pseudo est déjà utilisé");
            }
        }

        return prisma.user.update({
            where: { id: userId },
            data: {
                pseudo: dto.pseudo,
                firstName: dto.firstName,
                lastName: dto.lastName,
                birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
            },
        });
    }
}
