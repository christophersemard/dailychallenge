import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { exec } from "child_process";

@Injectable()
export class MoviesCronJob {
    @Cron(CronExpression.EVERY_WEEK)
    async updateMovies() {
        console.log("⏳ Mise à jour des films depuis TMDB...");

        exec(
            "pnpm ts-node ./src/scripts/fetch_movies.ts",
            (error, stdout, stderr) => {
                if (error) {
                    console.error(
                        `❌ Erreur lors de la mise à jour des films : ${error.message}`
                    );
                    return;
                }
                if (stderr) {
                    console.error(`⚠️ STDERR : ${stderr}`);
                    return;
                }
                console.log(`✅ Mise à jour terminée : ${stdout}`);
            }
        );
    }
}
