import * as React from "react";
import * as monaco from "monaco-editor";
import { EditorRaw } from "./EditorRaw";

import styled from "styled-components";

import { IPosition } from "../../overmind/types";

interface Props {
  value: string;
  cursor: monaco.IPosition;
}

interface State {
  editor?: monaco.editor.IStandaloneCodeEditor;
}

export class Editor extends React.Component<Props, State> {
  /**
   * this flag is set to true when changing the editor model
   * content programatically (i.e. not by typing).
   * when the flag is true the event handler for a human typing
   * will no-op
   */
  private locked = false;

  state: State = {
    editor: undefined
  };

  private onEditor = (editor: monaco.editor.IStandaloneCodeEditor) => {
    console.log("on editor");

    editor.setValue(this.props.value);

    editor.onDidChangeModelContent(event => {
      if (!this.locked) {
        console.log("editor changes", event.changes);
      }
    });

    editor.onDidChangeCursorPosition(event => {
      console.info(`cursor position changed ${event.position}`);
    });

    this.setState({ editor });
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value) {
      this.state.editor.setValue(this.props.value);
    }

    if (this.props.cursor !== prevProps.cursor) {
      this.state.editor.setPosition(this.props.cursor);
      this.state.editor.focus();
    }
  }

  render() {
    return <EditorRaw onEditor={this.onEditor} />;
  }
}
