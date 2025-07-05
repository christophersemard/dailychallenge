import axios from "axios";
import fs from "fs/promises";
import path from "path";

const INPUT_FILE = "artists_enriched.json";
const OUTPUT_FILE = "artists_enriched_with_images.json";

async function loadJson(filePath, fallback = []) {
    try {
        const content = await fs.readFile(path.resolve(filePath), "utf-8");
        return JSON.parse(content);
    } catch {
        return fallback;
    }
}

async function saveJson(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDeezerData(name) {
    try {
        const searchUrl = `https://api.deezer.com/search/artist?q=${encodeURIComponent(
            name
        )}`;
        const searchRes = await axios.get(searchUrl);
        const result = searchRes.data?.data?.[0];
        if (!result) return null;

        const tracklistUrl = result.tracklist;
        const trackRes = await axios.get(tracklistUrl);
        const tracks = (trackRes.data?.data || [])
            .slice(0, 10)
            .map((track) => ({
                title: track.title,
                previewUrl: track.preview,
                deezerLink: track.link,
                duration: track.duration,
                rank: track.rank,
                explicit: track.explicit_lyrics,
            }));

        return {
            imageUrl: result.picture_xl || result.picture_big || null,
            deezerFans: result.nb_fan || null,
            songs: tracks,
        };
    } catch (err) {
        console.warn(`⚠️ Erreur Deezer (${name}) : ${err.message}`);
        return null;
    }
}

async function enrichWithDeezer() {
    const artists = await loadJson(INPUT_FILE);
    let enrichedCount = 0;

    for (const artist of artists) {
        if (!artist.musicbrainz || artist.imageUrl) continue;

        const deezer = await fetchDeezerData(artist.name);
        if (deezer) {
            artist.imageUrl = deezer.imageUrl;
            artist.deezerFans = deezer.deezerFans;
            artist.songs = deezer.songs;
            enrichedCount++;
            console.log(`🎵 Enrichi : ${artist.name}`);
        } else {
            console.log(`🚫 Non trouvé sur Deezer : ${artist.name}`);
        }

        await delay(500);
    }

    await saveJson(OUTPUT_FILE, artists);
    console.log(
        `\n✅ ${enrichedCount} artistes enrichis avec image, fans et top songs.`
    );
}

enrichWithDeezer().catch(console.error);
