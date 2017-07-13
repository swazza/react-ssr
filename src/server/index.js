import fs from "fs";
import path from "path";
import express from "express";
import fetch from "isomorphic-fetch";
import { renderApp } from "./app";

let publicDir = `${process.cwd()}/dist/client`;
let app = express();
app.use("/public", express.static(publicDir));

fetch("http://localhost:24000/index.html", { headers: { pragma: "no-cache", "cache-control": "no-cache" } })
  .then(res => res.text())
  .then(html => {
    app.get("*", (req, res) => {
      renderApp(html, req, res);
    });

    app.listen(25000, () => {
      console.log("App Started on Port 25000");
    });
  });
