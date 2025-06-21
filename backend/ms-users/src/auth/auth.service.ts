import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import prisma from "../prisma/prisma.service";
import { UserEventsService } from "../user-events/user-events.service";
import { randomUUID } from "crypto";
import { MailerService } from "../mailer/mailer.service";
import { VipService } from "../vip/vip.service";
import { VipStatus } from "database";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userEventsService: UserEventsService,
        private mailerService: MailerService,
        private vipService: VipService
    ) {}

    async generateToken(user: {
        id: number;
        email: string;
        role: string;
        pseudo: string;
    }) {
        return this.jwtService.sign({
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.role,
            pseudo: user.pseudo,
        });
    }

    async verifyToken(token: string) {
        return this.jwtService.verify(token);
    }

    async createUser(email: string, password: string, pseudo: string) {
        if (!email || !password)
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );

        const existingUser = await prisma.user.findUnique({
            where: { pseudo },
        });
        if (existingUser)
            throw new UnprocessableEntityException("Pseudo déjà pris.");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, pseudo },
        });

        await prisma.userStats.create({
            data: { userId: user.id, xp: 0, level: 1, streak: 0 },
        });

        await this.userEventsService.addEvent(user.id, "user_registered");

        await this.mailerService.sendWelcomeEmail(user.email, user.pseudo);

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async validateUser(email: string, password: string) {
        if (!email || !password)
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );

        const user = await prisma.user.findFirst({
            where: { email, deletedAt: null },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException("Identifiants incorrects.");
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updatePassword(
        userId: number,
        dto: {
            currentPassword: string;
            newPassword: string;
            confirmPassword: string;
        }
    ) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new UnauthorizedException("Utilisateur introuvable.");

        const match = await bcrypt.compare(dto.currentPassword, user.password);
        if (!match)
            throw new UnauthorizedException("Mot de passe actuel incorrect.");

        if (dto.newPassword !== dto.confirmPassword) {
            throw new BadRequestException(
                "Les mots de passe ne correspondent pas."
            );
        }

        const newHash = await bcrypt.hash(dto.newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: newHash },
        });

        await this.mailerService.sendPasswordChangedEmail(user.email);

        return { success: true };
    }

    async updateEmail(
        userId: number,
        dto: { currentPassword: string; newEmail: string }
    ) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new UnauthorizedException("Utilisateur introuvable.");

        const match = await bcrypt.compare(dto.currentPassword, user.password);
        if (!match) throw new UnauthorizedException("Mot de passe incorrect.");

        await prisma.user.update({
            where: { id: user.id },
            data: { email: dto.newEmail },
        });

        await this.mailerService.sendEmailChangedEmail(
            dto.newEmail,
            user.email
        );

        return { success: true };
    }

    async deleteAccount(
        userId: number,
        currentPassword: string
    ): Promise<{ success: boolean }> {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new UnauthorizedException("Utilisateur introuvable.");
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Mot de passe incorrect.");
        }

        const activeSub = await prisma.vipSubscription.findFirst({
            where: {
                userId,
                status: { in: [VipStatus.active, VipStatus.cancelled] },
                stripeSubscriptionId: { not: null },
            },
        });

        if (activeSub?.stripeSubscriptionId) {
            await this.vipService.cancelSubscription(userId);
        }

        await prisma.user.update({
            where: { id: userId },
            data: { deletedAt: new Date() },
        });

        await this.mailerService.sendAccountDeletedEmail(
            user.email,
            user.pseudo
        );

        return { success: true };
    }

    async sendResetPasswordToken(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new BadRequestException("Aucun compte avec cet email.");

        const token = randomUUID();

        await prisma.passwordResetToken.deleteMany({
            where: { userId: user.id },
        });

        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt: new Date(Date.now() + 1000 * 60 * 30),
            },
        });

        console.log(`Token de reset pour ${email}: ${token}`);
        await this.mailerService.sendPasswordResetEmail(email, token);

        return { success: true };
    }

    async resetPasswordWithToken(data: {
        token: string;
        newPassword: string;
        confirmPassword: string;
    }) {
        const token = await prisma.passwordResetToken.findUnique({
            where: { token: data.token },
            include: { user: true },
        });

        if (!token || token.expiresAt < new Date()) {
            throw new BadRequestException("Token invalide ou expiré.");
        }

        if (data.newPassword !== data.confirmPassword) {
            throw new BadRequestException(
                "Les mots de passe ne correspondent pas."
            );
        }

        const newHash = await bcrypt.hash(data.newPassword, 10);

        await prisma.user.update({
            where: { id: token.userId },
            data: { password: newHash },
        });

        await prisma.passwordResetToken.delete({
            where: { token: token.token },
        });

        await this.mailerService.sendPasswordChangedEmail(token.user.email);

        return { success: true };
    }
}
