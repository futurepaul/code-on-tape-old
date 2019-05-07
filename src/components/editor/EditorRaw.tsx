import * as React from "react";
import * as monaco from "monaco-editor";

import styled from "styled-components";
const EditorDiv = styled.div`
  width: 100%;
  height: 100%;
`;

(self as any).MonacoEnvironment = {
  getWorkerUrl: function(moduleId: string, label: string) {
    console.log("loading", moduleId, label);
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css") {
      return "./css.worker.bundle.js";
    }
    if (label === "html") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  }
};

interface Props {
  onEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export class EditorRaw extends React.Component<Props, {}> {
  private editor!: monaco.editor.IStandaloneCodeEditor;

  componentDidMount() {
    console.info("editor mounted");

    this.editor = monaco.editor.create(
      document.getElementById("monacoEditor")!,
      {
        language: "javascript",
        minimap: { enabled: false },
        theme: "vs-dark",
        fontSize: 16,
        readOnly: true
      }
    );

    //not sure what this is for?
    this.editor.getModel()!.setEOL(monaco.editor.EndOfLineSequence.LF);

    (window as any).addEventListener("resize", () => this.editor.layout());

    this.props.onEditor(this.editor);
  }

  render() {
    return <EditorDiv id="monacoEditor" />;
  }
}
