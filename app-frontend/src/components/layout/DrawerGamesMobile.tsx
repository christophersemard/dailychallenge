// src/components/layout/DrawerGamesMobile.tsx
"use client"

import { X } from "lucide-react"

type Props = {
    onClose: () => void
}

export default function DrawerGamesMobile({ onClose }: Props) {
    const data = [
        {
            title: "Cinéma",
            items: [
                { name: "JEU CINÉMA 1", desc: "Devine le titre du film grâce aux photos" },
                { name: "JEU CINÉMA 2", desc: "Avec les acteurs progressivement" },
            ],
        },
        {
            title: "Géographie",
            items: [
                { name: "JEU GEO 1", desc: "Trouve le pays grâce aux indices" },
                { name: "JEU GEO 2", desc: "Avec des images de lieux" },
            ],
        },
        {
            title: "Autres",
            items: [
                { name: "JEU MYSTÈRE", desc: "Jeux surprises à découvrir" },
            ],
        },
    ]

    return (
        <aside className="fixed top-0 right-0 w-[320px] h-full bg-background z-50 border-l border-muted/20 shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-muted/20 font-bold text-lg text-foreground">
                Jeux
                <button onClick={onClose} className="hover:text-muted transition">
                    <X />
                </button>
            </div>

            {/* Liste des jeux */}
            <div className="p-4 space-y-6 overflow-y-auto flex-1">
                {data.map((cat) => (
                    <div key={cat.title}>
                        <h3 className="text-md font-semibold mb-2 text-muted-foreground">{cat.title}</h3>
                        <ul className="space-y-2">
                            {cat.items.map((game, i) => (
                                <li
                                    key={i}
                                    className="border border-muted/30 p-3 rounded-md text-sm text-foreground hover:bg-muted/20 transition cursor-pointer"
                                >
                                    <strong>{game.name}</strong>
                                    <br />
                                    <span className="text-xs text-muted-foreground">{game.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    )
}
