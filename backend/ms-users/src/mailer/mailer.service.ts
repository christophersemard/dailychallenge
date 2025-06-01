import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { join } from "path";
import {
    emailResetPassword,
    emailWelcome,
    emailPasswordChanged,
    emailEmailChanged,
    emailAccountDeleted,
} from "./templates";

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(private config: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.config.get("mail.host"),
            port: this.config.get<number>("mail.port"),
            auth: {
                user: this.config.get("mail.user"),
                pass: this.config.get("mail.pass"),
            },
        });
    }

    private get logoAttachment() {
        return {
            filename: "dailychallenge-logo.png",
            path: join(__dirname, "../../src/mailer/dailychallenge-logo.png"),
            cid: "dailychallenge-logo",
        };
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const html = emailResetPassword(token);
        await this.send(email, "Réinitialisation de ton mot de passe", html);
    }

    async sendWelcomeEmail(email: string, pseudo: string) {
        const html = emailWelcome(pseudo);
        await this.send(email, "Bienvenue sur DailyChallenge", html);
    }

    async sendPasswordChangedEmail(email: string) {
        const html = emailPasswordChanged();
        await this.send(email, "Ton mot de passe a été modifié", html);
    }

    async sendEmailChangedEmail(email: string, oldEmail: string) {
        const html = emailEmailChanged(oldEmail, email);
        await this.send(email, "Ton adresse email a été modifiée", html);
    }

    async sendAccountDeletedEmail(email: string, pseudo: string) {
        const html = emailAccountDeleted(pseudo);
        await this.send(email, "Ton compte a été supprimé", html);
    }

    private async send(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: this.config.get("mail.from"),
            to,
            subject,
            html,
            attachments: [this.logoAttachment],
        });
    }
}
