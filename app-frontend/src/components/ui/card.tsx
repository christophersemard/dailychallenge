// src/components/ui/CategoryCard.tsx
import clsx from "clsx"

type Props = {
    title: string
    color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink" | "orange"
    children: React.ReactNode
}

export default function CategoryCard({ title, color, children }: Props) {
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
        orange: "bg-orange text-black"

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
        orange: "card-orange"
    }


    return (
        <div className={clsx("bg-white rounded card my-6 ", underlineMap[color])} >
            <div className={clsx("card-title px-2 md:px-4 py-2 text-base font-bold text-center", colorMap[color])}>
                {title}
            </div>
            <div className="p-4 md:p-6 space-y-3">{children}</div>
        </div>
    )
}
