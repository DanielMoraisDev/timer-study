import styled from "styled-components";

export const RootHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 360px;
  margin-top: 15px;
`;

export const ContainerTimerDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h1 {
    font-size: 4rem;
  }

  span {
    font-size: 4rem;
  }
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

export const ContainerListQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 1.25rem;
  }
`;
