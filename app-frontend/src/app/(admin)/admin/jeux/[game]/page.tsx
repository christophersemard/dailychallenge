import { GameAdminPage } from "@/components/admin/GameAdminPage";

type Props = {
    params: { game: string };
};

export default function AdminGamePage({ params }: Props) {
    return (
        <div className="">
            <GameAdminPage gameId={params.game} />
        </div>
    );
}
