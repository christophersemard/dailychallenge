import { AdminService } from "./admin.service";
import prisma from "../prisma/prisma.service";
import { VipStatus, VipPlan } from "database";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        user: {
            count: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
        },
        vipSubscription: {
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
        },
    },
}));

describe("AdminService", () => {
    let adminService: AdminService;

    beforeEach(() => {
        adminService = new AdminService();
        jest.clearAllMocks();
    });

    describe("findAll", () => {
        it("should return paginated users without search", async () => {
            (prisma.user.count as jest.Mock).mockResolvedValue(1);
            (prisma.user.findMany as jest.Mock).mockResolvedValue([
                {
                    id: 1,
                    pseudo: "User",
                    email: "user@test.com",
                    deletedAt: null,
                    userStats: { xp: 100, level: 2, streak: 3 },
                    avatar: { url: "avatar.png" },
                    vipSubscriptions: [
                        {
                            status: "active",
                            endDate: new Date(Date.now() + 100000),
                        },
                    ],
                },
            ]);

            const result = await adminService.findAll({
                page: 1,
                limit: 10,
                search: "",
            });
            expect(result.data[0].pseudo).toBe("User");
            expect(result.data[0].vip?.status).toBe("active");
            expect(result.meta.total).toBe(1);
        });

        it("should apply search filter", async () => {
            (prisma.user.count as jest.Mock).mockResolvedValue(0);
            (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

            const result = await adminService.findAll({
                page: 1,
                limit: 10,
                search: "john",
            });

            expect(prisma.user.count).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        OR: [
                            {
                                pseudo: {
                                    contains: "john",
                                    mode: "insensitive",
                                },
                            },
                            {
                                email: {
                                    contains: "john",
                                    mode: "insensitive",
                                },
                            },
                        ],
                    },
                })
            );
            expect(result.data).toEqual([]);
        });
    });

    describe("update", () => {
        it("should update pseudo and email only", async () => {
            (prisma.user.update as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "NewPseudo",
                email: "new@email.com",
                deletedAt: null,
            });

            const result = await adminService.update({
                id: 1,
                pseudo: "NewPseudo",
                email: "new@email.com",
            });

            expect(prisma.user.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: 1 },
                    data: { pseudo: "NewPseudo", email: "new@email.com" },
                })
            );
            expect(result.user.pseudo).toBe("NewPseudo");
        });

        it("should disable the user if isActive is false", async () => {
            (prisma.user.update as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "User",
                email: "test",
                deletedAt: new Date(),
            });

            const result = await adminService.update({
                id: 1,
                isActive: false,
            });

            expect(result.user.isActive).toBe(false);
        });

        it("should create manual VIP if isVip is true and no existing", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );
            (prisma.user.update as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "User",
                email: "test",
                deletedAt: null,
            });

            await adminService.update({ id: 1, isVip: true });

            expect(prisma.vipSubscription.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.objectContaining({
                        userId: 1,
                        plan: VipPlan.manual,
                        status: VipStatus.active,
                    }),
                })
            );
        });

        it("should update endDate of manual VIP if already exists", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                id: 5,
                plan: VipPlan.manual,
            });
            (prisma.user.update as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "User",
                email: "test",
                deletedAt: null,
            });

            const customDate = new Date("2026-01-01");

            await adminService.update({
                id: 1,
                isVip: true,
                vipUntil: customDate,
            });

            expect(prisma.vipSubscription.update).toHaveBeenCalledWith({
                where: { id: 5 },
                data: { endDate: customDate },
            });
        });

        it("should cancel all manual VIPs if isVip is false", async () => {
            (prisma.user.update as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "User",
                email: "test",
                deletedAt: null,
            });

            await adminService.update({ id: 1, isVip: false });

            expect(prisma.vipSubscription.updateMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        userId: 1,
                        status: VipStatus.active,
                        plan: VipPlan.manual,
                    }),
                })
            );
        });
    });
});
