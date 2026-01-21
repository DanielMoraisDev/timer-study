import { useLapsStore } from "../store/useLapsStore";

export const addQuestion = (
  questionId: string,
  totalSeconds: number,
  correctly: boolean,
  reason?: string,
) => {
  const question = {
    questionId: questionId,
    totalSeconds: totalSeconds,
    correctly: correctly,
    reason: reason,
  };

  const addLap = useLapsStore.getState().addLap;
  addLap(
    question.questionId,
    question.totalSeconds,
    question.correctly,
    question.reason,
  );
};
