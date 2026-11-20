import type { ObservableAnswers, ChildProfile, RouteResult } from "../types";

// Fuente: /modulo-6/tos-ferina/
// Definicion clinica de caso probable segun edad (INS). Se usan solo los
// elementos observables por el cuidador: tos paroxistica, "silbido" inspiratorio,
// vomito tras la tos, duracion de la tos.

export function evaluatePertussisRoute(
  answers: ObservableAnswers,
  profile: ChildProfile
): RouteResult | null {
  const hasPertussisPattern =
    answers.paroxysmalCoughFits || answers.whoopSound || answers.vomitingAfterCoughing;

  if (!hasPertussisPattern) return null;

  const matchedSigns: string[] = [];
  let level: "verde" | "amarillo" | "rojo" = "amarillo"; // fuente: siempre amerita evaluacion

  if (answers.paroxysmalCoughFits) {
    matchedSigns.push("Accesos de tos intensos y prolongados (tos paroxistica)");
  }
  if (answers.whoopSound) {
    matchedSigns.push('Sonido de "silbido" al inhalar despues de la tos');
  }
  if (answers.vomitingAfterCoughing) {
    matchedSigns.push("Vomito despues de los accesos de tos");
  }
  if (answers.coughDurationDays !== undefined && answers.coughDurationDays > 7) {
    matchedSigns.push("Tos de mas de 7 dias de duracion");
  }

  // Fuente: menores de 6 meses o esquema de vacunacion incompleto -> forma grave posible ("tos ferina maligna").
  if (profile.ageMonths < 6) {
    matchedSigns.push("Lactante menor de 6 meses (mayor riesgo de forma grave segun la fuente)");
    level = "rojo";
  }
  if (answers.cyanosis || answers.apnea) {
    level = "rojo"; // ya cubierto por signos generales de alarma, se refuerza aqui por contexto
  }

  return {
    routeId: "pertussis",
    routeLabel: "Posible cuadro compatible con Tos ferina",
    level,
    matchedSigns,
    recommendation:
      level === "rojo"
        ? "Por la edad del nino(a) y/o los signos descritos, se recomienda valoracion medica inmediata."
        : "El patron de tos descrito debe ser evaluado por un profesional de salud, especialmente si el nino(a) tiene el esquema de vacunacion incompleto.",
    sourceRef: "modulo-6/tos-ferina",
  };
}