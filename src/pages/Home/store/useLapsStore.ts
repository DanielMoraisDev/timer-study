import { create } from "zustand";

export type Lap = {
  id: string;
  question_id: string;
  seconds: number;
  correctly: boolean;
  last_question_seconds: number;
  reason?: string | null;
  createdAt: number;
};

type LapsState = {
  laps: Lap[];

  addLap: (
    question_id: string,
    seconds: number,
    correctly: boolean,
    last_question_seconds: number,
    reason?: string,
  ) => void;

  updateLap: (
    id: string,
    updates: {
      reason?: string | null;
      correctly?: boolean;
    },
  ) => void;
};

export const useLapsStore = create<LapsState>((set) => ({
  laps: [],
  addLap: (question_id, seconds, correctly, last_question_seconds, reason) =>
    set((state) => {
      const createLap = {
        id: crypto.randomUUID(),
        question_id: question_id,
        seconds: seconds,
        correctly: correctly,
        reason: reason,
        last_question_seconds: last_question_seconds,
        createdAt: Date.now(),
      };

      const updatedLaps = [createLap, ...state.laps];
      return {
        laps: updatedLaps,
      };
    }),
  updateLap: (id, updates) =>
    set((state) => {
      const updatedLaps = state.laps.map((lap) =>
        lap.id === id ? { ...lap, ...updates } : lap,
      );

      return {
        laps: updatedLaps,
      };
    }),
}));
