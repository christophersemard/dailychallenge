"use client";

import { useEffect, useState, useMemo } from "react";
import { formatDateLong } from "@/lib/formatDate";
import Card from "@/components/ui/card";
import GamePlay from "@/components/game/GamePlay";
import GameResultMovie from "@/components/game/GameResultMovie";
import { Color } from "@/types/colors.types";
import { toast } from "sonner";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { isErrorApi } from "@/lib/typeguards";
import { GameResult, MovieData, Try } from "@/types/game.types";
import GameTries from "../GameTries";
import clsx from "clsx";
import { useGameEventStore } from "@/lib/store/useGameEventStore";
import Image from "next/image";

type Props = {
    gameId: string;
    color: Color;
    date: Date;
};

type Hints = {
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    image5: string | null;
    image6: string | null;
    image7: string | null;
    image8: string | null;
    image9: string | null;
    image10: string | null;
    firstAndLastLetters: string | null;
};

type ApiResponse = {
    guessed: boolean;
    date: string;
    hints: Hints;
    lastHintUnlocked: keyof Hints | null;
    maskedTitle: string;
    attempts: number;
    maxAttempts: number;
    data: MovieData | null;
    gameResult: GameResult | null;
    tries: Try[];
};

export default function GameCinema2({ gameId, color, date }: Props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const notifyGameCompleted =
        useGameEventStore.getState().notifyGameCompleted;

    const dateStr = date.toISOString().split("T")[0];
    const titleCard = `Photos - ${formatDateLong(date)}`;

    const enhancedMaskedTitle = useMemo(() => {
        if (!data || !data.maskedTitle || data.attempts < 10) return "";
        const base = data.maskedTitle.split("");
        const hint = data.hints.firstAndLastLetters;
        if (!hint || hint.length !== 2) return data.maskedTitle;

        const [firstLetter, lastLetter] = hint;
        const chars = [...base];
        if (firstLetter) chars[0] = firstLetter;
        if (lastLetter) chars[chars.length - 1] = lastLetter;

        return chars.join("");
    }, [data]);

    const unlockedImages = useMemo(() => {
        if (!data?.hints) return [];
        return Object.entries(data.hints)
            .filter(([key, val]) => key.startsWith("image") && val)
            .map(([_, val]) => val!) as string[];
    }, [data]);

    useEffect(() => {
        fetchGame();
    }, [dateStr]);

    const fetchGame = async (showLoading = true) => {
        if (showLoading) setLoading(true);
        try {
            const url =
                dateStr === new Date().toISOString().split("T")[0]
                    ? "/api/game-cinema-2/today"
                    : `/api/game-cinema-2/by-date/${dateStr}`;

            const { data, error } = await fetchClientWithAuth<ApiResponse>(url);

            if (error) {
                setError(true);
                toast.error(
                    error.message || "Erreur lors de la récupération du jeu"
                );
            } else {
                const previousAttempts = data?.attempts ?? 0;
                setData(data);

                if (data.lastHintUnlocked?.startsWith("image")) {
                    const unlockedIndex =
                        parseInt(data.lastHintUnlocked.replace("image", "")) -
                        1;
                    if (!isNaN(unlockedIndex)) {
                        setCurrentImageIndex(unlockedIndex);
                    }
                }

                if (data.gameResult) notifyGameCompleted();
            }
        } catch {
            setError(true);
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleGuess = async (guess: number | null) => {
        setSubmitting(true);
        try {
            const res = await fetchClientWithAuth("/api/game-cinema-2/guess", {
                method: "POST",
                body: JSON.stringify({ guess, date: dateStr }),
            });

            if (isErrorApi(res)) toast.error(res.message);
            else await fetchGame(false);
        } catch {
            toast.error("Erreur réseau.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Card
                title={titleCard}
                color={color}
                className="min-h-64 flex justify-center items-center"
            >
                <p>Chargement...</p>
            </Card>
        );
    }

    if (error || !data) {
        return (
            <Card
                title={titleCard}
                color={color}
                className="min-h-64 flex justify-center items-center"
            >
                <p>Erreur ou jeu non disponible.</p>
            </Card>
        );
    }

    if (data.guessed && data.data && data.gameResult) {
        return (
            <>
                <GameResultMovie
                    titleCard={titleCard}
                    gameId={gameId}
                    color={color}
                    movie={data.data}
                    result={data.gameResult}
                />
                <GameTries tries={data.tries} />
            </>
        );
    }

    return (
        <>
            <Card title={titleCard} color={color}>
                <div className="text-center mb-4">
                    <p className="font-bold text-lg">
                        Devine le film du jour grâce aux images !
                    </p>
                </div>

                {unlockedImages.length > 0 && (
                    <div className="flex flex-col items-center mb-4 p-4">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${unlockedImages[currentImageIndex]}`}
                            alt={`Indice ${currentImageIndex + 1}`}
                            width={500}
                            height={400}
                            onClick={() =>
                                setFullscreenImage(
                                    unlockedImages[currentImageIndex]
                                )
                            }
                            className="rounded-lg cursor-zoom-in mb-4"
                        />

                        <div className="flex gap-1 mt-4 flex-wrap justify-center">
                            {unlockedImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImageIndex(i)}
                                    className={clsx(
                                        "px-2 py-1  rounded font-medium border hover:bg-background cursor-pointer size-8",
                                        {
                                            "bg-red text-white font-black! border-none hover:bg-red":
                                                i === currentImageIndex,
                                            "text-muted-foreground border-background":
                                                i !== currentImageIndex,
                                        }
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {data.attempts >= 10 && (
                    <div className="flex justify-center items-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-white text-center my-4">
                            {enhancedMaskedTitle
                                .split("")
                                .map((char, index) => {
                                    if (char === " ") {
                                        return (
                                            <span
                                                key={index}
                                                className="inline-block mx-[2px] min-w-[1ch]"
                                            >
                                                &nbsp;
                                            </span>
                                        );
                                    }
                                    return (
                                        <span
                                            key={index}
                                            className="inline-block mx-[2px] min-w-[1ch] text-center text-white border-b-2 border-white"
                                        >
                                            {char}
                                        </span>
                                    );
                                })}
                        </h2>
                    </div>
                )}

                <GamePlay
                    color={color}
                    onSubmit={handleGuess}
                    onSkip={() => handleGuess(null)}
                    loading={submitting}
                    triesLeft={data.maxAttempts - data.attempts}
                    maxTries={data.maxAttempts}
                    searchUrl="/api/game-cinema-1/search?query="
                />
            </Card>

            <GameTries tries={data.tries} />

            {fullscreenImage && (
                <div
                    onClick={() => setFullscreenImage(null)}
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center cursor-zoom-out"
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/original${fullscreenImage}`}
                        alt="Aperçu plein écran"
                        width={1000}
                        height={700}
                        className="max-w-full max-h-full rounded"
                    />
                </div>
            )}
        </>
    );
}
