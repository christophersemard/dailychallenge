import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import * as dotenv from "dotenv";
import * as path from "path";
import { PrismaRpcExceptionFilter } from "./filters/prisma-rpc-exception.filter";
import { GlobalRpcExceptionFilter } from "./filters/global-rpc-exception.filter";

async function bootstrap() {
    const port = parseInt(process.env.PORT || "3001", 10);
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.HOST || "0.0.0.0",
            port,
        },
    });

    app.useGlobalFilters(
        new PrismaRpcExceptionFilter(),
        new GlobalRpcExceptionFilter()
    );

    await app.listen();
    console.log(`🚀 ms-users démarré sur port TCP: ${port}`);
    console.log("TEST");
    console.log(process.env.JWT_SECRET);
}

bootstrap();
