import { Action } from "overmind";
import { IPosition } from "./types";
import console = require("console");

export const updateGist: Action<string> = ({ state }, newGist) => {
  state.gistId = newGist;
};

export const loadCode: Action = async ({ effects, state }) => {
  state.files = await effects.api.fetchGist(state.gistId);
};

export const updateRecording: Action = ({ state }) => {
  state.recording = [
    ...state.recording,
    {
      time: Date.now() - state.recordingStartTime,
      activeTab: state.activeTab,
      cursorPosition: {
        column: state.cursorPosition.column,
        lineNumber: state.cursorPosition.lineNumber
      }
    }
  ];
};

//THE BIG TWO
export const setActiveTab: Action<number> = ({ state, actions }, tabIndex) => {
  state.activeTab = tabIndex;
  if (state.isRecording) {
    actions.updateRecording();
  }
};

export const onEditorCursorMove: Action<IPosition> = (
  { state, actions },
  position
) => {
  state.cursorPosition = position;
  if (state.isRecording) {
    actions.updateRecording();
  }
};

export const setCursor: Action<IPosition> = ({ state, actions }, position) => {
  state.cursorPosition = position;

  window.console.log("setting cursor");
};

//PLAYBACK LOOP
export const loop: Action = async ({ state, actions }) => {
  state.currentPlaybackFrame += 1;
  await actions.continuePlayback();
};

export const continuePlayback: Action = async ({ state, actions }) => {
  if (state.isPlaying) {
    let len = state.recording.length;
    let currentFrame = state.currentPlaybackFrame;
    let nextFrame = currentFrame + 1;

    window.console.log(state.recording[currentFrame]);

    actions.setActiveTab(state.recording[currentFrame].activeTab);
    actions.setCursor({
      column: state.recording[currentFrame].cursorPosition.column,
      lineNumber: state.recording[currentFrame].cursorPosition.lineNumber
    });

    if (nextFrame < state.recording.length) {
      setTimeout(() => {
        actions.loop();
      }, state.recording[nextFrame].time - state.recording[currentFrame].time);
    } else {
      window.console.log("Playback complete!");
      state.isPlaying = false;
    }
  }
};

//CONTROLS
export const onClickPlay: Action = ({ state, actions }) => {
  if (!state.isPlaying && !state.isRecording) {
    state.isPlaying = true;
    state.currentPlaybackFrame = 0;
    actions.continuePlayback();
  } else {
    state.isPlaying = false;
  }
};

export const onClickRecord: Action = ({ state, actions }) => {
  if (!state.isRecording && !state.isPlaying) {
    state.isRecording = true;
    state.recording = [];
    window.console.log("recording:", state.recording);
    state.recordingStartTime = Date.now();
    actions.updateRecording();
  } else {
    state.isRecording = false;
  }
};

export const onClickStop: Action = ({ state }) => {
  window.console.log("stop");
};

export const onClickSaveZip: Action<any> = async (
  { effects, state },
  audioBlob
) => {
  effects.fileTools.saveAsZip(JSON.stringify(state.recording), audioBlob);
};

export const onClickImportZip: Action<any> = async (
  { effects, state },
  file
) => {
  let unzipped = await effects.fileTools.loadAndUnzipFile(file);
  window.console.log(unzipped);
  state.recording = JSON.parse(unzipped.cursorRecording);
  state.audioRecording = unzipped.recordingAudio;
  state.audioURL = unzipped.audioURL;
  // state.recording = JSON.parse(await unzipped.files["recording.json"].asText());
  // window.console.log(unzipped);
  // state.audioRecording = unzipped.files["audio.ogg"];
  // state.audioRecording = unzipped.recordingAudio;
  // state.recording = unzipped.recordingJson;
};
