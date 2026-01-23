import { SquarePen, Underline } from "lucide-react";
import {
  ButtonListQuestions,
  ContainerQuestionListQuestions,
  QuestionListQuestions,
  RootListQuestions,
  SpanListQuestions,
} from "./styles.ts";
import { formatTime } from "../../../../utils/formatTime";
import { useLapsStore } from "../../store/useLapsStore";
import { useUpdateQuestionDialog } from "../../hooks/useUpdateQuestionDialog.ts";
import { useEffect, useState } from "react";
import { useTimer } from "../../hooks/useTimer.ts";
import UpdateQuestionDialog from "../UpdateQuestionDialog/index.tsx";

const ListQuestions = () => {
  const { pause, resume } = useTimer();
  const laps = useLapsStore((s) => s.laps);
  const { openDialog: openDialogUpdateQuestions, open: openUpdateQuestions } =
    useUpdateQuestionDialog();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleUpdateQuestions = (selectedId: string) => {
    setSelectedId(selectedId);
    openDialogUpdateQuestions();
  };

  useEffect(() => {
    if (openUpdateQuestions) {
      pause();
      return;
    }

    setSelectedId(undefined);
    resume();
    return;
  }, [openUpdateQuestions]);

  return (
    <RootListQuestions>
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
            <ButtonListQuestions onClick={() => handleUpdateQuestions(lap.id)}>
              <SquarePen />
            </ButtonListQuestions>
          </ContainerQuestionListQuestions>
          {lap?.reason ? (
            <SpanListQuestions>- {lap?.reason}</SpanListQuestions>
          ) : null}
        </>
      ))}

      <UpdateQuestionDialog id={selectedId} />
    </RootListQuestions>
  );
};

export default ListQuestions;
