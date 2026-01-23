import { useEffect, useMemo } from "react";
import {
  ContainerButtons,
  ContainerListQuestions,
  ContainerTimerDisplay,
  RootHome,
} from "./styles";
import { addQuestion } from "./scripts/actionsStudy";
import { useLapsStore } from "./store/useLapsStore";
import { useTimer } from "./hooks/useTimer";
import { useMissQuestionDialog } from "./hooks/useMissQuestionDialog";
import AddQuestionDialog from "./components/MissQuestionDialog";
import { useActualQuestion } from "./hooks/useActualQuestion";
import { useEndQuestionsDialog } from "./hooks/useEndQuestionsDialog";
import EndQuestionsDialog from "./components/EndQuestionsDialog";
import { formatTime } from "../../utils/formatTime";

function Home() {
  const { totalSeconds, isPaused, pause, resume } = useTimer();
  const { actualQuestionId, setActualQuestionId } = useActualQuestion();
  const laps = useLapsStore((s) => s.laps);
  const { openDialog: openDialogMissQuestion, open: openMissQuestion } =
    useMissQuestionDialog();
  const { openDialog: openDialogEndQuestions, open: openEndQuestions } =
    useEndQuestionsDialog();

  const { hours, minutes, seconds } = useMemo(
    () => formatTime(totalSeconds),
    [totalSeconds],
  );

  const handleMissQuestion = () => {
    openDialogMissQuestion();
  };

  useEffect(() => {
    if (openMissQuestion) {
      pause();
      return;
    }

    resume();
    return;
  }, [openMissQuestion]);

  const handleEndQuestions = () => {
    openDialogEndQuestions();
  };

  useEffect(() => {
    if (openEndQuestions) {
      pause();
      return;
    }

    resume();
    return;
  }, [openEndQuestions]);

  return (
    <RootHome>
      <ContainerTimerDisplay>
        <h1>{hours}</h1>
        <span>:</span>
        <h1>{minutes}</h1>
        <span>:</span>
        <h1>{seconds}</h1>
      </ContainerTimerDisplay>

      <ContainerButtons>
        <button onClick={() => (isPaused ? resume() : pause())}>
          {isPaused ? "continuar" : "pausar"}
        </button>
        <button
          disabled={isPaused}
          onClick={() => {
            const lastSeconds = laps.length > 0 ? laps[0].seconds : 0;

            addQuestion(actualQuestionId, totalSeconds, true, lastSeconds);
            setActualQuestionId();
          }}
        >
          questão acertada
        </button>
        <button disabled={isPaused} onClick={() => handleMissQuestion()}>
          questão errada
        </button>
        <button disabled={laps.length < 1} onClick={() => handleEndQuestions()}>
          finalizar
        </button>
      </ContainerButtons>

      <ContainerListQuestions>
        {laps.map((lap) => {
          const durationSeconds =
            lap.seconds - (lap.last_question_seconds || 0);
          const time = formatTime(durationSeconds);

          return (
            <p key={lap.id}>
              {lap.correctly ? "✅" : "❌"} - {lap.question_id} - {time.hours}:
              {time.minutes}:{time.seconds}
            </p>
          );
        })}
      </ContainerListQuestions>

      <AddQuestionDialog />
      <EndQuestionsDialog />
    </RootHome>
  );
}

export default Home;
