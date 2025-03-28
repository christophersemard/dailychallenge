import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as path from "path";
import { Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { GlobalExceptionFilter } from "./filters/exception.filter";

async function bootstrap() {
    // Charger les variables d'environnement (.env spécifique à ms-gateway)
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    const logger = new Logger("Gateway");
    const app = await NestFactory.create(AppModule);

    // Enable CORS for your frontend
    app.enableCors({
        origin: "http://localhost:3025", // Remplace par l'URL de ton frontend
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization", // Ajouter d'autres en-têtes si nécessaire
        credentials: true, // Permet d'envoyer des cookies avec la requête
    });

    // Activer le filtre global pour les erreurs
    app.useGlobalFilters(new GlobalExceptionFilter());

    // Swagger - Documentation API
    const swaggerConfig = new DocumentBuilder()
        .setTitle("DailyChallenge API")
        .setDescription("Documentation des microservices")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);

    await app.listen(process.env.PORT ?? 3000);

    // Logs d'information
    logger.log(`🚀 ms-gateway lancé sur le port ${process.env.PORT ?? 3000}`);
    logger.log(
        `📄 Swagger disponible sur http://localhost:${
            process.env.PORT ?? 3000
        }/docs`
    );
    logger.log(
        `🔐 JWT Secret chargé: ${process.env.JWT_SECRET ? "OK" : "NON DÉFINI"}`
    );
    logger.log(
        `🔗 Connexion au microservice USERS: ${process.env.HOST ?? "ms-users"}`
    );
}

bootstrap();
