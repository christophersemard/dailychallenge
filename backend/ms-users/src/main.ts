import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

process.env.PRISMA_DISABLE_DOTENV_LOAD = "true";

async function bootstrap() {
    const port = parseInt(process.env.PORT || "3001", 10);
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: { port },
    });
    await app.listen();
    console.log(`🚀 ms-users démarré sur port TCP: ${port}`);
}

bootstrap();
