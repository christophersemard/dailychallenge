import axios from "axios";
import fs from "fs/promises";
import path from "path";

const ARTISTS_FILE = "artists.json";
const CACHE_FILE = "mbid_cache.json";
const OUTPUT_FILE = "artists_enriched.json";
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
            type: a.type || null,
            country: a.country || null,
            gender: a.gender || null,
            area: a.area?.name || null,
            beginArea: a["begin-area"]?.name || null,
            startDate: a["life-span"]?.begin || null,
            isDead: a["life-span"]?.ended || false,
            tags: (a.tags || []).map((t) => t.name),
            genres: (a.genres || []).map((g) => g.name),
            aliases: (a.aliases || []).map((al) => al.name),
            members: [],
        };

        if (a.type === "Group" && Array.isArray(a.relations)) {
            const names = a.relations
                .filter(
                    (rel) => rel.type === "member of band" && rel.artist?.name
                )
                .map((rel) => rel.artist.name);
            info.members = [...new Set(names)];
        }

        return info;
    } catch (err) {
        console.warn(`⚠️ Erreur (infos) ${mbid}: ${err.message}`);
        return null;
    }
}

async function fetchArtistAlbums(mbid) {
    const albums = [];
    let offset = 0;
    const limit = 100;
    let total = Infinity;

    while (offset < total) {
        try {
            const res = await axios.get(`${MUSICBRAINZ_BASE}/release-group`, {
                params: {
                    artist: mbid,
                    fmt: "json",
                    limit,
                    offset,
                    type: "album", // 🔥 ne récupère que les albums
                },
                headers: { "User-Agent": USER_AGENT },
            });

            const page = res.data["release-groups"] || [];
            total = res.data["release-group-count"] || 0;

            albums.push(
                ...page
                    .map((r) => {
                        const date = r["first-release-date"] || "";
                        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
                        const noSecondary =
                            !r["secondary-types"] ||
                            r["secondary-types"].length === 0;

                        if (noSecondary && isValidDate) {
                            return {
                                title: r.title,
                                date,
                            };
                        }
                        return null;
                    })
                    .filter(Boolean)
            );

            offset += limit;
            await delay(1000);
        } catch (err) {
            console.warn(`⚠️ Erreur (albums) ${mbid}: ${err.message}`);
            break;
        }
    }

    return albums
        .filter((a) => a.date)
        .sort((a, b) => a.date.localeCompare(b.date));
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
        const albums = await fetchArtistAlbums(cloned.mbid);
        await delay(1000);

        if (info) {
            info.albums = albums;
            info.firstAlbumDate = albums[0]?.date || null;
            cloned.musicbrainz = info;
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
