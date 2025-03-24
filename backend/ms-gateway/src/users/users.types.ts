export class UserStats {
    userId: number;
    xp: number;
    level: number;
    streak: number;
    lastPlayedAt: Date | null;
}

export class UserEvent {
    id: number;
    userId: number;
    type: string; // Ex: "level_up", "streak_bonus"
    details?: string;
    createdAt: Date;
}

export interface UserPublicProfile {
    id: number;
    pseudo: string;
    vip: boolean;
    createdAt: string;
    avatar?: { url: string };
    userStats?: {
        level: number;
        xp: number;
        streak: number;
    };
}
