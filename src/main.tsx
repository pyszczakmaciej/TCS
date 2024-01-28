import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppState from "./store/App.state.ts";

const token = AppState.getValue("token");

token
  ? (axios.defaults.headers.common = { Authorization: `Bearer ${token}` })
  : null;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
