import axios from "axios";
import fs from "fs/promises";

// Fichier d'entrée : celui généré précédemment
const INPUT_PATH = "./artists.json";
const OUTPUT_PATH = "./artists_enriched.json";
const ERRORS_PATH = "./mbid_errors.txt";

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, label, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await sleep(delay);
            const res = await axios.get(url, {
                headers: {
                    "User-Agent":
                        "DailyChallengeBot/1.0 (dev@dailychallenge.fr)",
                },
            });
            return res.data;
        } catch (err) {
            console.warn(
                `⚠️ Erreur (${label}) tentative ${attempt}/${maxRetries}: ${err.message}`
            );
            if (attempt === maxRetries) {
                await fs.appendFile(ERRORS_PATH, `${label}\n`);
                return null;
            }
            delay *= 2; // backoff exponentiel
        }
    }
}

async function getMbidData(name) {
    const url = `https://musicbrainz.org/ws/2/artist?query=artist:${encodeURIComponent(
        name
    )}&fmt=json`;
    const data = await fetchWithRetry(url, `mbid:${name}`);
    if (!data || !data.artists?.length) return null;

    // on prend le meilleur score
    const main = data.artists[0];
    return {
        mbid: main.id,
        gender: main.gender || null,
        country: main.country || null,
        type: main.type || null,
        birth: main["life-span"]?.begin || null,
        disambiguation: main.disambiguation || null,
        tags: main.tags?.map((t) => t.name) || [],
    };
}

async function enrichArtists() {
    const raw = await fs.readFile(INPUT_PATH, "utf-8");
    const artists = JSON.parse(raw);

    const enriched = [];

    for (const artist of artists) {
        const data = await getMbidData(artist.name);
        enriched.push({
            ...artist,
            musicbrainz: data,
        });
        console.log(`✅ ${artist.name} enrichi`);
    }

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(enriched, null, 2), "utf-8");
    console.log(`🎉 Fichier enrichi : ${OUTPUT_PATH}`);
}

enrichArtists().catch(console.error);
