// src/lib/leaderboard/getLeaderboardData.spec.ts
import { getLeaderboardData } from "./getLeaderboardData";
jest.mock("@/lib/fetchClientWithAuth", () => ({
    fetchClientWithAuth: jest.fn(),
}));
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";

describe("getLeaderboardData", () => {
    const mockFetch = fetchClientWithAuth as jest.Mock;

    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("retourne un leaderboard global par défaut", async () => {
        mockFetch.mockResolvedValue({
            data: {
                players: [{ id: 1, pseudo: "test" }],
                player: null,
                numberOfPlayers: 1,
            },
            error: null,
        });

        const res = await getLeaderboardData({
            type: "global",
            period: "all",
            category: null,
            gameId: null,
        });

        expect(res.numberOfPlayers).toBe(1);
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/leaderboard\/global\?/)
        );
    });

    it("retourne un leaderboard amis par jeu", async () => {
        mockFetch.mockResolvedValue({
            data: {
                players: [],
                player: null,
                numberOfPlayers: 0,
            },
            error: null,
        });

        await getLeaderboardData({
            type: "friends",
            period: "month",
            category: null,
            gameId: "42",
        });

        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining("/api/leaderboard/friends/game?gameId=42")
        );
    });

    it("retourne un leaderboard jestde si erreur", async () => {
        mockFetch.mockResolvedValue({
            data: null,
            error: { statusCode: 500, message: "fail", error: "Error" },
        });

        const res = await getLeaderboardData({
            type: "global",
            period: "year",
            category: null,
            gameId: null,
        });

        expect(res.players).toEqual([]);
        expect(res.numberOfPlayers).toBe(0);
    });
});
