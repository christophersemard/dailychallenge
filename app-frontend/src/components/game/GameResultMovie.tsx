"use client"

import Card from "@/components/ui/card"
import OutlineText from "@/components/ui/outline-text"
import { Color } from "@/types/colors.types"
import { formatDateLong } from "@/lib/formatDate"
import { GameResult, MovieData } from "@/types/game.types"
import Image from "next/image"

type Props = {
    gameId: string
    color: Color
    movie: MovieData
    result: GameResult
    titleCard: string
}

export default function GameResultMovie({ gameId, color, movie, result, titleCard }: Props) {
    const isSuccess = result.status === "passed"

    const posterUrl = movie.posterPath
    const posterPath = `https://image.tmdb.org/t/p/w500${posterUrl}`

    const colorScore = result.score >= 60 ? "success" : result.score >= 30 ? "warning" : "danger"
    const colorXP = result.xpGained >= 80 ? "success" : result.xpGained >= 30 ? "warning" : "danger"

    // Convertir la durée en minutes en heures et minutes
    const hours = Math.floor(movie.runtime / 60)
    const minutes = movie.runtime % 60
    const formattedRuntime = `${hours}h${minutes}`


    return (

        <Card title={titleCard} color={color}>
            <h2 className="text-lg font-bold text-center mb-2 ">
                {isSuccess ? "Bravo tu as trouvé le film du jour !" : "Dommage, tu épuisé tous tes essais !"}
            </h2>

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center  gap-4 items-center">
                <div className="text-center">
                    <span className="text-muted-foreground block text-xs text-center">Score obtenu</span>
                    <OutlineText text={`${result.score} pts`} color={colorScore} size="lg" className="h-14 " />
                </div>
                <div className="text-center">
                    <span className="text-muted-foreground block text-xs text-center">Expérience gagnée</span>
                    <OutlineText text={`${result.xpGained} XP`} color={colorXP} size="lg" className="h-14 flex justify-center" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-6  lg:max-w-3/4 mx-auto">
                {/* Poster */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                    <Image
                        width={150}
                        height={200}
                        src={posterPath}
                        alt={`Affiche de ${movie.title}`}
                        className="shadow object-cover"
                    />
                </div>


                {/* Infos film */}
                <div className="flex flex-col justify-center text-sm flex-1 text-center md:text-left">
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-${color}`}>
                        {movie.title}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-6 md:gap-0 md:space-x-16 space-y-4 justify-center md:justify-start">
                        {movie.releaseDate && (
                            <div >
                                <span className="text-muted-foreground block text-sm font-semibold">Date de sortie</span>
                                {formatDateLong(new Date(movie.releaseDate))}
                            </div>
                        )}

                        {movie.runtime && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Durée</span>
                                {formattedRuntime}
                            </div>
                        )}

                        {movie.genres && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Genres</span>
                                {movie.genres}
                            </div>
                        )}

                        {movie.director && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Réalisateur</span>
                                {movie.director}
                            </div>
                        )}

                        {movie.actors && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Acteurs principaux</span>
                                {movie.actors}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </Card>
    )
}
