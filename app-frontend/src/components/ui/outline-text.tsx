

type OutlineColor =
    | "yellow"
    | "purple"
    | "red"
    | "green"
    | "blue"
    | "teal"
    | "orange"
    | "pink"
    | "indigo"
    | "white"
    | "black"

const strokeMap: Record<OutlineColor, string> = {
    yellow: "#ffc107",
    purple: "#6f42c1",
    red: "#dc3545",
    green: "#198754",
    blue: "#0d6efd",
    teal: "#20c997",
    orange: "#fd7e14",
    pink: "#d63384",
    indigo: "#6610f2",
    white: "#ffffff",
    black: "#202020",
}

const sizeMap = {
    xs: 12,
    sm: 16,
    base: 18,
    lg: 28,
    xl: 36,
} as const

type SizeKey = keyof typeof sizeMap

type Props = {
    text: string
    color?: string
    size?: SizeKey
    className?: string
}

export default function OutlineText({
    text,
    color = "black",
    size = "base",
    className,
}: Props) {
    const fontSize = sizeMap[size] ?? sizeMap.base
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
                x={padding}
                y={height - padding / 2 - 4}
                stroke={stroke}
                strokeWidth={fontSize * 0.4}
                fill="white"
                fontSize={fontSize}
                fontWeight="bold"
                paintOrder="stroke fill" style={{ fontFamily: "var(--font-outline)" }}

            >
                {text}
            </text>
        </svg>
    )
}
