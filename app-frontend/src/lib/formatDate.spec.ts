// src/lib/formatDate.ts
import { formatDateLong, getDateStr, getDateLabel } from "./formatDate";

describe("formatDateLong", () => {
    it("devrait formater une date en français long", () => {
        const date = new Date("2024-05-01");
        expect(formatDateLong(date)).toBe("1 mai 2024");
    });
});

describe("getDateStr", () => {
    it("devrait retourner une string au format YYYY-MM-DD", () => {
        const date = new Date("2024-12-05");
        expect(getDateStr(date)).toBe("2024-12-05");
    });
});

describe("getDateLabel", () => {
    it("devrait dire 'Il y a moins d'une minute'", () => {
        const now = new Date();
        expect(getDateLabel(now.toISOString())).toBe(
            "Il y a moins d'une minute"
        );
    });

    it("devrait dire 'Il y a 3 minutes'", () => {
        const past = new Date(Date.now() - 3 * 60 * 1000).toISOString();
        expect(getDateLabel(past)).toBe("Il y a 3 minutes");
    });

    it("devrait dire 'Il y a 5 heures'", () => {
        const past = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
        expect(getDateLabel(past)).toBe("Il y a 5 heures");
    });

    it("devrait dire 'Il y a 12 jours'", () => {
        const past = new Date(
            Date.now() - 12 * 24 * 60 * 60 * 1000
        ).toISOString();
        expect(getDateLabel(past)).toBe("Il y a 12 jours");
    });

    it("devrait retourner une date formatée si > 30 jours", () => {
        const past = new Date("2023-04-20").toISOString();
        expect(getDateLabel(past)).toMatch(/^Le \w+ \d+ avril 2023/);
    });
});
