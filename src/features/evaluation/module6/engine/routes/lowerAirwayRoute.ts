import type { ObservableAnswers, ChildProfile, RouteResult } from "../types";
import { isTachypneic } from "../respiratoryRateThresholds";

// Fuente: /modulo-6/neumonia/ y /modulo-6/bronquiolitis/
// Neumonia: "la taquipnea es el mejor signo unico predictor de neumonia";
// "el tiraje subcostal es un indicador de gravedad".
// Bronquiolitis: BAR (alto riesgo) si <2 meses, prematuridad <6 meses,
// enfermedad cronica de base, entre otros factores listados en la fuente.

export function evaluateLowerAirwayRoute(
  answers: ObservableAnswers,
  profile: ChildProfile
): RouteResult | null {
  if (!answers.hasCough && !answers.hasBreathingDifficulty) return null;

  const matchedSigns: string[] = [];
  let level: "verde" | "amarillo" | "rojo" = "verde";

  const tachypneic =
    answers.respiratoryRatePerMinute !== undefined &&
    isTachypneic(profile.ageMonths, answers.respiratoryRatePerMinute);

  if (tachypneic) {
    matchedSigns.push("Frecuencia respiratoria por encima de lo normal para su edad (taquipnea)");
    level = "amarillo";
  }

  if (answers.visibleChestIndrawing) {
    // Fuente: tiraje subcostal = indicador de gravedad en neumonia, independiente de la FR.
    matchedSigns.push("Tiraje/hundimiento del pecho visible");
    level = "rojo";
  }

  // Bronquiolitis de Alto Riesgo (BAR) - fuente: /modulo-6/bronquiolitis/
  const isBAR =
    profile.ageMonths < 2 ||
    (profile.isPremature && profile.ageMonths < 6) ||
    profile.hasChronicCondition === true;

  if (isBAR && (answers.hasCough || answers.hasBreathingDifficulty)) {
    matchedSigns.push("Factor de riesgo de Bronquiolitis de Alto Riesgo (BAR) presente");
    level = level === "verde" ? "amarillo" : level; // nunca baja el nivel, solo puede subirlo
  }

  return {
    routeId: "lower_airway",
    routeLabel: "Posible cuadro de vias respiratorias bajas",
    level,
    matchedSigns,
    recommendation:
      level === "rojo"
        ? "Los signos descritos (especialmente el hundimiento del pecho al respirar) requieren valoracion medica inmediata."
        : level === "amarillo"
          ? "Se recomienda valoracion medica en las proximas 24 horas para descartar compromiso de vias respiratorias bajas."
          : "Cuadro leve. Mantenga hidratacion y observacion. Consulte si aparece dificultad para respirar, tiraje o rechazo del alimento.",
    sourceRef: "modulo-6/neumonia, modulo-6/bronquiolitis",
  };
}