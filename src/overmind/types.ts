import { IPosition } from "monaco-editor";
export type IPosition = IPosition;

export type File = {
  filename: string;
  content: string;
};

export type State = {
  gistId: string;
  files: Array<File>;
  activeTab: number;
  cursorPosition: IPosition;
};
