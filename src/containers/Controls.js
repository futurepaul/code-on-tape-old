import React, { Component } from "react";

import styled from "styled-components";

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

const Controls = ({ onClickRecord, onClickStopRecord, onClickPlay }) => (
  <FloatControls>
    <Play onClick={onClickPlay}> Play</Play>
    <Button>Stop</Button>
    <Button onClick={onClickRecord}>Record</Button>
    <Button onClick={onClickStopRecord}>Stop Record</Button>
    <Button>Clear</Button>
  </FloatControls>
);

export default Controls;
