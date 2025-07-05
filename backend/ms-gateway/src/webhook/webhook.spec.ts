import { Test, TestingModule } from "@nestjs/testing";
import { WebhookController } from "./webhook.controller";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import Stripe from "stripe";
import { ClientProxy } from "@nestjs/microservices";

describe("WebhookController", () => {
    let controller: WebhookController;
    let stripeMock: jest.Mocked<Stripe>;
    let usersClientMock: { send: jest.Mock };
    let configServiceMock: { get: jest.Mock };

    beforeEach(async () => {
        usersClientMock = {
            send: jest
                .fn()
                .mockReturnValue({ toPromise: () => Promise.resolve() }),
        };

        configServiceMock = {
            get: jest.fn((key: string) => {
                if (key === "STRIPE_SECRET_KEY") return "sk_test_123";
                if (key === "STRIPE_WEBHOOK_SECRET") return "whsec_abc";
                return null;
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [WebhookController],
            providers: [
                { provide: ConfigService, useValue: configServiceMock },
                { provide: "USERS_SERVICE", useValue: usersClientMock },
            ],
        }).compile();

        controller = module.get(WebhookController);

        // remplace l'instance stripe dans le contrôleur
        Object.defineProperty(controller, "stripe", {
            value: {
                webhooks: {
                    constructEvent: jest.fn(),
                },
            },
        });

        jest.spyOn(Logger.prototype, "log").mockImplementation(() => {});
        jest.spyOn(Logger.prototype, "error").mockImplementation(() => {});
    });

    it("should return 400 if Stripe signature is invalid", async () => {
        const req = {
            body: Buffer.from("invalid"),
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as any;

        (controller["stripe"].webhooks
            .constructEvent as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid signature");
        });

        await controller.handleStripeWebhook(req, res, "bad-sig");

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            "Webhook Error: Invalid signature"
        );
    });

    it("should forward valid event to user microservice", async () => {
        const fakeEvent = { id: "evt_123", type: "checkout.session.completed" };

        const req = {
            body: Buffer.from("valid"),
        } as any;

        const res = {
            json: jest.fn(),
        } as any;

        (controller["stripe"].webhooks
            .constructEvent as jest.Mock).mockReturnValue(fakeEvent);

        await controller.handleStripeWebhook(req, res, "good-sig");

        expect(
            usersClientMock.send
        ).toHaveBeenCalledWith("stripe_webhook_event", { event: fakeEvent });
        expect(res.json).toHaveBeenCalledWith({ received: true });
    });
});
