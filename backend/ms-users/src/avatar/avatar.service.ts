import prisma from "../prisma/prisma.service";
import { CreateOrUpdateAvatarDto } from "./dto/create-avatar.dto";

export class AvatarService {
    async getAvatarAssets() {
        const assets = await prisma.avatarAsset.findMany({
            orderBy: { type: "asc" },
        });

        const colors = await prisma.color.findMany({
            orderBy: { name: "asc" },
        });

        return {
            assets,
            colors,
        };
    }

    async createOrUpdateAvatar(userId: number, dto: CreateOrUpdateAvatarDto) {
        const fileName = `avatar_user_${userId}.png`;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarId: true },
        });

        let avatar;

        if (user?.avatarId) {
            // ✅ Modifier l'avatar existant
            avatar = await prisma.avatar.update({
                where: { id: user.avatarId },
                data: {
                    url: `/avatars/${fileName}`,
                    shapeId: dto.shapeId,
                    eyesId: dto.eyesId,
                    mouthId: dto.mouthId,
                    patternId: dto.patternId ?? null,
                    colorShapeId: dto.colorShapeId,
                    colorEyesId: dto.colorEyesId,
                    colorMouthId: dto.colorMouthId,
                    colorPatternId: dto.colorPatternId ?? null,
                },
            });
        } else {
            // ✅ Créer un nouvel avatar s'il n'existe pas
            avatar = await prisma.avatar.create({
                data: {
                    url: `/avatars/${fileName}`,
                    shapeId: dto.shapeId,
                    eyesId: dto.eyesId,
                    mouthId: dto.mouthId,
                    patternId: dto.patternId ?? null,
                    colorShapeId: dto.colorShapeId,
                    colorEyesId: dto.colorEyesId,
                    colorMouthId: dto.colorMouthId,
                    colorPatternId: dto.colorPatternId ?? null,
                    user: {
                        connect: { id: userId },
                    },
                },
            });

            // Pas besoin de `update` l'utilisateur manuellement ici si la relation est définie depuis `Avatar`
        }

        return avatar;
    }

    async generateRandomAvatar(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { userStats: true },
        });

        if (!user || !user.userStats) {
            throw new Error("Utilisateur ou statistiques introuvables.");
        }

        const { level } = user.userStats;
        const isVip = false;

        const [assets, colors] = await Promise.all([
            prisma.avatarAsset.findMany({
                where: {
                    level: { lte: level },
                    OR: [
                        { vipOnly: false },
                        ...(isVip ? [{ vipOnly: true }] : []),
                    ],
                },
            }),
            prisma.color.findMany({
                where: {
                    level: { lte: level },
                    OR: [{ vip: false }, ...(isVip ? [{ vip: true }] : [])],
                },
            }),
        ]);

        const pick = (items: any[], type: string, optional = false) => {
            const filtered = items.filter((a) => a.type === type);
            if (filtered.length === 0 && optional) return null;
            if (filtered.length === 0) {
                throw new Error(
                    `Aucun asset disponible pour le type "${type}"`
                );
            }
            return filtered[Math.floor(Math.random() * filtered.length)];
        };

        const pickRequiredColor = () => {
            if (colors.length === 0) {
                throw new Error(
                    "Aucune couleur disponible pour les champs obligatoires"
                );
            }
            return colors[Math.floor(Math.random() * colors.length)];
        };

        const pickOptionalColor = () => {
            if (colors.length === 0) return null;
            return colors[Math.floor(Math.random() * colors.length)];
        };

        const fileName = `avatar_user_${userId}.png`;

        const avatarData = {
            url: `/avatars/${fileName}`,
            shapeId: pick(assets, "shape").id,
            eyesId: pick(assets, "eyes").id,
            mouthId: pick(assets, "mouth").id,
            patternId: pick(assets, "pattern", true)?.id ?? null,
            colorShapeId: pickRequiredColor().id,
            colorEyesId: pickRequiredColor().id,
            colorMouthId: pickRequiredColor().id,
            colorPatternId: pickOptionalColor()?.id ?? null,
        };

        const existing = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarId: true },
        });

        let avatar;

        if (existing?.avatarId) {
            avatar = await prisma.avatar.update({
                where: { id: existing.avatarId },
                data: avatarData,
            });
        } else {
            avatar = await prisma.avatar.create({
                data: {
                    ...avatarData,
                    user: { connect: { id: userId } },
                },
            });
        }

        return avatar;
    }
}
