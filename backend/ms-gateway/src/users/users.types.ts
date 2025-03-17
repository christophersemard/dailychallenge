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
