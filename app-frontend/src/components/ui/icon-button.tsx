import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"

interface IconButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
    icon: React.ReactNode
    size?: "xs" | "sm" | "default" | "lg"
    variant?: VariantProps<typeof buttonVariants>["variant"]
    className?: string
}

export function IconButton({
    icon,
    size = "default",
    variant = "primary",
    className,
    ...props
}: IconButtonProps) {
    const sizeClass = {
        xs: "size-6",
        sm: "size-8",
        default: "size-9",
        lg: "size-11",
    }[size]

    return (
        <button
            className={cn(
                buttonVariants({ variant }),
                sizeClass,
                "p-1 flex items-center justify-center",
                className
            )}
            {...props}
        >
            {icon}
        </button>
    )
}
