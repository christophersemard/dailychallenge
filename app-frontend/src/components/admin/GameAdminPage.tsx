"use client";

import { useEffect, useState } from "react";
import {
    addDays,
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";

type Props = {
    gameId: string;
};

type GameDayStatus = {
    date: string;
    generated: boolean;
};

export function GameAdminPage({ gameId }: Props) {
    const [monthOffset, setMonthOffset] = useState(0);
    const [daysStatus, setDaysStatus] = useState<GameDayStatus[]>([]);
    const [missingDates, setMissingDates] = useState<string[]>([]);

    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start, end });
    const startDefault = addDays(today, 1);
    const endDefault = new Date(startDefault);
    endDefault.setMonth(endDefault.getMonth() + 1);

    const [startDate, setStartDate] = useState(
        startDefault.toLocaleDateString("fr-CA")
    );
    const [endDate, setEndDate] = useState(
        endDefault.toLocaleDateString("fr-CA")
    );

    // 🔁 Statut du mois affiché
    const refreshStatus = async () => {
        const month = format(currentMonth, "yyyy-MM");
        const res = await fetchClientWithAuth<{ upcoming: string[]; missingDays: string[] }>(
            `/api/admin/game-${gameId}/status?month=${month}`
        );

        if (res.data) {
            const all: GameDayStatus[] = [
                ...res.data.upcoming.map((d) => ({ date: d, generated: true })),
                ...res.data.missingDays.map((d) => ({ date: d, generated: false })),
            ];
            setDaysStatus(all);
        }
    };

    // 🔁 Statut des 31 jours à venir
    const refreshUpcoming31DaysStatus = async () => {
        const dates = Array.from({ length: 31 }, (_, i) =>
            addDays(today, i).toISOString().split("T")[0]
        );

        const months = [...new Set(dates.map((d) => d.slice(0, 7)))];
        const statuses: GameDayStatus[] = [];

        for (const month of months) {
            const res = await fetchClientWithAuth<{ upcoming: string[]; missingDays: string[] }>(
                `/api/admin/game-${gameId}/status?month=${month}`
            );

            if (res.data) {
                statuses.push(
                    ...res.data.upcoming.map((d) => ({ date: d, generated: true })),
                    ...res.data.missingDays.map((d) => ({ date: d, generated: false }))
                );
            }
        }

        const missing = dates.filter(
            (d) => !statuses.find((s) => s.date === d && s.generated)
        );

        setMissingDates(missing);
    };

    useEffect(() => {
        refreshStatus();
    }, [monthOffset, gameId]);

    useEffect(() => {
        refreshUpcoming31DaysStatus();
    }, [gameId]);

    const handleGenerate = async () => {
        const res = await fetchClientWithAuth(
            `/api/admin/game-${gameId}/generate?startDate=${startDate}&endDate=${endDate}`,
            { method: "POST" }
        );

        if (!res.error) {
            setStartDate("");
            setEndDate("");
            await refreshStatus();
            await refreshUpcoming31DaysStatus();
        }
    };

    const handleGenerateNext31Days = async () => {
        if (missingDates.length === 0) return;

        const res = await fetchClientWithAuth(
            `/api/admin/game-${gameId}/generate?startDate=${missingDates[0]}&endDate=${missingDates[missingDates.length - 1]}`,
            { method: "POST" }
        );

        if (!res.error) {
            await refreshStatus();
            await refreshUpcoming31DaysStatus();
        }
    };

    const handleRegenerateDay = async (date: string) => {
        const res = await fetchClientWithAuth(
            `/api/admin/game-${gameId}/regenerate?date=${date}`,
            { method: "POST" }
        );

        if (!res.error) {
            await refreshStatus();
            await refreshUpcoming31DaysStatus();
        }
    };

    return (
        <div className="">
            {missingDates.length > 0 && (
                <Alert variant="destructive" className="flex items-center mb-12">
                    <AlertTriangle className="h-10 w-10" />
                    <AlertDescription className="flex items-center justify-between w-full">
                        <span>
                            {missingDates.length} jour(s) ne sont pas générés dans les 31
                            prochains jours.
                        </span>
                        <Button size="sm" className="ml-2" onClick={handleGenerateNext31Days}>
                            Générer automatiquement
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            <Card className=" space-y-4 !mb-16" title="Génération manuelle des jours" color="secondary">
                <h2 className="text-lg font-semibold">Générer des jours manuellement</h2>
                <div className="flex flex-nowrap items-center gap-2">
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>→</span>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button onClick={handleGenerate} disabled={!startDate || !endDate}>
                        Générer
                    </Button>
                </div>
            </Card>

            <Card className=" space-y-4" color="primary" title="Calendrier des jours générés">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        Jours générés – {format(currentMonth, "MMMM yyyy", { locale: fr })}
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setMonthOffset((prev) => prev - 1)}
                        >
                            Mois précédent
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setMonthOffset((prev) => prev + 1)}
                        >
                            Mois suivant
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted-foreground">
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mer</div>
                    <div>Jeu</div>
                    <div>Ven</div>
                    <div>Sam</div>
                    <div>Dim</div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {Array.from({ length: (getDay(start) + 6) % 7 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {daysInMonth.map((date) => {
                        const iso = date.toLocaleDateString("fr-CA"); // format YYYY-MM-DD

                        const status = daysStatus.find((d) => d.date === iso);

                        return (
                            <div
                                key={iso}
                                className="border rounded p-2 flex flex-col items-center justify-center text-xs"
                            >
                                <span className="font-semibold">{date.getDate()}</span>
                                {status?.generated ? (
                                    <span className="text-green-600 font-semibold">OK</span>
                                ) : (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-muted-foreground mt-1"
                                        onClick={() => handleRegenerateDay(iso)}
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
