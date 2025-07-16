// components/game/games/GameCinema1.tsx
"use client"

import { useEffect, useState, useMemo } from "react"
import { formatDateLong } from "@/lib/formatDate"
import Card from "@/components/ui/card"
import GamePlay from "@/components/game/GamePlay"
import GameResultMovie from "@/components/game/GameResultMovie"
import { Color } from "@/types/colors.types"
import { toast } from "sonner"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"
import { isErrorApi } from "@/lib/typeguards"
import { GameResult, MovieData, Try } from "@/types/game.types"
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
    genres: string | null
    runtime: string | null
    releaseDate: string | null
    director: string | null
    actors: string | null
    keywords: string | null
    firstAndLastLetters: string | null
}


type ApiResponse = {
    guessed: boolean
    date: string
    hints: Hints
    lastHintUnlocked: keyof Hints | null
    maskedTitle: string
    attempts: number
    maxAttempts: number
    data: MovieData | null
    gameResult: GameResult | null
    tries: Try[]
}

export default function GameCinema1({ gameId, color, date }: Props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<false | "vip_required" | "other">(false);
    const [data, setData] = useState<ApiResponse | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const notifyGameCompleted = useGameEventStore.getState().notifyGameCompleted


    const dateStr = date.toISOString().split("T")[0]
    const titleCard = `IndiCiné- ${formatDateLong(date)}`

    const enhancedMaskedTitle = useMemo(() => {
        if (!data || !data.maskedTitle) return "";

        const base = data.maskedTitle.split("");
        const hint = data.hints.firstAndLastLetters;

        if (!hint || hint.length !== 2) return data.maskedTitle;

        const [firstLetter, lastLetter] = hint;
        const chars = [...base];

        if (firstLetter) chars[0] = firstLetter;
        if (lastLetter) chars[chars.length - 1] = lastLetter;

        return chars.join("");
    }, [data]);




    const fetchGame = async (showLoading = true) => {
        if (showLoading) setLoading(true)
        try {
            const url =
                dateStr === new Date().toISOString().split("T")[0]
                    ? "/api/game-cinema-1/today"
                    : `/api/game-cinema-1/by-date/${dateStr}`

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



    const handleGuess = async (guess: number | string | null) => {
        setSubmitting(true)
        try {
            const res = await fetchClientWithAuth<unknown>("/api/game-cinema-1/guess", {
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
            const res = await fetchClientWithAuth<unknown>("/api/game-cinema-1/guess", {
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

            <GameResultMovie
                titleCard={titleCard}
                gameId={gameId}
                color={color}
                movie={data.data}
                result={data.gameResult}
            />

            <GameTries tries={data.tries} />
        </>
        )
    }



    const INDICE_LABELS: Record<keyof Hints, string> = {
        genres: "Genres",
        runtime: "Durée",
        releaseDate: "Date de sortie",
        director: "Réalisateur",
        actors: "Acteurs principaux",
        keywords: "Synopsis",
        firstAndLastLetters: "Première et dernière lettre",
    }


    return (
        <>
            <Card title={titleCard} color={color}>
                <h2 className="text-lg font-bold text-center mb-0 ">Devine le film du jour grâce aux indices et gagne des points ! </h2>

                <div className="flex justify-center items-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-white text-center my-8">
                        {enhancedMaskedTitle.split("").map((char, index) => {
                            if (char === " ") {
                                return (
                                    <span key={index} className="inline-block mx-[2px] min-w-[1ch]">
                                        &nbsp;
                                    </span>
                                )
                            }

                            const isRevealed = char !== "*"

                            return (
                                <span
                                    key={index}
                                    className={clsx(
                                        "inline-block mx-[2px] min-w-[1ch] text-center",
                                        isRevealed ? `text-${color} relative top-[16px]` : `border-b-4 pb-1 border-${color}`
                                    )}
                                >
                                    {char}
                                </span>
                            )
                        })}
                    </h2>
                </div>



                <ul className=" text-md mt-2 flex justify-start flex-wrap space-x-16 space-y-4">
                    {Object.entries(data.hints)
                        .filter(([key]) => key !== "firstAndLastLetters")
                        .map(([key, value]) => {
                            const isLast = key === data.lastHintUnlocked
                            return (
                                <li
                                    key={key}
                                    className={isLast ? `text-${color} font-semibold` : ""}
                                >
                                    <strong>{INDICE_LABELS[key as keyof Hints]} :</strong>{" "}
                                    {value ?? "???"}
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
                    searchUrl={`/api/game-cinema-1/search?query=`}
                />
            </Card>

            <GameTries tries={data.tries} />
        </>
    )
}
