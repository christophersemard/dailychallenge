"use client"

import { useEffect, useState } from "react"

type OutlineColor =
    | "yellow"
    | "purple"
    | "red"
    | "green"
    | "blue"
    | "teal"
    | "orange"
    | "pink"
    | "white"
    | "black"
    | "danger"
    | "success"
    | "warning"
    | "cyan"
    | "gray"

const strokeMap: Record<OutlineColor, string> = {
    yellow: "#ffd400",
    purple: "#6610f2",
    red: "#f31c31",
    green: "#03914f",
    blue: "#0067ff",
    teal: "#14edad",
    orange: "#ff7400",
    pink: "#eb1b82",
    cyan: "#01d4ff",
    white: "#ffffff",
    black: "#101010",
    danger: "#f31c31",
    success: "#03914f",
    warning: "#ff7400",
    gray: "#6C757D",
}

const sizeMap = {
    xs: 12,
    sm: 16,
    base: 18,
    md: 22,
    lg: 28,
    xl: 36,
    giga: 96,
} as const

type SizeKey = keyof typeof sizeMap

type Props = {
    text: string
    color?: string
    size?: SizeKey
    className?: string
}

/** Utilitaire responsive : écoute la taille de la fenêtre */
function useWindowSize() {
    const [width, setWidth] = useState<number | null>(null)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return width
}

export default function OutlineText({
    text,
    color = "black",
    size = "md",
    className,
}: Props) {
    const windowWidth = useWindowSize()

    // ✅ Taille auto-ajustée selon la taille d’écran
    let fontSize = sizeMap[size] ?? sizeMap.base
    if (windowWidth !== null) {
        if (windowWidth < 480) fontSize = 16
        else if (windowWidth < 768) fontSize = 18
        else if (windowWidth < 1024) fontSize = 22
    }


    const stroke = strokeMap[color as OutlineColor] ?? strokeMap.black
    const padding = fontSize * 0.2
    const textString = text.toString()
    const textLength = textString.length * (fontSize * 0.6)
    const width = textLength + padding * 2
    const height = fontSize + padding * 2

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
        >
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke={stroke}
                strokeWidth={fontSize * 0.3}
                fill="white"
                fontSize={fontSize}
                fontWeight="bold"
                paintOrder="stroke fill"
                style={{ fontFamily: "var(--font-outline)" }}
            >
                {text}
            </text>
        </svg>
    )
}
