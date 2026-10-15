import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ReferencesPage from "./pages/ReferencesPage.tsx";
import "./index.css";

// Its own page (referencer.html) so it works on Gigahost without URL rewriting.
createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <ReferencesPage />
  </LanguageProvider>,
);
