// src/components/user/UserProfile.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import OutlineText from "@/components/ui/outline-text";
import { UserPublic } from "@/types/user.types";
import { Streak } from "@/components/ui/streak";
import Card from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import EventItem from "./EventItem";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { useEffect } from "react";

type Props = {
    user: UserPublic;
    currentUserId: number;
};

export default function UserProfile({
    user,
    currentUserId,
}: Props) {
    const handleAcceptRequest = async (friendId: string) => {
        try {
            await fetchClientWithAuth(`/friends/${friendId}/accept`, { method: "PATCH" });
            toast.success("Demande d'ami acceptée", {
                className: "toast-base toast-success",
            })
            user.isFriend = "accepted"; // Mettre à jour le statut d'amitié localement
        } catch (error) {
            console.error("Erreur acceptation :", error);
            toast.error("Erreur lors de l'acceptation de la demande d'ami", {
                className: "toast-base toast-danger",
            })
        }
    };

    const handleRejectRequest = async (friendId: string) => {
        try {
            await fetchClientWithAuth(`/friends/${friendId}/reject`, { method: "PATCH" });
            toast.success("Demande d'ami rejetée", {
                className: "toast-base toast-success",
            })
            user.isFriend = false; // Mettre à jour le statut d'amitié localement
        } catch (error) {
            console.error("Erreur rejet :", error);
            toast.error("Erreur lors du rejet de la demande d'ami", {
                className: "toast-base toast-danger",
            })
        }
    };

    const handleAddFriend = async () => {
        const { data, error } = await fetchClientWithAuth("/friends/" + user.id + "/request", {
            method: "POST",
        });
        console.log("handleAddFriend", { data, error });
        if (error) {
            toast.error("Erreur lors de l'envoi de la demande d'ami", {
                className: "toast-base toast-danger",
            })
            return;
        }
        user.isFriend = "requested"; // Mettre à jour le statut d'amitié localement
        // Afficher un message de succès avec un toast
        toast.success("Demande d'ami envoyée", {
            className: "toast-base toast-success",
        })

    };

    useEffect(() => {
    }, [user.isFriend]);


    return (
        <div className="flex flex-col items-center gap-4 md:gap-8">


            <Card title={false} color="primary" className="w-full max-w-5xl p-4">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <Image
                        src={
                            user.avatarUrl ||
                            `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`
                        }
                        width={150}
                        height={150}
                        alt={user.pseudo}
                        className=""
                    />
                    <div className="flex flex-col items-start justify-center mb-0">


                        <div className="flex mb-0 justify-between items-center w-full">
                            <div className="">
                                <h2 className="text-3xl font-black">{user.pseudo}</h2>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Inscrit depuis le {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>

                            </div>

                            {/* Boutons d'actions et statut amitié */}
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col items-end">
                                    <span className={cn("text-sm text-muted-foreground font-bold mb-1",
                                        user.isFriend === "accepted" ? "text-green" : user.isFriend === "requested" ? "text-yellow" : user.isFriend === "received" ? "text-danger" : "text-gray"
                                    )}>
                                        {
                                            user.isFriend === "accepted"
                                                ? "Vous êtes amis"
                                                : user.isFriend === "requested"
                                                    ? "Demande d'amis envoyée"
                                                    : user.isFriend === "received"
                                                        ? "Demande d'amis reçue"
                                                        : ""
                                        }
                                    </span>
                                </div>

                                {/* Menu d'actions (dropdown shadcn) */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="">
                                            <MoreHorizontal className="size-8" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="">
                                        {
                                            user.isFriend === "accepted" && (
                                                <DropdownMenuItem className="cursor-pointer text-danger" onClick={() => { }}>Retirer de mes amis
                                                </DropdownMenuItem>
                                            )}
                                        {user.isFriend === "requested" && (
                                            <></>
                                        )}
                                        {user.isFriend === "received" && (
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleAcceptRequest}>Accepter la demande
                                            </DropdownMenuItem>
                                        )}
                                        {user.isFriend === false && (
                                            <DropdownMenuItem className="cursor-pointer" onClick={handleAddFriend}>Envoyer une demande d&apos;amis
                                            </DropdownMenuItem>
                                        )}

                                        {user.isFriend === "received" && (
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRejectRequest}>Refuser la demande
                                            </DropdownMenuItem>
                                        )
                                        }

                                        <DropdownMenuItem disabled className="cursor-pointer" onClick={() => { }}>Bloquer l&apos;utilisateur
                                        </DropdownMenuItem>
                                        <DropdownMenuItem disabled className="cursor-pointer" onClick={() => { }}>Signaler l&apos;utilisateur
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div >
                        </div>

                        {/* Separator */}
                        <div className="w-full h-[1px] bg-muted/20 my-4" />

                        {/* Stats */}

                        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground font-bold">
                            <div className="flex items-center gap-2">
                                <span>Niveau</span>
                                <OutlineText text={String(user.level)} color="black" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Série en cours</span>
                                <Streak streak={user.streak} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Parties</span>
                                <OutlineText text={String(user.gamesPlayed)} />
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Jeu favori</span>
                                {
                                    user.favoriteGame ? (
                                        <OutlineText text={String(user.favoriteGame.name)} />
                                    )
                                        : "-"
                                }
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Points gagnés ce mois ci</span>
                                <span className="flex items-center"><OutlineText text={String(user.xp)} />pts</span>
                            </div>
                        </div>


                    </div>
                </div>
            </Card >

            {/* Historique des événements */}
            <Card title="Fil d'actualité" color="primary" className="w-full max-w-5xl p-4">
                {user.userEvents.length > 0 ? (
                    user.userEvents.map((event, index) => (
                        <EventItem
                            key={event.id}
                            user={user}
                            event={event}
                            isCurrentUser={user.id === currentUserId}
                            isFirst={index === 0}
                            isLast={index === user.userEvents.length - 1}
                        />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground font-medium">Aucun événement trouvé.</p>
                )}
            </Card>
        </div>

    );
}
