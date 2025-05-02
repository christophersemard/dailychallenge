type Color = {
    id: number;
    name: string;
    value: string; // hex: "#RRGGBB"
    level: number;
    vipOnly: boolean;
};

export function sortColorsByHue(colors: Color[]): Color[] {
    function hexToHsl(hex: string): number {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;

        if (max === min) h = 0;
        else if (max === r) h = ((g - b) / (max - min)) % 6;
        else if (max === g) h = (b - r) / (max - min) + 2;
        else h = (r - g) / (max - min) + 4;

        h *= 60;
        if (h < 0) h += 360;

        return h;
    }

    return [...colors].sort((a, b) => hexToHsl(a.value) - hexToHsl(b.value));
}
