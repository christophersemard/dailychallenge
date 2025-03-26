import OutlineText from "@/components/ui/outline-text"

export default function TestOutlineTextPage() {
    const levels = [
        { level: 3, color: "yellow" },
        { level: 12, color: "purple" },
        { level: 125, color: "red" },
        { level: 36, color: "green" },
        { level: 42, color: "blue" },
        { level: 51, color: "teal" },
        { level: 61, color: "pink" },
        { level: 72, color: "orange" },
        { level: 88, color: "indigo" },
        { level: 52, color: "black" },
    ]

    const sizes: ("xs" | "sm" | "base")[] = ["xs", "sm", "base"]

    return (
        <div className="p-10 space-y-6">
            {sizes.map((size) => (
                <div key={size}>
                    <h2 className="font-bold mb-2 text-muted-foreground">Taille : {size}</h2>
                    <div className="flex gap-4 flex-wrap items-center">
                        {levels.map((l) => (
                            <div
                                key={`${l.level}-${size}`}
                                className="px-3 py-1 bg-white/50 rounded  flex items-center gap-1"
                            >
                                <span className="text-sm text-muted-foreground font-semibold">Niv.</span>
                                <OutlineText text={String(l.level)} color={l.color} size={size} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
