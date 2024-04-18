import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider, darkTheme } from "@adobe/react-spectrum";

const root = ReactDOM.createRoot(
  document.getElementById("react") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider theme={darkTheme}>
      <App />
    </Provider>
  </React.StrictMode>
);
