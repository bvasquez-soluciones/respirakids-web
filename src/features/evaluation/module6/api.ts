import type { ChildProfile, ObservableAnswers, EngineResult } from "./types";
import { evaluateModule6 } from "./engine/engine";
import { BACKEND_AVAILABLE } from "../../../config/app";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function classifyEvaluation(
  profile: ChildProfile,
  answers: ObservableAnswers
): Promise<EngineResult> {
  // Sin backend (version publicada) el motor de reglas corre en el propio navegador.
  // No se envia ni se guarda ningun dato fuera del dispositivo.
  if (!BACKEND_AVAILABLE) {
    return evaluateModule6(profile, answers);
  }

  const response = await fetch(`${API_BASE_URL}/api/evaluations/classify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile, answers }),
  });

  if (!response.ok) {
    throw new Error("No se pudo clasificar la evaluación. Intenta nuevamente.");
  }

  return response.json();
}
