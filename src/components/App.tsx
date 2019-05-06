import * as React from "react";
import styled from "styled-components";
import { Editor } from "./editor/Editor";

import {
  Title,
  GistGetter,
  GistButton,
  GistInput,
  Header,
  Wrapper,
  Nav,
  Tab
} from "./basics";

import { Controls } from "./Controls";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
`;

interface State {}

export class App extends React.Component<{}, State> {
  render() {
    return (
      <Wrapper>
        <Header>
          <Title>Code on tape</Title>
        </Header>
        <Nav>
          <Tab isActive={false}>One</Tab>
          <Tab isActive={false}>Two</Tab>
          <Tab isActive={false}>Three</Tab>
        </Nav>
        <Editor value="wahoo" />
        <Controls
          onClickRecord={() => console.log("record")}
          onClickStopRecord={() => console.log("stop record")}
          onClickPlay={() => console.log("play")}
        />
      </Wrapper>
    );
  }
}
