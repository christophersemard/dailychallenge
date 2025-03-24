import { Test, TestingModule } from "@nestjs/testing";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";

describe("FriendsController", () => {
    let controller: FriendsController;
    let service: FriendsService;

    const mockService = {
        addFriend: jest.fn(),
        removeFriend: jest.fn(),
        respondFriendRequest: jest.fn(),
        getFriendsList: jest.fn(),
        getPendingRequests: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FriendsController],
            providers: [
                {
                    provide: FriendsService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<FriendsController>(FriendsController);
        service = module.get<FriendsService>(FriendsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call addFriend with correct params", async () => {
        mockService.addFriend.mockResolvedValue("ok");
        const result = await controller.addFriend({ userId: 1, friendId: 2 });
        expect(service.addFriend).toHaveBeenCalledWith(1, 2);
        expect(result).toBe("ok");
    });

    it("should call removeFriend with correct params", async () => {
        mockService.removeFriend.mockResolvedValue("removed");
        const result = await controller.removeFriend({
            userId: 1,
            friendId: 2,
        });
        expect(service.removeFriend).toHaveBeenCalledWith(1, 2);
        expect(result).toBe("removed");
    });

    it("should call respondFriendRequest with correct params", async () => {
        mockService.respondFriendRequest.mockResolvedValue("responded");
        const result = await controller.respondFriendRequest({
            userId: 1,
            friendId: 2,
            accept: true,
        });
        expect(service.respondFriendRequest).toHaveBeenCalledWith(1, 2, true);
        expect(result).toBe("responded");
    });

    it("should call getFriendsList with correct param", async () => {
        mockService.getFriendsList.mockResolvedValue("list");
        const result = await controller.getFriendsList({ userId: 1 });
        expect(service.getFriendsList).toHaveBeenCalledWith(1);
        expect(result).toBe("list");
    });

    it("should call getPendingRequests with correct param", async () => {
        mockService.getPendingRequests.mockResolvedValue("pending");
        const result = await controller.getFriendRequests({ userId: 1 });
        expect(service.getPendingRequests).toHaveBeenCalledWith(1);
        expect(result).toBe("pending");
    });
});
