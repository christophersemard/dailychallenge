import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type GameSectionProps = {
    children: ReactNode
    title?: string
    className?: string
}

export default function GameSection({ children, title, className }: GameSectionProps) {
    return (
        <section className={cn("bg-white border rounded shadow-sm p-4", className)}>
            {title && (
                <h2 className="text-lg font-bold text-foreground mb-3">
                    {title}
                </h2>
            )}
            {children}
        </section>
    )
}
