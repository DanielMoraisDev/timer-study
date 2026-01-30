import { useEffect, useMemo } from "react";
import { ContainerButtons, ContainerTimerDisplay, RootHome } from "./styles";
import { addQuestion } from "./scripts/actionsStudy";
import { useLapsStore } from "./store/useLapsStore";
import { useTimer } from "./hooks/useTimer";
import { useMissQuestionDialog } from "./hooks/useMissQuestionDialog";
import MissQuestionDialog from "./components/MissQuestionDialog";
import { useActualQuestion } from "./hooks/useActualQuestion";
import { useEndQuestionsDialog } from "./hooks/useEndQuestionsDialog";
import EndQuestionsDialog from "./components/EndQuestionsDialog";
import { formatTime } from "../../utils/formatTime";
import ListQuestions from "./components/ListQuestions";
import UpdateQuestionDialog from "./components/UpdateQuestionDialog";

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
    console.log(laps);
  }, [laps]);

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

      <ListQuestions />

      <MissQuestionDialog />
      <EndQuestionsDialog />
      <UpdateQuestionDialog />
    </RootHome>
  );
}

export default Home;
