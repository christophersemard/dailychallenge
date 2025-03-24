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

        return user;
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
