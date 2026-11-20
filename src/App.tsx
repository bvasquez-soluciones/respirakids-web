import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { EvaluationPage } from "./pages/EvaluationPage";
import { AppPage } from "./pages/AppPage";
import { PreventionPage } from "./pages/PreventionPage";
import { SymptomsPage } from "./pages/SymptomsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AssistantPage } from "./pages/AssistantPage";
import { DiseasesPage } from "./pages/DiseasesPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ProfessionalsPage } from "./pages/ProfessionalsPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluacion" element={<EvaluationPage />} />
          <Route path="/aplicacion" element={<AppPage />} />
          <Route path="/prevencion" element={<PreventionPage />} />
          <Route path="/sintomas" element={<SymptomsPage />} />
          <Route path="/enfermedades" element={<DiseasesPage />} />
          <Route path="/historial" element={<HistoryPage />} />
          <Route path="/asistente" element={<AssistantPage />} />
          <Route path="/recursos" element={<ResourcesPage />} />
          <Route path="/profesionales" element={<ProfessionalsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;