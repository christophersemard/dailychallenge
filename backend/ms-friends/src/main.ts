import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { PrismaRpcExceptionFilter } from "./filters/prisma-rpc-exception.filter";
import { GlobalRpcExceptionFilter } from "./filters/global-rpc-exception.filter";

async function bootstrap() {
    const port = parseInt(process.env.PORT || "3002", 10);
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.HOST || "0.0.0.0",
            port,
        },
    });
    await app.listen();
    console.log("ms-friends démarré sur le port 3002");

    app.useGlobalFilters(
        new PrismaRpcExceptionFilter(),
        new GlobalRpcExceptionFilter()
    );
}

bootstrap();
