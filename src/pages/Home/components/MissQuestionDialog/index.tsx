import { useEffect, useRef, useState } from "react";
import {
  ContainerMissQuestionDialog,
  ContainerInputs,
  OverlayMissQuestionDialog,
  RootMissQuestionDialog,
  ContainerInputsInput,
  ContainerInputsLabel,
  TitleContainerMissQuestionDialog,
} from "./styles";
import { useMissQuestionDialog } from "../../hooks/useMissQuestionDialog";
import { addQuestion } from "../../scripts/actionsStudy";
import { useActualQuestion } from "../../hooks/useActualQuestion";
import { useTimer } from "../../hooks/useTimer";
import { useLapsStore } from "../../store/useLapsStore";
import { global } from "../../../../global";

const MissQuestionDialog = () => {
  const { open, closeDialog } = useMissQuestionDialog();
  const missQuestionDialogRef = useRef<HTMLDivElement>(null);
  const laps = useLapsStore((s) => s.laps);
  const [selectedReason, setSelectedReason] = useState<string | undefined>(
    undefined,
  );
  const { totalSeconds } = useTimer();
  const { actualQuestionId, setActualQuestionId } = useActualQuestion();

  const handleCloseDialog = () => {
    setSelectedReason(undefined);
    closeDialog();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        missQuestionDialogRef.current &&
        !missQuestionDialogRef.current.contains(target)
      ) {
        handleCloseDialog();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <OverlayMissQuestionDialog open={open}>
        <RootMissQuestionDialog ref={missQuestionDialogRef} open={open}>
          <TitleContainerMissQuestionDialog>
            Por qual motivo você errou a questão?
          </TitleContainerMissQuestionDialog>
          <ContainerMissQuestionDialog>
            {global.reasons.map((item, idx) => (
              <ContainerInputs key={idx}>
                <ContainerInputsInput
                  id={item.id}
                  checked={selectedReason === item.id}
                  onChange={() => {
                    const lastSeconds = laps.length > 0 ? laps[0].seconds : 0;

                    setSelectedReason(item.id);
                    addQuestion(
                      actualQuestionId,
                      totalSeconds,
                      false,
                      lastSeconds,
                      item.reason,
                    );
                    setActualQuestionId();
                    handleCloseDialog();
                  }}
                />
                <ContainerInputsLabel>{item.reason}</ContainerInputsLabel>
              </ContainerInputs>
            ))}
          </ContainerMissQuestionDialog>
        </RootMissQuestionDialog>
      </OverlayMissQuestionDialog>
    </>
  );
};

export default MissQuestionDialog;
