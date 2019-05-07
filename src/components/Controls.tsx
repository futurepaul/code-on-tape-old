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

const Play = styled(Button)`
  background-color: white;
`;

interface Props {
  onClickRecord(): void;
  onClickStopRecord(): void;
  onClickPlay(): void;
}

export const Controls: React.FunctionComponent = () => {
  const { state, actions } = useOvermind();

  return (
    <FloatControls>
      <Play onClick={actions.onClickPlay}> Play</Play>
      <Button>Stop</Button>
      {/* <Button onClick={onClickRecord}>Record</Button>
      <Button onClick={onClickStopRecord}>Stop Record</Button> */}
      <Button>Clear</Button>
      <Button onClick={() => actions.setCursor({ lineNumber: 1, column: 3 })}>
        Move to (1, 3)
      </Button>
    </FloatControls>
  );
};
