import type { ObservableAnswers, ChildProfile, RouteResult } from "../types";

// Fuente: /modulo-6/asma/
// Se usan solo los elementos observables por el cuidador: patron de sibilancias
// recurrentes, sintomas nocturnos, desencadenantes tipicos (ejercicio, frio).
// Las escalas PASS y Pulmonary Score requieren auscultacion; NO se usan aqui.

export function evaluateAsthmaRoute(
  answers: ObservableAnswers,
  profile: ChildProfile
): RouteResult | null {
  const hasWheezingPattern =
    answers.wheezingHeardByCaregiver ||
    answers.recurrentWheezingEpisodes ||
    profile.hasKnownAsthma;

  if (!hasWheezingPattern) return null;

  const matchedSigns: string[] = [];
  let level: "verde" | "amarillo" | "rojo" = "verde";

  if (answers.wheezingHeardByCaregiver) {
    matchedSigns.push('"Pecho silbante" (sibilancias) audible sin instrumentos');
    level = "amarillo";
  }
  if (answers.recurrentWheezingEpisodes) {
    matchedSigns.push("3 o mas episodios de sibilancias en el ultimo anio");
    level = "amarillo";
  }
  if (answers.nocturnalSymptoms) {
    matchedSigns.push("Sintomas que despiertan al nino(a) en la noche");
    level = "amarillo";
  }
  if (profile.hasKnownAsthma && (answers.hasBreathingDifficulty || answers.wheezingHeardByCaregiver)) {
    matchedSigns.push("Nino(a) con asma conocida y sintomas actuales (posible exacerbacion)");
    level = "amarillo";
  }
  if (answers.visibleChestIndrawing && hasWheezingPattern) {
    matchedSigns.push("Sibilancias con tiraje visible (posible exacerbacion moderada a grave)");
    level = "rojo";
  }

  return {
    routeId: "asthma",
    routeLabel: "Posible cuadro de sibilancias recurrentes / asma",
    level,
    matchedSigns,
    recommendation:
      level === "rojo"
        ? "La combinacion de sibilancias con dificultad marcada para respirar requiere valoracion medica inmediata."
        : "Los signos sugieren un patron de sibilancias que conviene que evalue un profesional para definir manejo y seguimiento.",
    sourceRef: "modulo-6/asma",
  };
}