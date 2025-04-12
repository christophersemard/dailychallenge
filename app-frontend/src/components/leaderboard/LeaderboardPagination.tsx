"use client";

import { IconButton } from "../ui/icon-button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import clsx from "clsx";

type Props = {
    offset: number;
    limit: number;
    totalPlayers: number;
    totalPages: number;
    onChange: (newOffset: number) => void;
};

export default function LeaderboardPagination({
    offset,
    limit,
    totalPlayers,
    totalPages,
    onChange,
}: Props) {
    const currentPage = Math.floor(offset / limit) + 1;
    const goToPage = (page: number) => {
        onChange((page - 1) * limit);
    };

    const getDisplayedPages = (): number[] => {
        const pages: number[] = [];
        const maxDisplayed = 5;
        const start = Math.max(1, currentPage - Math.floor(maxDisplayed / 2));
        const end = Math.min(totalPages, start + maxDisplayed - 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 mt-6">
            <div className="text-sm text-muted-foreground">
                {totalPlayers} joueur{totalPlayers > 1 ? "s" : ""}
            </div>

            <div className="flex items-center gap-2">
                <IconButton
                    icon={<ChevronsLeft className="w-5 h-5" />}
                    onClick={() => goToPage(1)}
                    variant="background"
                    size="sm"
                    disabled={currentPage === 1}
                />

                <IconButton
                    icon={<ChevronLeft className="w-5 h-5" />}
                    onClick={() => goToPage(currentPage - 1)}
                    variant="background"
                    size="sm"
                    disabled={currentPage === 1}
                />

                {getDisplayedPages().map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={clsx(
                            "px-2 py-1 text-sm rounded font-medium border hover:bg-background",
                            {
                                "bg-background border-black":
                                    currentPage === page,
                                "text-muted-foreground border-white":
                                    currentPage !== page,
                            }
                        )}
                    >
                        {page}
                    </button>
                ))}

                <IconButton
                    icon={<ChevronRight className="w-5 h-5" />}
                    onClick={() => goToPage(currentPage + 1)}
                    variant="background"
                    size="sm"
                    disabled={currentPage === totalPages}
                />
            </div>
        </div>
    );
}
