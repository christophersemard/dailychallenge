// components/game/games/GameCinema1.tsx
"use client"

import { useEffect, useState, useMemo } from "react"
import { formatDateLong } from "@/lib/formatDate"
import Card from "@/components/ui/card"
import GamePlay from "@/components/game/GamePlay"
import GameResultArtist from "@/components/game/GameResultArtist"
import { Color } from "@/types/colors.types"
import { toast } from "sonner"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"
import { isErrorApi } from "@/lib/typeguards"
import { ArtistData, GameResult, MovieData, Try } from "@/types/game.types"
import GameTries from "../GameTries"
import clsx from "clsx"
import { useGameEventStore } from "@/lib/store/useGameEventStore"
import { Button } from "@/components/ui/button"
import Link from "next/link"



type Props = {
    gameId: string
    color: Color
    date: Date
}

type Hints = {
    type: string | null
    country: string | null
    membersOrGenre: string | null
    firstAlbum: string | null
    genres: string | null
    fans: string | null
    albumsCount: string | null
    song1: string | null
    song2and3: string | null
}



type ApiResponse = {
    guessed: boolean
    date: string
    hints: Hints
    lastHintUnlocked: keyof Hints | null
    attempts: number
    maxAttempts: number
    data: ArtistData | null
    gameResult: GameResult | null
    tries: Try[]
}

export default function GameMusic1({ gameId, color, date }: Props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<false | "vip_required" | "other">(false);
    const [data, setData] = useState<ApiResponse | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const notifyGameCompleted = useGameEventStore.getState().notifyGameCompleted


    const dateStr = date.toISOString().split("T")[0]
    const titleCard = `Artistrouve - ${formatDateLong(date)}`


    const fetchGame = async (showLoading = true) => {
        if (showLoading) setLoading(true)
        try {
            const url =
                dateStr === new Date().toISOString().split("T")[0]
                    ? "/api/game-music-1/today"
                    : `/api/game-music-1/by-date/${dateStr}`

            const { data, error } = await fetchClientWithAuth<ApiResponse>(url)

            if (error) {
                if (error.statusCode === 404) {
                    setError("other");
                } else if (
                    error.statusCode === 400 &&
                    error.message?.includes("VIP")
                ) {
                    setError("vip_required");
                } else {
                    setError("other");
                }

            } else {
                setData(data)

                // Si le joueur a terminé le jeu, on notifie l'événement
                if (data.gameResult) {
                    notifyGameCompleted()
                }
            }
        } catch (err) {
            console.error("Erreur réseau :", err)
            setError("other")
        } finally {
            if (showLoading) setLoading(false)
        }
    }


    useEffect(() => {
        fetchGame()
    }, [dateStr])



    const handleGuess = async (guess: string | number) => {
        setSubmitting(true)
        try {
            const res = await fetchClientWithAuth<unknown>("/api/game-music-1/guess", {
                method: "POST",
                body: JSON.stringify({
                    guess,
                    date: dateStr, // Ajout de la date ici
                }),
            })

            // console.log("res", res)

            if (isErrorApi(res)) {
                toast.error(res.message)
            } else {
                await fetchGame(false) // pas de flash visuel global
            }
        } catch {
            toast.error("Erreur réseau.")
        } finally {
            setSubmitting(false)
        }
    }

    const handleSkip = async () => {
        setSubmitting(true)
        try {
            const res = await fetchClientWithAuth<unknown>("/api/game-music-1/guess", {
                method: "POST",
                body: JSON.stringify({
                    guess: null,
                    date: dateStr, // Ajout de la date ici
                }),
            })

            if (isErrorApi(res)) {
                toast.error(res.message)
            } else {
                await fetchGame(false)
            }
        } catch {
            toast.error("Erreur réseau.")
        } finally {
            setSubmitting(false)
        }
    }


    if (loading) {
        return (
            <Card title={titleCard} color={color} className="flex justify-center items-center min-h-64 font-bold text-xl">
                <p className="text-center">Chargement...</p>
            </Card>
        )
    }


    if (error === "vip_required") {
        return (
            <Card title={titleCard} color={color} className="flex flex-col items-center justify-center min-h-64 text-center space-y-4">
                <p className="text-lg font-bold">Ce défi est réservé aux membres VIP.</p>
                <p>Abonne-toi pour accéder aux jeux des jours précédents, gagner un indice bonus et bien plus encore.</p>

                <Button variant="secondary" size={"lg"} asChild>
                    <Link href="/vip">Devenir VIP</Link>
                </Button>
            </Card>
        );
    }

    if (error || !data) {
        return (
            <Card title={titleCard} color={color} className="flex justify-center items-center min-h-64 font-bold text-xl">
                <p className="text-center">Aucun jeu disponible pour cette date.</p>
            </Card>
        );
    }

    if (data.guessed && data.data && data.gameResult) {
        return (<>

            <GameResultArtist
                titleCard={titleCard}
                gameId={gameId}
                color={color}
                artist={data.data}
                result={data.gameResult}
            />

            <GameTries tries={data.tries} />
        </>
        )
    }



    const INDICE_LABELS: Record<keyof Hints, string> = {
        type: "Type",
        country: "Pays",
        membersOrGenre: "Genre / Membres",
        firstAlbum: "1er album",
        genres: "Genres principaux",
        fans: "Fans Deezer",
        albumsCount: "Albums studio",
        song1: "Musique connue",
        song2and3: "Autres titres",
    }



    return (
        <>
            <Card title={titleCard} color={color}>
                <h2 className="text-lg font-bold text-center mb-0 ">Devine l'artiste ou le groupe du jour grâce aux indices et gagne des points ! </h2>

                <ul className="text-md mt-8 flex justify-start flex-wrap space-x-16 space-y-4">
                    {(
                        [
                            "type",
                            "country",
                            "membersOrGenre",
                            "firstAlbum",
                            "genres",
                            "fans",
                            "albumsCount",
                            "song1",
                            "song2and3",
                        ] as (keyof Hints)[]
                    ).map((key) => {
                        const value = data.hints[key]
                        const isLast = key === data.lastHintUnlocked

                        let content: React.ReactNode = null

                        if (key === "country" && value) {
                            const countryCode = value.slice(0, 2).toLowerCase() // adapt if needed
                            content = (
                                <>
                                    <strong>{INDICE_LABELS[key]} :</strong>   <img
                                        src={`https://flagcdn.com/h20/${countryCode}.png`}
                                        alt={value}
                                        className="inline-block mx-1"
                                    />
                                </>
                            )
                        } else if (key === "membersOrGenre") {
                            content =
                                data.hints.type === "Group" ? (
                                    <>
                                        <strong>Membres :</strong> {value ?? "???"}
                                    </>
                                ) : (
                                    <>
                                        <strong>Genre :</strong> {value ?? "???"}
                                    </>
                                )
                        }
                        else {
                            content = (
                                <>
                                    <strong>{INDICE_LABELS[key]} :</strong> {value ?? "???"}
                                </>
                            )
                        }

                        return (
                            <li key={key} className={isLast ? `text-${color} font-semibold` : ""}>
                                {content}
                            </li>
                        )
                    })}
                </ul>



                <GamePlay
                    color={color}
                    onSubmit={handleGuess}
                    onSkip={handleSkip}
                    loading={submitting}
                    triesLeft={data.maxAttempts - data.attempts}
                    maxTries={data.maxAttempts}
                    searchUrl={`/api/game-music-1/search?query=`}
                />
            </Card>

            <GameTries tries={data.tries} />
        </>
    )
}
