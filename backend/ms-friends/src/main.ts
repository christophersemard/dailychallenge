import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.HOST || "0.0.0.0",
            port: Number(process.env.PORT) || 3002,
        },
    });
    await app.listen();
    console.log("ms-friends démarré sur le port 3002");
}

bootstrap();
