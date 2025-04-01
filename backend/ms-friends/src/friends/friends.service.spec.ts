import { Test, TestingModule } from "@nestjs/testing";
import { FriendsService } from "./friends.service";
import prisma from "../prisma/prisma.service";
import { RpcException } from "@nestjs/microservices";

describe("FriendsService", () => {
    let service: FriendsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FriendsService],
        }).compile();

        service = module.get<FriendsService>(FriendsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("addFriend", () => {
        it("should throw if userId or friendId is invalid", async () => {
            await expect(service.addFriend(1, 1)).rejects.toThrow(RpcException);
        });

        it("should throw if user or friend does not exist", async () => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);
            await expect(service.addFriend(1, 2)).rejects.toThrow(
                "Utilisateur introuvable."
            );
        });

        it("should throw if friendship already exists", async () => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValue({} as any);
            jest.spyOn(prisma.friend, "findFirst").mockResolvedValue({} as any);

            await expect(service.addFriend(1, 2)).rejects.toThrow(
                "Vous êtes déjà amis"
            );
        });

        it("should create and return friend request", async () => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValue({} as any);
            jest.spyOn(prisma.friend, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.friend, "create").mockResolvedValue({
                id: 1,
            } as any);

            const result = await service.addFriend(1, 2);
            expect(result).toHaveProperty("message");
            expect(result.friendRequest.id).toBe(1);
        });
    });

    describe("removeFriend", () => {
        it("should throw if no friendship found", async () => {
            jest.spyOn(prisma.friend, "deleteMany").mockResolvedValue({
                count: 0,
            });

            await expect(service.removeFriend(1, 2)).rejects.toThrow(
                "Aucune relation d'amitié trouvée."
            );
        });

        it("should return success message if deleted", async () => {
            jest.spyOn(prisma.friend, "deleteMany").mockResolvedValue({
                count: 1,
            });

            const result = await service.removeFriend(1, 2);
            expect(result.message).toBe("Ami supprimé avec succès");
        });
    });

    describe("respondFriendRequest", () => {
        it("should throw if no pending request", async () => {
            jest.spyOn(prisma.friend, "findFirst").mockResolvedValue(null);

            await expect(
                service.respondFriendRequest(2, 1, true)
            ).rejects.toThrow("Aucune demande en attente.");
        });

        it("should update and return accepted request", async () => {
            jest.spyOn(prisma.friend, "findFirst").mockResolvedValue({
                id: 1,
                status: "pending",
            } as any);
            jest.spyOn(prisma.friend, "update").mockResolvedValue({
                id: 1,
                status: "accepted",
            } as any);

            const result = await service.respondFriendRequest(2, 1, true);
            expect(result.message).toBe("Ami accepté !");
            expect(result.friendRequest.status).toBe("accepted");
        });

        it("should update and return rejected request", async () => {
            jest.spyOn(prisma.friend, "findFirst").mockResolvedValue({
                id: 1,
                status: "pending",
            } as any);
            jest.spyOn(prisma.friend, "update").mockResolvedValue({
                id: 1,
                status: "rejected",
            } as any);
            jest.spyOn(prisma.friend, "delete").mockResolvedValue({
                id: 1,
                status: "rejected",
            } as any);

            const result = await service.respondFriendRequest(2, 1, false);
            expect(result.message).toBe("Demande refusée.");
            // La demande d'ami doit être supprimée
        });
    });

    describe("getFriendsList", () => {
        it("should return formatted friends list", async () => {
            jest.spyOn(prisma.friend, "findMany").mockResolvedValue([
                {
                    id: 1,
                    userId: 1,
                    friendId: 2,
                    status: "accepted",
                    createdAt: new Date(),
                    user: {
                        id: 1,
                        userStats: {
                            level: 1,
                        },
                        avatar: {
                            url: "url",
                        },
                        pseudo: "pseudo",
                    },
                    friend: {
                        id: 2,
                        userStats: {
                            level: 2,
                        },
                        avatar: {
                            url: "url",
                        },
                        pseudo: "pseudo",
                    },
                },
            ] as any);

            const result = await service.getFriendsList(1);
            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("id", 2);
            expect(result[0]).toHaveProperty("avatarUrl", "url");
        });
    });

    describe("getPendingRequests", () => {
        it("should return pending requests with requester info", async () => {
            // const requestsReceived = await prisma.friend.findMany({
            //     where: {
            //         friendId: userId,
            //         status: "pending",
            //     },
            //     select: {
            //         id: true,
            //         userId: true,
            //         friendId: true,
            //         status: true,
            //         createdAt: true,
            //         user: {
            //             select: {
            //                 email: true,
            //                 pseudo: true,
            //                 avatar: {
            //                     select: {
            //                         url: true,
            //                     },
            //                 },
            //                 userStats: {
            //                     select: {
            //                         level: true,
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // });

            // const requestsSent = await prisma.friend.findMany({
            //     where: {
            //         userId,
            //         status: "pending",
            //     },
            //     select: {
            //         id: true,
            //         userId: true,
            //         friendId: true,
            //         status: true,
            //         createdAt: true,
            //         friend: {
            //             select: {
            //                 email: true,
            //                 pseudo: true,
            //                 avatar: {
            //                     select: {
            //                         url: true,
            //                     },
            //                 },
            //                 userStats: {
            //                     select: {
            //                         level: true,
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // });

            // Voici les fonctions à mocker

            jest.spyOn(prisma.friend, "findMany").mockResolvedValue([
                {
                    id: 1,
                    userId: 2,
                    friendId: 1,
                    status: "pending",
                    createdAt: new Date(),
                    user: {
                        id: 1,
                        userStats: {
                            level: 1,
                        },
                        avatar: {
                            url: "url",
                        },
                        pseudo: "pseudo",
                    },
                    friend: {
                        id: 2,
                        userStats: {
                            level: 2,
                        },
                        avatar: {
                            url: "url",
                        },
                        pseudo: "pseudo",
                    },
                },
            ] as any);

            jest.spyOn(prisma.friend, "findMany").mockResolvedValue([
                {
                    id: 2,
                    userId: 1,
                    friendId: 5,
                    status: "pending",
                    createdAt: new Date(),
                    user: {
                        id: 1,
                        userStats: {
                            level: 1,
                        },
                        avatar: {
                            url: "url",
                        },
                        pseudo: "pseudo",
                    },
                    friend: {
                        id: 2,
                        userStats: {
                            level: 2,
                        },
                        avatar: {
                            url: "url",
                        },
                        pseudo: "pseudoAmi",
                    },
                },
            ] as any);

            const result = await service.getPendingRequests(1);
            expect(result.sent).toHaveLength(1);
            expect(result.sent[0].user.pseudo).toBe("pseudoAmi");
        });
    });
});
