import type { ChildProfile, ObservableAnswers, EngineResult } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function classifyEvaluation(
  profile: ChildProfile,
  answers: ObservableAnswers
): Promise<EngineResult> {
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