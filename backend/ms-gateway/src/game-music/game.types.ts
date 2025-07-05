export interface GameData {
    guessed: boolean;
    date: string;
    hints: string[];
    attempts: number;
    maxAttempts: number;
}

export interface GuessResponse {
    lastGuessed: boolean;
    oldHints: string[];
    newHint?: string;
    attempts: number;
    maxAttempts: number;
    data?: {
        title: string;
        originalTitle: string;
        year: number;
    };
}

export interface GameResult {
    userId: number;
    gameId: number;
    score: number;
    xpGained: number;
    status: "passed" | "failed";
    date: string;
}
