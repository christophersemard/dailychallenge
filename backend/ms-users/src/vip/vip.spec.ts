import { VipService } from "./vip.service";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "../mailer/mailer.service";
import prisma from "../prisma/prisma.service";
import Stripe from "stripe";
import { VipPlan, VipStatus } from "database";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        vipSubscription: {
            findFirst: jest.fn(),
            create: jest.fn(),
            updateMany: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
        },
    },
}));

const mockStripe = {
    customers: {
        create: jest.fn(),
    },
    checkout: {
        sessions: {
            create: jest.fn(),
        },
    },
    subscriptions: {
        retrieve: jest.fn(),
        update: jest.fn(),
    },
};

jest.mock("stripe", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => mockStripe),
    };
});

describe("VipService", () => {
    let vipService: VipService;

    beforeEach(() => {
        vipService = new VipService(
            {
                get: jest.fn((key) => {
                    if (key === "STRIPE_SECRET_KEY") return "sk_test";
                    if (key === "FRONTEND_URL") return "http://localhost:3000";
                    return null;
                }),
            } as any,
            {
                sendVipSubscribedEmail: jest.fn(),
                sendVipCancelledEmail: jest.fn(),
                sendVipExpiredEmail: jest.fn(),
                sendVipReactivatedEmail: jest.fn(),
            } as any
        );

        jest.clearAllMocks();
    });

    describe("createSubscription", () => {
        it("should throw if plan is manual", async () => {
            await expect(
                vipService.createSubscription(1, "price_123", VipPlan.manual)
            ).rejects.toThrow();
        });

        it("should create session and return URL", async () => {
            mockStripe.customers.create.mockResolvedValue({ id: "cus_123" });
            mockStripe.checkout.sessions.create.mockResolvedValue({
                url: "http://checkout.url",
            });

            const result = await vipService.createSubscription(
                1,
                "price_123",
                VipPlan.monthly
            );

            expect(result.url).toBe("http://checkout.url");
        });
    });

    describe("cancelSubscription", () => {
        it("should return error if no active sub", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );

            const result = await vipService.cancelSubscription(1);
            expect(result.success).toBe(false);
        });

        it("should cancel subscription if found", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                stripeSubscriptionId: "sub_123",
            });

            mockStripe.subscriptions.update.mockResolvedValue({});

            const result = await vipService.cancelSubscription(1);
            expect(result.success).toBe(true);
        });
    });

    describe("reactivateSubscription", () => {
        it("should throw if no reactivable sub found", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );

            await expect(
                vipService.reactivateSubscription(1)
            ).rejects.toThrow();
        });

        it("should reactivate and send email", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                stripeSubscriptionId: "sub_123",
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                email: "test@test.com",
                pseudo: "Tester",
            });

            mockStripe.subscriptions.update.mockResolvedValue({});

            const result = await vipService.reactivateSubscription(1);
            expect(result.success).toBe(true);
        });
    });

    describe("updateSubscriptionStatus", () => {
        it("should update status and return count", async () => {
            (prisma.vipSubscription.updateMany as jest.Mock).mockResolvedValue({
                count: 1,
            });

            const result = await vipService.updateSubscriptionStatus(
                "sub_123",
                VipStatus.cancelled,
                new Date()
            );
            expect(result.success).toBe(true);
        });
    });

    describe("handleWebhook", () => {
        const now = new Date();

        it("should handle checkout.session.completed", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );
            mockStripe.subscriptions.retrieve.mockResolvedValue({
                cancel_at_period_end: false,
                items: {
                    data: [
                        {
                            current_period_end:
                                Math.floor(now.getTime() / 1000) + 3600,
                        },
                    ],
                },
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                email: "test@test.com",
                pseudo: "Tester",
            });

            await vipService.handleWebhook({
                type: "checkout.session.completed",
                data: {
                    object: {
                        subscription: "sub_123",
                        customer: "cus_123",
                        metadata: {
                            userId: "1",
                            plan: VipPlan.monthly,
                        },
                    },
                },
            } as any);
        });

        it("should handle customer.subscription.updated", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                user: {
                    email: "test@test.com",
                    pseudo: "Tester",
                },
            });

            await vipService.handleWebhook({
                type: "customer.subscription.updated",
                data: {
                    object: {
                        id: "sub_123",
                        status: "canceled",
                        cancel_at_period_end: true,
                        items: {
                            data: [
                                {
                                    current_period_end:
                                        Math.floor(Date.now() / 1000) + 1000,
                                },
                            ],
                        },
                    },
                },
            } as any);
        });

        it("should handle customer.subscription.deleted", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                endDate: new Date(),
                user: {
                    email: "test@test.com",
                    pseudo: "Tester",
                },
            });

            await vipService.handleWebhook({
                type: "customer.subscription.deleted",
                data: {
                    object: {
                        id: "sub_123",
                    },
                },
            } as any);
        });
    });
});
