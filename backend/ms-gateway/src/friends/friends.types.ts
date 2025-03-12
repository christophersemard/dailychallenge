export interface FriendRequestPayload {
    userId: number;
    friendId: number;
}

export interface RespondFriendRequestPayload {
    userId: number;
    friendId: number;
    accept: boolean;
}

export interface Friend {
    id: number;
    email: string;
}

export interface FriendResponse {
    message: string;
    friendRequest?: any; // À remplacer par un type plus précis si nécessaire
}

export interface FriendsListResponse {
    friends: Friend[];
}
