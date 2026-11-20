// Fuente: /modulo-6/neumonia/ y /modulo-6/laringotraqueitis-crup/
// "Valores de Frecuencia Respiratoria en Funcion de la Edad"
// La fuente indica: "La frecuencia respiratoria debe medirse por un minuto,
// preferiblemente con el nino despierto sin llorar en brazos de los padres o cuidador."

export interface RespiratoryRateRange {
  minAgeMonths: number;
  maxAgeMonths: number; // exclusivo
  normalMin: number;
  normalMax: number;
  tachypneaThreshold: number; // por encima de este valor = taquipnea
  label: string;
}

export const RESPIRATORY_RATE_TABLE: RespiratoryRateRange[] = [
  { minAgeMonths: 0, maxAgeMonths: 2, normalMin: 30, normalMax: 50, tachypneaThreshold: 60, label: "<2 meses" },
  { minAgeMonths: 2, maxAgeMonths: 12, normalMin: 25, normalMax: 40, tachypneaThreshold: 50, label: "3-12 meses" },
  { minAgeMonths: 12, maxAgeMonths: 60, normalMin: 20, normalMax: 30, tachypneaThreshold: 40, label: "1-5 anios" },
  { minAgeMonths: 60, maxAgeMonths: Infinity, normalMin: 15, normalMax: 25, tachypneaThreshold: 30, label: ">5 anios" },
];

export function isTachypneic(ageMonths: number, respiratoryRate: number): boolean {
  const range = RESPIRATORY_RATE_TABLE.find(
    (r) => ageMonths >= r.minAgeMonths && ageMonths < r.maxAgeMonths
  );
  if (!range) return false;
  return respiratoryRate > range.tachypneaThreshold;
}