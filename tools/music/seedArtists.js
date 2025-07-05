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
            console.log(`⚠️ Artiste déjà existant : ${a.name}`);
            continue;
        }

        if (!a.mbid) {
            console.warn(
                `❌ Artiste sans nom ou source : ${JSON.stringify(a)}`
            );
            continue;
        }
        const artist = await prisma.dataArtist.create({
            data: {
                name: a.name,
                source: a.source,
                listeners: a.listeners,
                mbid: a.mbid || null,
                imageUrl: a.imageUrl || null,
                type: a.musicbrainz?.type || "Unknown",
                country: a.musicbrainz?.country || null,
                gender: a.musicbrainz?.gender || null,
                deezerFans: a.deezerFans || null,
                startDate: a.musicbrainz?.startDate
                    ? new Date(a.musicbrainz.startDate)
                    : null,
                isDead: a.musicbrainz?.isDead ?? null,
                mainGenres: a.musicbrainz?.genres?.slice(0, 3) || [],
                aliases: a.musicbrainz?.aliases || [],
                members: a.musicbrainz?.members || [],
                albumsJson: a.musicbrainz?.albums || [],
                firstAlbumDate: a.musicbrainz?.firstAlbumDate
                    ? new Date(a.musicbrainz.firstAlbumDate)
                    : null,
            },
        });

        console.log(`🎤 Ajout artiste : ${artist.name}, ${artist.id}`);

        for (const track of a.songs || []) {
            const song = await prisma.dataSong.create({
                data: {
                    title: track.title,
                    artistId: artist.id,
                    previewUrl: track.previewUrl || null,
                    deezerLink: track.deezerLink || null,
                    duration: track.duration || 0,
                    rank: track.rank || 0,
                    explicit: track.explicit || false,
                },
            });
            console.log(`🎵 Ajout chanson : ${song.title} pour ${artist.name}`);
        }

        inserted++;
        console.log(`✅ Ajouté : ${artist.name}`);
    }

    console.log(`\n🎯 ${inserted} artistes insérés`);
}

main()
    .catch((err) => {
        console.error("❌ Erreur :", err);
    })
    .finally(() => prisma.$disconnect());
