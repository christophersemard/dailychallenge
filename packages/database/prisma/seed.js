import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated/client");

const prisma = new PrismaClient();

async function clearDatabase() {
    console.log("🧹 Suppression des anciennes données...");

    await prisma.friend.deleteMany();
    await prisma.userEvent.deleteMany();
    await prisma.userStats.deleteMany();
    await prisma.gameResult.deleteMany();
    await prisma.game.deleteMany();
    await prisma.gameCategory.deleteMany();
    await prisma.user.deleteMany();

    console.log("✅ Base de données vidée !");
}

async function generateUsers() {
    console.log("👤 Création des utilisateurs...");

    const users = await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
            const email = `user${i + 1}@test.com`;
            const password =
                "$2b$10$ggqTvEOUwkGW1ne26bH9zOWHBm1mLZpk81sSEMb8/FGa6g.TBJ03a"; // 🔐 Hash du mot de passe password123

            return prisma.user.create({
                data: { email, password },
            });
        })
    );

    console.log(`✅ ${users.length} utilisateurs créés.`);
    return users;
}

async function generateUserStats(users) {
    console.log("📊 Création des stats des utilisateurs...");

    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);

    const userStats = await Promise.all(
        users.map(async (user) => {
            const lastPlayedAt = new Date(
                oneMonthAgo.getTime() +
                    Math.random() * (today.getTime() - oneMonthAgo.getTime())
            ); // Date entre aujourd’hui et il y a un mois

            return prisma.userStats.create({
                data: {
                    userId: user.id,
                    xp: Math.floor(Math.random() * 5000),
                    level: Math.floor(Math.random() * 50) + 1,
                    streak: Math.floor(Math.random() * 30),
                    lastPlayedAt,
                },
            });
        })
    );

    console.log(`✅ Stats créées pour ${userStats.length} utilisateurs.`);
}

async function generateUserEvents(users) {
    console.log("📜 Création des événements utilisateurs...");

    const events = await Promise.all(
        users.map(async (user) =>
            prisma.userEvent.create({
                data: {
                    userId: user.id,
                    type: "level_up",
                    details: `Niveau ${
                        Math.floor(Math.random() * 50) + 1
                    } atteint`,
                },
            })
        )
    );

    console.log(`✅ ${events.length} événements créés.`);
}

async function generateGames() {
    console.log("🎮 Création des catégories et jeux...");

    const categoriesData = ["Cinéma", "Géographie", "Autres"];
    const gameCategories = await Promise.all(
        categoriesData.map((name) =>
            prisma.gameCategory.create({ data: { name } })
        )
    );

    const gamesData = [
        { name: "Trouver le film", category: "Cinéma" },
        { name: "Reconnaître un pays", category: "Géographie" },
        { name: "Deviner un lieu", category: "Autres" },
    ];

    const games = await Promise.all(
        gamesData.map(async ({ name, category }) => {
            const categoryData = gameCategories.find(
                (c) => c.name === category
            );
            if (!categoryData)
                throw new Error(`Game category not found: ${category}`);

            return prisma.game.create({
                data: {
                    name,
                    gameCategoryId: categoryData.id, // ✅ Sécurisé
                },
            });
        })
    );

    console.log(`✅ ${games.length} jeux créés.`);
    return games;
}

async function generateGameResults(users, games) {
    console.log("🏆 Création des résultats de jeu...");

    const gameResults = [];
    users.forEach((user) => {
        games.forEach((game) => {
            gameResults.push(
                prisma.gameResult.create({
                    data: {
                        userId: user.id,
                        gameId: game.id,
                        score: Math.floor(Math.random() * 1000),
                        xpGained: Math.floor(Math.random() * 500),
                        status: Math.random() > 0.5 ? "passed" : "failed",
                        date: new Date(),
                    },
                })
            );
        });
    });

    await Promise.all(gameResults);
    console.log(`✅ ${gameResults.length} résultats de jeu créés.`);
}

async function generateFriends(users) {
    console.log("👥 Création des relations d’amitié...");

    const friendRelations = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            friendRelations.push(
                prisma.friend.create({
                    data: {
                        userId: users[i].id,
                        friendId: users[j].id,
                        status: "accepted",
                    },
                })
            );
        }
    }

    await Promise.all(friendRelations);
    console.log(`✅ ${friendRelations.length} relations d'amitié créées.`);
}

async function main() {
    console.log("🌱 Seeding database...");
    await clearDatabase();

    const users = await generateUsers();
    await generateUserStats(users);
    await generateUserEvents(users);
    const games = await generateGames();
    await generateGameResults(users, games);
    await generateFriends(users);

    console.log("✅ Seeding terminé !");
}

main()
    .catch((e) => {
        console.error("❌ Erreur lors du seeding :", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
