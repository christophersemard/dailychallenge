// src/components/user/UserProfile.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import OutlineText from "@/components/ui/outline-text";
import { UserPublic } from "@/types/user.types";
import { Streak } from "@/components/ui/streak";
import Card from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserIcon, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import EventItem from "./EventItem";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Props = {
    user: UserPublic;
    currentUserId: number;
};

export default function UserProfile({ user, currentUserId }: Props) {
    const [stateUser, setStateUser] = useState<UserPublic>(user);

    const handleAddFriend = async () => {
        const { data, error } = await fetchClientWithAuth(
            "/friends/" + stateUser.id + "/request",
            {
                method: "POST",
            }
        );
        if (error) {
            toast.error("Erreur lors de l'envoi de la demande d'ami", {
                className: "toast-base toast-danger",
            });
            return;
        }
        // Mettre à jour le statut d'amitié localement
        setStateUser({ ...user, isFriend: "requested" });
        // Afficher un message de succès avec un toast
        toast.success("Demande d'ami envoyée", {
            className: "toast-base toast-success",
        });
    };

    const handleRejectRequest = async (friendId: number) => {
        const { data, error } = await fetchClientWithAuth(
            `/friends/${friendId}/reject`,
            { method: "PATCH" }
        );
        if (error) {
            toast.error("Erreur lors du rejet de la demande d'ami", {
                className: "toast-base toast-danger",
            });
            return;
        }
        setStateUser({ ...user, isFriend: false });
        toast.success("Demande d'ami rejetée", {
            className: "toast-base toast-success",
        });
    };

    const handleAcceptRequest = async (friendId: number) => {
        const { data, error } = await fetchClientWithAuth(
            `/friends/${friendId}/accept`,
            { method: "PATCH" }
        );
        if (error) {
            toast.error("Erreur lors de l'acceptation de la demande d'ami", {
                className: "toast-base toast-danger",
            });
            return;
        }
        setStateUser({ ...user, isFriend: "accepted" });
        toast.success("Demande d'ami acceptée", {
            className: "toast-base toast-success",
        });
    };

    useEffect(() => {
        console.log("UserProfile effect", { user, currentUserId });
    }, [stateUser]);

    return (
        <div className="flex flex-col items-center gap-8">
            <Card title={false} color="primary" className="w-full max-w-5xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <Image
                        src={
                            stateUser.avatarUrl ||
                            `/assets/avatar/avatar-default-${Math.floor(
                                Math.random() * 7 + 1
                            )}.png`
                        }
                        width={150}
                        height={150}
                        alt={stateUser.pseudo}
                        className=""
                    />
                    <div className="flex flex-col items-start justify-center mb-0">
                        <div className="flex flex-col md:flex-row mb-0 justify-between items-center w-full">
                            <div className="">
                                <h2 className="text-3xl font-black text-center md:text-start">
                                    {stateUser.pseudo}
                                </h2>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Inscrit depuis le{" "}
                                    {new Date(
                                        stateUser.createdAt
                                    ).toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>

                            {/* Boutons d'actions et statut amitié */}
                            <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <div className="flex flex-col items-end">
                                    <span
                                        className={cn(
                                            "text-sm text-muted-foreground font-bold mb-1 flex items-center gap-1",
                                            stateUser.isFriend === "accepted"
                                                ? "text-green"
                                                : stateUser.isFriend ===
                                                  "requested"
                                                ? "text-black"
                                                : stateUser.isFriend ===
                                                  "received"
                                                ? "text-black"
                                                : "text-gray"
                                        )}
                                    >
                                        {stateUser.isFriend && (
                                            <UserRound className="size-5" />
                                        )}
                                        {stateUser.isFriend === "accepted"
                                            ? "Vous êtes amis"
                                            : stateUser.isFriend === "requested"
                                            ? "Demande d'amis envoyée"
                                            : stateUser.isFriend === "received"
                                            ? "Demande d'amis reçue"
                                            : ""}
                                    </span>
                                </div>

                                {/* Menu d'actions (dropdown shadcn) */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className=""
                                        >
                                            <MoreHorizontal className="size-8" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className=""
                                    >
                                        {stateUser.isFriend === "accepted" && (
                                            <DropdownMenuItem
                                                className="cursor-pointer text-danger"
                                                onClick={() => {}}
                                            >
                                                Retirer de mes amis
                                            </DropdownMenuItem>
                                        )}
                                        {stateUser.isFriend === "requested" && (
                                            <></>
                                        )}
                                        {stateUser.isFriend === "received" && (
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    handleAcceptRequest(
                                                        stateUser.id
                                                    )
                                                }
                                            >
                                                Accepter la demande
                                            </DropdownMenuItem>
                                        )}
                                        {stateUser.isFriend === false && (
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={handleAddFriend}
                                            >
                                                Envoyer une demande d&apos;amis
                                            </DropdownMenuItem>
                                        )}

                                        {stateUser.isFriend === "received" && (
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    handleRejectRequest(
                                                        stateUser.id
                                                    )
                                                }
                                            >
                                                Refuser la demande
                                            </DropdownMenuItem>
                                        )}

                                        <DropdownMenuItem
                                            disabled
                                            className="cursor-pointer"
                                            onClick={() => {}}
                                        >
                                            Bloquer l&apos;utilisateur
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            disabled
                                            className="cursor-pointer"
                                            onClick={() => {}}
                                        >
                                            Signaler l&apos;utilisateur
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="w-full h-[1px] bg-muted/20 my-4" />

                        {/* Stats */}

                        <div className="flex flex-wrap gap-x-8 justify-center md:justify-start gap-y-2 text-sm text-muted-foreground font-bold">
                            <div className="flex items-center gap-2">
                                <span>Niveau</span>
                                <OutlineText
                                    text={String(stateUser.level)}
                                    color="black"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Série en cours</span>
                                <Streak streak={stateUser.streak} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Nombre de parties jouées</span>
                                <OutlineText
                                    text={String(stateUser.gamesPlayed)}
                                />
                            </div>

                            <div className="flex items-center gap-1">
                                <span>Jeu favori</span>
                                {stateUser.mostPlayedGame ? (
                                    <OutlineText
                                        text={String(
                                            stateUser.mostPlayedGame.name
                                        )}
                                        color={
                                            stateUser.mostPlayedGame
                                                .gameCategory.color
                                        }
                                    />
                                ) : (
                                    "-"
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Points gagnés ce mois ci</span>
                                <span className="flex items-center">
                                    <OutlineText text={String(stateUser.xp)} />
                                    pts
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Historique des événements */}
            <Card
                title="Fil d'actualité"
                color="primary"
                className="w-full max-w-5xl"
            >
                {stateUser.userEvents.length > 0 ? (
                    stateUser.userEvents.map((event, index) => (
                        <EventItem
                            key={event.id}
                            showAvatar={false}
                            user={stateUser}
                            event={event}
                            isCurrentUser={stateUser.id === currentUserId}
                            isFirst={index === 0}
                            isLast={index === stateUser.userEvents.length - 1}
                        />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground font-medium">
                        Aucun événement trouvé.
                    </p>
                )}
            </Card>
        </div>
    );
}
