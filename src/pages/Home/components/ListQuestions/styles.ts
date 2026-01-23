import styled from "styled-components";

export const RootListQuestions = styled.div`
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
