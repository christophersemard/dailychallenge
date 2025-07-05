import axios from "axios";
import fs from "fs/promises";
import path from "path";

const ARTISTS_FILE = "artists_enriched_with_images.json";
const CACHE_FILE = "mbid_cache.json";
const OUTPUT_FILE = "artists_enriched_with_images_with_dead.json";
const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const USER_AGENT = "DailyChallenge/1.0 (contact@dailychallenge.fr)";
const LIMITED_TO = 5000;

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadJson(filePath, fallback = {}) {
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

async function fetchMbidByName(name) {
    try {
        const res = await axios.get(`${MUSICBRAINZ_BASE}/artist`, {
            params: {
                query: `artist:${name}`,
                fmt: "json",
            },
            headers: {
                "User-Agent": USER_AGENT,
            },
        });

        const match = res.data.artists?.find(
            (a) =>
                a.score === 100 && (a.type === "Person" || a.type === "Group")
        );
        return match?.id || null;
    } catch (err) {
        console.warn(`⚠️ Erreur (MusicBrainz - ${name}) : ${err.message}`);
        return null;
    }
}

async function fetchArtistInfo(mbid) {
    try {
        const res = await axios.get(`${MUSICBRAINZ_BASE}/artist/${mbid}`, {
            params: {
                fmt: "json",
                inc: "aliases+tags+genres+artist-rels",
            },
            headers: { "User-Agent": USER_AGENT },
        });

        const a = res.data;

        const info = {
            isDead: a["life-span"]?.ended || false,
        };

        return info;
    } catch (err) {
        console.warn(`⚠️ Erreur (infos) ${mbid}: ${err.message}`);
        return null;
    }
}

async function enrich() {
    const artists = await loadJson(ARTISTS_FILE);
    const mbidCache = await loadJson(CACHE_FILE);
    const enriched = [];

    let count = 0;
    for (const artist of artists) {
        if (LIMITED_TO && count >= LIMITED_TO) break;
        count++;

        const cloned = { ...artist };

        if (!cloned.mbid || cloned.mbid === "") {
            const cached = mbidCache[cloned.name];
            if (cached) {
                cloned.mbid = cached;
            } else {
                console.log(`🔍 Recherche MBID pour ${cloned.name}`);
                const mbid = await fetchMbidByName(cloned.name);
                await delay(1000);
                if (mbid) {
                    cloned.mbid = mbid;
                    mbidCache[cloned.name] = mbid;
                    console.log(`✅ Trouvé : ${cloned.name} → ${mbid}`);
                } else {
                    console.log(`❌ Introuvable : ${cloned.name}`);
                    enriched.push(cloned);
                    continue;
                }
            }
        }

        const info = await fetchArtistInfo(cloned.mbid);
        await delay(1000);

        if (info) {
            cloned.musicbrainz = {
                ...cloned.musicbrainz,
                ...info,
            };
            console.log(`🎶 Enrichi : ${cloned.name}`);
        } else {
            console.log(`❌ Échec enrichissement : ${cloned.name}`);
        }

        enriched.push(cloned);
    }

    await saveJson(OUTPUT_FILE, enriched);
    await saveJson(CACHE_FILE, mbidCache);

    const withMb = enriched.filter((a) => a.mbid);
    const withFull = enriched.filter((a) => a.musicbrainz);
    console.log("\n✅ Enrichissement terminé.");
    console.log(`🎯 Avec MBID : ${withMb.length}`);
    console.log(`🎯 Avec MusicBrainz complet : ${withFull.length}`);
    console.log(`📦 Total : ${enriched.length}`);
}

enrich().catch(console.error);
