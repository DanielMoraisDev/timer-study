import { useEffect, useRef, useState } from "react";
import {
  ContainerEndQuestionsDialog,
  ContainerRevisionQuestionsEndQuestionsDialog,
  NameListQuestionsDownload,
  OverlayEndQuestionsDialog,
  RootEndQuestionsDialog,
  TitleContainerEndQuestionsDialog,
} from "./styles";
import { useEndQuestionsDialog } from "../../hooks/useEndQuestionsDialog";
import ListQuestions from "../ListQuestions";
import { useLapsStore } from "../../store/useLapsStore";

const performanceClassifierList = ["Perfeito!", "Precisa melhorar", "Péssimo!"];
const performanceGeneralClassifierList = [
  "Uma besta enjaulada",
  "Tá no caminho",
  "Melhore irmão",
  "Já sabe né, senta a bunda na cadeira!",
];

const EndQuestionsDialog = () => {
  const [step, setStep] = useState<number>(0);
  const { laps } = useLapsStore();
  const { open, closeDialog } = useEndQuestionsDialog();
  const endQuestionsDialogRef = useRef<HTMLDivElement>(null);
  const [nameArchive, setNameArchive] = useState<string>("");

  const handleCloseDialog = () => {
    closeDialog();
    setStep(0);
    setNameArchive("");
  };

  const classifyPerformance = (grade: number) => {
    if (grade < 91) {
      return performanceClassifierList[0];
    } else if (grade >= 91 && grade < 120) {
      return performanceClassifierList[1];
    } else if (grade > 121) {
      return performanceClassifierList[2];
    }
  };

  const classifyGeneralPerformance = (
    totalQuestions: number,
    fails: number,
  ) => {
    const percentageFails = (fails * 100) / totalQuestions;

    if (percentageFails < 1) return performanceGeneralClassifierList[0];
    if (percentageFails <= 10) return performanceGeneralClassifierList[1];
    if (percentageFails <= 50) return performanceGeneralClassifierList[2];
    return performanceGeneralClassifierList[3];
  };

  const handleDownloadQuestions = () => {
    if (nameArchive === "") return;

    const header = `RELATÓRIO DE QUESTÕES\nGerado em: ${new Date().toLocaleString()}\n`;
    const separator = "------------------------------------------\n";

    let correct = 0;
    const reasonCounts: Record<string, number> = {};

    const content = laps
      .map((lap) => {
        if (lap.correctly) {
          correct++;
        } else if (lap.reason) {
          reasonCounts[lap.reason] = (reasonCounts[lap.reason] || 0) + 1;
        }

        const duration = lap.seconds - lap.last_question_seconds;
        return (
          [
            `Questão: ${lap.question_id}`,
            `Status: ${lap.correctly ? "ACERTOU" : "ERROU"}`,
            `Tempo gasto: ${duration} segundos`,
            `Desempenho: ${classifyPerformance(duration)}`,
            lap.reason ? `- Motivo do erro: ${lap.reason}` : null,
          ]
            .filter(Boolean)
            .join("\n") + "\n"
        );
      })
      .join(`\n${separator}\n`);

    const generalPerformance = classifyGeneralPerformance(
      laps.length,
      laps.length - correct,
    );

    const topReasons = Object.entries(reasonCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([reason]) => reason);

    const status = `Questões acertadas: ${correct} - Questões erradas: ${laps.length - correct}\n\nOs motivos pelos quais errou mais questões:\n${topReasons.map((reason, index) => `${index + 1}º motivo: ${reason}\n`)}\nPerformance Geral: ${generalPerformance}\n`;

    const finalString = `${header}\n${status}\n${separator}\n${content}`;

    const blob = new Blob([finalString], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${nameArchive}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    handleCloseDialog();
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (
      endQuestionsDialogRef.current &&
      !endQuestionsDialogRef.current.contains(target)
    ) {
      handleCloseDialog();
    }
  };

  useEffect(() => {
    if (open && step == 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, step]);

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
            <ContainerRevisionQuestionsEndQuestionsDialog>
              <button onClick={() => setStep(2)}>Já Revisei</button>
              <button onClick={handleCloseDialog}>Cancelar</button>
            </ContainerRevisionQuestionsEndQuestionsDialog>
          </>
        );
      case 2:
        return (
          <>
            <TitleContainerEndQuestionsDialog>
              Baixe o relatório
            </TitleContainerEndQuestionsDialog>
            <NameListQuestionsDownload
              onChange={(e) => setNameArchive(e.target.value)}
              placeholder="Digite o nome do arquivo..."
            />
            <ContainerEndQuestionsDialog>
              <button
                disabled={nameArchive == ""}
                onClick={handleDownloadQuestions}
              >
                Baixar
              </button>
              <button onClick={handleCloseDialog}>Fechar</button>
            </ContainerEndQuestionsDialog>
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
