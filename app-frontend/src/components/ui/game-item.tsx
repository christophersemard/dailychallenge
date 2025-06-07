// src/components/common/GameItem.tsx
import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Color } from "@/types/colors.types"

type Props = {
    color: Color
    icon: string | null
    title: string
    description: string
    url?: string
    status?: "coming_soon" | "available" | "unavailable"
}


const colorMap: Record<Props["color"], { bg: string; text: string }> = {
    primary: { bg: "bg-primary/2 hover:bg-primary/7", text: "text-primary fill-primary" },
    secondary: { bg: "bg-secondary/2 hover:bg-secondary/7", text: "text-secondary fill-secondary" },
    success: { bg: "bg-success/2 hover:bg-success/7", text: "text-success fill-success" },
    danger: { bg: "bg-danger/2 hover:bg-danger/7", text: "text-danger fill-danger" },

    teal: { bg: "bg-teal/2 hover:bg-teal/7", text: "text-teal fill-teal" },
    red: { bg: "bg-red/2 hover:bg-red/7", text: "text-red fill-red" },
    purple: { bg: "bg-purple/2 hover:bg-purple/7", text: "text-purple fill-purple" },
    yellow: { bg: "bg-yellow/2 hover:bg-yellow/7", text: "text-yellow fill-yellow" },
    green: { bg: "bg-success/2 hover:bg-success/7", text: "text-success fill-success" },
    blue: { bg: "bg-blue/2 hover:bg-blue/7", text: "text-blue fill-blue" },
    pink: { bg: "bg-pink/2 hover:bg-pink/7", text: "text-pink fill-pink" },
    orange: { bg: "bg-orange/2 hover:bg-orange/7", text: "text-orange fill-orange" },
    black: { bg: "bg-black/2 hover:bg-black/7", text: "text-black fill-black" },
    white: { bg: "bg-white/2 hover:bg-white/7", text: "text-white fill-white" },
    background: { bg: "bg-background/2 hover:bg-background/7", text: "text-background fill-background" },
}

export default function GameItem({
    icon,
    color,
    title,
    description,
    url = "/",
    status = "available",
}: Props) {
    const { bg, text } = colorMap[color]

    return (
        <>
            {status === "available" ?
                <Link href={url} className={cn("p-3 rounded transition cursor-pointer flex items-center space-x-5", bg)}>
                    <div className={cn("", text)}>{icon ? (
                        <Image src={icon} alt={title} width={48} height={48} className="w-12 h-12" />
                    ) : (
                        <Crown className="w-10 h-10 text-muted-foreground" />
                    )}
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="font-bold text-lg text-start">{title}</div>
                        <div className="text-sm text-muted-foreground text-start mb-1">{description}</div>
                    </div>
                </Link>
                : status === "coming_soon" &&
                <div className={cn("p-3 rounded flex items-center space-x-5 relative hover:bg-white! ", bg)}>
                    <div className={cn("", text)}>
                        {icon ? (
                            <Image src={icon} alt={title} width={48} height={48} className="w-12 h-12" />
                        ) : (
                            <Crown className="w-10 h-10 text-muted-foreground" />
                        )}</div>
                    <div className="flex flex-col items-start">
                        <div className="font-bold text-lg text-start">{title}</div>
                        <div className="text-sm text-muted-foreground text-start mb-1">{description}</div>
                    </div>

                    <div className="border-2 border-background absolute top-0 right-0 w-full h-full bg-white/80 rounded-md flex items-center justify-center text-black font-bold text-lg">
                        <span className="-rotate-4 text-black shadow font-black">BIENTOT DISPONIBLE</span>
                    </div>

                </div>
            }
        </>
    )
}
