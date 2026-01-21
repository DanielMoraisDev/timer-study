import { useEffect, useRef, useState } from "react";
import {
  ButtonListQuestions,
  ContainerEndQuestionsDialog,
  ContainerListQuestions,
  ContainerQuestionListQuestions,
  OverlayEndQuestionsDialog,
  QuestionListQuestions,
  RootEndQuestionsDialog,
  SpanListQuestions,
  TitleContainerEndQuestionsDialog,
} from "./styles";
import { useEndQuestionsDialog } from "../../hooks/useEndQuestionsDialog";
import { useLapsStore } from "../../store/useLapsStore";
import { formatTime } from "../../../../utils/formatTime";
import { SquarePen } from "lucide-react";

const EndQuestionsDialog = () => {
  const [step, setStep] = useState<number>(0);
  const { open, closeDialog } = useEndQuestionsDialog();
  const laps = useLapsStore((s) => s.laps);
  const endQuestionsDialogRef = useRef<HTMLDivElement>(null);

  const handleCloseDialog = () => {
    closeDialog();
    setStep(0);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        endQuestionsDialogRef.current &&
        !endQuestionsDialogRef.current.contains(target)
      ) {
        handleCloseDialog();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <TitleContainerEndQuestionsDialog>
              Deseja mesmo finalizar as questões?
            </TitleContainerEndQuestionsDialog>
            <ContainerEndQuestionsDialog>
              <button onClick={() => setStep(1)}>Sim</button>
              <button onClick={handleCloseDialog}>Não</button>
            </ContainerEndQuestionsDialog>
          </>
        );
      case 1:
        return (
          <>
            <TitleContainerEndQuestionsDialog>
              Revise as questões que você fez!
            </TitleContainerEndQuestionsDialog>
            <ContainerListQuestions>
              {laps.map((lap) => (
                <>
                  <ContainerQuestionListQuestions>
                    <QuestionListQuestions key={lap.id}>
                      {lap.correctly ? "✅" : "❌"} - {lap.question_id} -{" "}
                      {lap.seconds < 60
                        ? null
                        : `${formatTime(lap.seconds).minutes} min. e `}
                      {formatTime(lap.seconds).seconds} segs.
                    </QuestionListQuestions>
                    <ButtonListQuestions>
                      <SquarePen />
                    </ButtonListQuestions>
                  </ContainerQuestionListQuestions>
                  {lap?.reason ? (
                    <SpanListQuestions>- {lap?.reason}</SpanListQuestions>
                  ) : null}
                </>
              ))}
            </ContainerListQuestions>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <OverlayEndQuestionsDialog open={open}>
        <RootEndQuestionsDialog ref={endQuestionsDialogRef} open={open}>
          {renderStepContent()}
        </RootEndQuestionsDialog>
      </OverlayEndQuestionsDialog>
    </>
  );
};

export default EndQuestionsDialog;
