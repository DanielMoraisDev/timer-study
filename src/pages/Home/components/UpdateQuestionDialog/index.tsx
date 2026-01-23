import { useEffect, useRef, useState } from "react";
import {
  ContainerButtons,
  ContainerCorrectly,
  ContainerInputs,
  ContainerInputsCorrectly,
  ContainerInputsInput,
  ContainerInputsInputCorrectly,
  ContainerInputsLabel,
  ContainerInputsLabelCorrectly,
  ContainerListMiss,
  LabelContainerCorrectly,
  LabelContainerListMiss,
  OverlayUpdateQuestionDialog,
  RootUpdateQuestionDialog,
  TitleContainerUpdateQuestionDialog,
} from "./styles";
import { useUpdateQuestionDialog } from "../../hooks/useUpdateQuestionDialog";
import { global } from "../../../../global";
import { useLapsStore } from "../../store/useLapsStore";
import { updateQuestion } from "../../scripts/actionsStudy";

type UpdateQuestionDialogProps = {
  id: string | undefined;
};

const UpdateQuestionDialog = ({ id }: UpdateQuestionDialogProps) => {
  if (!id) return;

  const { open, closeDialog } = useUpdateQuestionDialog();
  const laps = useLapsStore((s) => s.laps);
  const selectedLap = laps.find((lap) => lap.id == id);
  const updateQuestionDialogRef = useRef<HTMLDivElement>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedCorrectly, setSelectedCorrectly] = useState<boolean>(true);

  const handleCloseDialog = () => {
    setSelectedCorrectly(true);
    setSelectedReason(null);
    closeDialog();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        updateQuestionDialogRef.current &&
        !updateQuestionDialogRef.current.contains(target)
      ) {
        handleCloseDialog();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleEndUpdateQuestion = () => {
    updateQuestion(id, selectedCorrectly, selectedReason);
  };

  return (
    <>
      <OverlayUpdateQuestionDialog open={open}>
        <RootUpdateQuestionDialog ref={updateQuestionDialogRef} open={open}>
          <TitleContainerUpdateQuestionDialog>
            Atualize a questão - {selectedLap?.question_id}
          </TitleContainerUpdateQuestionDialog>
          <LabelContainerCorrectly>Acertou?:</LabelContainerCorrectly>
          <ContainerCorrectly>
            <ContainerInputsCorrectly>
              <ContainerInputsInputCorrectly
                checked={selectedCorrectly === true}
                onChange={() => {
                  setSelectedCorrectly(true);
                }}
              />
              <ContainerInputsLabelCorrectly>Sim</ContainerInputsLabelCorrectly>
            </ContainerInputsCorrectly>
            <ContainerInputsCorrectly>
              <ContainerInputsInputCorrectly
                checked={selectedCorrectly === false}
                onChange={() => {
                  setSelectedCorrectly(false);
                }}
              />
              <ContainerInputsLabelCorrectly>Não</ContainerInputsLabelCorrectly>
            </ContainerInputsCorrectly>
          </ContainerCorrectly>
          {selectedCorrectly == false ? (
            <>
              <LabelContainerListMiss>Motivo do erro:</LabelContainerListMiss>
              <ContainerListMiss>
                {global.reasons.map((item, idx) => (
                  <ContainerInputs key={idx}>
                    <ContainerInputsInput
                      id={item.id}
                      checked={selectedReason === item.reason}
                      onChange={() => {
                        setSelectedReason(item.reason);
                      }}
                    />
                    <ContainerInputsLabel>{item.reason}</ContainerInputsLabel>
                  </ContainerInputs>
                ))}
              </ContainerListMiss>
            </>
          ) : null}
          <ContainerButtons>
            <button onClick={() => handleEndUpdateQuestion()}>Atualizar</button>
          </ContainerButtons>
        </RootUpdateQuestionDialog>
      </OverlayUpdateQuestionDialog>
    </>
  );
};

export default UpdateQuestionDialog;
