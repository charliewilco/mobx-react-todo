import * as React from "react";
import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");

const root = (
  <React.Fragment>
    <App />
  </React.Fragment>
);

render(root, rootElement);
