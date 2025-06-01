"use client";

import { UserMe } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import OutlineText from "@/components/ui/outline-text";
import { Streak } from "@/components/ui/streak";
import Card from "@/components/ui/card";
import EventItem from "./EventItem";
import VipCard from "./VipCard";
import Image from "next/image";

type Props = {
    user: UserMe;
};

export default function MyProfile({ user }: Props) {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 w-full max-w-8xl">
                {/* Colonne gauche */}
                <div className="flex flex-col gap-6">
                    <Card title={false} color="primary">
                        <div className="flex flex-col items-center gap-2">
                            <Image
                                src={
                                    `${user?.avatar?.url}?v=${Date.now()}` ||
                                    `/assets/avatar/avatar-default-${Math.floor(
                                        Math.random() * 7 + 1
                                    )}.png`
                                }
                                width={150}
                                height={150}
                                alt={user.pseudo}
                                className="my-4"
                            />
                            <h2 className="text-2xl font-bold">
                                {user.pseudo}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Inscrit depuis{" "}
                                {new Date(user.createdAt).toLocaleDateString(
                                    "fr-FR",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </p>
                            <div className="flex flex-col md:flex-row gap-2 mt-2">
                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                    (window.location.href =
                                        "/avatar/modifier")
                                    }
                                >
                                    Modifier mon avatar
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        (window.location.href = "/mon-compte")
                                    }
                                >
                                    Gérer mon compte
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* VIP CARD */}
                    {/* <VipCard
                        status={user.vipStatus}
                        renewing={user.vipRenewing}
                        until={user.vipUntil}
                    /> */}
                </div>

                <div className="flex flex-col gap-6">
                    {/* STATS */}
                    <Card title="Statistiques" color="primary">
                        <div className="flex flex-wrap gap-x-8 justify-center md:justify-center gap-y-2 text-sm text-muted-foreground font-bold">
                            <div className="flex items-center gap-2">
                                <span>Niveau</span>
                                <OutlineText
                                    text={String(user.level)}
                                    color="black"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Série en cours</span>
                                <Streak streak={user.streak} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Nombre de parties jouées</span>
                                <OutlineText text={String(user.gamesPlayed)} />
                            </div>

                            <div className="flex items-center gap-1">
                                <span>Jeu favori</span>
                                {user.mostPlayedGame ? (
                                    <OutlineText
                                        text={String(user.mostPlayedGame.name)}
                                        color={
                                            user.mostPlayedGame.gameCategory
                                                .color
                                        }
                                    />
                                ) : (
                                    "-"
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Points gagnés ce mois ci</span>
                                <span className="flex items-center">
                                    <OutlineText text={String(user.xp)} />
                                    pts
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Colonne droite : fil d’actualité */}
                    <Card title="Fil d'actualité" color="primary">
                        {user.userEvents.length > 0 ? (
                            user.userEvents.map((event, index) => (
                                <EventItem
                                    key={event.id}
                                    showAvatar={false}
                                    user={user}
                                    event={event}
                                    isCurrentUser={true}
                                    isFirst={index === 0}
                                    isLast={
                                        index === user.userEvents.length - 1
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground font-medium">
                                Aucun événement trouvé.
                            </p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
