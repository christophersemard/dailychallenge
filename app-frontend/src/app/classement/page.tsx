"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLeaderboardData } from "@/lib/leaderboard/getLeaderboardData";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardUserList from "@/components/leaderboard/LeaderboardUserList";
import LeaderboardPagination from "@/components/leaderboard/LeaderboardPagination";
import LeaderboardCategorySelector from "@/components/leaderboard/LeaderboardCategorySelector";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/card";
import { LeaderboardEntry } from "@/types/game.types";

export default function ClassementPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [player, setPlayer] = useState<LeaderboardEntry | null>(null);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Classement");

    const type = (searchParams.get("type") || "global") as "global" | "friends";
    const period = (searchParams.get("period") || "all") as "week" | "month" | "year" | "all";
    const category = searchParams.get("category") || "";
    const gameId = searchParams.get("gameId") || null;
    const page = Number(searchParams.get("page")) || 1;
    const limit = 3;





    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            console.log("Fetching leaderboard data with params:", {
                type,
                period,
                category,
                gameId,
                page,
                limit,
            });

            const { players, player, numberOfPlayers } = await getLeaderboardData({
                type,
                period,
                category,
                gameId,
                offset: page == 1 ? 0 : page * limit - limit,
                limit,
            });

            console.log("Fetched leaderboard data:", {
                players,
                player,
                numberOfPlayers,
            });

            setPlayers(players);
            setPlayer(player);
            setNumberOfPlayers(numberOfPlayers);
            setLoading(false);
        };

        fetchData();
    }, [type, period, category, gameId, page, limit]);

    const updateSearchParam = (type: string, period: string, newPage: number) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("type", type);
        newParams.set("period", period);
        newParams.set("page", String(newPage));
        router.push(`/classement?${newParams.toString()}`);

        // Modifier le titre selon le type et la période
        let newTitle = "Classement";
        if (type === "global") {
            newTitle = "Classement global";
        }
        if (type === "friends") {
            newTitle = "Classement amis";
        }
        if (period === "week") {
            newTitle += " de la semaine en cours";
        }
        if (period === "month") {
            newTitle += " du mois de " + new Date().toLocaleString("default", { month: "long" });
        }
        if (period === "year") {
            newTitle += " de l'année " + new Date().getFullYear();
        }
        if (period === "all") {
            newTitle += " de tous les temps";
        }
        setTitle(newTitle);
    };


    // console.log("Rendering leaderboard page:", {
    //     type,
    //     period,
    //     category,
    //     gameId,
    //     page,
    //     limit,
    //     players,
    //     player,
    //     numberOfPlayers,
    // });
    return (
        <div className="max-w-5xl mx-auto w-full p-6 space-y-6">
            <Card color="primary" title={title} >

                <LeaderboardCategorySelector
                    initialCategory={category}
                    initialGame={gameId}
                    onChange={(cat, game) => {
                        const newParams = new URLSearchParams(searchParams.toString());
                        if (cat) newParams.set("category", cat);
                        else newParams.delete("category");

                        if (game) newParams.set("gameId", game);
                        else newParams.delete("gameId");

                        router.push(`/classement?${newParams.toString()}`);
                    }}
                />

                <LeaderboardFilters
                    initialScope={type}
                    initialPeriod={period}
                    // category={category}
                    // gameId={gameId}
                    onChange={(type, period) => updateSearchParam(type, period, page)}
                />

                <LeaderboardUserList
                    entries={players}
                    loading={loading}
                    offset={page * limit - limit}
                    userId={userId}
                    userEntry={player}
                />

                <LeaderboardPagination
                    initialPage={page}
                    limit={limit}
                    totalPlayers={numberOfPlayers}
                    totalPages={Math.ceil(numberOfPlayers / limit)}
                    onChange={(newPage) => updateSearchParam(type, period, newPage)}
                />
            </Card>
        </div>
    );
}
