import type { ObservableAnswers } from "./types";

// Fuente: mencionados de forma repetida como "signos de alarma generales"
// en /modulo-6/neumonia/, /bronquiolitis/, /laringotraqueitis-crup/,
// /tos-ferina/, /asma/, /tuberculosis/. Son los unicos signos que, estando
// presentes, la fuente trata como indicativos de gravedad en TODAS las
// condiciones del modulo, y son observables sin instrumentos.

export interface DangerSignCheck {
  key: keyof ObservableAnswers;
  label: string;
}

export const GENERAL_DANGER_SIGNS: DangerSignCheck[] = [
  { key: "cyanosis", label: "Coloracion azulada en labios o piel" },
  { key: "unableToDrinkOrFeed", label: "No puede beber liquidos o rechaza el alimento por completo" },
  { key: "alteredConsciousness", label: "Esta muy decaido(a), le cuesta despertar, o muy irritable sin consuelo" },
  { key: "visibleChestIndrawing", label: "Se le hunde el pecho al respirar (tiraje visible)" },
  { key: "nasalFlaring", label: "Aleteo nasal al respirar" },
  { key: "grunting", label: "Quejido con cada respiracion" },
  { key: "apnea", label: "Pausas al respirar" },
];

export function detectGeneralDangerSigns(answers: ObservableAnswers): string[] {
  return GENERAL_DANGER_SIGNS.filter((sign) => answers[sign.key] === true).map((s) => s.label);
}