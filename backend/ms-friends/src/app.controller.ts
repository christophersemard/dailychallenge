import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import prisma from "./prisma/prisma.service";

@Controller()
export class AppController {
    @MessagePattern("ping_friends")
    ping() {
        return "Pong from Friends!";
    }

    // Retourner tous les Posts
    @MessagePattern("get_all_posts")
    async getAllPosts() {
        return prisma.post.findMany();
    }
}
