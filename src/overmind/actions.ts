import { Action } from "overmind";
import { IPosition } from "./types";

export const updateGist: Action<string> = ({ state }, newGist) => {
  state.gistId = newGist;
};

export const loadCode: Action = async ({ effects, state }) => {
  state.files = await effects.api.fetchGist(state.gistId);
};

export const setActiveTab: Action<number> = ({ state }, tabIndex) => {
  state.activeTab = tabIndex;
};

//CONTROLS
export const onClickPlay: Action = ({ state }) => {
  window.console.log("play");
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
