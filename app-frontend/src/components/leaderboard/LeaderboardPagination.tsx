"use client";

import { IconButton } from "../ui/icon-button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

type Props = {
    initialPage: number;
    limit: number;
    totalPlayers: number;
    totalPages: number;
    onChange: (newOffset: number) => void;
};

export default function LeaderboardPagination({
    initialPage,
    limit,
    totalPlayers,
    totalPages,
    onChange,
}: Props) {
    const [currentPage, setCurrentPage] = useState(initialPage || 1);
    const goToPage = (page: number) => {
        // Envoyer la page au parent
        onChange(page);
        setCurrentPage(page);
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
                <span className="font-bold">{totalPlayers}</span> joueur{totalPlayers > 1 ? "s" : ""}
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
                            "px-2 py-1  rounded font-medium border hover:bg-background cursor-pointer size-8",
                            {
                                "bg-primary font-black! border-none":
                                    currentPage === page,
                                "text-muted-foreground border-background":
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
