import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import * as dotenv from "dotenv";
import * as path from "path";

async function bootstrap() {
    const port = parseInt(process.env.PORT || "3001", 10);
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: { port },
    });

    // Charge uniquement le .env de ms-gateway
    dotenv.config({ path: path.resolve(__dirname, "../.env") });
    console.log("Chargement .env :", process.env.PORT, process.env.JWT_SECRET);

    await app.listen();
    console.log(`🚀 ms-users démarré sur port TCP: ${port}`);
}

bootstrap();
