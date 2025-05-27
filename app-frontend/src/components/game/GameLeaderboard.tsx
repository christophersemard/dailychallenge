"use client";

import { useEffect, useState } from "react";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { LeaderboardData, LeaderboardEntry } from "@/types/game.types";
import Card from "@/components/ui/card";
import OutlineText from "@/components/ui/outline-text";
import { IconButton } from "@/components/ui/icon-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Color } from "@/types/colors.types";
import clsx from "clsx";
import Link from "next/link";
import { useGameEventStore } from "@/lib/store/useGameEventStore";
import Image from "next/image";
import { getDateStr } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";

type Props = {
    leaderboardId: number;
    userId: string;
    color: Color;
    gameId: string;
};

type Period = "week" | "month" | "year";
type Tab = "global" | "amis";

export default function GameLeaderboard({
    leaderboardId,
    userId,
    color,
}: Props) {
    const [tab, setTab] = useState<Tab>("global");
    const [period, setPeriod] = useState<Period>("week");
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const LIMIT = 5;

    const lastUpdate = useGameEventStore((state) => state.lastUpdate);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const now = new Date();
            let dateStart: Date;
            let dateEnd: Date;

            console.log("Fetching leaderboard data...");

            if (period === "week") {
                const day = now.getDay() || 7;
                dateStart = new Date(now);
                dateStart.setDate(now.getDate() - day + 1);
                dateStart.setHours(0, 0, 0, 0);
                dateEnd = new Date(dateStart);
                dateEnd.setDate(dateStart.getDate() + 6);
            } else if (period === "month") {
                dateStart = new Date(now.getFullYear(), now.getMonth(), 1);
                dateEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            } else {
                dateStart = new Date(now.getFullYear(), 0, 1);
                dateEnd = new Date(now.getFullYear(), 11, 31);
            }

            console.log("Date start:", dateStart, dateStart.toISOString());

            const params = new URLSearchParams({
                gameId: String(leaderboardId),
                limit: String(LIMIT),
                offset: String(offset),
                dateStart: getDateStr(dateStart),
                dateEnd: getDateStr(dateEnd),
            });

            const url =
                tab === "amis"
                    ? `/api/leaderboard/friends/game?userId=${userId}&${params.toString()}`
                    : `/api/leaderboard/game?${params.toString()}`;

            const { data, error } = await fetchClientWithAuth<LeaderboardData>(
                url
            );

            if (error || !data) {
                console.error("Erreur leaderboard :", error);
            } else {
                setEntries(data.players);
                setNumberOfPlayers(data.numberOfPlayers);

                console.log("Leaderboard data fetched:", data);
            }

            setLoading(false);
        };

        fetchData();
    }, [leaderboardId, tab, period, offset, userId, lastUpdate]);

    const getRankClass = (rank: number, offset: number) => {
        if (offset != 0) return "";
        if (rank === 0) return "text-red-500 font-bold ";
        if (rank === 1) return "text-orange-500 font-bold";
        if (rank === 2) return "text-yellow-500 font-bold";
        return "";
    };

    const getRankColor = (rank: number, offset: number) => {
        if (offset != 0) return "black";
        if (rank === 0) return "red";
        if (rank === 1) return "orange";
        if (rank === 2) return "yellow";
        return "black";
    };

    return (
        <Card title="Classement" color={color}>
            <div className="flex items-center justify-end gap-2 absolute top-4 right-4">
                <IconButton
                    onClick={() => setOffset(Math.max(0, offset - LIMIT))}
                    icon={<ChevronLeft strokeWidth={4} className="w-5 h-5" />}
                    variant="background"
                    size="xs"
                    disabled={offset === 0}
                />

                <div className="font-bold text-muted-foreground text-center text-sm">
                    Page {offset / LIMIT + 1}
                </div>

                <IconButton
                    onClick={() => setOffset(offset + LIMIT)}
                    icon={<ChevronRight strokeWidth={4} className="w-5 h-5" />}
                    variant="background"
                    size="xs"
                    disabled={offset + LIMIT >= numberOfPlayers}
                />
            </div>

            <div className="flex justify-between mt-4">
                <div className="flex gap-2 text-xs">
                    {(["global", "amis"] as Tab[]).map((value) => (
                        <button
                            key={value}
                            onClick={() => {
                                setTab(value);
                                setOffset(0);
                            }}
                            className={clsx(
                                "cursor-pointer px-1.5 py-1 rounded border-2 border-white hover:border-background",
                                {
                                    "font-bold bg-background": tab === value,
                                }
                            )}
                        >
                            {value === "amis" ? "Amis" : "Global"}
                        </button>
                    ))}
                </div>

                <div className="flex gap-1 text-xs text-muted-foreground">
                    {(["week", "month", "year"] as Period[]).map((value) => (
                        <button
                            key={value}
                            onClick={() => {
                                setPeriod(value);
                                setOffset(0);
                            }}
                            className={clsx(
                                "cursor-pointer px-1.5 py-1 rounded border-2 border-white hover:border-background",
                                {
                                    "font-bold bg-background": period === value,
                                }
                            )}
                        >
                            {value == "week"
                                ? "Sem."
                                : value === "month"
                                ? "Mois"
                                : "Année"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full h-[1px] bg-black/10 my-2"> </div>
            <ul className="space-y-0 text-sm mt-3.5">
                {loading && entries.length === 0 ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <li
                            key={i}
                            className="h-10 bg-background rounded animate-pulse"
                        />
                    ))
                ) : entries.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center py-4">
                        Aucun résultat
                    </div>
                ) : (
                    entries.map((entry, i) => {
                        const isUser = String(entry.user.id) === String(userId);

                        return (
                            <li
                                key={entry.user.id}
                                className={clsx(
                                    "grid grid-cols-[40px_1fr_80px] items-center px-0 py-1.5 hover:bg-background/50 ",
                                    {
                                        "bg-black/2": i % 2 === 0 && !isUser,
                                        "bg-background font-semibold": isUser,
                                    }
                                )}
                            >
                                {/* Position */}
                                <div
                                    className={clsx(
                                        "text-center font-black text-base me-2",
                                        getRankClass(i, offset)
                                    )}
                                >
                                    {offset + i + 1}
                                </div>

                                <Link
                                    className="flex flex-nowrap gap-2 items-center"
                                    href={`/profil/${entry.user.id}`}
                                >
                                    <Image
                                        height={32}
                                        width={32}
                                        src={
                                            entry.user.avatar ||
                                            `/assets/avatar/avatar-default-${Math.floor(
                                                Math.random() * 7 + 1
                                            )}.png`
                                        }
                                        alt={entry.user.pseudo}
                                        className="w-6 h-6 "
                                    />
                                    {/* Pseudo */}
                                    <span className="truncate font-semibold">
                                        {entry.user.pseudo}
                                    </span>
                                </Link>

                                {/* Score */}
                                <div className="flex justify-end items-center pe-2">
                                    <OutlineText
                                        text={`${entry.score}`}
                                        color={getRankColor(i, offset)}
                                        size="sm"
                                    />
                                    <span className="text-muted-foreground text-xs ms-1 mb-0.5">
                                        pts
                                    </span>
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>

            <div className="flex justify-center">
                <Button variant="outline-background" size="xs" asChild>
                    <Link href="/classement?gameId=1">Voir en détails</Link>
                </Button>
            </div>
        </Card>
    );
}
