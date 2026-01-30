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

    const data = {
      perFails: percentageFails + "%",
      avaliation: performanceGeneralClassifierList[3],
    };

    if (percentageFails < 1)
      data.avaliation = performanceGeneralClassifierList[0];
    if (percentageFails <= 10)
      data.avaliation = performanceGeneralClassifierList[1];
    if (percentageFails <= 50)
      data.avaliation = performanceGeneralClassifierList[2];
    data.avaliation = performanceGeneralClassifierList[3];

    return data;
  };

  const handleDownloadQuestions = () => {
    if (nameArchive === "") return;

    // 1. Cálculos de Performance (mantendo a lógica que você já tem)
    const correct = laps.filter((l) => l.correctly).length;
    const wrong = laps.length - correct;
    const generalPerformance = classifyGeneralPerformance(laps.length, wrong);

    const reasonCounts: Record<string, number> = {};
    laps.forEach((l) => {
      if (!l.correctly && l.reason) {
        reasonCounts[l.reason] = (reasonCounts[l.reason] || 0) + 1;
      }
    });

    const topReasons = Object.entries(reasonCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1) // Pegando apenas o principal motivo para ser mais direto
      .map(([reason]) => reason);

    // 2. Cabeçalho Minimalista com Emojis
    const header = `📊 RELATÓRIO DE ESTUDOS\n📅 ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}\n`;

    const summary = [
      `✅ Acertos: ${correct}`,
      `❌ Erros: ${wrong}`,
      `📉 Taxa de Erro: ${generalPerformance.perFails}`,
      `💬 Feedback: ${generalPerformance.avaliation}`,
      topReasons.length > 0
        ? `⚠️ Principal motivo de erro: ${topReasons[0]}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const separator = "\n" + "=".repeat(30) + "\n";

    // 3. Listagem de Questões Simplificada
    const content = laps
      .map((lap) => {
        const duration = lap.seconds - lap.last_question_seconds;
        const statusEmoji = lap.correctly ? "✅" : "❌";

        return [
          `${statusEmoji} Questão ${lap.question_id}`,
          `   ⏱️ ${duration}s | ${classifyPerformance(duration)}`,
          !lap.correctly && lap.reason ? `   📌 Motivo: ${lap.reason}` : null,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n\n");

    const finalString = `${header}${separator}\n${summary}\n${separator}\n${content}`;

    // 4. Lógica de Download (Blob)
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
