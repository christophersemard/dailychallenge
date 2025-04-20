
import React from 'react';
import { UserEvent, UserPublic } from '@/types/user.types';
import Image from 'next/image';
import { getDateLabel } from '@/lib/formatDate';
import { ArrowBigUp, ArrowBigUpDash, Star } from 'lucide-react';

export default function LevelUp({
    user,
    event,
    isCurrentUser,
    showAvatar = true
}: { user: UserPublic, event: UserEvent, isCurrentUser: boolean, showAvatar?: boolean }) {

    return (

        <>
            <div className={`flex gap-2  flex-wrap ${isCurrentUser ? 'current-user' : ''}`}>
                <div className="flex-shrink-0 px-2 hidden md:block">
                    {showAvatar ? (<Image
                        src={user.avatarUrl ||
                            `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`}
                        width={40}
                        height={40}
                        alt={user.pseudo}
                        className="w-10 h-10"
                    />) : <ArrowBigUpDash className="w-10 h-10 text-primary" />
                    }
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 gap-y-0">

                        <div className="flex-shrink-0 block md:hidden">
                            {showAvatar ? (<Image
                                src={user.avatarUrl ||
                                    `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`}
                                width={20}
                                height={20}
                                alt={user.pseudo}
                                className="size-5"
                            />) : <ArrowBigUpDash className="size-5 text-primary" />
                            }
                        </div>

                        <span className="font-bold">{user.pseudo}</span>
                        <span className="text-sm ">a atteint le niveau</span>
                        <span className="font-bold">{event.levelUp}</span> !
                    </div>
                    <div className="text-sm text-gray-400">{getDateLabel(event.createdAt)}</div>
                </div>
            </div>
        </>
    )
}
