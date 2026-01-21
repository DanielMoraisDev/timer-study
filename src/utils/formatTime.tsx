export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  return {
    hours: hours < 10 ? "0" + hours : hours,
    minutes: minutes < 10 ? "0" + minutes : minutes,
    seconds: seconds < 10 ? "0" + seconds : seconds,
  };
};
