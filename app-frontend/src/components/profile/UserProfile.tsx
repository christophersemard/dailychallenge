// src/components/user/UserProfile.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import OutlineText from "@/components/ui/outline-text";
import { UserPublic } from "@/types/user.types"; // À adapter selon ton type
import { UserPlus, Check, X } from "lucide-react";

type Props = {
    user: UserPublic;
    onAddFriend?: () => void;
    onCancelRequest?: () => void;
    onAcceptRequest?: () => void;
    onRejectRequest?: () => void;
    relationStatus: "none" | "requested" | "received" | "friends";
};

export default function UserProfile({
    user,
    currentUserId,
    onAddFriend,
    onCancelRequest,
    onAcceptRequest,
    onRejectRequest,
}: Props) {
    return (
        <div className="flex flex-col items-center gap-4">
            <Image
                src={
                    user.avatarUrl ||
                    `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`
                }
                width={100}
                height={100}
                alt={user.pseudo}
                className="rounded-full border-4 border-background"
            />

            <h2 className="text-xl font-bold">{user.pseudo}</h2>

            <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <span>Niv.</span>
                    <OutlineText text={String(user.level)} size="sm" color="black" />
                </div>
                <div className="flex items-center gap-1">
                    <span>Streak</span>
                    <OutlineText text={String(user.streak)} size="sm" color="orange" />
                </div>
                <div className="flex items-center gap-1">
                    <span>Parties</span>
                    <OutlineText text={String(user.gamesPlayed)} size="sm" color="purple" />
                </div>
            </div>

            {user.isFriend === false && (
                <Button onClick={onAddFriend} variant="primary" className="mt-2" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" /> Ajouter en ami
                </Button>
            )}

            {user.isFriend === "requested" && (
                <p className="text-sm text-muted-foreground font-medium">
                    Demande envoyée
                </p>
            )}

            {user.isFriend === "received" && (
                <div className="flex gap-2">
                    <Button variant="success" size="sm" onClick={onAcceptRequest}>
                        <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" size="sm" onClick={onRejectRequest}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {user.isFriend === "accepted" && (
                <p className="text-sm text-green-600 font-semibold">✓ Déjà amis</p>
            )}
        </div>
    );
}
