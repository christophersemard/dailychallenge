// lib/store/useGameEventStore.ts
import { create } from "zustand";

type GameEventState = {
    lastUpdate: number;
    notifyGameCompleted: () => void;
};

export const useGameEventStore = create<GameEventState>((set) => ({
    lastUpdate: Date.now(),
    notifyGameCompleted: () => set({ lastUpdate: Date.now() }),
}));
