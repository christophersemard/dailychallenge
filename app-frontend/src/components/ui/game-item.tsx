// src/components/common/GameItem.tsx
import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Props = {
    color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink" | "orange"
    icon?: string
    title: string
    description: string
    url?: string
    status?: "coming-soon" | "available"
}

const colorMap: Record<Props["color"], { bg: string; text: string }> = {
    red: { bg: "bg-red/2 hover:bg-red/7", text: "text-red fill-red" },
    orange: { bg: "bg-orange/2 hover:bg-orange/7", text: "text-orange fill-orange" },
    yellow: { bg: "bg-yellow/2 hover:bg-yellow/7", text: "text-yellow fill-yellow" },
    green: { bg: "bg-success/2 hover:bg-success/7", text: "text-success fill-success" },
    teal: { bg: "bg-teal/2 hover:bg-teal/7", text: "text-teal fill-teal" },
    blue: { bg: "bg-blue/2 hover:bg-blue/7", text: "text-blue fill-blue" },
    purple: { bg: "bg-purple/2 hover:bg-purple/7", text: "text-purple fill-purple" },
    pink: { bg: "bg-pink/2 hover:bg-pink/7", text: "text-pink fill-pink" },
    primary: { bg: "bg-primary/2 hover:bg-primary/7", text: "text-primary fill-primary" },
    secondary: { bg: "bg-secondary/2 hover:bg-secondary/7", text: "text-secondary fill-secondary" },
    success: { bg: "bg-success/2 hover:bg-success/7", text: "text-success fill-success" },
    danger: { bg: "bg-danger/2 hover:bg-danger/7", text: "text-danger fill-danger" },

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
                    <div className={cn("", text)}>
                        {icon ? <Image height={50} width={50} src={icon} alt={title} className="" /> : <Crown className="w-8 h-8" />}
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="font-bold text-lg text-start">{title}</div>
                        <div className="text-sm text-muted-foreground text-start mb-1">{description}</div>
                    </div>
                </Link>
                :
                <div className={cn("p-3 rounded flex items-center space-x-5 relative hover:bg-white! ", bg)}>
                    <div className={cn("", text)}>
                        {icon ? <Image height={50} width={50} src={icon} alt={title} className="" /> : <Crown className="w-8 h-8" />}
                    </div>
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
