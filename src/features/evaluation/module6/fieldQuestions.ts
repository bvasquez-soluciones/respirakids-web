import type { ObservableAnswers } from "./types";

export type FieldKey = keyof ObservableAnswers;

export interface FieldQuestion {
  field: FieldKey;
  text: string;
  inputType: "boolean" | "numeric";
  numericPlaceholder?: string;
  appliesIf?: (answers: Partial<ObservableAnswers>) => boolean;
}

const hasRespiratorySymptom = (a: Partial<ObservableAnswers>) =>
  Boolean(a.hasCough || a.hasBreathingDifficulty);

// Preguntas de ejemplo del flujo de evaluacion, mapeadas 1 a 1 con el motor
// de reglas clinicas (backend/src/clinical-rules/module6).
export const MODULE6_FIELD_QUESTIONS: FieldQuestion[] = [
  { field: "hasCough", text: "¿Tiene tos?", inputType: "boolean" },
  { field: "hasBreathingDifficulty", text: "¿Tiene dificultad para respirar?", inputType: "boolean" },
  { field: "hasNasalCongestion", text: "¿Tiene congestión nasal?", inputType: "boolean" },
  { field: "hasEarPain", text: "¿Tiene dolor de oído?", inputType: "boolean" },
  { field: "hasSoreThroat", text: "¿Tiene dolor de garganta?", inputType: "boolean" },
  { field: "hasFever", text: "¿Tiene fiebre?", inputType: "boolean" },
  {
    field: "feverOver8Days",
    text: "¿La fiebre ha durado más de 8 días?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.hasFever),
  },

  { field: "cyanosis", text: "¿Ha notado color azulado en labios o piel?", inputType: "boolean" },
  { field: "unableToDrinkOrFeed", text: "¿Rechaza por completo el alimento o los líquidos?", inputType: "boolean" },
  {
    field: "alteredConsciousness",
    text: "¿Está muy decaído(a), le cuesta despertar, o muy irritable sin consuelo?",
    inputType: "boolean",
  },
  { field: "visibleChestIndrawing", text: "¿Se le hunde el pecho al respirar?", inputType: "boolean" },
  { field: "nasalFlaring", text: "¿Tiene aleteo nasal al respirar?", inputType: "boolean" },
  { field: "grunting", text: "¿Hace un quejido con cada respiración?", inputType: "boolean" },
  { field: "apnea", text: "¿Ha notado pausas al respirar?", inputType: "boolean" },

  {
    field: "respiratoryRatePerMinute",
    text: "Cuente las respiraciones durante 1 minuto, con el niño(a) tranquilo(a). ¿Cuántas contó?",
    inputType: "numeric",
    numericPlaceholder: "Respiraciones por minuto",
    appliesIf: hasRespiratorySymptom,
  },

  { field: "barkingCough", text: "¿La tos suena como \"de perro\" (ronca y seca)?", inputType: "boolean", appliesIf: hasRespiratorySymptom },
  { field: "hoarseVoice", text: "¿Tiene la voz o el llanto ronco?", inputType: "boolean", appliesIf: hasRespiratorySymptom },
  {
    field: "audibleStridorAtRest",
    text: "¿Se escucha un sonido agudo al inhalar, incluso estando tranquilo (sin fonendoscopio)?",
    inputType: "boolean",
    appliesIf: hasRespiratorySymptom,
  },

  { field: "wheezingHeardByCaregiver", text: "¿Se escucha el pecho \"silbante\" al respirar?", inputType: "boolean", appliesIf: hasRespiratorySymptom },
  {
    field: "recurrentWheezingEpisodes",
    text: "¿Ha tenido 3 o más episodios de silbidos en el pecho en el último año?",
    inputType: "boolean",
    appliesIf: hasRespiratorySymptom,
  },
  {
    field: "nocturnalSymptoms",
    text: "¿La tos o la dificultad para respirar lo despiertan en la noche?",
    inputType: "boolean",
    appliesIf: hasRespiratorySymptom,
  },

  {
    field: "paroxysmalCoughFits",
    text: "¿Tiene accesos de tos muy intensos y prolongados?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.hasCough),
  },
  {
    field: "whoopSound",
    text: "¿Después de toser hace un sonido como \"silbido\" al inhalar?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.hasCough),
  },
  {
    field: "vomitingAfterCoughing",
    text: "¿Vomita después de los accesos de tos?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.hasCough),
  },

  {
    field: "chronicCoughOver15Days",
    text: "¿La tos ha durado más de 15 días?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.hasCough),
  },
  {
    field: "weightLossOrNoGain",
    text: "¿Ha perdido peso o no ha ganado peso en los últimos 3 meses?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.chronicCoughOver15Days),
  },
  {
    field: "decreasedActivityOrPlay",
    text: "¿Ha notado una disminución importante en su actividad o juego habitual?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.chronicCoughOver15Days),
  },

  {
    field: "purulentNasalDischarge",
    text: "¿La secreción nasal es espesa y de color amarillo/verde (purulenta)?",
    inputType: "boolean",
    appliesIf: (a) => Boolean(a.hasNasalCongestion),
  },
  {
    field: "symptomsDurationDays",
    text: "¿Cuántos días lleva con estos síntomas?",
    inputType: "numeric",
    numericPlaceholder: "Número de días",
    appliesIf: (a) => Boolean(a.hasNasalCongestion),
  },
];
