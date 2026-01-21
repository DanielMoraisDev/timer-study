import { useEffect } from "react";
import { useTimerStore } from "../store/useTimerStore";

export const useTimer = () => {
  const { totalSeconds, isPaused, pause, resume, reset, increment } =
    useTimerStore();

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      increment();
    }, 10);

    return () => clearInterval(interval);
  }, [isPaused, increment]);

  return { totalSeconds, isPaused, pause, resume, reset };
};
