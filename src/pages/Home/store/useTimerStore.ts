import { create } from "zustand";

type TimerStore = {
  totalSeconds: number;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  increment: () => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
  totalSeconds: 0,
  isPaused: false,
  pause: () => set({ isPaused: true }),
  resume: () => set({ isPaused: false }),
  reset: () => set({ isPaused: true, totalSeconds: 0 }),
  increment: () => set((state) => ({ totalSeconds: state.totalSeconds + 1 })),
}));
