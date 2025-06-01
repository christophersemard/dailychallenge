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
    await prisma.avatar.deleteMany();
    await prisma.avatarAsset.deleteMany();
    await prisma.color.deleteMany();
    await prisma.user.deleteMany();

    console.log("✅ Base de données vidée !");
}

async function generateAvatarAssets() {
    console.log("🎨 Création des assets d’avatar...");

    const assets = [
        {
            type: "shape",
            name: "Carré",
            url: "/assets/shapes/square.svg",
            level: 0,
            vipOnly: false,
        },
        {
            type: "shape",
            name: "Rond",
            url: "/assets/shapes/round.svg",
            level: 5,
            vipOnly: false,
        },
        {
            type: "eyes",
            name: "Grands yeux",
            url: "/assets/eyes/big.svg",
            level: 0,
            vipOnly: false,
        },
        {
            type: "mouth",
            name: "Sourire",
            url: "/assets/mouths/smile.svg",
            level: 0,
            vipOnly: false,
        },
        {
            type: "pattern",
            name: "Étoiles",
            url: "/assets/patterns/stars.svg",
            level: 10,
            vipOnly: true,
        },
    ];

    const createdAssets = await Promise.all(
        assets.map((asset) => prisma.avatarAsset.create({ data: asset }))
    );

    console.log(`✅ ${createdAssets.length} assets créés.`);
    return createdAssets;
}

async function generateColors() {
    console.log("🌈 Création des couleurs d’avatar...");

    const colors = [
        { name: "Rouge", value: "#ff0000", level: 0, vip: false },
        { name: "Bleu", value: "#0000ff", level: 0, vip: false },
        { name: "Or", value: "#ffd700", level: 20, vip: true },
    ];

    const createdColors = await Promise.all(
        colors.map((color) => prisma.color.create({ data: color }))
    );

    console.log(`✅ ${createdColors.length} couleurs créées.`);
    return createdColors;
}

async function generateUsers() {
    console.log("👤 Création des utilisateurs...");

    const users = await Promise.all(
        Array.from({ length: 10 }).map(async (_, i) => {
            const email = `user${i + 1}@test.com`;
            const password =
                "$2b$10$ggqTvEOUwkGW1ne26bH9zOWHBm1mLZpk81sSEMb8/FGa6g.TBJ03a"; // 🔐 "password123"

            return prisma.user.create({
                data: {
                    email,
                    password,
                    pseudo: `Player${i + 1}`,
                },
            });
        })
    );

    console.log(`✅ ${users.length} utilisateurs créés.`);
    return users;
}

async function generateAvatars(users, assets, colors) {
    console.log("🧑‍🎨 Création des avatars...");

    const shape = assets.find((a) => a.type === "shape");
    const eyes = assets.find((a) => a.type === "eyes");
    const mouth = assets.find((a) => a.type === "mouth");
    const pattern = assets.find((a) => a.type === "pattern");

    const colorShape = colors[0];
    const colorEyes = colors[1 % colors.length];
    const colorMouth = colors[2 % colors.length];
    const colorPattern = colors[0];

    const createdAvatars = await Promise.all(
        users.map((user) =>
            prisma.avatar.create({
                data: {
                    url: `/avatars/avatar_user_${user.id}.png`,
                    shapeId: shape.id,
                    eyesId: eyes.id,
                    mouthId: mouth.id,
                    patternId: pattern?.id || null,
                    colorShapeId: colorShape.id,
                    colorEyesId: colorEyes.id,
                    colorMouthId: colorMouth.id,
                    colorPatternId: colorPattern?.id || null,
                },
            })
        )
    );

    console.log(`✅ ${createdAvatars.length} avatars créés.`);
    return createdAvatars;
}

async function linkAvatarsToUsers(users, avatars) {
    console.log("🔗 Association avatar → user...");

    await Promise.all(
        users.map((user, i) =>
            prisma.user.update({
                where: { id: user.id },
                data: { avatarId: avatars[i].id },
            })
        )
    );

    console.log(`✅ Avatars liés à ${users.length} utilisateurs.`);
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
            );

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
        { id: 1, name: "Trouver le film", category: "Cinéma" },
        { id: 2, name: "Trouver le film", category: "Cinéma" },
        { id: 3, name: "Trouver le film", category: "Cinéma" },
        { id: 4, name: "Reconnaître un pays", category: "Géographie" },
        { id: 5, name: "Deviner un lieu", category: "Autres" },
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
                    gameCategoryId: categoryData.id,
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

    // const users = await generateUsers();
    // const assets = await generateAvatarAssets();
    // const colors = await generateColors();
    // const avatars = await generateAvatars(users, assets, colors);
    // await linkAvatarsToUsers(users, avatars);
    // await generateUserStats(users);
    // await generateUserEvents(users);
    const games = await generateGames();
    // await generateGameResults(users, games);
    // await generateFriends(users);

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
