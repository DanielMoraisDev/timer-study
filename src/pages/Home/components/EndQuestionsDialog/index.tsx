import { useEffect, useRef, useState } from "react";
import {
  ContainerEndQuestionsDialog,
  OverlayEndQuestionsDialog,
  RootEndQuestionsDialog,
  TitleContainerEndQuestionsDialog,
} from "./styles";
import { useEndQuestionsDialog } from "../../hooks/useEndQuestionsDialog";
import ListQuestions from "../ListQuestions";

const EndQuestionsDialog = () => {
  const [step, setStep] = useState<number>(0);
  const { open, closeDialog } = useEndQuestionsDialog();
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
            <ListQuestions />
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
