import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";
import OutlineText from "@/components/ui/outline-text";

export default function NotFound() {
    return (<>
        <FloatingBackgroundShapes variant="yellow" />

        <div className="h-100 my-auto flex flex-col items-center justify-center text-center px-4">
            <OutlineText text="404" color="black" size="giga" className="" />
            <p className="text-muted-foreground text-lg mb-6">
                Oups ! Cette page n&apos;existe pas.
            </p>
            <Link href="/">
                <Button variant="primary" size={"lg"}>Retour à l&apos;accueil</Button>
            </Link>
        </div></>
    );
}
