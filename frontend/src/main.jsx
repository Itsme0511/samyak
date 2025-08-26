
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Preloader from "./components/Preloader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Preloader message="Loading game..." /> }>
      <App />
    </Suspense>
  </React.StrictMode>
);
