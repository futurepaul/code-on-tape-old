import { File, IPosition, State } from "./types";

export const state: State = {
  gistId: "",
  files: [
    { filename: "Hello", content: "//Put in a gist ID to get some files!" }
  ],
  activeTab: 0,
  cursorPosition: { column: 0, lineNumber: 0 }
};
