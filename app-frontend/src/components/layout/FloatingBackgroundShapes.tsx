import Image from "next/image"
import { cn } from "@/lib/utils"

type Variant = "yellow" | "purple" | "red"

type Props = {
    variant: Variant
    className?: string
}

export default function FloatingBackgroundShapes({ variant, className }: Props) {
    const imgSrc = `/assets/backgrounds/square-${variant}.png`

    return (
        <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
            <Image
                src={imgSrc}
                alt=""
                width={500}
                height={500}
                className="blur fixed left-[5%] top-[40%] translate-y-[-50%] translate-x-[-100%] rotate-[-25deg] hidden xl:block"
            />
            <Image
                src={imgSrc}
                alt=""
                width={400}
                height={400}
                className="blur fixed right-[7%] top-[60%] translate-y-[-50%]  translate-x-[100%] rotate-12 hidden xl:block"
            />
            <Image
                src={imgSrc}
                alt=""
                width={800}
                height={800}
                className="blur fixed bottom-[5%] left-[50%] translate-x-[-50%] translate-y-[100%] rotate-[-5deg] hidden xl:block"
            />

            <Image
                src={imgSrc}
                alt=""
                width={500}
                height={500}
                className="blur fixed left-[5%] top-[40%] translate-y-[-50%] translate-x-[-100%] rotate-[-25deg]  hidden md:block xl:hidden"
            />
            <Image
                src={imgSrc}
                alt=""
                width={500}
                height={500}
                className="blur fixed right-[5%] top-[60%] translate-y-[-50%]  translate-x-[100%] rotate-12  hidden md:block xl:hidden"
            />
            <Image
                src={imgSrc}
                alt=""
                width={800}
                height={800}
                className="blur fixed bottom-[4%] left-[50%] translate-x-[-50%] translate-y-[100%] rotate-[-5deg]  hidden md:block xl:hidden"
            />

            <Image
                src={imgSrc}
                alt=""
                width={300}
                height={300}
                className="blur fixed left-[5%] top-[40%] translate-y-[-50%] translate-x-[-100%] rotate-[-12deg]  block md:hidden"
            />
            <Image
                src={imgSrc}
                alt=""
                width={300}
                height={300}
                className="blur fixed right-[5%] top-[60%] translate-y-[-50%]  translate-x-[100%] rotate-6  block md:hidden"
            />
            <Image
                src={imgSrc}
                alt=""
                width={250}
                height={250}
                className="blur fixed bottom-[4%] left-[50%] translate-x-[-50%] translate-y-[100%] rotate-[-5deg]  block md:hidden"
            />


        </div>
    )
}
