import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheService {
    private cache = new Map<string, { data: unknown; expireAt: number }>();

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;
        if (entry.expireAt < Date.now()) {
            this.cache.delete(key);
            return null;
        }
        return entry.data as T;
    }

    set<T>(key: string, value: T, ttl = 3600): void {
        this.cache.set(key, { data: value, expireAt: Date.now() + ttl * 1000 });
    }

    delete(key: string): void {
        this.cache.delete(key);
    }
}
