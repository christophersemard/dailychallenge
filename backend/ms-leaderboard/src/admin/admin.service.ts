import { Injectable } from "@nestjs/common";
import prisma from "src/prisma/prisma.service";

@Injectable()
export class AdminService {
    async getAllGames() {
        const games = await prisma.game.findMany({
            where: { status: "available", deletedAt: null },
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                path: true,
                status: true,
                imgUrl: true,
            },
        });

        return games;
    }
}
