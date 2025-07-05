// src/lib/fetchServerWithAuth.spec.ts
import { fetchServerWithAuth } from "./fetchServerWithAuth";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe("fetchServerWithAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("retourne une erreur si aucun token", async () => {
        (getServerSession as jest.Mock).mockResolvedValueOnce(null);

        const result = await fetchServerWithAuth("/test");

        expect(result.error).toEqual({
            statusCode: 401,
            error: "Unauthorized",
            message: "Aucun token trouvé dans la session.",
        });
        expect(result.data).toBeNull();
    });

    it("retourne une réponse si l'appel réussit", async () => {
        (getServerSession as jest.Mock).mockResolvedValueOnce({
            accessToken: "fake_token",
        });

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ hello: "world" }),
        });

        const result = await fetchServerWithAuth<{ hello: string }>("/test");

        expect(result).toEqual({
            data: { hello: "world" },
            error: null,
        });
    });

    it("retourne une erreur si l'API échoue avec JSON", async () => {
        (getServerSession as jest.Mock).mockResolvedValueOnce({
            accessToken: "fake_token",
        });

        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            text: async () =>
                JSON.stringify({
                    statusCode: 400,
                    error: "Bad Request",
                    message: "Invalid input",
                }),
        });

        const result = await fetchServerWithAuth("/test");

        expect(result.error).toEqual({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid input",
        });
    });

    it("retourne une erreur avec texte brut si non JSON", async () => {
        (getServerSession as jest.Mock).mockResolvedValueOnce({
            accessToken: "fake_token",
        });

        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            text: async () => "Erreur serveur",
        });

        const result = await fetchServerWithAuth("/test");

        expect(result.error).toEqual({
            statusCode: 500,
            error: "Unknown error",
            message: "Erreur serveur",
        });
    });
});
