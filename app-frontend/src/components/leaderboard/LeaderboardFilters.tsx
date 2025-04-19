"use client";

import { useState } from "react";
import clsx from "clsx";

type Period = "week" | "month" | "year" | "all";
type Scope = "global" | "friends";

type Props = {
    initialPeriod: Period;
    initialScope: Scope;
    onChange: (scope: Scope, period: Period) => void;
};

export default function LeaderboardFilters({
    initialPeriod,
    initialScope,
    onChange,
}: Props) {
    const [period, setPeriod] = useState<Period>(initialPeriod);
    const [scope, setScope] = useState<Scope>(initialScope);


    const handleChange = (newScope: Scope, newPeriod: Period) => {
        setScope(newScope);
        setPeriod(newPeriod);
        onChange(newScope, newPeriod);
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
                {(["global", "friends"] as Scope[]).map((value) => (
                    <button
                        key={value}
                        className={clsx(
                            "cursor-pointer px-1.5 py-1 rounded border-2 border-white hover:border-background",
                            {
                                "font-bold bg-background": scope === value,
                            }
                        )}
                        onClick={() => handleChange(value, period)}
                    >
                        {value === "global" ? "Global" : "Amis"}
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                {(["week", "month", "year", "all"] as Period[]).map((value) => (
                    <button
                        key={value}
                        className={clsx(
                            "cursor-pointer px-1.5 py-1 rounded border-2 border-white hover:border-background",
                            {
                                "font-bold bg-background": period === value,
                            }
                        )}
                        onClick={() => handleChange(scope, value)}
                    >
                        {value === "week"
                            ? "Sem."
                            : value === "month"
                                ? "Mois" : value === "year" ? "Année" : "Tous"}
                    </button>
                ))}
            </div>
        </div>
    );
}
