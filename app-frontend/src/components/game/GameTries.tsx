"use client"

import { useState } from "react"
import { CheckCircle, CheckCircle2, X, XCircle } from "lucide-react"

type Props = {
    gameId: string
}

type Try = {
    id: string
    value: string
    status: "success" | "fail"
}

export default function GameTries({ gameId }: Props) {
    const [tries, setTries] = useState<Try[]>([
        { id: "1", value: "Interstellar", status: "success" },
        { id: "2", value: "Inception", status: "fail" },
    ])


    return (
        <div className="gap-4">
            <h3 className=" font-bold text-2xl mb-6 ">
                Vos essais
            </h3>

            {tries.length === 0 && (
                <p className="text-sm text-muted">Aucun essai pour l’instant.</p>
            )}

            <div className="grid grid-cols-1 gap-4">

                {tries.map((t) => (
                    <div
                        key={t.id}
                        className={`px-4 py-2 rounded flex justify-between items-center text-xl font-bold bg-white`}
                    >
                        {t.value}
                        {
                            t.status === "fail" ? (
                                <span className="text-red">
                                    <XCircle className="w-8 h-8" />
                                </span>
                            ) : (
                                <span className="text-green">
                                    <CheckCircle2 className="w-8 h-8" />
                                </span>
                            )
                        }
                    </div>
                ))}</div>
        </div>
    )
}
