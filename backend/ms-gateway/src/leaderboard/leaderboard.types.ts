import { User } from "database";

export type LeaderboardResponse = {
    numberOfPlayers: number;
    players: LeaderboardPlayer[];
    player: LeaderboardPlayer | null;
};

export type LeaderboardPlayer = {
    user: User & {
        userStats?: {
            level: number;
            xp: number;
            streak: number;
            gamesPlayed?: number;
        };
    };
    score: number;
    xpGained: number;
};

export type CategoryGame = {
    id: number;
    name: string;
    color: string;
    games: Game[];
};

export type Game = {
    id: number;
    name: string;
    description: string;
    imgUrl: string | null;
    path: string;
    status: string;
    categoryId: number;
};
