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
            const lastPlayed = new Date(userStats.lastPlayedAt);
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
}
