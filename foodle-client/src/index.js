import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import DarkThemeProvider from "./utils/ThemeProvider";
import "./assets/styles/globals.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DarkThemeProvider>
      <CssBaseline />
      <App />
    </DarkThemeProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register();
