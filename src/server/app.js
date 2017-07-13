import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "common/App";

export const renderApp = (html, req, res) => {
  let appString = renderToString(<App />);
  let renderedApp = html.replace("<!--ssr-->", appString);
  res.status(200).send(renderedApp);
};
