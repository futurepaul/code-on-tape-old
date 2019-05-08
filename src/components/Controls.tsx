import * as React from "react";

import styled from "styled-components";

import { useOvermind } from "../overmind";

const FloatControls = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #e6fbff;
  padding: 10px;
  border: 1px solid black;
  z-index: 10;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 5px;
  margin-right: 2px;
  border: 1px solid red;
  background-color: white;
`;

const Play = styled(Button)<ButtonProps>`
  background-color: ${(props: ButtonProps) =>
    props.isActive ? "red" : "white"};
`;

const Record = styled(Button)<ButtonProps>`
  background-color: ${(props: ButtonProps) =>
    props.isActive ? "red" : "white"};
`;

interface ButtonProps {
  readonly isActive: boolean;
}

export const Controls: React.FunctionComponent = () => {
  const { state, actions } = useOvermind();

  return (
    <FloatControls>
      <Play isActive={state.isPlaying} onClick={actions.onClickPlay}>
        {" "}
        Play
      </Play>
      <Record isActive={state.isRecording} onClick={actions.onClickRecord}>
        Record
      </Record>
    </FloatControls>
  );
};
