import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import * as dotenv from "dotenv";
import * as path from "path";

async function bootstrap() {
    const port = parseInt(process.env.PORT || "3001", 10);
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.HOST || "0.0.0.0",
            port,
        },
    });

    await app.listen();
    console.log(`🚀 ms-users démarré sur port TCP: ${port}`);
}

bootstrap();
