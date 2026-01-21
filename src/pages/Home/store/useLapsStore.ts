import { create } from "zustand";

export type Lap = {
  id: string;
  question_id: string;
  seconds: number;
  correctly: boolean;
  reason?: string;
  createdAt: number;
};

type LapsState = {
  laps: Lap[];

  addLap: (
    question_id: string,
    seconds: number,
    correctly: boolean,
    reason?: string,
  ) => void;
};

export const useLapsStore = create<LapsState>((set) => ({
  laps: [],

  addLap: (question_id, seconds, correctly, reason) =>
    set((state) => ({
      laps: [
        {
          id: crypto.randomUUID(),
          question_id: question_id,
          seconds: seconds,
          correctly: correctly,
          reason: reason,
          createdAt: Date.now(),
        },
        ...state.laps,
      ],
    })),
}));
