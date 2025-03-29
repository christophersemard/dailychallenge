"use client"

import { useState } from "react"
import OutlineText from "@/components/ui/outline-text"
import { Color } from "@/types/colors.types"

type Props = {
    gameId: string
    userId: string
    color: Color
}

export default function GameLeaderboard({ gameId, userId, color }: Props) {
    const [tab, setTab] = useState<"amis" | "global">("amis")
    const [period, setPeriod] = useState<"week" | "month" | "year">("week")

    // TODO: fetch real data
    const fakeData = [
        { pseudo: "Robert76140", level: 52, score: 46 },
        { pseudo: "Michel", level: 18, score: 32 },
        { pseudo: "Cathy", level: 33, score: 22 },
    ]

    return (
        <div className="bg-white border rounded shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm text-muted-foreground">Classement</h3>
                <button className="text-xs text-primary hover:underline">Voir tout</button>
            </div>

            <div className="flex justify-between mb-3">
                <div className="flex gap-1 text-xs">
                    <button onClick={() => setTab("amis")} className={tab === "amis" ? "font-bold underline" : ""}>Amis</button>
                    <button onClick={() => setTab("global")} className={tab === "global" ? "font-bold underline" : ""}>Global</button>
                </div>
                <div className="flex gap-1 text-xs text-muted-foreground">
                    <button onClick={() => setPeriod("week")} className={period === "week" ? "font-semibold" : ""}>S</button>
                    <button onClick={() => setPeriod("month")} className={period === "month" ? "font-semibold" : ""}>M</button>
                    <button onClick={() => setPeriod("year")} className={period === "year" ? "font-semibold" : ""}>A</button>
                </div>
            </div>

            <ul className="space-y-1 text-sm">
                {fakeData.map((user, index) => (
                    <li key={user.pseudo} className="flex justify-between items-center">
                        <div>
                            <span className="font-medium">{index + 1}. {user.pseudo}</span>
                            <span className="text-xs text-muted-foreground ml-1">Niv. {user.level}</span>
                        </div>
                        <OutlineText text={`${user.score}`} color="primary" size="sm" />
                    </li>
                ))}
            </ul>
        </div>
    )
}
