import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import PubSub from "pubsub-js";
import { myFakeJson } from "./api";

import thunk from "redux-thunk";

// actions.js
export const addGists = gists => ({
  type: "ADD_GISTS",
  gists
});

export const setActive = index => ({
  type: "SET_ACTIVE",
  index
});

export const readCursorPos = pos => ({
  type: "READ_CURSOR_POS",
  payload: pos
});

export const moveCursorPos = pos => ({
  type: "MOVE_CURSOR_POS",
  payload: pos
});

export const clearGists = () => ({ type: "CLEAR_GISTS" });

export const getGists = gistId => async dispatch => {
  try {
    // const url = `https://api.github.com/gists/${gistId}`;
    // const response = await fetch(url);
    // const responseBody = await response.json();
    // let gistFiles = responseBody.files;
    // let gists = Object.keys(gistFiles).map(key => gistFiles[key]);
    // console.log(gists);
    // dispatch(addGists(gists));
    dispatch(addGists(myFakeJson));
  } catch (error) {
    console.error(error);
    dispatch(clearGists());
  }
};

export const pubMoveCursorPos = pos => async dispatch => {
  PubSub.publish("MOVE_CURSOR");
  console.log(`moving cursor to: ${pos.line}, ${pos.ch}`);
  dispatch(moveCursorPos(pos));
};

// reducers.js

export const reducers = (state = {}, action) => {
  switch (action.type) {
    case "ADD_GISTS":
      return {
        ...state,
        active: 0,
        gists: action.gists
      };
    case "CLEAR_GISTS":
      return {
        ...state,
        gists: []
      };
    case "SET_ACTIVE":
      return {
        ...state,
        active: action.index
      };
    case "READ_CURSOR_POS":
      return {
        ...state,
        cursor: action.payload
      };
    case "MOVE_CURSOR_POS":
      return {
        ...state,
        cursor: action.payload
      };
    default:
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

// store.js
export function configureStore(
  initialState = { cursor: { line: 0, ch: 0 }, active: 0, gists: [] }
) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}

export const store = configureStore();
