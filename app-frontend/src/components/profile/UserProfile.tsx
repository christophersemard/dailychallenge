// src/components/user/UserProfile.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import OutlineText from "@/components/ui/outline-text";
import { UserPublic } from "@/types/user.types"; // À adapter selon ton type
import { UserPlus, Check, X, XIcon } from "lucide-react";
import { Streak } from "@/components/ui/streak";
import Card from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

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
                                            <DropdownMenuItem className="cursor-pointer" onClick={onCancelRequest}>Annuler la demande
                                            </DropdownMenuItem>
                                        )}
                                        {user.isFriend === "received" && (
                                            <DropdownMenuItem className="cursor-pointer" onClick={onAcceptRequest}>Accepter la demande
                                            </DropdownMenuItem>
                                        )}
                                        {user.isFriend === false && (
                                            <DropdownMenuItem className="cursor-pointer" onClick={onAddFriend}>Envoyer une demande d'amis
                                            </DropdownMenuItem>
                                        )}

                                        {user.isFriend === "received" && (
                                            <DropdownMenuItem className="cursor-pointer" onClick={onRejectRequest}>Refuser la demande
                                            </DropdownMenuItem>
                                        )
                                        }

                                        <DropdownMenuItem className="cursor-pointer" onClick={() => { }}>Bloquer l'utilisateur
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => { }}>Signaler l'utilisateur
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
                                <OutlineText text={String(user.gamesPlayed)} color="purple" />
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Jeu favori</span>
                                <OutlineText text={String(user.xp)} />
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Points gagnés ce mois ci</span>
                                <OutlineText text={String(user.xp)} />pts
                            </div>
                        </div>


                    </div>
                </div>
            </Card >

            {/* Historique des événements */}
            <Card title="Historique des événements" color="secondary" className="w-full max-w-5xl p-4">
                {user.userEvents.length > 0 ? (
                    user.userEvents.map((event) => (
                        <div key={event.id} className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-muted-foreground font-medium">{event.type}</span>
                            <span className="text-xs text-muted-foreground font-light">{new Date(event.createdAt).toLocaleDateString("fr-FR")}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground font-medium">Aucun événement trouvé.</p>
                )}
            </Card>
        </div>

    );
}
