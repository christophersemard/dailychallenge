import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserProfile from "@/components/profile/UserProfile";
import { fetchServerAction } from "@/app/actions/fetch-proxy";

type Props = {
    params: { id: string };
};

export default async function UserPublicProfilePage({ params }: Props) {
    const session = await getServerSession(authOptions);
    const userId = Number(params.id);
    console.log("UserPublicProfilePage", { userId, params });

    if (isNaN(userId)) return notFound();

    const { data, error } = await fetchServerAction(`/api/users/${userId}`);
    console.log("UserPublicProfilePage", { data, error });

    if (!data || error) return notFound();

    const currentUserId = session!.user.id;

    return (
        <div className="max-w-4xl mx-auto w-full p-6">
            <UserProfile user={data} currentUserId={currentUserId} />
        </div>
    );
}
