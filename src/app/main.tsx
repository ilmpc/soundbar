import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/index.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: Always present
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
