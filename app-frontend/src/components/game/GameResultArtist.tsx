"use client"

import Card from "@/components/ui/card"
import OutlineText from "@/components/ui/outline-text"
import { Color } from "@/types/colors.types"
import { GameResult, ArtistData } from "@/types/game.types"
import Image from "next/image"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"

type Props = {
    gameId: string
    color: Color
    artist: ArtistData
    result: GameResult
    titleCard: string
}

export default function GameResultArtist({
    gameId,
    color,
    artist,
    result,
    titleCard,
}: Props) {
    const isSuccess = result.status === "passed"

    const colorScore = result.score >= 60 ? "success" : result.score >= 30 ? "warning" : "danger"
    const colorXP = result.xpGained >= 80 ? "success" : result.xpGained >= 30 ? "warning" : "danger"

    const countryCode = artist.country?.toLowerCase()


    return (
        <Card title={titleCard} color={color}>
            <h2 className="text-lg font-bold text-center mb-2">
                {isSuccess ? "Bravo tu as trouvé l’artiste du jour !" : "Dommage, tu as épuisé tous tes essais !"}
            </h2>

            {result.score === 0 && result.status === "passed" && (
                <div className="text-center text-sm text-muted-foreground mb-2 md:px-16">
                    Mais tu n&apos;as pas gagné de points car tu n&apos;as pas joué le même jour que le jeu.
                    <br />On te donne quand même un peu d&apos;XP pour te consoler !
                </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center gap-4 md:gap-8 items-center">
                <div className="text-center">
                    <span className="text-muted-foreground block text-sm">Score obtenu</span>
                    <OutlineText text={`${result.score} pts`} color={colorScore} size="lg" className="h-14" />
                </div>
                <div className="text-center">
                    <span className="text-muted-foreground block text-sm">Expérience gagnée</span>
                    <OutlineText text={`${result.xpGained} XP`} color={colorXP} size="lg" className="h-14 flex justify-center" />
                </div>
            </div>

            <div className="w-full h-[1px] bg-black/10 my-4" />

            <h2 className="text-lg font-bold text-center mb-2">
                {isSuccess ? "Voici l’artiste à deviner pour ce jour" : "Voici l’artiste que tu aurais dû trouver"}
            </h2>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-6 lg:max-w-5/6 mx-auto">
                {/* Image artiste */}
                {artist.imageUrl && (
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <Image
                            width={150}
                            height={150}
                            src={artist.imageUrl}
                            alt={`Portrait de ${artist.name}`}
                            className="object-cover border-2 border-background rounded"
                        />
                    </div>
                )}

                {/* Infos */}
                <div className="flex flex-col justify-center text-sm flex-1 text-center md:text-left">
                    <div className={`text-xl md:text-2xl font-bold`}>{artist.name}</div>

                    <div className="mt-4 flex flex-wrap gap-x-6 md:gap-0 md:space-x-14 space-y-4 justify-center md:justify-start">
                        <div>
                            <span className="text-muted-foreground block text-sm font-semibold">Type</span>
                            {artist.type === "Group" ? "Groupe" : "Artiste solo"}
                        </div>

                        {artist.gender && artist.type === "Person" && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Genre</span>
                                {artist.gender}
                            </div>
                        )}

                        {artist.country && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Pays</span>
                                <img
                                    src={`https://flagcdn.com/h20/${countryCode}.png`}
                                    alt={artist.country}
                                    className="inline-block "
                                />
                            </div>
                        )}

                        {artist.startDate && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">
                                    {artist.isDead ? "Né en" : artist.type == "Group" ? "Créé il y a" : "Âge"}
                                </span>
                                {artist.isDead
                                    ? format(new Date(artist.startDate), "yyyy", { locale: fr })
                                    : `${new Date().getFullYear() - new Date(artist.startDate).getFullYear()} ans`}
                            </div>
                        )}


                        {artist.firstAlbumDate && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">1er album</span>
                                {format(new Date(artist.firstAlbumDate), "yyyy", { locale: fr })}
                            </div>
                        )}

                        {artist.mainGenres.length > 0 && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Genres principaux</span>
                                {artist.mainGenres.join(" / ")}
                            </div>
                        )}

                        {artist.deezerFans && (
                            <div>
                                <span className="text-muted-foreground block text-sm font-semibold">Fans Deezer</span>
                                {artist.deezerFans.toLocaleString()} fans
                            </div>
                        )}
                    </div>

                    {artist.members.length > 0 && artist.type === "Group" && (
                        <div className="mt-4">
                            <span className="text-muted-foreground block text-sm font-semibold">Membres</span>
                            {artist.members.map((member, i) => (
                                <span key={i} className="inline-block mr-1">
                                    {member}
                                    {i < artist.members.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </div>
                    )}


                    {artist.songs.length > 0 && (
                        <div className="mt-4">
                            <span className="text-muted-foreground block text-sm font-semibold">Musiques populaires</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {artist.songs.map((song, i) => (

                                    song.title
                                )).join(" / ")}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
