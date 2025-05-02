// src/app/avatar/modifier/page.tsx

import AvatarEditor from "@/components/avatar/AvatarEditor";
import Card from "@/components/ui/card";

export default function ModifierAvatarPage() {
    return (
        <div className="max-w-6xl w-full mx-auto py-8 px-4 flex flex-col gap-6">
            <Card title="Modifier mon avatar" color="primary">
                <AvatarEditor />
            </Card>
        </div>
    );
}