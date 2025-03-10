import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: { port: 3004 },
    });

    await app.listen();
    console.log("ms-game-cinema-1 lancé sur le port 3004");
}
bootstrap();
