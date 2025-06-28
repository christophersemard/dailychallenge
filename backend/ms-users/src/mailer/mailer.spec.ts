import { MailerService } from "./mailer.service";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import * as path from "path";

jest.mock("nodemailer");
const sendMailMock = jest.fn();

(nodemailer.createTransport as jest.Mock).mockReturnValue({
    sendMail: sendMailMock,
});

jest.mock("./templates", () => ({
    emailResetPassword: (token: string) => `<html>reset:${token}</html>`,
    emailWelcome: (pseudo: string) => `<html>welcome:${pseudo}</html>`,
    emailPasswordChanged: () => "<html>changed</html>",
    emailEmailChanged: (old: string, email: string) =>
        `<html>email:${old}->${email}</html>`,
    emailAccountDeleted: (pseudo: string) => `<html>deleted:${pseudo}</html>`,
    emailVipSubscribed: (pseudo: string, date: Date) =>
        `<html>vipSubscribed:${pseudo}</html>`,
    emailVipCancelled: (pseudo: string, date: Date) =>
        `<html>vipCancelled:${pseudo}</html>`,
    emailVipExpired: (pseudo: string) => `<html>vipExpired:${pseudo}</html>`,
    emailVipReactivated: (pseudo: string) =>
        `<html>vipReactivated:${pseudo}</html>`,
}));

describe("MailerService", () => {
    let mailerService: MailerService;

    beforeEach(() => {
        const config = {
            get: (key: string) => {
                if (key === "mail.host") return "smtp.test.com";
                if (key === "mail.port") return 587;
                if (key === "mail.user") return "test";
                if (key === "mail.pass") return "secret";
                if (key === "mail.from") return "no-reply@test.com";
                return null;
            },
        };

        mailerService = new MailerService(config as any);
        sendMailMock.mockClear();
    });

    it("should send reset password email", async () => {
        await mailerService.sendPasswordResetEmail("a@a.com", "token123");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                to: "a@a.com",
                subject: "Réinitialisation de ton mot de passe",
                html: "<html>reset:token123</html>",
            })
        );
    });

    it("should send welcome email", async () => {
        await mailerService.sendWelcomeEmail("b@b.com", "UserX");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                to: "b@b.com",
                subject: "Bienvenue sur DailyChallenge",
                html: "<html>welcome:UserX</html>",
            })
        );
    });

    it("should send password changed email", async () => {
        await mailerService.sendPasswordChangedEmail("a@a.com");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                subject: "Ton mot de passe a été modifié",
            })
        );
    });

    it("should send email changed email", async () => {
        await mailerService.sendEmailChangedEmail("new@a.com", "old@a.com");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                html: "<html>email:old@a.com->new@a.com</html>",
            })
        );
    });

    it("should send account deleted email", async () => {
        await mailerService.sendAccountDeletedEmail("a@a.com", "Player1");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                html: "<html>deleted:Player1</html>",
            })
        );
    });

    it("should send vip subscribed email", async () => {
        await mailerService.sendVipSubscribedEmail(
            "a@a.com",
            "VIPUser",
            new Date()
        );
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                subject: "Bienvenue parmi les VIP 👑",
            })
        );
    });

    it("should send vip cancelled email", async () => {
        await mailerService.sendVipCancelledEmail(
            "a@a.com",
            "VIPUser",
            new Date()
        );
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                subject: "Abonnement VIP résilié",
            })
        );
    });

    it("should send vip reactivated email", async () => {
        await mailerService.sendVipReactivatedEmail("a@a.com", "VIPUser");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                subject: "Renouvellement réactivé",
            })
        );
    });

    it("should send vip expired email", async () => {
        await mailerService.sendVipExpiredEmail("a@a.com", "VIPUser");
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                subject: "Ton abonnement VIP a expiré",
            })
        );
    });

    it("should attach logo to all emails", async () => {
        await mailerService.sendWelcomeEmail("a@a.com", "User");
        const call = sendMailMock.mock.calls[0][0];
        expect(call.attachments[0].filename).toBe("dailychallenge-logo.png");
        expect(call.attachments[0].cid).toBe("dailychallenge-logo");
        expect(call.attachments[0].path).toEqual(
            path.join(__dirname, "../../src/mailer/dailychallenge-logo.png")
        );
    });
});
