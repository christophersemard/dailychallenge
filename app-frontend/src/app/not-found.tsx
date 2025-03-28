import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";

export default function NotFound() {
    return (<>
        <FloatingBackgroundShapes variant="yellow" />

        <div className="h-100 my-auto flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-7xl font-bold text-foreground mb-4">404</h1>
            <p className="text-muted-foreground text-lg mb-6">
                Oups ! Cette page n&apos;existe pas.
            </p>
            <Link href="/">
                <Button variant="primary" size={"lg"}>Retour à l&apos;accueil</Button>
            </Link>
        </div></>
    );
}
