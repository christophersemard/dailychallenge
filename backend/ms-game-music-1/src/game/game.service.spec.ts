import { Test, TestingModule } from "@nestjs/testing";
import { GameService } from "./game.service";
import { ClientProxy } from "@nestjs/microservices";
import {
    NotFoundException,
    ConflictException,
    BadRequestException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { of } from "rxjs";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        gameMusic1Days: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            findMany: jest.fn(),
        },
        gameMusic1Tries: {
            count: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
        },
        dataArtist: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
        },
        gameResult: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));

describe("GameService - GameMusic1", () => {
    let service: GameService;
    let mockClient: ClientProxy;

    beforeEach(async () => {
        mockClient = { send: jest.fn() } as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                { provide: "USERS_SERVICE", useValue: mockClient },
            ],
        }).compile();

        service = module.get<GameService>(GameService);

        jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
            isVip: true,
            extraAttempt: 1,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getGameByDate", () => {
        it("should throw NotFoundException if no game found", async () => {
            jest.spyOn(prisma.gameMusic1Days, "findUnique").mockResolvedValue(
                null
            );
            await expect(
                service.getGameByDate(1, "2024-03-24")
            ).rejects.toThrow(NotFoundException);
        });

        it("should block past games if not VIP", async () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1);
            const dateIso = pastDate.toISOString().split("T")[0];

            jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
                isVip: false,
                extraAttempt: 0,
            });

            jest.spyOn(prisma.gameMusic1Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date(dateIso),
                artist: {
                    name: "Test Artist",
                    songs: [],
                    mainGenres: [],
                    albumsJson: [],
                },
            } as any);

            await expect(service.getGameByDate(1, dateIso)).rejects.toThrow(
                BadRequestException
            );
        });

        it("should return guessed=true if result found", async () => {
            jest.spyOn(prisma.gameMusic1Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date("2024-03-24"),
                artist: {
                    id: "a",
                    name: "Test",
                    songs: [],
                    mainGenres: [],
                    albumsJson: [],
                },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
            } as any);
            jest.spyOn(prisma.gameMusic1Tries, "findMany").mockResolvedValue([
                { id: 1 },
            ] as any);
            jest.spyOn(service as any, "getHints").mockResolvedValue({
                hints: {},
                lastHintUnlocked: null,
            });

            const result = await service.getGameByDate(1, "2024-03-24");
            expect(result.guessed).toBe(true);
            expect(result.attempts).toBe(1);
            expect(result.maxAttempts).toBe(11);
        });
    });

    describe("submitGuess", () => {
        it("should throw ConflictException if already answered", async () => {
            jest.spyOn(prisma.gameMusic1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                artist: {
                    id: "abc",
                    name: "Toto",
                    songs: [],
                    mainGenres: [],
                    albumsJson: [],
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
            } as any);

            await expect(service.submitGuess(1, "abc")).rejects.toThrow(
                ConflictException
            );
        });

        it("should register a correct guess", async () => {
            jest.spyOn(prisma.gameMusic1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                artist: {
                    id: "abc",
                    name: "Toto",
                    songs: [],
                    mainGenres: [],
                    albumsJson: [],
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameMusic1Tries, "count").mockResolvedValue(0);
            jest.spyOn(prisma.dataArtist, "findUnique").mockResolvedValue({
                name: "Toto",
            } as any);
            jest.spyOn(prisma.gameMusic1Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(mockClient, "send").mockReturnValue(
                of({ success: true })
            );

            const result = await service.submitGuess(1, "abc");
            expect(result.lastGuessed).toBe(true);
            expect(result.attempts).toBe(1);
            expect(result.maxAttempts).toBe(11);
        });

        it("should register failed guess and continue", async () => {
            jest.spyOn(prisma.gameMusic1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                artist: {
                    id: "abc",
                    name: "Toto",
                    songs: [],
                    mainGenres: [],
                    albumsJson: [],
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameMusic1Tries, "count").mockResolvedValue(1);
            jest.spyOn(prisma.dataArtist, "findUnique").mockResolvedValue({
                name: "Wrong",
            } as any);
            jest.spyOn(prisma.gameMusic1Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(service as any, "getHints").mockResolvedValue({
                hints: {},
                lastHintUnlocked: "song1",
            });

            const result = await service.submitGuess(1, "zzz");
            expect(result.lastGuessed).toBe(false);
            expect(result.newHint).toBe("song1");
            expect(result.attempts).toBe(2);
        });
    });

    describe("searchArtist", () => {
        beforeEach(async () => {
            jest.spyOn(prisma.dataArtist, "findMany").mockResolvedValue([
                {
                    id: "1",
                    name: "Daft Punk",
                    aliases: ["Dafter Punker", "Daft Punky"],
                },
                {
                    id: "2",
                    name: "Justice",
                    aliases: ["Justice Crew", "Justicier"],
                },
            ] as any);
        });
        it("should return list of artists", async () => {
            const result = await service.searchArtist("daft");
            expect(result[0].name).toBe("Daft Punk");
        });
    });
});
