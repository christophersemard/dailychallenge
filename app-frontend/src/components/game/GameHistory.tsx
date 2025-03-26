"use client"

type Props = {
    gameId: string
    userId: string
}

export default function GameHistory({ gameId, userId }: Props) {
    // TODO: fetch real history
    const totalPoints = 169

    return (
        <div className="bg-white border rounded shadow-sm p-4 space-y-3">
            <h3 className="font-bold text-sm text-muted-foreground">Historique</h3>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-6 h-6 rounded-sm ${i % 3 === 0
                                ? "bg-primary"
                                : i % 5 === 0
                                    ? "bg-danger"
                                    : "bg-muted"
                            }`}
                    />
                ))}
            </div>
            <div className="text-xs text-muted-foreground text-center">
                {totalPoints} points cumulés ce mois-ci
            </div>
        </div>
    )
}
