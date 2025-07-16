import { PrismaClient } from "database";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const FILE = path.join(__dirname, "artists_enriched_with_images.json");

async function main() {
    const buffer = await fs.readFile(FILE, "utf-8");
    const all = JSON.parse(buffer);

    let inserted = 0;
    for (let i = 0; i < all.length; i++) {
        const a = all[i];
        const existing = await prisma.dataArtist.findUnique({
            where: { name: a.name },
        });

        if (existing) {
            // Update les mainGenres si nécessaire
            if (existing.mainGenres.length === 0 && a.musicbrainz?.genres) {
                await prisma.dataArtist.update({
                    where: { id: existing.id },
                    data: { mainGenres: a.musicbrainz.genres.slice(0, 3) },
                });
                console.log(`🔄 Genres mis à jour pour l'artiste : ${a.name}`);
            }
        }

        inserted++;
        console.log(`✅ Ajouté : ${a.name}`);
    }

    console.log(`\n🎯 ${inserted} artistes insérés`);
}

main()
    .catch((err) => {
        console.error("❌ Erreur :", err);
    })
    .finally(() => prisma.$disconnect());
