"use client"

import { LeaderboardEntry } from "@/types/game.types"
import Link from "next/link"
import Image from "next/image"
import OutlineText from "../ui/outline-text"
import clsx from "clsx"
import { useEffect } from "react"
import { Streak } from "../ui/streak"

type Props = {
    entries: LeaderboardEntry[]
    offset: number
    loading: boolean
    userId: string | undefined
    userEntry: LeaderboardEntry | null
}

export default function LeaderboardUserList({
    entries,
    offset,
    loading,
    userId,
    userEntry,
}: Props) {
    console.log("LeaderboardUserList rendered", {
        entries,
        offset,
        loading,
        userId,
        userEntry,
    })
    const isUserInList = entries.some((e) => String(e.user.id) === String(userId))

    const getRankClass = (index: number | null) => {
        if (offset !== 0) return ""
        if (index === 0) return "text-red-500 font-bold"
        if (index === 1) return "text-orange-500 font-bold"
        if (index === 2) return "text-yellow-500 font-bold"
        return ""
    }

    useEffect(() => {
        console.log("LeaderboardUserList mounted")
    }, [entries, loading])

    const renderRow = (
        entry: LeaderboardEntry,
        rank: number | null,
        highlight = false
    ) => (
        <li
            key={entry.user.id}
            className={clsx(
                "grid grid-cols-[40px_1fr_80px_60px_60px_100px] items-center px-2 py-2 rounded",
                {
                    "bg-background font-semibold": highlight,
                }
            )}
        >
            <div
                className={clsx("text-center font-black text-2xl me-3", getRankClass(rank && rank - 1))}
            >
                {rank}
            </div>

            <Link
                href={`/profil/${entry.user.id}`}
                className="flex items-center gap-2 truncate"
            >
                <Image
                    src={
                        entry.user.avatar ||
                        `/assets/default-avatar.webp`
                    }
                    alt={entry.user.pseudo}
                    width={50}
                    height={50}
                    className="size-10"
                />
                <span className="ps-2 truncate font-bold text-base">{entry.user.pseudo}</span>
            </Link>


            <div className=" text-muted-foreground flex justify-center px-2">
                <OutlineText text={`${entry.user.level ?? "-"}`} color="black" size="md" className="" />
            </div>
            <div className=" text-muted-foreground text-center flex items-end gap-1 px-2 ">
                <Streak streak={entry.user.streak} />
            </div>
            <div className=" text-muted-foreground text-center px-2">
                <OutlineText text={`${entry.user.gamesPlayed ?? "-"}`} color="black" size="md" />
            </div>
            <div className="flex justify-end px-2 items-center">
                <OutlineText text={`${entry.score}`} color="black" size="md" />
                <span className="text-muted-foreground text-xs">pts</span>
            </div>
        </li>
    )

    return (
        <ul className="space-y-1 text-sm mt-4">
            {/* En-têtes */}
            <li className="grid grid-cols-[40px_1fr_80px_60px_60px_100px] font-bold text-xs text-muted-foreground uppercase mb-4 px-2">
                <div>#</div>
                <div>Joueur</div>
                <div className="text-center">Niv.</div>
                <div className="text-center">Streak</div>
                <div className="text-center">Parties</div>
                <div className="text-right pr-2">Score</div>
            </li>

            {/* Chargement (Skeleton) */}
            {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="h-12 bg-background animate-pulse rounded" />
                ))}

            {/* Liste normale */}
            {!loading &&
                entries.map((entry, index) =>
                    renderRow(entry, offset + index + 1, String(entry.user.id) === String(userId))
                )}

            {/* Afficher le user s’il est pas dedans */}
            {!loading && userEntry && !isUserInList &&
                <>
                    <li className="w-full h-[1px] bg-black/10 my-2" />
                    {renderRow(userEntry, null, true)}
                </>
            }
        </ul>
    )
}
