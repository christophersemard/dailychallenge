// src/vip-subscription/vip-subscription.service.ts

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import prisma from "../prisma/prisma.service";
import { Prisma, VipStatus, VipPlan } from "database";
import { addMonths, addYears } from "date-fns";

interface SubscriptionWithPeriodEnd extends Stripe.Subscription {
    current_period_end: number;
}

@Injectable()
export class VipService {
    private stripe: Stripe;
    private readonly logger = new Logger(VipService.name);

    constructor(private readonly config: ConfigService) {
        this.stripe = new Stripe(config.get<string>("STRIPE_SECRET_KEY")!);
    }

    async createSubscription(userId: number, priceId: string, plan: VipPlan) {
        const customer = await this.stripe.customers.create({
            metadata: {
                userId: String(userId),
            },
        });

        const session = await this.stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customer.id,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url:
                this.config.get<string>("FRONTEND_URL") + "/vip/confirmation",
            cancel_url:
                this.config.get<string>("FRONTEND_URL") + "/vip/annuler",
            metadata: {
                userId: String(userId),
                plan,
            },
        });

        this.logger.log(
            `Checkout session created for user #${userId}, plan: ${plan}`
        );

        return {
            url: session.url,
        };
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

                const subscription: Stripe.Subscription = await this.stripe.subscriptions.retrieve(
                    subscriptionId
                );

                const subscriptionItem = subscription.items?.data?.[0];

                const endDate = subscriptionItem?.current_period_end
                    ? new Date(subscriptionItem.current_period_end * 1000)
                    : plan === VipPlan.monthly
                    ? addMonths(new Date(), 1)
                    : addYears(new Date(), 1);
                const currentPeriodEnd = new Date(endDate);

                await prisma.vipSubscription.create({
                    data: {
                        userId,
                        stripeSubscriptionId: subscriptionId,
                        stripeCustomerId: customerId,
                        plan,
                        status:
                            subscription.status === "active"
                                ? VipStatus.active
                                : VipStatus.cancelled,
                        startDate: new Date(),
                        endDate: currentPeriodEnd,
                    },
                });
            } catch (err) {
                this.logger.error("❌ Erreur checkout.session.completed", err);
                throw err;
            }
        }

        if (event.type === "customer.subscription.updated") {
            const subscription = event.data.object as Stripe.Subscription;
            const subscriptionItem = subscription.items?.data?.[0];

            const endDate = subscriptionItem?.current_period_end
                ? new Date(subscriptionItem.current_period_end * 1000)
                : undefined;

            const status =
                subscription.status === "active"
                    ? VipStatus.active
                    : subscription.status === "canceled"
                    ? VipStatus.cancelled
                    : VipStatus.expired;

            this.logger.log(
                `🛠️ Subscription ${
                    subscription.id
                } updated: status ${status}, ends: ${
                    endDate?.toISOString() ?? "unknown"
                }`
            );

            await prisma.vipSubscription.updateMany({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                data: {
                    status,
                    ...(endDate ? { endDate } : {}), // on ne met endDate que si elle est valide
                },
            });
        }

        if (event.type === "customer.subscription.deleted") {
            const subscription = event.data.object as Stripe.Subscription;

            this.logger.warn(`Subscription ${subscription.id} cancelled`);

            await prisma.vipSubscription.updateMany({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                data: {
                    status: VipStatus.cancelled,
                    cancelledAt: new Date(),
                },
            });
        }

        return { received: true };
    }
    async cancelSubscription(userId: number) {
        const existing = await prisma.vipSubscription.findFirst({
            where: {
                userId,
                status: VipStatus.active,
            },
        });

        if (!existing || !existing.stripeSubscriptionId) {
            return {
                success: false,
                message: "Aucun abonnement actif trouvé.",
            };
        }

        // Annulation côté Stripe (à la fin de la période en cours)
        await this.stripe.subscriptions.update(existing.stripeSubscriptionId, {
            cancel_at_period_end: true,
        });

        return {
            success: true,
            message: "Abonnement en attente d’annulation.",
        };
    }
    async updateSubscriptionStatus(
        stripeSubscriptionId: string,
        status: VipStatus
    ) {
        const result = await prisma.vipSubscription.updateMany({
            where: { stripeSubscriptionId },
            data: {
                status,
                ...(status === VipStatus.cancelled && {
                    cancelledAt: new Date(),
                }),
            },
        });

        return {
            success: result.count > 0,
            updated: result.count,
        };
    }
}
