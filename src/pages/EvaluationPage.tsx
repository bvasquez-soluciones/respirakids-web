import { Link } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { AppButton, Card, IconCircle } from "../components/ui";
import { BACKEND_AVAILABLE } from "../config/app";
import { EvaluationFlow } from "../features/evaluation/EvaluationFlow";

export function EvaluationPage() {
  if (BACKEND_AVAILABLE) return <EvaluationFlow />;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <Card>
        <div className="mb-4 flex justify-center">
          <IconCircle icon={ClipboardCheck} color="teal" size="lg" />
        </div>
        <h1 className="mb-3 font-heading text-2xl font-bold text-petroleo">La evaluación está en la aplicación</h1>
        <p className="mb-6 text-petroleo/70">
          Desde la aplicación RespiraKids puedes registrar los síntomas de tu hijo y recibir tu semáforo. Mientras tanto, conoce los signos de alarma y cuándo consultar.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <AppButton mode="register" />
          <Link to="/sintomas" className="inline-flex items-center rounded-pill border-2 border-teal px-6 py-3 font-heading font-semibold text-petroleo hover:bg-teal-light">
            Ver síntomas
          </Link>
        </div>
      </Card>
    </div>
  );
}
