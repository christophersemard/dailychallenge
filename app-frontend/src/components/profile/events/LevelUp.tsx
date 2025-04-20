
import React from 'react';
import { UserEvent, UserPublic } from '@/types/user.types';
import Image from 'next/image';
import { getDateLabel } from '@/lib/formatDate';

export default function EventItem({
    user,
    event,
    isCurrentUser
}: { user: UserPublic, event: UserEvent, isCurrentUser: boolean }) {

    return (

        <>
            <div className={`flex gap-4 flex-nowrap${isCurrentUser ? 'current-user' : ''}`}>
                <div className="flex-shrink-0">
                    <Image
                        src={user.avatarUrl ||
                            `/assets/avatar/avatar-default-${Math.floor(Math.random() * 7 + 1)}.png`}
                        width={40}
                        height={40}
                        alt={user.pseudo}
                        className="w-10 h-10"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
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
