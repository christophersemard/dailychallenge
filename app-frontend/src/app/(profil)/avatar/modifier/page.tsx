// src/app/avatar/modifier/page.tsx

import AvatarEditor from "@/components/avatar/AvatarEditor";
import Card from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchServerAction } from "@/app/actions/fetch-proxy";
import { UserMe } from "@/types/user.types";
import { notFound } from "next/navigation";
import { AvatarConfig } from "@/components/avatar/AvatarEditor";

export default async function ModifierAvatarPage() {

    // Récupérer sur /api/users/me les infos de l'utilisateur
    const { data, error } = await fetchServerAction<UserMe>(`/api/users/me`);

    if (!data || error) return notFound();

    let config: AvatarConfig = {
        shape: null,
        eyes: null,
        mouth: null,
        pattern: null,
        colorShape: null,
        colorPattern: null,
    };
    if (data.avatar) {
        config = {
            shape: data.avatar.shape,
            eyes: data.avatar.eyes,
            mouth: data.avatar.mouth,
            pattern: data.avatar.pattern,
            colorShape: data.avatar.colorShape,
            colorPattern: data.avatar.colorPattern,
        };

    }


    const isVip = data.vip && data.vip.status == "active" ? true : false;

    return (
        <div className="max-w-6xl w-full mx-auto   flex flex-col gap-6">
            <Card title="Modifier mon avatar" color="primary">
                <AvatarEditor config={config} userLevel={data.userStats.level} userVIPStatus={isVip} />
            </Card>
        </div>
    );
}