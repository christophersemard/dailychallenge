// src/components/ui/CategoryCard.tsx
import clsx from "clsx"
import { Color } from "@/types/colors.types"

type Props = {
    title: string | false
    color: Color
    children: React.ReactNode
    className?: string
}

export default function CategoryCard({ title, color, children, className }: Props) {
    const colorMap = {
        primary: "bg-primary text-black",
        secondary: "bg-purple text-white",
        success: "bg-green text-white",
        danger: "bg-red text-white",
        teal: "bg-teal text-white",
        red: "bg-red text-white",
        purple: "bg-purple text-white",
        yellow: "bg-yellow text-black",
        green: "bg-green text-white",
        blue: "bg-blue text-white",
        pink: "bg-pink text-white",
        orange: "bg-orange text-white",
        black: "bg-black text-white",
        white: "bg-white text-black",
        background: "bg-background text-black"

    }

    const underlineMap = {
        primary: "card-primary",
        secondary: "card-purple",
        success: "card-green",
        danger: "card-red",
        teal: "card-teal",
        red: "card-red",
        purple: "card-purple",
        yellow: "card-yellow",
        green: "card-green",
        blue: "card-blue",
        pink: "card-pink",
        orange: "card-orange",
        black: "card-black",
        white: "card-white",
        background: "card-background"
    }


    return (
        <div className={clsx("bg-white rounded card my-6 ", underlineMap[color as Color], className)} >
            {title && (
                <div className={clsx("card-title px-2 md:px-4 py-2 text-base font-bold text-center max-w-5/6", colorMap[color])}>
                    {title}
                </div>
            )}
            <div className="p-4 md:p-5 space-y-3">{children}</div>
        </div>
    )
}
