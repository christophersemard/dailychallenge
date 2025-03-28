import { IconButton } from "@/components/ui/icon-button"
import { buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface IconButtonWithBadgeProps
    extends VariantProps<typeof buttonVariants> {
    icon: React.ReactNode
    badgeContent?: number
    onClick?: () => void
    size?: "xs" | "sm" | "default" | "lg"
    className?: string
    "aria-label"?: string
}

export function IconButtonWithBadge({
    icon,
    badgeContent,
    onClick,
    size = "default",
    variant = "ghost",
    className,
    ...props
}: IconButtonWithBadgeProps) {
    const badgeSizeClass = (() => {
        switch (size) {
            case "xs":
                return "-top-1 -right-1 text-[10px] px-1 py-[1px]"
            case "sm":
                return "-top-1 -right-1 text-xs px-1.5"
            case "lg":
                return "-top-0 -right-0 text-xs px-2 py-[2px]"
            default:
                return "-top-1 -right-1 text-xs px-1.5"
        }
    })()

    return (
        <div className="relative">
            <IconButton
                icon={icon}
                onClick={onClick}
                size={size}
                variant={variant}
                className={className}
                {...props}
            />
            {badgeContent && badgeContent > 0 ? (
                <span
                    className={cn(
                        "absolute bg-danger text-white font-bold rounded leading-none transition",
                        badgeSizeClass
                    )}
                >
                    {badgeContent}
                </span>
            )
                : null
            }
        </div>
    )
}
