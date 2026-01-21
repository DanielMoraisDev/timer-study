import { GlobalStyle } from "./globalStyles.ts";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
