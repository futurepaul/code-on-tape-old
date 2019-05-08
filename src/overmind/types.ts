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
  recording: Array<PlaybackFrame>;
  isRecording: boolean;
  isPlaying: boolean;
  currentPlaybackFrame: number;
  recordingStartTime: number;
};

export type PlaybackFrame = {
  time: number;
  activeTab: number;
  cursorPosition: IPosition;
};
