export type LeaderboardEntry = {
    user: {
        id: number;
        pseudo: string;
        avatar: string | null;
        level: number;
        streak: number;
        gamesPlayed: number;
    };
    score: number;
    xpGained: number;
};

export type LeaderboardResponse = {
    numberOfPlayers: number;
    players: LeaderboardEntry[];
    player: LeaderboardEntry | null;
};
