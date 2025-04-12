import { LeaderboardEntry } from "@/types/game.types";
import Link from "next/link";
import Image from "next/image";
import OutlineText from "../ui/outline-text";
import clsx from "clsx";

type Props = {
    entries: LeaderboardEntry[];
    offset: number;
    currentUserId: string;
};

export default function LeaderboardUserList({
    entries,
    offset,
    currentUserId,
}: Props) {
    return (
        <ul className="space-y-1 text-sm">
            {entries.length === 0 && (
                <li className="text-center text-muted-foreground h-64">
                    Aucune donnée disponible
                </li>
            )}

            {entries.map((entry, index) => {
                const rank = offset + index + 1;
                const isUser = String(entry.user.id) === String(currentUserId);

                const getRankClass = () => {
                    if (offset !== 0) return "";
                    if (index === 0) return "text-red-500 font-bold";
                    if (index === 1) return "text-orange-500 font-bold";
                    if (index === 2) return "text-yellow-500 font-bold";
                    return "";
                };

                return (
                    <li
                        key={entry.user.id}
                        className={clsx(
                            "grid grid-cols-[40px_1fr_80px] items-center px-0 py-1.5",
                            {
                                "bg-background font-semibold": isUser,
                            }
                        )}
                    >
                        <div
                            className={clsx(
                                "text-center font-black",
                                getRankClass()
                            )}
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
                                    "/assets/avatar/avatar-default-" +
                                        Math.floor(Math.random() * 7 + 1) +
                                        ".png"
                                }
                                alt={entry.user.pseudo}
                                width={50}
                                height={50}
                                className="size-10"
                            />
                            <span className="truncate">
                                {entry.user.pseudo}
                            </span>
                        </Link>

                        <div className="flex justify-end pr-2">
                            <OutlineText
                                text={`${entry.score}`}
                                color="black"
                                size="sm"
                            />
                            <span className="text-muted-foreground text-xs ml-1">
                                pts
                            </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
