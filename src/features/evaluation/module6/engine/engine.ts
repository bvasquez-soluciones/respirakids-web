import type { ChildProfile, ObservableAnswers, EngineResult, RiskLevel, RouteResult } from "./types";
import { detectGeneralDangerSigns } from "./generalDangerSigns";
import { evaluateUpperAirwayRoute } from "./routes/upperAirwayRoute";
import { evaluateLowerAirwayRoute } from "./routes/lowerAirwayRoute";
import { evaluateCrupRoute } from "./routes/crupRoute";
import { evaluateAsthmaRoute } from "./routes/asthmaRoute";
import { evaluatePertussisRoute } from "./routes/pertussisRoute";
import { evaluateTuberculosisAlertRoute } from "./routes/tuberculosisAlertRoute";

const LEVEL_RANK: Record<RiskLevel, number> = { verde: 0, amarillo: 1, rojo: 2 };

function highestLevel(levels: RiskLevel[]): RiskLevel {
  return levels.reduce((max, level) => (LEVEL_RANK[level] > LEVEL_RANK[max] ? level : max), "verde" as RiskLevel);
}

const DISCLAIMER =
  "Este resultado es una orientacion preliminar basada en signos observables, elaborada a partir del Modulo 6 " +
  "de la Herramienta Clinica Primera Infancia del Ministerio de Salud de Colombia. No es un diagnostico ni " +
  "reemplaza la valoracion de un profesional de la salud.";

export function evaluateModule6(profile: ChildProfile, answers: ObservableAnswers): EngineResult {
  const generalDangerSigns = detectGeneralDangerSigns(answers);

  // Regla de seguridad: cualquier signo general de alarma = ROJO inmediato,
  // sin importar el resto de respuestas.
  if (generalDangerSigns.length > 0) {
    const dangerRoute: RouteResult = {
      routeId: "general_danger_signs",
      routeLabel: "Signos generales de alarma detectados",
      level: "rojo",
      matchedSigns: generalDangerSigns,
      recommendation: "Acuda de inmediato al centro de urgencias pediatricas mas cercano.",
      sourceRef: "modulo-6 (senalado de forma repetida en varias condiciones del modulo)",
    };
    return {
      overallLevel: "rojo",
      routes: [dangerRoute],
      generalDangerSignsPresent: true,
      disclaimer: DISCLAIMER,
    };
  }

  const routes = [
    evaluateUpperAirwayRoute(answers),
    evaluateLowerAirwayRoute(answers, profile),
    evaluateCrupRoute(answers),
    evaluateAsthmaRoute(answers, profile),
    evaluatePertussisRoute(answers, profile),
    evaluateTuberculosisAlertRoute(answers, profile),
  ].filter((route): route is RouteResult => route !== null);

  const overallLevel: RiskLevel = routes.length > 0 ? highestLevel(routes.map((r) => r.level)) : "verde";

  return {
    overallLevel,
    routes,
    generalDangerSignsPresent: false,
    disclaimer: DISCLAIMER,
  };
}