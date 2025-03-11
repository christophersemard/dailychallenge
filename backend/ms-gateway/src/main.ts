import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as path from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);

    // Charge uniquement le .env de ms-gateway
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    console.log("Chargement .env :", process.env.PORT, process.env.JWT_SECRET);

    console.log(`ms-gateway lancé sur le port ${process.env.PORT}`);
    console.log(process.env.JWT_SECRET);
}
bootstrap();
