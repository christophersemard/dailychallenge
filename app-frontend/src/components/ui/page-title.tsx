// src/components/ui/PageTitle.tsx
export default function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {children}
        </h1>
    )
}
