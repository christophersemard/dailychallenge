import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { VipPlan } from "database";

@Injectable()
export class VipService {
    constructor(
        @Inject("USERS_SERVICE") private readonly usersService: ClientProxy,
        private readonly rpcProxy: RpcProxyService
    ) {}

    async createSubscription(userId: number, priceId: string, plan: VipPlan) {
        return this.rpcProxy.send(
            this.usersService,
            "vip_create_subscription",
            {
                userId,
                priceId,
                plan,
            }
        );
    }

    async cancelSubscription(userId: number) {
        return this.rpcProxy.send(
            this.usersService,
            "vip_cancel_subscription",
            {
                userId,
            }
        );
    }

    async reactivateSubscription(userId: number) {
        return this.rpcProxy.send(
            this.usersService,
            "vip_reactivate_subscription",
            {
                userId,
            }
        );
    }
}
