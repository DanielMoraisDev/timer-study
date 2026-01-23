import { useTimerStore } from "../store/useTimerStore";

export const useTimer = () => {
  const { totalSeconds, isPaused, pause, resume, reset } = useTimerStore();

  return { totalSeconds, isPaused, pause, resume, reset };
};
