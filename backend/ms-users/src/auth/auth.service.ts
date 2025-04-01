import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { BadRequestException } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { UserEventsService } from "../user-events/user-events.service";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userEventsService: UserEventsService
    ) {}

    async generateToken(user: { id: number; email: string; role: string }) {
        return this.jwtService.sign({
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.role,
        });
    }

    async verifyToken(token: string) {
        return this.jwtService.verify(token);
    }

    async createUser(email: string, password: string, pseudo: string) {
        if (!email || !password) {
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );
        }

        // Vérification de l'existence de l'utilisateur
        const existingUser = await prisma.user.findUnique({
            where: { pseudo },
        });

        if (existingUser) {
            throw new UnprocessableEntityException("Pseudo déjà pris.");
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                pseudo,
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
}
