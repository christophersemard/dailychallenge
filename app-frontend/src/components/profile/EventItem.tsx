import { UserEvent } from "@/types/user.types";
import React from "react";
import { UserPublic } from "@/types/user.types";
import GameCompleted from "./events/GameCompleted";
import LevelUp from "./events/LevelUp";
import GameFailed from "./events/GameFailed";

export default function EventItem({
    user,
    event,
    showAvatar = true,
    isCurrentUser,
    isFirst,
    isLast,
}: {
    user: UserPublic;
    showAvatar: boolean;
    event: UserEvent;
    isCurrentUser: boolean;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        <>
            {event.type === "level_up" && (
                <LevelUp
                    showAvatar={showAvatar}
                    user={user}
                    event={event}
                    isCurrentUser={isCurrentUser}
                />
            )}
            {event.type === "game_completed" && (
                <GameCompleted
                    showAvatar={showAvatar}
                    user={user}
                    event={event}
                    isCurrentUser={isCurrentUser}
                />
            )}
            {event.type === "game_failed" && (
                <GameFailed
                    showAvatar={showAvatar}
                    user={user}
                    event={event}
                    isCurrentUser={isCurrentUser}
                />
            )}

            {!isLast && <div className="h-[1px] bg-muted/10"></div>}
        </>
    );
}
