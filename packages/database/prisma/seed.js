import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated/client");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // ✅ Générer 10 utilisateurs
    const users = await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
            const email = `user${i + 1}@test.com`;
            const password =
                "$2b$10$7sYuxN0/Pl14ZXx8l3.v.uKeB1XtqBKwT4r8QuP1cEdiwyT1BR/8C"; // 🔐 Hash du mot de passe password123

            return prisma.user.upsert({
                where: { email },
                update: {},
                create: { email, password },
            });
        })
    );

    console.log("✅ Utilisateurs créés :", users.length);

    // ✅ Générer des relations d’amitié aléatoires
    const friendRelations = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            // Déterminer un statut aléatoire (pending, accepted, rejected)
            const status = ["pending", "accepted", "rejected"][
                Math.floor(Math.random() * 3)
            ];

            friendRelations.push(
                prisma.friend.upsert({
                    where: {
                        userId_friendId: {
                            userId: users[i].id,
                            friendId: users[j].id,
                        },
                    },
                    update: {},
                    create: {
                        userId: users[i].id,
                        friendId: users[j].id,
                        status,
                    },
                })
            );
        }
    }

    await Promise.all(friendRelations);
    console.log(`✅ ${friendRelations.length} relations d'amitié créées.`);
}

main()
    .catch((e) => {
        console.error("❌ Erreur lors du seeding :", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("🌱 Seeding terminé !");
    });
