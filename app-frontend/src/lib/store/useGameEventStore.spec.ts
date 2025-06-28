// src/lib/store/useGameEventStore.spec.ts
import { useGameEventStore } from "./useGameEventStore";

describe("useGameEventStore", () => {
    it("devrait initialiser avec un timestamp", () => {
        const { lastUpdate } = useGameEventStore.getState();
        expect(typeof lastUpdate).toBe("number");
    });

    it("devrait mettre à jour lastUpdate quand notifyGameCompleted est appelé", () => {
        const before = useGameEventStore.getState().lastUpdate;

        return new Promise((resolve) => {
            setTimeout(() => {
                useGameEventStore.getState().notifyGameCompleted();
                const after = useGameEventStore.getState().lastUpdate;
                expect(after).toBeGreaterThan(before);
                resolve(undefined);
            }, 10); // on attend pour que le timestamp change
        });
    });
});
