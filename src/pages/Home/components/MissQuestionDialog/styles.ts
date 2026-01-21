import styled from "styled-components";

interface MissQuestionDialogProps {
  open: boolean;
}

export const OverlayMissQuestionDialog = styled.div<MissQuestionDialogProps>`
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

export const RootMissQuestionDialog = styled.div<MissQuestionDialogProps>`
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

export const ContainerMissQuestionDialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleContainerMissQuestionDialog = styled.h2`
  font-size: 1.25rem;
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export const ContainerInputsLabel = styled.label`
  font-size: 1rem;
`;

export const ContainerInputsInput = styled.input.attrs({ type: "radio" })`
  width: 20px;
  height: 20px;
  cursor: pointer;

  margin-right: 8px;
`;
