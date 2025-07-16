import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserProfile from "@/components/profile/UserProfile";
import { fetchServerAction } from "@/app/actions/fetch-proxy";
import { UserPublic } from "@/types/user.types";
type Props = {
    params: Promise<{ id: string }>;
};

export default async function UserPublicProfilePage({ params }: Props) {
    const { id } = await params;
    const userId = Number(id);

    const session = await getServerSession(authOptions);

    if (isNaN(userId)) return notFound();

    const { data, error } = await fetchServerAction<UserPublic>(
        `/api/users/${id}`
    );
    // console.log("UserPublicProfilePage", { data, error });

    if (!data || error) return notFound();

    const currentUserId = session!.user.id;

    return (
        <div className="max-w-6xl mx-auto w-full">
            <UserProfile user={data} currentUserId={Number(currentUserId)} />
        </div>
    );
}
