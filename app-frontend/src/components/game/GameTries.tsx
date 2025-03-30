"use client"

import { useState } from "react"
import { CheckCircle, CheckCircle2, X, XCircle } from "lucide-react"
import { Try } from "@/types/game.types"
import { cn } from "@/lib/utils"
import clsx from "clsx"

type Props = {
    tries: Try[]
}


export default function GameTries({ tries }: Props) {

    return (
        <>

            {
                tries.length > 0 && (
                    <div className="gap-4">
                        <h3 className=" font-bold text-2xl mb-4 md:mb-6 ">
                            Vos essais
                        </h3>

                        <div className={clsx("grid grid-cols-1 gap-2 md:gap-4",
                            {
                                "md:grid-cols-2": tries.length > 1,
                            }
                        )}>

                            {tries.slice().reverse().map((t) => (
                                <div
                                    key={t.id}
                                    className={`px-3 md:px-4 py-1 md:py-2 rounded flex justify-between items-center text-sm md:text-lg font-bold bg-white`}
                                >
                                    {t.guess || "Pas de réponse"}
                                    {
                                        !t.correct ? (
                                            <span className="text-red">
                                                <XCircle className="size-5 md:size-6" />
                                            </span>
                                        ) : (
                                            <span className="text-green">
                                                <CheckCircle2 className="size-5 md:size-6" />
                                            </span>
                                        )
                                    }
                                </div>
                            ))}</div>
                    </div >
                )
            }
        </>


    )
}
