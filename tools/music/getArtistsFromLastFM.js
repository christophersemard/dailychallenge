import axios from "axios";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.LASTFM_API_KEY;
if (!API_KEY) throw new Error("❌ LASTFM_API_KEY manquant dans .env");

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const LIMIT = 100;
const MIN_LISTENERS = 500_000;

const TAGS = [
    "rock",
    "pop",
    "rap",
    "hip-hop",
    "rnb",
    "electronic",
    "techno",
    "jazz",
    "soul",
    "reggae",
    "metal",
    "indie",
    "classical",
    "trap",
    "french rap",
    "french pop",
    "reggaeton",
    "folk",
    "funk",
    "punk",
];

const COUNTRIES = [
    "france",
    "united states",
    "united kingdom",
    "canada",
    "spain",
];
const TOTAL_CHART_PAGES = 10;

const artistMap = new Map();
let filteredOut = 0;
let tooSmall = 0;

function isLatinAlphabet(name) {
    const hasValidChar = /[a-zA-Z0-9]/.test(name);
    if (!hasValidChar) {
        console.warn(`⚠️ Artiste ignoré (car nom suspect) : ${name}`);
    }
    return hasValidChar;
}

function saveArtist(name, source, listeners = null, mbid = null, image = null) {
    const clean = name.trim();
    const key = clean.toLowerCase();

    if (!isLatinAlphabet(clean)) {
        filteredOut++;
        return;
    }

    if (!artistMap.has(key)) {
        artistMap.set(key, {
            name: clean,
            source,
            listeners,
            mbid,
            imageUrl: image,
        });
    }
}

async function fetchFromUrl(url, label) {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        console.warn(`⚠️ Erreur (${label}) :`, err.message);
        return null;
    }
}

async function fetchTagArtists(tag) {
    const url = `${BASE_URL}?method=tag.gettopartists&tag=${encodeURIComponent(
        tag
    )}&limit=${LIMIT}&api_key=${API_KEY}&format=json`;
    const data = await fetchFromUrl(url, `tag:${tag}`);
    data?.topartists?.artist?.forEach((a) => {
        console.log(a);
        return;
        const listeners = Number(a.listeners);
        const image =
            a.image?.find((i) => i.size === "extralarge")?.["#text"] ||
            a.image?.find((i) => i.size === "large")?.["#text"] ||
            null;
        if (listeners >= MIN_LISTENERS) {
            saveArtist(a.name, `tag:${tag}`, listeners, a.mbid, image);
        } else {
            tooSmall++;
        }
    });
}

async function fetchCountryArtists(country) {
    const url = `${BASE_URL}?method=geo.gettopartists&country=${encodeURIComponent(
        country
    )}&limit=${LIMIT}&api_key=${API_KEY}&format=json`;
    const data = await fetchFromUrl(url, `country:${country}`);
    data?.topartists?.artist?.forEach((a) => {
        const listeners = Number(a.listeners);

        const image =
            a.image?.find((i) => i.size === "extralarge")?.["#text"] ||
            a.image?.find((i) => i.size === "large")?.["#text"] ||
            null;
        if (listeners >= MIN_LISTENERS) {
            saveArtist(a.name, `country:${country}`, listeners, a.mbid, image);
        } else {
            tooSmall++;
        }
    });
}

async function fetchChartArtists(page) {
    const url = `${BASE_URL}?method=chart.gettopartists&page=${page}&limit=${LIMIT}&api_key=${API_KEY}&format=json`;
    const data = await fetchFromUrl(url, `chart:page:${page}`);
    data?.artists?.artist?.forEach((a) => {
        const listeners = Number(a.listeners);
        const image =
            a.image?.find((i) => i.size === "extralarge")?.["#text"] ||
            a.image?.find((i) => i.size === "large")?.["#text"] ||
            null;
        if (listeners >= MIN_LISTENERS) {
            saveArtist(a.name, `chart:page:${page}`, listeners, a.mbid, image);
        } else {
            tooSmall++;
        }
    });
}

async function fetchBoostedArtistInfo(name) {
    const url = `${BASE_URL}?method=artist.getinfo&artist=${encodeURIComponent(
        name
    )}&api_key=${API_KEY}&format=json`;
    const data = await fetchFromUrl(url, `boosted:${name}`);
    if (data?.artist) {
        const image =
            data.artist.image?.find((i) => i.size === "extralarge")?.[
                "#text"
            ] ||
            data.artist.image?.find((i) => i.size === "large")?.["#text"] ||
            null;
        return {
            listeners: Number(data.artist.stats.listeners) || 0,
            mbid: data.artist.mbid || null,
            image,
        };
    }
    return { listeners: 0, mbid: null, image: null };
}

async function addBoostedArtistsFromFile(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf-8");
        const lines = content
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);

        for (const name of lines) {
            const { listeners, mbid, image } = await fetchBoostedArtistInfo(
                name
            );
            saveArtist(name, "boost:fr-manual", listeners, mbid, image);
        }

        console.log(
            `📦 Ajout manuel : ${lines.length} artistes depuis ${filePath}`
        );
    } catch (err) {
        console.warn(`⚠️ Impossible de lire ${filePath} :`, err.message);
    }
}

function logBottomListeners(n = 20) {
    const sorted = Array.from(artistMap.values())
        .filter((a) => typeof a.listeners === "number")
        .sort((a, b) => a.listeners - b.listeners)
        .slice(0, n);

    console.log(`📉 ${n} artistes avec le moins de listeners :`);
    for (const a of sorted) {
        console.log(`- ${a.name} (${a.listeners} listeners)`);
    }
}

async function main() {
    console.log("⏳ Récupération des artistes...");

    for (const tag of TAGS) {
        console.log(`🎵 Genre : ${tag}`);
        await fetchTagArtists(tag);
    }

    for (const country of COUNTRIES) {
        console.log(`🌍 Pays : ${country}`);
        await fetchCountryArtists(country);
    }

    for (let page = 1; page <= TOTAL_CHART_PAGES; page++) {
        console.log(`📊 Top global - page ${page}`);
        await fetchChartArtists(page);
    }

    console.log("🇫🇷 Ajout du boost FR (manual)");
    await addBoostedArtistsFromFile("boost_artists_fr.txt");

    const artistList = Array.from(artistMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    const namesOnly = artistList.map((a) => a.name);

    await fs.writeFile("artists.txt", namesOnly.join("\n"), "utf-8");
    await fs.writeFile(
        "artists.json",
        JSON.stringify(artistList, null, 2),
        "utf-8"
    );

    console.log(`✅ ${artistList.length} artistes enregistrés`);
    console.log(`🔤 ${filteredOut} ignorés (non-latins)`);
    console.log(`📉 ${tooSmall} ignorés (trop peu de listeners)`);

    logBottomListeners(30);
}

main().catch(console.error);
