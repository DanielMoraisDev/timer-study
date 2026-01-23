import { useLapsStore } from "../store/useLapsStore";

export const addQuestion = (
  questionId: string,
  totalSeconds: number,
  correctly: boolean,
  last_question_seconds: number,
  reason?: string,
) => {
  const question = {
    question_id: questionId,
    seconds: totalSeconds,
    correctly: correctly,
    last_question_seconds: last_question_seconds,
    reason: reason,
  };

  const addLap = useLapsStore.getState().addLap;
  addLap(
    question.question_id,
    question.seconds,
    question.correctly,
    question.last_question_seconds,
    question.reason,
  );
};
