// src/components/layout/Footer.tsx
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full text-muted-foreground text-sm px-4 py-6">
            <div className=" max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 border-t border-black/20 pt-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <Link href="/mentions-legales" className="hover:underline">
                        Mentions légales
                    </Link>
                    <Link href="/cgu" className="hover:underline">
                        Conditions d’utilisation
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        Contact
                    </Link>
                </div>
                <p className="text-xs text-muted-foreground text-center md:text-right">
                    {new Date().getFullYear()} DailyChallenge.
                </p>
            </div>
        </footer>
    )
}
