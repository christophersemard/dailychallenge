// src/types/user.types.ts
import { GameResult } from "./game.types";

export interface UserAvatar {
    id: string;
    url: string;
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
    firstName: string;
    lastName: string;
    birthdate: string;
    createdAt: string;
    avatar: UserAvatar;
    userStats: UserStats;
    pendingFriendRequests: number | null;
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
    favoriteGame: {
        id: number;
        path: string;
        name: string;
    } | null;
    isFriend: boolean | "requested" | "received" | "accepted";
    userEvents: UserEvent[];
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
