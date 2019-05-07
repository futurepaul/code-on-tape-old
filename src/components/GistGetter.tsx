import * as React from "react";

import styled from "styled-components";
import { useOvermind } from "../overmind";

const GistInput = styled.input`
  font-size: 1rem;
  border: 1px solid black;
  margin-right: 2px;
  padding: 5px;
`;

const GistButton = styled.button`
  font-size: 1rem;
  border: 1px solid red;
  padding: 5px;
`;

export const GistGetter: React.FunctionComponent = () => {
  const { state, actions } = useOvermind();

  return (
    <div>
      <GistInput
        value={state.gistId}
        onChange={event => actions.updateGist(event.currentTarget.value)}
      />
      <GistButton onClick={event => actions.loadCode()}>Get Gist</GistButton>
    </div>
  );
};
