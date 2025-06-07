import { GameAdminPage } from "@/components/admin/GameAdminPage";

type Props = {
    params: Promise<{ game: string }>;
};

export default async function AdminGamePage({ params }: Props) {


    const { game } = await params;
    return (
        <div className="">
            <GameAdminPage gameId={game} />
        </div>
    );
}
