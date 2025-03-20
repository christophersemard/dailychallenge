import * as fs from "fs";
import prisma from "../prisma/prisma.service";
import * as dotenv from "dotenv";
dotenv.config();

// 🔑 Clé API TMDB
const API_KEY = process.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";
const MAX_PAGES = 250;
const MAX_PAGES_UPDATE = 10;

const FILTER_VOTE_COUNT_FR_RECENT = 40;
const FILTER_VOTE_COUNT_FR = 100;
const FILTER_VOTE_COUNT_OTHER_RECENT = 50;
const FILTER_VOTE_COUNT_OTHER = 200;
const FILTER_EXCLUDED_GENRES = [99];
const MAX_YEARS_BACK = 100;

// Stock des films existants pour éviter les doublons
const existingMovieIds = new Set<number>();

// 📌 **1️⃣ Charger les `tmdbId` existants en base**
async function loadExistingMovies() {
    console.log("📂 Chargement des films existants en base...");
    const existingMovies = await prisma.dataMovie.findMany({
        select: { tmdbId: true },
    });
    existingMovies.forEach((movie) => existingMovieIds.add(movie.tmdbId));
    console.log(
        `✅ ${existingMovies.length} films déjà en base, ignorés lors de l'import.`
    );
}

// 🛠 Fonction générique pour appeler l'API TMDB
async function fetchFromTMDB(url: string) {
    const response = await fetch(
        `${BASE_URL}${url}&api_key=${API_KEY}&language=fr-FR`
    );
    return response.json();
}

// 📌 Vérifier si un film est valide
function isMovieValid(movie: any): boolean {
    const releaseYear = parseInt(movie.release_date?.split("-")[0]) || 0;
    const isFrench = movie.original_language === "fr";
    const isEnglish = movie.original_language === "en";

    if (existingMovieIds.has(movie.id)) return false;

    if (releaseYear >= new Date().getFullYear()) {
        if (isFrench && movie.vote_count < FILTER_VOTE_COUNT_FR_RECENT)
            return false;
        if (!isFrench && movie.vote_count < FILTER_VOTE_COUNT_OTHER_RECENT)
            return false;
    }

    if (
        releaseYear < new Date().getFullYear() &&
        movie.vote_count <
            (isFrench ? FILTER_VOTE_COUNT_FR : FILTER_VOTE_COUNT_OTHER)
    )
        return false;

    if (releaseYear < new Date().getFullYear() - MAX_YEARS_BACK) return false;

    if (
        movie.genre_ids.some((id: number) =>
            FILTER_EXCLUDED_GENRES.includes(id)
        )
    )
        return false;

    return true;
}

// 📌 Récupération de films (mode complet ou mise à jour)
async function fetchMovies(fullFetch: boolean = false) {
    try {
        console.log(
            `🚀 Récupération des films (${
                fullFetch ? "COMPLET" : "MISE À JOUR"
            })`
        );

        // 📂 **2️⃣ Charger les films déjà présents en base avant de commencer**
        // await loadExistingMovies();

        let movies: any[] = [];
        let page = 1;
        const maxPages = fullFetch ? MAX_PAGES : MAX_PAGES_UPDATE;

        while (page <= maxPages) {
            let url = `/discover/movie?page=${page}&vote_count.gte=5`;

            if (!fullFetch) {
                console.log("🔍 Recherche de films récents...");
                let date = new Date();
                date.setMonth(date.getMonth() - 6);
                url += `&sort_by=primary_release_date.desc&primary_release_date.gte=${
                    date.toISOString().split("T")[0]
                }`;
            }

            const popularMovies = await fetchFromTMDB(url);
            const newMovies = popularMovies.results.filter(isMovieValid);

            newMovies.forEach((movie) => existingMovieIds.add(movie.id));
            movies = [...movies, ...newMovies];

            page++;
        }

        console.log(`✅ ${movies.length} films valides récupérés`);

        fs.writeFileSync(
            "./src/scripts/movies.json",
            JSON.stringify(movies, null, 2)
        );

        let sqlStatements: string[] = [];

        for (const movie of movies) {
            console.log(`📦 Récupération des détails pour ${movie.title}...`);
            const details = await fetchFromTMDB(
                `/movie/${movie.id}?append_to_response=credits,keywords`
            );

            const genres = details.genres.map((g: any) => g.name).join(", ");
            const actors = details.credits.cast
                .slice(0, 5)
                .map((a: any) => a.name)
                .join(", ");
            const director =
                details.credits.crew.find((c: any) => c.job === "Director")
                    ?.name || "Inconnu";
            const production = details.production_companies
                .map((p: any) => p.name)
                .join(", ");
            const keywords = details.keywords.keywords
                .map((k: any) => k.name)
                .join(", ");

            const movieImages = await fetchFromTMDB(
                `/movie/${movie.id}/images?include_image_language=null`
            );
            const images = movieImages.backdrops
                .slice(0, 10)
                .map((img: any) => img.file_path);
            while (images.length < 10) images.push(null);

            // 🔥 **Insertion en base avec Prisma**
            await prisma.dataMovie.upsert({
                where: { tmdbId: details.id },
                update: {
                    voteAverage: details.vote_average,
                    voteCount: details.vote_count,
                    popularity: details.popularity,
                    budget: details.budget || null,
                    keywords,
                    image1: images[0],
                    image2: images[1],
                    image3: images[2],
                    image4: images[3],
                    image5: images[4],
                    image6: images[5],
                    image7: images[6],
                    image8: images[7],
                    image9: images[8],
                    image10: images[9],
                },
                create: {
                    tmdbId: details.id,
                    title: details.title,
                    originalTitle: details.original_title,
                    year: details.release_date
                        ? parseInt(details.release_date.split("-")[0])
                        : 0,
                    releaseDate: new Date(details.release_date),
                    runtime: details.runtime,
                    director,
                    actors,
                    genres,
                    synopsis: details.overview,
                    production,
                    country: details.production_countries
                        .map((c: any) => c.name)
                        .join(", "),
                    language: details.spoken_languages
                        .map((l: any) => l.english_name)
                        .join(", "),
                    voteAverage: details.vote_average,
                    voteCount: details.vote_count,
                    popularity: details.popularity,
                    budget: details.budget || null,
                    keywords,
                    posterPath: details.poster_path,
                    backdropPath: details.backdrop_path,
                    image1: images[0],
                    image2: images[1],
                    image3: images[2],
                    image4: images[3],
                    image5: images[4],
                    image6: images[5],
                    image7: images[6],
                    image8: images[7],
                    image9: images[8],
                    image10: images[9],
                },
            });

            sqlStatements.push(`INSERT INTO "DataMovie" ...`); // ✅ Génération du SQL en complément
        }

        fs.writeFileSync("./src/scripts/movies.sql", sqlStatements.join("\n"));
        console.log(`✅ Fichier SQL généré : ./scripts/movies.sql`);
    } catch (error) {
        console.error("❌ Erreur :", error);
    }
}

// 📌 Lancer le script (par défaut en mode mise à jour)
fetchMovies(process.argv.includes("--full"));
