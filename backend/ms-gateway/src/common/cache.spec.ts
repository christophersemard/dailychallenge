import { CacheService } from "./cache.service";

describe("CacheService", () => {
    let service: CacheService;

    beforeEach(() => {
        service = new CacheService();
    });

    it("should store and retrieve a value", () => {
        service.set("myKey", "hello", 10);
        const value = service.get<string>("myKey");
        expect(value).toBe("hello");
    });

    it("should return null for missing key", () => {
        const value = service.get<string>("notFound");
        expect(value).toBeNull();
    });

    it("should delete a key", () => {
        service.set("toDelete", 123, 10);
        service.delete("toDelete");
        const value = service.get("toDelete");
        expect(value).toBeNull();
    });

    it("should expire the value after TTL", () => {
        jest.useFakeTimers();
        service.set("temp", "data", 1); // 1s
        jest.advanceTimersByTime(1001); // ⏩ expire
        const value = service.get("temp");
        expect(value).toBeNull();
        jest.useRealTimers();
    });

    it("should not expire immediately", () => {
        jest.useFakeTimers();
        service.set("fresh", "yes", 10);
        jest.advanceTimersByTime(1000); // 1s later
        const value = service.get("fresh");
        expect(value).toBe("yes");
        jest.useRealTimers();
    });
});
