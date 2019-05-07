import { State } from "./types";

export const state: State = {
  gistId: "",
  files: [
    { filename: "Hello", content: "//Put in a gist ID to get some files!" }
  ],
  activeTab: 0,
  cursorPosition: { column: 0, lineNumber: 0 },
  recording: [
    { time: 0, activeTab: 0 },
    { time: 1000, activeTab: 1 },
    { time: 2500, activeTab: 2 }
  ],
  currentPlaybackFrame: 0
};
