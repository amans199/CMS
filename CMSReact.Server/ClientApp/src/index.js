import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

//   React Context Provider
import { CMSProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CMSProvider>
      <App />
    </CMSProvider>
  </BrowserRouter>
);
