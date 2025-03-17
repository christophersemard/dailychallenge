import {
    Injectable,
    ConflictException,
    BadRequestException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { UserEventsService } from "../user-events/user-events.service";

@Injectable()
export class UsersService {
    constructor(private readonly userEventsService: UserEventsService) {}

    async getAllUsers() {
        return await prisma.user.findMany();
    }

    async createUser(email: string, password: string) {
        if (!email || !password) {
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Création automatique des stats pour le nouvel utilisateur
        await prisma.userStats.create({
            data: {
                userId: user.id,
                xp: 0,
                level: 1,
                streak: 0,
            },
        });

        // 🔥 Ajout de l'événement "user_registered"
        await this.userEventsService.addEvent(
            user.id,
            "user_registered",
            `Nouvel utilisateur inscrit avec l'email ${email}`
        );

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async validateUser(email: string, password: string) {
        if (!email || !password) {
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );
        }

        const user = await prisma.user.findUnique({
            where: { email, deletedAt: null },
        });

        if (!user) {
            throw new BadRequestException("Identifiants incorrects.");
        }

        // ✅ Comparer le mot de passe entré avec le hash en base de données
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException("Identifiants incorrects.");
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserStats(userId: number) {
        const userStats = await prisma.userStats.findUnique({
            where: { userId },
        });

        if (!userStats) throw new BadRequestException("Utilisateur non trouvé");

        // Vérifier si le streak doit être reset
        const today = new Date();
        if (userStats.lastPlayedAt) {
            console.log("Last played at:", userStats.lastPlayedAt);
            const lastPlayed = new Date(userStats.lastPlayedAt);
            const diffDays = Math.floor(
                (today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (diffDays > 1) {
                // 🔥 Réinitialisation du streak
                await prisma.userStats.update({
                    where: { userId },
                    data: { streak: 0 },
                });

                userStats.streak = 0; // Mettre à jour la valeur retournée
            }
        }

        return userStats;
    }

    async addXP(userId: number, xpGained: number) {
        const userStats = await prisma.userStats.findUnique({
            where: { userId },
        });
        if (!userStats) throw new BadRequestException("Utilisateur non trouvé");

        // Calcul du streak
        const today = new Date();
        const lastPlayed = userStats.lastPlayedAt
            ? new Date(userStats.lastPlayedAt)
            : null;
        let newStreak = userStats.streak;

        if (lastPlayed) {
            // Comparaison basée uniquement sur l'année, le mois et le jour (ignorer l'heure)
            const lastPlayedDay = new Date(
                lastPlayed.getFullYear(),
                lastPlayed.getMonth(),
                lastPlayed.getDate()
            );
            const todayDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );

            const diffDays = Math.floor(
                (todayDay.getTime() - lastPlayedDay.getTime()) /
                    (1000 * 60 * 60 * 24)
            );

            if (diffDays === 1) {
                newStreak++; // Joué consécutivement
            } else if (diffDays > 1) {
                newStreak = 1; // Reset du streak si plus d'un jour d'écart
            }
        } else {
            newStreak = 1; // Premier jour de jeu
        }

        // Bonus de streak
        const streakMultiplier = Math.min(1 + newStreak * 0.1, 2);
        const finalXP = Math.floor(xpGained * streakMultiplier);

        // Calcul du niveau
        const { level, xpToNextLevel } = this.calculateLevel(
            userStats.xp + finalXP
        );

        // Vérifier si le joueur monte de niveau
        if (level > userStats.level) {
            await this.userEventsService.addEvent(
                userId,
                "level_up",
                `Niveau ${level} atteint`
            );
        }

        // Vérifier si le joueur atteint un streak spécial (ex: 10 jours)
        if (newStreak > 1 && newStreak % 10 === 0) {
            // Empêche un streak de 0
            await this.userEventsService.addEvent(
                userId,
                "streak_bonus",
                `Streak de ${newStreak} jours`
            );
        }

        // Mise à jour des stats
        return await prisma.userStats.update({
            where: { userId },
            data: {
                xp: userStats.xp + finalXP,
                level,
                streak: newStreak,
                lastPlayedAt: today, // Met à jour seulement après le calcul
            },
        });
    }

    private calculateLevel(
        xpTotal: number
    ): { level: number; xpToNextLevel: number } {
        const baseXP = 50;
        const factor = 10;
        let level = 1;
        let xpRequired = baseXP * level ** 2 + factor * level;

        while (xpTotal >= xpRequired) {
            xpTotal -= xpRequired;
            level++;
            xpRequired = baseXP * level ** 2 + factor * level;
        }

        return { level, xpToNextLevel: xpRequired - xpTotal };
    }
}
