// src/lib/avatar/sortColors.spec.ts
import { sortColorsByHue } from "./sortColors";

describe("sortColorsByHue", () => {
    it("devrait trier les couleurs selon leur teinte (HSL hue)", () => {
        const colors = [
            { id: 1, name: "Red", value: "#FF0000", level: 1, vipOnly: false },
            {
                id: 2,
                name: "Green",
                value: "#00FF00",
                level: 1,
                vipOnly: false,
            },
            { id: 3, name: "Blue", value: "#0000FF", level: 1, vipOnly: false },
        ];

        const result = sortColorsByHue(colors);

        // Teintes approximatives attendues : Red ~0°, Green ~120°, Blue ~240°
        expect(result.map((c) => c.name)).toEqual(["Red", "Green", "Blue"]);
    });

    it("ne modifie pas le tableau original", () => {
        const original = [
            { id: 1, name: "Cyan", value: "#00FFFF", level: 1, vipOnly: false },
            {
                id: 2,
                name: "Magenta",
                value: "#FF00FF",
                level: 1,
                vipOnly: false,
            },
        ];
        const copy = [...original];
        sortColorsByHue(original);
        expect(original).toEqual(copy);
    });
});
