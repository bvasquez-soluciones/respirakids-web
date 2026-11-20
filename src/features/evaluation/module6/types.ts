export interface ChildProfile {
  ageMonths: number;
  isPremature?: boolean;
  hasChronicCondition?: boolean;
  hasKnownAsthma?: boolean;
  tbContactHistory?: boolean;
}

export interface ObservableAnswers {
  cyanosis: boolean;
  unableToDrinkOrFeed: boolean;
  alteredConsciousness: boolean;
  visibleChestIndrawing: boolean;
  nasalFlaring: boolean;
  grunting: boolean;
  apnea: boolean;
  respiratoryRatePerMinute?: number;
  hasCough: boolean;
  hasBreathingDifficulty: boolean;
  hasNasalCongestion: boolean;
  hasEarPain: boolean;
  hasSoreThroat: boolean;
  hasFever: boolean;
  feverDurationHours?: number;
  purulentNasalDischarge?: boolean;
  symptomsDurationDays?: number;
  hoarseVoice?: boolean;
  barkingCough?: boolean;
  audibleStridorAtRest?: boolean;
  wheezingHeardByCaregiver?: boolean;
  recurrentWheezingEpisodes?: boolean;
  nocturnalSymptoms?: boolean;
  paroxysmalCoughFits?: boolean;
  whoopSound?: boolean;
  vomitingAfterCoughing?: boolean;
  coughDurationDays?: number;
  chronicCoughOver15Days?: boolean;
  feverOver8Days?: boolean;
  weightLossOrNoGain?: boolean;
  decreasedActivityOrPlay?: boolean;
}

export type RiskLevel = "verde" | "amarillo" | "rojo";

export interface RouteResult {
  routeId: string;
  routeLabel: string;
  level: RiskLevel;
  matchedSigns: string[];
  recommendation: string;
  sourceRef: string;
}

export interface EngineResult {
  overallLevel: RiskLevel;
  routes: RouteResult[];
  generalDangerSignsPresent: boolean;
  disclaimer: string;
}