// src/components/ui/PageSubtitle.tsx
export default function PageSubtitle({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-muted text-sm md:text-base text-center mb-6 max-w-xl mx-auto">
            {children}
        </p>
    )
}
