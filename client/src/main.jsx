import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { SockectProvider } from "./context/SockectProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SockectProvider>
        <App />
      </SockectProvider>
    </BrowserRouter>
  </React.StrictMode>
);
