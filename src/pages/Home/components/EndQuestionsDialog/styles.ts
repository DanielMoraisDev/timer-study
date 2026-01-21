import styled from "styled-components";

interface EndQuestionsDialogProps {
  open: boolean;
}

export const OverlayEndQuestionsDialog = styled.div<EndQuestionsDialogProps>`
  position: fixed;
  inset: 0;
  z-index: 20;
  background-color: rgb(0, 0, 0, 0.3);
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
`;

export const RootEndQuestionsDialog = styled.div<EndQuestionsDialogProps>`
  width: 360px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: max-content;
  padding: 20px;
  background-color: white;
  transition: transform 300ms ease;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};
  border: 1px solid black;
`;

export const ContainerEndQuestionsDialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    padding: 10px;
  }
`;

export const TitleContainerEndQuestionsDialog = styled.h2`
  font-size: 1.25rem;
`;

export const ContainerListQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 1.25rem;
  }
`;

export const ContainerQuestionListQuestions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #e2e2e2;
  }
`;

export const QuestionListQuestions = styled.h2`
  font-size: 1.25rem;
`;

export const SpanListQuestions = styled.span`
  font-size: 1rem;
`;

export const ButtonListQuestions = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
`;
