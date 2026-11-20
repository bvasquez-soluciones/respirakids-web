import type { ObservableAnswers, RouteResult } from "../types";

// Fuente: /modulo-6/laringotraqueitis-crup/
// La escala de Westley completa requiere auscultacion y valoracion de conciencia
// por un examinador; aqui solo se usa lo observable sin instrumentos:
// estridor audible SIN fonendoscopio en reposo = signo de mayor severidad segun la fuente.

export function evaluateCrupRoute(answers: ObservableAnswers): RouteResult | null {
  const hasCrupPattern = answers.barkingCough || answers.hoarseVoice || answers.audibleStridorAtRest;
  if (!hasCrupPattern) return null;

  const matchedSigns: string[] = [];
  let level: "verde" | "amarillo" | "rojo" = "verde";

  if (answers.barkingCough) {
    matchedSigns.push('Tos seca tipo "perruna"');
    level = "amarillo";
  }
  if (answers.hoarseVoice) {
    matchedSigns.push("Voz o llanto ronco");
    level = "amarillo";
  }
  if (answers.audibleStridorAtRest) {
    // Fuente: estridor audible sin fonendoscopio en reposo puntua mas alto en la escala de Westley.
    matchedSigns.push("Estridor (sonido agudo al inspirar) audible en reposo, sin necesitar instrumentos");
    level = "rojo";
  }

  return {
    routeId: "crup",
    routeLabel: "Posible cuadro compatible con Crup (laringotraqueitis)",
    level,
    matchedSigns,
    recommendation:
      level === "rojo"
        ? "El estridor audible en reposo sugiere un cuadro que requiere valoracion medica inmediata."
        : "Los signos descritos sugieren un posible Crup leve. Mantenga la calma del nino(a) y consulte si el sonido al respirar aparece en reposo o empeora.",
    sourceRef: "modulo-6/laringotraqueitis-crup",
  };
}