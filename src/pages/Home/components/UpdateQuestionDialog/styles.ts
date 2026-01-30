import styled from "styled-components";

interface UpdateQuestionDialogProps {
  open: boolean;
}

export const OverlayUpdateQuestionDialog = styled.div<UpdateQuestionDialogProps>`
  position: fixed;
  inset: 0;
  z-index: 30;
  background-color: rgb(0, 0, 0, 0.3);
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
`;

export const RootUpdateQuestionDialog = styled.div<UpdateQuestionDialogProps>`
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

export const LabelContainerCorrectly = styled.label`
  font-size: 1.15rem;
`;

export const ContainerCorrectly = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const ContainerInputsCorrectly = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export const ContainerInputsLabelCorrectly = styled.label`
  font-size: 1rem;
`;

export const ContainerInputsInputCorrectly = styled.input.attrs({
  type: "radio",
})`
  width: 20px;
  height: 20px;
  cursor: pointer;

  margin-right: 8px;
`;

export const LabelContainerListMiss = styled.label`
  font-size: 1.15rem;
`;

export const ContainerListMiss = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleContainerUpdateQuestionDialog = styled.h2`
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

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    height: 35px;
    font-size: 0.85rem;
    text-transform: capitalize;

    &:hover {
      cursor: pointer;
    }
  }
`;
