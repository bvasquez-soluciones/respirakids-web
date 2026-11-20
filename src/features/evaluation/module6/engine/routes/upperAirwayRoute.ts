import type { ObservableAnswers, RouteResult } from "../types";

// Fuente: /modulo-6/rinofaringitis-aguda/, /modulo-6/rinosinusitis/, /modulo-6/otitis-media-aguda/
// *Faringoamigdalitis: pagina no accesible durante el desarrollo (bloqueo del sitio).
// No se incluyen criterios especificos para faringoamigdalitis; el dolor de garganta
// se trata dentro de esta ruta general de vias altas de forma conservadora,
// pendiente de revision cuando la fuente este disponible.

export function evaluateUpperAirwayRoute(answers: ObservableAnswers): RouteResult | null {
  const hasUpperAirwaySymptoms =
    answers.hasNasalCongestion || answers.hasEarPain || answers.hasSoreThroat || answers.hasCough;

  if (!hasUpperAirwaySymptoms) return null;

  const matchedSigns: string[] = [];
  let level: "verde" | "amarillo" = "verde";

  // Fuente rinosinusitis: sospecha bacteriana si sintomas persisten > 10 dias sin mejorar,
  // o fiebre alta con descarga nasal purulenta.
  if (answers.symptomsDurationDays !== undefined && answers.symptomsDurationDays > 10) {
    matchedSigns.push("Sintomas de mas de 10 dias sin mejorar");
    level = "amarillo";
  }
  if (answers.purulentNasalDischarge) {
    matchedSigns.push("Secrecion nasal purulenta");
    level = "amarillo";
  }
  if (answers.hasFever && answers.feverDurationHours !== undefined && answers.feverDurationHours > 48) {
    matchedSigns.push("Fiebre persistente por mas de 48 horas");
    level = "amarillo";
  }
  if (answers.hasEarPain) {
    matchedSigns.push("Dolor de oido reportado (posible otitis, requiere revision de oido por profesional)");
    level = "amarillo";
  }

  return {
    routeId: "upper_airway",
    routeLabel: "Posible cuadro de vias respiratorias altas",
    level,
    matchedSigns,
    recommendation:
      level === "amarillo"
        ? "Los signos descritos sugieren que conviene una valoracion medica en las proximas horas, especialmente si hay dolor de oido, secrecion purulenta o fiebre persistente."
        : "Cuadro leve de vias respiratorias altas. Mantenga hidratacion y observacion. Consulte si los sintomas empeoran o se prolongan mas de lo esperado.",
    sourceRef: "modulo-6/rinofaringitis-aguda, modulo-6/rinosinusitis, modulo-6/otitis-media-aguda",
  };
}