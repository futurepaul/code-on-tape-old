import * as React from "react";
import styled from "styled-components";
import { Editor } from "./editor/Editor";
import { Controls } from "./Controls";
import { GistGetter } from "./GistGetter";
import { Nav } from "./Nav";

import { useOvermind } from "../overmind";
import { ActionSheetIOS } from "react-native";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 3rem 3rem 1fr;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Header = styled.header`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e6fbff;
`;

export const App: React.FunctionComponent = () => {
  const { state, actions } = useOvermind();

  return (
    <Wrapper>
      <Header>
        <Title>Code On Tape</Title>
        <GistGetter />
      </Header>
      <Nav />

      <Editor
        value={state.files[state.activeTab].content}
        cursor={state.cursorPosition}
        onEditorCursorMove={actions.onEditorCursorMove}
      />
      <Controls />
    </Wrapper>
  );
};
