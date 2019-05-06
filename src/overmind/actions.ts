import { Action } from "overmind";

export const updateGist: Action<string> = ({ state }, newGist) => {
  state.gistId = newGist;
};

export const loadCode: Action = async ({ effects, state }) => {
  state.code = await effects.api.fetchGist(state.gistId);
};
