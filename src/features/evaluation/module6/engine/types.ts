export type RiskLevel = "verde" | "amarillo" | "rojo";

export type AgeUnit = "months" | "years";

export interface ChildProfile {
  ageMonths: number; // edad total en meses, para simplificar comparaciones
  altitudeMeters?: number; // msnm de residencia, opcional
  isPremature?: boolean;
  hasChronicCondition?: boolean; // cardiopatia, fibrosis quistica, inmunodeficiencia, etc.
  hasKnownAsthma?: boolean;
  tbContactHistory?: boolean; // contacto con caso de tuberculosis
}

export interface ObservableAnswers {
  // Signos generales de alarma (fuente: multiples paginas del Modulo 6)
  cyanosis: boolean; // coloracion azulada de labios/piel
  unableToDrinkOrFeed: boolean; // no puede beber o rechaza el alimento totalmente
  alteredConsciousness: boolean; // decaido, dificil de despertar, o muy irritable sin consuelo
  visibleChestIndrawing: boolean; // tiraje/hundimiento visible al respirar
  nasalFlaring: boolean; // aleteo nasal
  grunting: boolean; // quejido con cada respiracion
  apnea: boolean; // pausas al respirar (relevante en lactantes pequenos)

  // Frecuencia respiratoria (el cuidador cuenta respiraciones por minuto)
  respiratoryRatePerMinute?: number;

  // Sintomas orientadores generales (pagina indice del Modulo 6)
  hasCough: boolean;
  hasBreathingDifficulty: boolean;
  hasNasalCongestion: boolean;
  hasEarPain: boolean;
  hasSoreThroat: boolean;

  // Fiebre
  hasFever: boolean;
  feverDurationHours?: number;

  // Especificos de vias altas (rinofaringitis / rinosinusitis / otitis)
  purulentNasalDischarge?: boolean;
  symptomsDurationDays?: number; // duracion de sintomas de via alta

  // Especificos de Crup (estridor - version observable sin fonendoscopio)
  hoarseVoice?: boolean; // voz o llanto ronco
  barkingCough?: boolean; // tos "perruna"
  audibleStridorAtRest?: boolean; // estridor audible SIN fonendoscopio, en reposo

  // Especificos de sibilancias / asma
  wheezingHeardByCaregiver?: boolean; // "pecho silbante" audible sin instrumentos
  recurrentWheezingEpisodes?: boolean; // 3 o mas episodios de sibilancias en el ultimo ano
  nocturnalSymptoms?: boolean; // tos o dificultad que despierta al nino en la noche
  symptomsTriggeredByExerciseOrCold?: boolean;

  // Especificos de tos ferina
  paroxysmalCoughFits?: boolean; // accesos de tos intensos y prolongados
  whoopSound?: boolean; // sonido de "silbido" al inspirar tras la tos
  vomitingAfterCoughing?: boolean;
  coughDurationDays?: number;

  // Especificos de alerta de tuberculosis (signos, no diagnostico)
  chronicCoughOver15Days?: boolean;
  feverOver8Days?: boolean;
  weightLossOrNoGain?: boolean;
  decreasedActivityOrPlay?: boolean;
}

export interface RouteResult {
  routeId: string;
  routeLabel: string; // orientacion NO diagnostica, ej. "Posible cuadro de vias altas"
  level: RiskLevel;
  matchedSigns: string[]; // signos que activaron esta ruta, para trazabilidad/UI
  recommendation: string; // texto de orientacion, sin farmacos ni dosis
  sourceRef: string; // subpagina del Modulo 6 en la que se basa
}

export interface EngineResult {
  overallLevel: RiskLevel;
  routes: RouteResult[]; // puede haber mas de una via aplicable
  generalDangerSignsPresent: boolean;
  disclaimer: string;
}