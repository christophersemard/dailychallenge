export interface UserProfile {
    id: number;
    email: string;
    pseudo: string;
    // vip: boolean;
    createdAt: string;
    updatedAt: string;

    userStats?: {
        xp: number;
        level: number;
        streak: number;
        lastPlayedAt: string;
    };

    avatar?: {
        url: string;
        shape: { id: number; name: string; url: string };
        eyes: { id: number; name: string; url: string };
        mouth: { id: number; name: string; url: string };
        pattern?: { id: number; name: string; url: string };

        colorShape: { id: number; name: string; value: string };
        colorEyes: { id: number; name: string; value: string };
        colorMouth: { id: number; name: string; value: string };
        colorPattern?: { id: number; name: string; value: string };
    };
}
