import * as React from "react";
import styled from "styled-components";
import { Editor } from "./editor/Editor";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
`;

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <Main>
        <Editor value="wahoo" />
      </Main>
    );
  }
}
