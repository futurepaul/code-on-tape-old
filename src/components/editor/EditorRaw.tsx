import * as React from "react";
import * as monaco from "monaco-editor";

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

interface IProps {
  onEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export class EditorRaw extends React.Component<IProps, {}> {
  private editor!: monaco.editor.IStandaloneCodeEditor;

  componentDidMount() {
    console.info("editor mounted");

    this.editor = monaco.editor.create(
      document.getElementById("monacoEditor")!,
      {
        language: "javascript",
        minimap: { enabled: false },
        theme: "vs-dark",
        fontSize: 16
      }
    );

    //not sure what this is for?
    this.editor.getModel()!.setEOL(monaco.editor.EndOfLineSequence.LF);

    this.props.onEditor(this.editor);
  }

  render() {
    return <div id="monacoEditor" style={{ flex: 1 }} />;
  }
}
