// src/lib/typeguards.spec.ts
import { isErrorApi } from "./typeguards";

describe("isErrorApi", () => {
    it("devrait retourner true pour un objet de type ErrorApi", () => {
        const input = {
            statusCode: 404,
            message: "Non trouvé",
            error: "Not Found",
        };

        expect(isErrorApi(input)).toBe(true);
    });

    it("devrait retourner false si une propriété est manquante", () => {
        const input = {
            statusCode: 404,
            message: "Manquant",
        };

        expect(isErrorApi(input)).toBe(false);
    });

    it("devrait retourner false si le type d'une propriété est incorrect", () => {
        const input = {
            statusCode: "500", // mauvaise valeur
            message: "Erreur",
            error: "Erreur",
        };

        expect(isErrorApi(input)).toBe(false);
    });

    it("devrait retourner false pour null", () => {
        expect(isErrorApi(null)).toBe(false);
    });

    it("devrait retourner false pour une string", () => {
        expect(isErrorApi("erreur")).toBe(false);
    });
});
