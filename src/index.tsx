import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

import "./normalize.css";
import "./global.css";

const ROOT = document.querySelector(".container");

ReactDOM.render(<App />, ROOT);
