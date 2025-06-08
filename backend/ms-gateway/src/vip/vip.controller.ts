import {
    Controller,
    Post,
    UseGuards,
    Req,
    Body,
    HttpCode,
} from "@nestjs/common";
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/auth.guard";
import { VipService } from "./vip.service";
import { UserRequest } from "../auth/auth.types";
import { VipPlan } from "database";

@ApiTags("VIP")
@Controller("/api/vip")
export class VipController {
    constructor(private readonly vipService: VipService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("create")
    @HttpCode(201)
    @ApiOperation({ summary: "Créer un abonnement VIP Stripe" })
    @ApiResponse({
        status: 201,
        description: "URL Stripe de redirection pour l'abonnement",
    })
    async createSubscription(
        @Req() req: UserRequest,
        @Body()
        body: {
            priceId: string;
            plan: VipPlan;
        }
    ) {
        return this.vipService.createSubscription(
            req.user.id,
            body.priceId,
            body.plan
        );
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("cancel")
    @HttpCode(200)
    @ApiOperation({ summary: "Annuler l’abonnement VIP en cours" })
    async cancel(@Req() req: UserRequest) {
        return this.vipService.cancelSubscription(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("reactivate")
    @HttpCode(200)
    @ApiOperation({
        summary: "Réactive le renouvellement automatique de l’abonnement VIP",
    })
    async reactivate(@Req() req: UserRequest) {
        return this.vipService.reactivateSubscription(req.user.id);
    }
}
