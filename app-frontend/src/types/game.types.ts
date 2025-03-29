export type GameResult = {
    id: number;
    userId: number;
    gameId: number;
    score: number;
    xpGained: number;
    status: "passed" | "failed";
    date: string;
    deletedAt: string | null;
};

export type Try = {
    id: number;
    userId: number;
    dayId: number;
    guess: string;
    correct: boolean;
    createdAt: string;
};

export type UserMonthlyGameResult = {
    date: string; // au format ISO, ex: "2025-03-02T00:00:00.000Z"
    result: GameResult | null;
    gameDay: boolean;
    guess: string | null;
};

export type MovieData = {
    id: number;
    tmdbId: number;
    title: string;
    originalTitle: string;
    year: number;
    releaseDate: string;
    runtime: number;
    director: string;
    actors: string | null;
    genres: string;
    synopsis: string;
    production: string;
    country: string;
    language: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    budget: number;
    keywords: string;
    posterPath: string | null;
    backdropPath: string | null;
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    image5: string | null;
    image6: string | null;
    image7: string | null;
    image8: string | null;
    image9: string | null;
    image10: string | null;
    createdAt: string;
};
