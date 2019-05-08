import { State } from "./types";

export const state: State = {
  gistId: "",
  files: [
    { filename: "Hello", content: "//Put in a gist ID to get some files!" }
  ],
  activeTab: 0,
  cursorPosition: { column: 0, lineNumber: 0 },
  recording: [
    { time: 0, activeTab: 0, cursorPosition: { column: 1, lineNumber: 1 } },
    { time: 1000, activeTab: 0, cursorPosition: { column: 1, lineNumber: 2 } },
    { time: 2000, activeTab: 0, cursorPosition: { column: 1, lineNumber: 3 } },
    { time: 3000, activeTab: 0, cursorPosition: { column: 1, lineNumber: 4 } },
    { time: 4000, activeTab: 1, cursorPosition: { column: 1, lineNumber: 4 } },
    { time: 5000, activeTab: 2, cursorPosition: { column: 1, lineNumber: 1 } },
    { time: 6000, activeTab: 2, cursorPosition: { column: 17, lineNumber: 2 } },
    { time: 7000, activeTab: 2, cursorPosition: { column: 15, lineNumber: 4 } }
  ],
  isRecording: false,
  isPlaying: false,
  currentPlaybackFrame: 0,
  recordingStartTime: 0
};
