import type { ObservableAnswers, ChildProfile, RouteResult } from "../types";

// Fuente: /modulo-6/tuberculosis/
// Criterio clinico de sospecha: tos >15 dias, fiebre >38C por 8 dias,
// perdida/no ganancia de peso, disminucion de actividad/juego, contacto con caso de TB.
// El diagnostico REQUIERE pruebas de laboratorio e imagenologia que no puede
// dar esta app; esta ruta solo genera una alerta de sospecha para valoracion,
// nunca confirma ni descarta tuberculosis.

export function evaluateTuberculosisAlertRoute(
  answers: ObservableAnswers,
  profile: ChildProfile
): RouteResult | null {
  const suggestiveSigns =
    answers.chronicCoughOver15Days ||
    answers.feverOver8Days ||
    answers.weightLossOrNoGain ||
    answers.decreasedActivityOrPlay ||
    profile.tbContactHistory;

  if (!suggestiveSigns) return null;

  const matchedSigns: string[] = [];

  if (answers.chronicCoughOver15Days) matchedSigns.push("Tos de mas de 15 dias de duracion");
  if (answers.feverOver8Days) matchedSigns.push("Fiebre mayor a 38C por mas de 8 dias");
  if (answers.weightLossOrNoGain) matchedSigns.push("Perdida de peso o no ganancia de peso reciente");
  if (answers.decreasedActivityOrPlay) matchedSigns.push("Disminucion notable del nivel de actividad o juego");
  if (profile.tbContactHistory) matchedSigns.push("Contacto conocido con una persona con tuberculosis");

  // Segun la fuente, contacto estrecho con caso de TB o combinacion de signos = amerita estudio.
  const level: "amarillo" = "amarillo";

  return {
    routeId: "tuberculosis_alert",
    routeLabel: "Signos que sugieren descartar Tuberculosis (no es un diagnostico)",
    level,
    matchedSigns,
    recommendation:
      "Los signos descritos coinciden con los que la guia oficial recomienda estudiar para descartar tuberculosis infantil. Esto NO es un diagnostico: requiere valoracion medica con examenes especializados.",
    sourceRef: "modulo-6/tuberculosis",
  };
}