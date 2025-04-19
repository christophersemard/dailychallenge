// lib/getLeaderboardData.ts
import { LeaderboardData } from "@/types/game.types";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { getDateStr } from "@/lib/formatDate";

export async function getLeaderboardData({
    type,
    userId,
    category,
    gameId,
    period,
    offset = 0,
    limit = 10,
}: {
    type: "global" | "friends";
    userId?: string;
    category: string | null;
    gameId: string | null;
    period: "week" | "month" | "year" | "all";
    offset?: number;
    limit?: number;
}): Promise<LeaderboardData> {
    const now = new Date();
    let dateStart: Date, dateEnd: Date;

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
    } else if (period === "year") {
        dateStart = new Date(now.getFullYear(), 0, 1);
        dateEnd = new Date(now.getFullYear(), 11, 31);
    } else {
        dateStart = new Date(0);
        dateEnd = new Date();
    }

    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        dateStart: getDateStr(dateStart),
        dateEnd: getDateStr(dateEnd),
    });

    let url = "/api/leaderboard";
    let separator = "&";

    if (type === "friends") {
        if (gameId) {
            url += `/friends/game?gameId=${gameId}`;
        } else if (category) {
            url += `/friends/category?category=${category}`;
        } else {
            url += "/friends";
            separator = "?";
        }
    } else {
        if (gameId) {
            url += `/game?gameId=${gameId}`;
        } else if (category) {
            url += `/category?category=${category}`;
        } else {
            url += "/global";
            separator = "?";
        }
    }

    console.log("URL du leaderboard :", url);
    console.log("Paramètres du leaderboard :", params.toString());
    console.log(`${url}${separator}${params.toString()}`);

    const { data, error } = await fetchClientWithAuth<LeaderboardData>(
        `${url}${separator}${params.toString()}`
    );

    if (error || !data) {
        console.error("Erreur leaderboard :", error);
        return {
            players: [],
            player: null,
            numberOfPlayers: 0,
        };
    }

    return data;
}
