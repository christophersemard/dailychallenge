import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";

@Injectable()
export class UserEventsService {
    constructor() {}

    async addEvent(userId: number, type: string, details?: string) {
        return prisma.userEvent.create({
            data: {
                userId,
                type,
                details,
            },
        });
    }

    async getUserEvents(userId: number) {
        return prisma.userEvent.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }
}
