import { UserEvent } from '@/types/user.types'
import React from 'react'
import { UserPublic } from '@/types/user.types'
import GameCompleted from './events/GameCompleted'
import LevelUp from './events/LevelUp'

export default function EventItem({
    user,
    event,
    isCurrentUser,
    isFirst,
    isLast,
}: { user: UserPublic, event: UserEvent, isCurrentUser: boolean, isFirst: boolean, isLast: boolean }) {

    return (

        <>
            {event.type === "level_up" && (
                <LevelUp user={user} event={event} isCurrentUser={isCurrentUser} />
            )}
            {event.type === "game_completed" && (
                <GameCompleted user={user} event={event} isCurrentUser={isCurrentUser} />
            )}

            {!isLast && (
                <div className="h-[1px] bg-muted/10"></div>
            )}
        </>
    )
}
