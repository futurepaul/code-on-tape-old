import { Overmind, IConfig } from "overmind";
import { state } from "./state";
import * as actions from "./actions";
import * as effects from "./effects";
// import * as effects from './effects'
import { createHook } from "overmind-react";

const config = {
  state,
  actions,
  effects
};

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

const app = new Overmind(
  config,
  process.env.NODE_ENV === "production"
    ? {
        devtools: false
      }
    : {}
);

export const useOvermind = createHook(app);
