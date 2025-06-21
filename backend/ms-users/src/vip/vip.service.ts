import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import prisma from "../prisma/prisma.service";
import { Prisma, VipStatus, VipPlan } from "database";
import { addMonths, addYears } from "date-fns";
import { RpcException } from "@nestjs/microservices";
import { MailerService } from "../mailer/mailer.service"; // adapte le chemin selon ton arborescence

@Injectable()
export class VipService {
    private stripe: Stripe;
    private readonly logger = new Logger(VipService.name);

    constructor(
        private readonly config: ConfigService,
        private readonly mailerService: MailerService
    ) {
        this.stripe = new Stripe(config.get<string>("STRIPE_SECRET_KEY")!);
    }

    async createSubscription(userId: number, priceId: string, plan: VipPlan) {
        if (plan === VipPlan.manual) {
            throw new RpcException(
                "Le plan 'manual' ne peut pas être utilisé ici."
            );
        }

        const customer = await this.stripe.customers.create({
            metadata: { userId: String(userId) },
        });

        const session = await this.stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customer.id,
            line_items: [{ price: priceId, quantity: 1 }],
            success_url:
                this.config.get<string>("FRONTEND_URL") + "/vip/confirmation",
            cancel_url:
                this.config.get<string>("FRONTEND_URL") + "/vip/annuler",
            metadata: { userId: String(userId), plan },
        });

        this.logger.log(
            `Checkout session created for user #${userId}, plan: ${plan}`
        );
        return { url: session.url };
    }

    async handleWebhook(event: Stripe.Event) {
        this.logger.debug(`Webhook event received: ${event.type}`);

        if (event.type === "checkout.session.completed") {
            try {
                const session = event.data.object as Stripe.Checkout.Session;
                const subscriptionId = session.subscription as string;
                const customerId = session.customer as string;
                const userId = Number(session.metadata?.userId);
                const plan = session.metadata?.plan as VipPlan;

                const exists = await prisma.vipSubscription.findFirst({
                    where: { stripeSubscriptionId: subscriptionId },
                });

                if (exists) {
                    this.logger.warn(
                        `⚠️ Subscription ${subscriptionId} already exists`
                    );
                    return;
                }

                const subscription = await this.stripe.subscriptions.retrieve(
                    subscriptionId
                );
                const subscriptionItem = subscription.items?.data?.[0];

                const endDate = subscriptionItem?.current_period_end
                    ? new Date(subscriptionItem.current_period_end * 1000)
                    : plan === VipPlan.monthly
                    ? addMonths(new Date(), 1)
                    : addYears(new Date(), 1);

                await prisma.vipSubscription.create({
                    data: {
                        userId,
                        stripeSubscriptionId: subscriptionId,
                        stripeCustomerId: customerId,
                        plan,
                        status: subscription.cancel_at_period_end
                            ? VipStatus.cancelled
                            : VipStatus.active,
                        startDate: new Date(),
                        endDate,
                    },
                });

                const user = await prisma.user.findUnique({
                    where: { id: userId },
                });
                if (user) {
                    await this.mailerService.sendVipSubscribedEmail(
                        user.email,
                        user.pseudo,
                        endDate
                    );
                }
            } catch (err) {
                this.logger.error("❌ Erreur checkout.session.completed", err);
                throw err;
            }
        }

        if (event.type === "customer.subscription.updated") {
            const subscription = event.data.object as Stripe.Subscription;
            const subscriptionItem = subscription.items?.data?.[0];
            const now = new Date();

            const endDate = subscriptionItem?.current_period_end
                ? new Date(subscriptionItem.current_period_end * 1000)
                : undefined;

            let status: VipStatus;
            if (subscription.cancel_at_period_end && endDate && now > endDate) {
                status = VipStatus.expired;
            } else if (subscription.cancel_at_period_end) {
                status = VipStatus.cancelled;
            } else if (subscription.status === "active") {
                status = VipStatus.active;
            } else if (subscription.status === "canceled") {
                status = VipStatus.cancelled;
            } else {
                status = VipStatus.expired;
            }

            this.logger.log(
                `🛠️ Subscription ${
                    subscription.id
                } updated: status ${status}, ends: ${
                    endDate?.toISOString() ?? "unknown"
                }`
            );

            await prisma.vipSubscription.updateMany({
                where: { stripeSubscriptionId: subscription.id },
                data: {
                    status,
                    ...(endDate ? { endDate } : {}),
                },
            });

            const vip = await prisma.vipSubscription.findFirst({
                where: { stripeSubscriptionId: subscription.id },
                include: { user: true },
            });

            if (vip && vip.user) {
                if (status === VipStatus.cancelled && now < (endDate ?? now)) {
                    await this.mailerService.sendVipCancelledEmail(
                        vip.user.email,
                        vip.user.pseudo,
                        endDate!
                    );
                } else if (status === VipStatus.expired) {
                    await this.mailerService.sendVipExpiredEmail(
                        vip.user.email,
                        vip.user.pseudo
                    );
                }
            }
        }

        if (event.type === "customer.subscription.deleted") {
            const subscription = event.data.object as Stripe.Subscription;

            this.logger.warn(
                `Subscription ${subscription.id} cancelled (deleted)`
            );

            await prisma.vipSubscription.updateMany({
                where: { stripeSubscriptionId: subscription.id },
                data: {
                    status: VipStatus.cancelled,
                    cancelledAt: new Date(),
                },
            });

            const vip = await prisma.vipSubscription.findFirst({
                where: { stripeSubscriptionId: subscription.id },
                include: { user: true },
            });

            if (vip && vip.user) {
                await this.mailerService.sendVipCancelledEmail(
                    vip.user.email,
                    vip.user.pseudo,
                    vip.endDate!
                );
            }
        }

        return { received: true };
    }

    async cancelSubscription(userId: number) {
        const existing = await prisma.vipSubscription.findFirst({
            where: { userId, status: VipStatus.active },
        });

        if (!existing || !existing.stripeSubscriptionId) {
            return {
                success: false,
                message: "Aucun abonnement actif trouvé.",
            };
        }

        await this.stripe.subscriptions.update(existing.stripeSubscriptionId, {
            cancel_at_period_end: true,
        });

        return {
            success: true,
            message: "Abonnement en attente d’annulation.",
        };
    }

    async reactivateSubscription(userId: number) {
        const now = new Date();

        const sub = await prisma.vipSubscription.findFirst({
            where: {
                userId,
                plan: { not: VipPlan.manual },
                endDate: { gt: now },
                stripeSubscriptionId: { not: null },
            },
            orderBy: { startDate: "desc" },
        });

        if (!sub?.stripeSubscriptionId) {
            throw new RpcException(
                "Aucun abonnement Stripe réactivable trouvé."
            );
        }

        await this.stripe.subscriptions.update(sub.stripeSubscriptionId, {
            cancel_at_period_end: false,
        });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            await this.mailerService.sendVipReactivatedEmail(
                user.email,
                user.pseudo
            );
        }

        return { success: true };
    }

    async updateSubscriptionStatus(
        stripeSubscriptionId: string,
        status: VipStatus,
        endDate?: Date
    ) {
        const data: Prisma.VipSubscriptionUpdateManyMutationInput = {
            status,
            ...(endDate ? { endDate } : {}),
            ...(status === VipStatus.cancelled
                ? { cancelledAt: new Date() }
                : {}),
        };

        const result = await prisma.vipSubscription.updateMany({
            where: { stripeSubscriptionId },
            data,
        });

        return {
            success: result.count > 0,
            updated: result.count,
        };
    }
}
