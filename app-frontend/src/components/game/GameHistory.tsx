"use client"

import { useEffect, useState } from "react"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"
import { UserMonthlyGameResult } from "@/types/game.types"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/card"
import { Color } from "@/types/colors.types"
import { IconButton } from "@/components/ui/icon-button"
import Link from "next/link"

type Props = {
    gameId: string
    userId: string
    date: Date
    color: Color
}

export default function GameHistory({ gameId, userId, date, color }: Props) {
    const [results, setResults] = useState<UserMonthlyGameResult[] | null>(null)
    const [totalPoints, setTotalPoints] = useState(0)
    const [currentDate, setCurrentDate] = useState(date)
    const router = useRouter()

    useEffect(() => {
        const fetchHistory = async () => {
            const monthStr = currentDate.toISOString().split("T")[0].slice(0, 7)
            const { data, error } = await fetchClientWithAuth<UserMonthlyGameResult[]>(
                `/api/game-cinema-1/user-results?month=${monthStr}`
            )

            if (error || !data) {
                console.error("Erreur récupération historique :", error)
                return
            }

            setResults(data)

            const total = data.reduce(
                (acc, res) => acc + (res.result?.score ?? 0),
                0
            )
            setTotalPoints(total)
        }

        fetchHistory()
    }, [currentDate])

    const getMonthName = (date: Date) =>
        date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })

    const today = new Date()
    const isFutureMonth =
        currentDate.getFullYear() > today.getFullYear() ||
        (currentDate.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() >= today.getMonth())

    const isSameMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() + offset)

        const now = new Date()
        if (
            newDate.getFullYear() > now.getFullYear() ||
            (newDate.getFullYear() === now.getFullYear() &&
                newDate.getMonth() > now.getMonth())
        ) {
            return // 🔒 empêche d'aller dans le futur
        }

        setCurrentDate(newDate)
    }

    return (
        <Card title="Historique" color={color}>
            <div className="flex items-center justify-between">
                <IconButton
                    onClick={() => changeMonth(-1)}
                    icon={<ChevronLeft className="w-5 h-5" />}
                    variant="background"
                    size="sm"
                />
                <h3 className="font-bold text-sm text-muted-foreground text-center">
                    {getMonthName(currentDate).charAt(0).toUpperCase() + String(getMonthName(currentDate)).slice(1)}
                </h3>
                <IconButton
                    onClick={() => changeMonth(1)}
                    icon={<ChevronRight className="w-5 h-5" />}
                    variant="background"
                    size="sm"
                    disabled={isFutureMonth}
                />
            </div>

            <div className="w-full h-[1px] bg-black/10 my-4" />

            <div className="grid grid-cols-7 gap-4">
                {results
                    ? results.map((res, i) => {
                        const day = i + 1
                        const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                        const dateStr = fullDate.toISOString().split("T")[0]

                        const isFutureDay =
                            fullDate > today &&
                            fullDate.getMonth() === today.getMonth() &&
                            fullDate.getFullYear() === today.getFullYear()

                        let bg = "bg-white border-background border-2 hover:bg-background"
                        let icon = null
                        let tooltip = `${day} ${getMonthName(currentDate)}`

                        if (isFutureDay) {
                            return (
                                <div
                                    key={i}
                                    className="size-8 rounded-sm bg-white border-none opacity-40 flex items-center justify-center  cursor-default"
                                    title="Jour à venir"
                                >
                                    {day}
                                </div>
                            )
                        }

                        if (res.result) {
                            tooltip += ` | ${res.result.status === "passed" ? "Réussi" : "Échoué"}`
                            tooltip += ` | ${res.result.score} pts`
                            tooltip += ` | ${res.result.xpGained} XP`
                            if (res.guess) tooltip += ` | Tentative : ${res.guess}`

                            if (res.result.status === "passed") {
                                bg = "bg-success"
                                icon = <Check className="text-white size-6" />
                            } else {
                                bg = "bg-danger"
                                icon = <X className="text-white size-6" />
                            }
                        }

                        const content = icon || (
                            <span className="text-sm text-black font-bold  border-none ">{day}</span>
                        )

                        return res.gameDay ? (
                            <Link
                                href={`/jeu/${gameId}/${dateStr}`}
                                key={i}
                                className={`size-8 rounded-sm ${bg} flex items-center justify-center text-xs cursor-pointer hover:opacity-80`}
                                title={tooltip}
                            >
                                {content}
                            </Link>
                        ) : (
                            <div
                                key={i}
                                className={`size-8 rounded-sm ${bg} flex items-center cursor-pointer justify-center text-xs text-black hover:bg-white border-none font-bold opacity-50`}
                                title={tooltip + " | Pas de jeu ce jour-là"}
                            >
                                {day}
                            </div>
                        )
                    })
                    : Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="size-8 rounded bg-background animate-pulse" />
                    ))}
            </div>

            <div className="w-full h-[1px] bg-black/10 my-4" />

            <div className="text-xs text-muted-foreground text-center">
                {totalPoints} points cumulés ce mois-ci
            </div>
        </Card>
    )
}
