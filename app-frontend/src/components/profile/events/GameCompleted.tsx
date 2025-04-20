
import React from 'react';
import { UserEvent, UserPublic } from '@/types/user.types';
import Image from 'next/image';
import { getDateLabel, getDateStr } from '@/lib/formatDate';
import { PlayCircleIcon, Crown } from 'lucide-react';
import Link from 'next/link';

export default function GameCompleted({
    user,
    event,
    isCurrentUser,
    showAvatar = true
}: { user: UserPublic, event: UserEvent, isCurrentUser: boolean, showAvatar?: boolean }) {

    let label
    if (event.gameResult.game!.name === 'IndiCiné') {
        label = 'a deviné le film du';
    }

    const getPathGameOfTheDay = () => {
        // SI le jour de l'event est aujourd'hui, on renvoie le path du jeu du jour
        if (new Date(event.gameResult.date).toLocaleDateString() === new Date().toLocaleDateString()) {
            return `/jeu/${event.gameResult.game!.path}`;
        }
        // Sinon, on renvoie le path du jeu de l'event avec la date en paramètre
        return `/jeu/${event.gameResult.game!.path}/${getDateStr(new Date(event.gameResult.date))}`;
    }


    return (

        <>
            <div className={`flex gap-4 items-center justify-between flex-wrap md:flex-nowrap ${isCurrentUser ? 'current-user' : ''}`}>
                <div className="flex gap-2 items-center flex-col md:flex-row">
                    <div className="flex-shrink-0 px-2 hidden md:block">
                        {showAvatar ? (<Image
                            src={user.avatarUrl ||
                                `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`}
                            width={40}
                            height={40}
                            alt={user.pseudo}
                            className="size-10"
                        />) :
                            event.gameResult.game!.imgUrl ? (
                                <Image
                                    height={40}
                                    width={40}
                                    src={event.gameResult.game!.imgUrl}
                                    alt={event.gameResult.game!.name}
                                    className=""
                                />
                            ) : (
                                <Crown className="size-10" />
                            )
                        }
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 gap-y-0  flex-wrap">
                            <div className="flex-shrink-0 block md:hidden">
                                {showAvatar ? (<Image
                                    src={user.avatarUrl ||
                                        `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`}
                                    width={20}
                                    height={20}
                                    alt={user.pseudo}
                                    className="size-5"
                                />) :
                                    event.gameResult.game!.imgUrl ? (
                                        <Image
                                            height={20}
                                            width={20}
                                            src={event.gameResult.game!.imgUrl}
                                            alt={event.gameResult.game!.name}
                                            className=""
                                        />
                                    ) : (
                                        <Crown className="size-5" />
                                    )
                                }
                            </div>
                            <span className="font-bold">{user.pseudo}</span>
                            <span className="text-sm ">{label}</span>
                            <span className="font-bold">{new Date(event.gameResult.date).toLocaleDateString()}</span>
                            <span className="text-sm ">sur</span>
                            <Link href={`/jeu/${event.gameResult.game!.path}`} className="font-bold hover:underline">
                                {event.gameResult.game!.name}
                            </Link>
                            <span className="text-sm ">en</span>
                            <span className="font-bold">{event.attempts}</span>
                            <span className="text-sm ">essais !</span>
                            <div className="text-sm font-bold">(+{event.gameResult.score} pts et {event.gameResult.xpGained} xp)</div>
                        </div>

                        <div className="text-sm text-gray-400">{getDateLabel(event.createdAt)}</div>
                    </div>
                </div>

                <Link href={`${getPathGameOfTheDay()
                    }`} className="font-bold hover:underline px-4  hidden md:block">
                    <PlayCircleIcon className="size-8" />
                </Link>
            </div >
        </>
    )
}
