import { UserStats } from "src/users/users.types";

export class LeaderboardEntry {
    user: User;
    score: number;
    xpGained?: number;
}

class User {
    id: number;
    email: string;
    userStats: UserStats;
}
