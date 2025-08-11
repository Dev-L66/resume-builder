
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    <Toaster/>
  </ThemeProvider>
  </BrowserRouter>
);
