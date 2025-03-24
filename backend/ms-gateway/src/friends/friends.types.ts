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

export interface FriendRequest {
    id: number;
    userId: number;
    friendId: number;
    status: "pending" | "accepted" | "rejected";
    createdAt: string;
}

export interface FriendResponse {
    message: string;
    friendRequest?: FriendRequest;
}

export interface FriendsListResponse {
    friends: Friend[];
    pendingRequests?: FriendRequest[]; // facultatif selon la route
}
