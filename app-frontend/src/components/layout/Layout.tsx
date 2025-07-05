// src/components/layout/Layout.tsx
import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-1 pt-8 md:pt-20 px-4 flex flex-col">
                <div className="flex-1 flex flex-col max-w-10xl mx-auto w-full py-10 relative  px-2 md:px-12 sm:px-8 lg:px-16">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}