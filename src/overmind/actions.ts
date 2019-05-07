import { Action } from "overmind";
import { IPosition } from "./types";
import { ActionSheetIOS } from "react-native";

export const updateGist: Action<string> = ({ state }, newGist) => {
  state.gistId = newGist;
};

export const loadCode: Action = async ({ effects, state }) => {
  state.files = await effects.api.fetchGist(state.gistId);
};

export const setActiveTab: Action<number> = ({ state }, tabIndex) => {
  state.activeTab = tabIndex;
};

//PLAYBACK LOOP
export const loop: Action = async ({ state, actions }) => {
  state.currentPlaybackFrame += 1;
  await actions.continuePlayback();
};

export const continuePlayback: Action = async ({ state, actions }) => {
  let len = state.recording.length;
  let currentFrame = state.currentPlaybackFrame;
  let nextFrame = currentFrame + 1;
  state.activeTab = state.recording[currentFrame].activeTab;

  if (nextFrame < state.recording.length) {
    setTimeout(() => {
      actions.loop();
    }, state.recording[nextFrame].time - state.recording[currentFrame].time);
  } else {
    window.console.log("Playback complete!");
  }
};

//CONTROLS
export const onClickPlay: Action = ({ state, actions }) => {
  window.console.log("play");
  state.currentPlaybackFrame = 0;
  actions.continuePlayback();
};

export const onClickRecord: Action = ({ state }) => {
  window.console.log("record");
};

export const onClickStop: Action = ({ state }) => {
  window.console.log("stop");
};

export const setCursor: Action<IPosition> = ({ state }, position) => {
  state.cursorPosition = position;
  window.console.log(state.cursorPosition);
};
