import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import TanstackProviders from "./util/TanstackProviders";

ReactDOM.render(
  <TanstackProviders>
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  </TanstackProviders>,
  document.getElementById("root")
);
