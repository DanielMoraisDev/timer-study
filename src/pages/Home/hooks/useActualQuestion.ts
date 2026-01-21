import { create } from "zustand";

type ActualQuestionStore = {
  actualQuestionId: string;
  questionNumber: number;
  setActualQuestionId: () => void;
};

export const useActualQuestion = create<ActualQuestionStore>((set) => ({
  questionNumber: 1,
  actualQuestionId: "Q1",
  setActualQuestionId: () =>
    set((state) => {
      const nextNumber = state.questionNumber + 1;
      return {
        questionNumber: nextNumber,
        actualQuestionId: `Q${nextNumber}`,
      };
    }),
}));
