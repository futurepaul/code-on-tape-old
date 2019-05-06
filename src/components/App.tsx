import * as React from "react";
import styled from "styled-components";
import { Editor } from "./editor/Editor";
import { Title, Header, Wrapper, Nav, Tab } from "./basics";
import { Controls } from "./Controls";
import { GistGetter } from "./GistGetter";

import { useOvermind } from "../overmind";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const App: React.FunctionComponent = () => {
  const { state } = useOvermind();

  return (
    <Wrapper>
      <Header>
        <Title>Code on tape</Title>
        <GistGetter />
      </Header>
      <Nav>
        <Tab isActive={true}>{state.code[0].filename}</Tab>
      </Nav>
      <Editor value={state.code[0].content} />
      <Controls
        onClickRecord={() => console.log("record")}
        onClickStopRecord={() => console.log("stop record")}
        onClickPlay={() => console.log("play")}
      />
    </Wrapper>
  );
};
