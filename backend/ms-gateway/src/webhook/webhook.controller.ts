import {
    Controller,
    Post,
    Req,
    Res,
    Headers,
    HttpCode,
    Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";

@Controller("webhooks")
export class WebhookController {
    private readonly stripe: Stripe;
    private readonly logger = new Logger("StripeWebhook");

    constructor(
        private readonly config: ConfigService,
        @Inject("USERS_SERVICE") private readonly usersClient: ClientProxy
    ) {
        this.stripe = new Stripe(config.get("STRIPE_SECRET_KEY")!);
    }

    @Public()
    @Post("stripe")
    @HttpCode(200)
    async handleStripeWebhook(
        @Req() req: Request,
        @Res() res: Response,
        @Headers("stripe-signature") sig: string
    ) {
        let event: Stripe.Event;

        const endpointSecret = this.config.get<string>("STRIPE_WEBHOOK_SECRET");

        try {
            const body = req.body as Buffer;
            event = this.stripe.webhooks.constructEvent(
                body,
                sig,
                endpointSecret!
            );
        } catch (err) {
            this.logger.error("❌ Erreur de validation Stripe", err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        this.logger.log(`📥 Event Stripe reçu : ${event.type}`);

        // Forward vers le ms-users
        await this.usersClient
            .send("stripe_webhook_event", { event })
            .toPromise();

        return res.json({ received: true });
    }
}
