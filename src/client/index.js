import React from "react";
import { render } from "react-dom";
import { App } from "common/App";

const renderApp = () => render(<App />, document.querySelector("#mount"));
renderApp();

if (module.hot) {
  module.hot.accept("common/App", () => {
    renderApp();
  });
}
