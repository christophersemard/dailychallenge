"use client";

import { useEffect, useState } from "react";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { UserMonthlyGameResult } from "@/types/game.types";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/card";
import { Color } from "@/types/colors.types";
import { IconButton } from "@/components/ui/icon-button";
import Link from "next/link";
import { useGameEventStore } from "@/lib/store/useGameEventStore";
import { Crown } from "lucide-react";

type Props = {
    gameId: string;
    userId: string;
    date: Date;
    color: Color;
    urlGame: string;
};

export default function GameHistory({
    gameId,
    userId,
    date,
    color,
    urlGame,
}: Props) {
    const [results, setResults] = useState<UserMonthlyGameResult[] | null>(
        null
    );
    const [totalPoints, setTotalPoints] = useState(0);
    const [currentDate, setCurrentDate] = useState(date);
    const [isVip, setIsVip] = useState(false);

    const router = useRouter();
    const lastUpdate = useGameEventStore((state) => state.lastUpdate);
    useEffect(() => {
        const fetchAll = async () => {
            const monthStr = currentDate
                .toISOString()
                .split("T")[0]
                .slice(0, 7);

            // 🔁 Résultats de jeu
            const { data: resultsData, error: resErr } =
                await fetchClientWithAuth<UserMonthlyGameResult[]>(
                    `/api/${urlGame}/user-results?month=${monthStr}`
                );

            // 👤 Statut VIP
            const { data: me, error: meErr } = await fetchClientWithAuth<{
                vip: { status: string; until: string | null };
            }>("/api/users/me");

            if (resErr || !resultsData) {
                console.error("Erreur récupération historique :", resErr);
                return;
            }

            setResults(resultsData);
            const total = resultsData.reduce(
                (acc, res) => acc + (res.result?.score ?? 0),
                0
            );
            setTotalPoints(total);

            // Vérifie si VIP actif ou encore valable
            if (
                me?.vip?.status === "active" ||
                me?.vip?.status === "canceled"
            ) {
                const now = new Date();
                const until = me.vip.until ? new Date(me.vip.until) : null;
                if (!until || until >= now) setIsVip(true);
            }
        };

        fetchAll();
    }, [currentDate, lastUpdate]);

    const getMonthName = (date: Date) =>
        date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

    const today = new Date();
    const isFutureMonth =
        currentDate.getFullYear() > today.getFullYear() ||
        (currentDate.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() >= today.getMonth());

    const isSameMonth =
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);

        const now = new Date();
        if (
            newDate.getFullYear() > now.getFullYear() ||
            (newDate.getFullYear() === now.getFullYear() &&
                newDate.getMonth() > now.getMonth())
        ) {
            return; // 🔒 empêche d'aller dans le futur
        }

        setCurrentDate(newDate);
    };

    return (
        <Card title="Historique" color={color}>
            <div className="flex items-center justify-end gap-2 absolute top-4 right-4">
                <IconButton
                    onClick={() => changeMonth(-1)}
                    icon={<ChevronLeft strokeWidth={4} className="w-5 h-5" />}
                    variant="background"
                    size="xs"
                />
                <h3 className="font-bold text-muted-foreground text-center text-sm">
                    {getMonthName(currentDate).charAt(0).toUpperCase() +
                        String(getMonthName(currentDate)).slice(1, 3)}
                    . {currentDate.getFullYear()}
                </h3>
                <IconButton
                    onClick={() => changeMonth(1)}
                    icon={<ChevronRight strokeWidth={4} className="w-5 h-5" />}
                    variant="background"
                    size="xs"
                    disabled={isFutureMonth}
                />
            </div>

            <div className="grid grid-cols-7 gap-3 px-2 mt-4">
                {results
                    ? results.map((res, i) => {
                          const day = i + 1;
                          const fullDate = new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              day
                          );
                          const dateStr = [
                              fullDate.getFullYear(),
                              String(fullDate.getMonth() + 1).padStart(2, "0"),
                              String(fullDate.getDate()).padStart(2, "0"),
                          ].join("-");

                          const isFutureDay =
                              fullDate > today &&
                              fullDate.getMonth() === today.getMonth() &&
                              fullDate.getFullYear() === today.getFullYear();

                          let bg =
                              "bg-white border-background border-2 hover:bg-background";
                          let icon = null;
                          let tooltip = `${day} ${getMonthName(currentDate)}`;

                          if (isFutureDay) {
                              return (
                                  <div
                                      key={i}
                                      className="size-8 rounded bg-white border-none opacity-30 flex items-center justify-center  cursor-default"
                                      title="Jour à venir"
                                  >
                                      {day}
                                  </div>
                              );
                          }

                          if (res.result) {
                              tooltip += ` | ${
                                  res.result.status === "passed"
                                      ? "Réussi"
                                      : "Échoué"
                              }`;
                              tooltip += ` | ${res.result.score} pts`;
                              tooltip += ` | ${res.result.xpGained} XP`;

                              if (res.result.status === "passed") {
                                  bg = "bg-success";
                                  icon = (
                                      <Check
                                          className="text-white size-4"
                                          strokeWidth={4}
                                      />
                                  );
                              } else {
                                  bg = "bg-danger";
                                  icon = (
                                      <X
                                          className="text-white size-4"
                                          strokeWidth={4}
                                      />
                                  );
                              }
                          }

                          const isToday =
                              fullDate.getFullYear() === today.getFullYear() &&
                              fullDate.getMonth() === today.getMonth() &&
                              fullDate.getDate() === today.getDate();

                          let content = icon;

                          if (!icon) {
                              if (
                                  res.gameDay &&
                                  !res.result &&
                                  !isToday &&
                                  !isVip
                              ) {
                                  content = (
                                      <Crown
                                          className="text-yellow-500 size-4"
                                          strokeWidth={3}
                                      />
                                  );
                                  tooltip += " | Réservé aux membres VIP";
                              } else {
                                  content = (
                                      <span className="text-black font-bold border-none">
                                          {day}
                                      </span>
                                  );
                              }
                          }

                          return res.gameDay ? (
                              <Link
                                  href={`/jeu/${gameId}/${dateStr}`}
                                  key={i}
                                  className={`size-7 rounded-sm ${bg} flex items-center justify-center  cursor-pointer hover:opacity-80`}
                                  title={tooltip}
                              >
                                  {content}
                              </Link>
                          ) : (
                              <div
                                  key={i}
                                  className={`size-7 rounded-sm ${bg} flex items-center cursor-pointer justify-center text-black hover:bg-white border-none font-bold opacity-50`}
                                  title={tooltip + " | Pas de jeu ce jour-là"}
                              >
                                  {day}
                              </div>
                          );
                      })
                    : Array.from({ length: 30 }).map((_, i) => (
                          <div
                              key={i}
                              className="size-7 rounded bg-background animate-pulse"
                          />
                      ))}
            </div>

            <div className="w-full h-[1px] bg-black/10 my-2" />

            <div className="text-sm text-muted-foreground text-center">
                {totalPoints} points cumulés ce mois-ci
            </div>
        </Card>
    );
}
