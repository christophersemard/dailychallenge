// src/lib/utils.spec.ts
import { cn } from "./utils";

describe("cn", () => {
    it("fusionne proprement des classes simples", () => {
        expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
    });

    it("supprime les classes conflictuelles via tailwind-merge", () => {
        expect(cn("text-sm", "text-lg")).toBe("text-lg");
    });

    it("ignore les valeurs falsy", () => {
        expect(cn("block", null, undefined, false, "text-blue-500")).toBe(
            "block text-blue-500"
        );
    });

    it("gère les objets clsx", () => {
        expect(cn({ "bg-blue-500": true, "bg-red-500": false })).toBe(
            "bg-blue-500"
        );
    });
});
