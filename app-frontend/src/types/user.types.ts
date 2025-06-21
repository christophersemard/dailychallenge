// src/types/user.types.ts
import { GameResult } from "./game.types";

export interface UserAvatar {
    id: string;
    url: string;
    shapeId: number | undefined;
    eyesId: number | undefined;
    mouthId: number | undefined;
    patternId: number | null;
    colorShapeId: number | undefined;
    colorPatternId: number | null;
    shape: AssetItem | null;
    eyes: AssetItem | null;
    mouth: AssetItem | null;
    pattern: AssetItem | null;
    colorShape: ColorAsset | null;
    colorPattern: ColorAsset | null;
}

export interface UserStats {
    id: string;
    xp: number;
    level: number;
    streak: number;
    lastPlayedAt: string;
}

export interface UserMe {
    id: string;
    email: string;
    pseudo: string;
    role: string; // "user" | "admin"
    createdAt: string;
    avatar: UserAvatar | null; // Avatar de l'utilisateur
    userStats: UserStats;
    userEvents: UserEvent[]; // Événements de l'utilisateur
    pendingFriendRequests: number | null;

    avatarUrl: string | null;
    level: number;
    xp: number;
    streak: number;
    gamesPlayed: number;
    mostPlayedGame: {
        id: number;
        path: string;
        name: string;
        gameCategory: {
            color: string;
        };
    } | null;
    isFriend: boolean | "requested" | "received" | "accepted";

    vip: {
        status: "active" | "inactive";
        renewing: boolean;
        until: string | null;
        plan: "monthly" | "yearly" | "manual" | null;
    };

    vipHistory: {
        startDate: string;
        endDate: string | null;
        status: "active" | "cancelled" | "expired";
        plan: "monthly" | "yearly" | "manual";
    }[];
}

// Type pour un ami
export interface Friend {
    id: string;
    pseudo: string;
    level: number;
    avatarUrl: string; // URL de l'avatar
}

// Type pour une demande d'ami
export interface FriendRequestGroup {
    sent: FriendRequest[]; // Demandes envoyées
    received: FriendRequest[]; // Demandes reçues
}

export interface FriendRequest {
    id: string;
    userId: string;
    friendId: string;
    status: string;
    createdAt: string;
    user: {
        id: string;
        pseudo: string;
        level: number;
        avatarUrl: string | null; // URL de l'avatar ou null si pas d'avatar
    };
}

export type UserPublic = {
    id: number;
    pseudo: string;
    createdAt: string;
    avatarUrl: string | null;
    level: number;
    xp: number;
    streak: number;
    gamesPlayed: number;
    mostPlayedGame: {
        id: number;
        path: string;
        name: string;
        gameCategory: {
            color: string;
        };
    } | null;
    isFriend: boolean | "requested" | "received" | "accepted";
    userEvents: UserEvent[];
    avatar: UserAvatar | null;
};

export type ColorAsset = {
    id: number;
    name: string;
    value: string;
    gradientValue: string | null;
    level: number;
    vip: boolean;
};
export type AssetItem = {
    id: number;
    name: string;
    url: string;
    level: number;
    vipOnly: boolean;
};

export type UserEvent = {
    id: number;
    createdAt: string;
    type: string;
    levelUp: number | null;
    attempts: number | null;
    gameResult: GameResult;
    friend: {
        id: number;
        user: {
            id: number;
            pseudo: string;
            avatarUrl: string | null;
        };
        friend: {
            id: number;
            pseudo: string;
            avatarUrl: string | null;
        };
        status: string; // "accepted", "requested", "received"
    } | null;
    avatarAsset: {
        id: number;
        name: string;
        url: string;
    } | null;
};
