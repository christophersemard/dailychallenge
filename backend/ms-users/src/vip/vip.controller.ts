import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { VipService } from "./vip.service";
import { VipPlan, VipStatus } from "database";

@Controller()
export class VipController {
    constructor(private readonly vipService: VipService) {}

    @MessagePattern("vip_create_subscription")
    create(
        @Payload() payload: { userId: number; priceId: string; plan: VipPlan }
    ) {
        return this.vipService.createSubscription(
            payload.userId,
            payload.priceId,
            payload.plan
        );
    }

    @MessagePattern("vip_cancel_subscription")
    cancel(@Payload() payload: { userId: number }) {
        return this.vipService.cancelSubscription(payload.userId);
    }

    @MessagePattern("vip_update_status")
    updateStatus(
        @Payload() payload: { stripeSubscriptionId: string; status: VipStatus }
    ) {
        return this.vipService.updateSubscriptionStatus(
            payload.stripeSubscriptionId,
            payload.status
        );
    }

    @MessagePattern("stripe_webhook_event")
    handleStripeWebhook(@Payload() payload: { event: any }) {
        return this.vipService.handleWebhook(payload.event);
    }

    @MessagePattern("vip_reactivate_subscription")
    reactivate(@Payload() payload: { userId: number }) {
        return this.vipService.reactivateSubscription(payload.userId);
    }
}
