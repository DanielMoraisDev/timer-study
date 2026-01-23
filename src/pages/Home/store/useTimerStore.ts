import { create } from "zustand";

type TimerStore = {
  totalSeconds: number;
  isPaused: boolean;
  intervalId: number | null;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  increment: () => void;
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  totalSeconds: 0,
  isPaused: false,
  intervalId: null,
  pause: () => {
    const id = get().intervalId;
    if (id) {
      clearInterval(id);
    }
    set({ isPaused: true, intervalId: null });
  },
  resume: () => {
    const idGet = get().intervalId;
    if (idGet) return;

    const id = window.setInterval(() => {
      set((state) => ({ totalSeconds: state.totalSeconds + 1 }));
    }, 1000);
    set({ isPaused: false, intervalId: id });
  },
  reset: () => {
    const idGet = get().intervalId;
    if (idGet) clearInterval(idGet);

    set({ isPaused: true, totalSeconds: 0, intervalId: null });
  },
  increment: () => set((state) => ({ totalSeconds: state.totalSeconds + 1 })),
}));
