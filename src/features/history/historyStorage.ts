import type { ChildProfile, EngineResult, RiskLevel } from "../evaluation/module6/types";

// El historial vive solo en este dispositivo (localStorage). No se envia a ningun servidor
// y no incluye nombres ni datos que identifiquen al nino.
const STORAGE_KEY = "respirakids_history_v1";
const MAX_ENTRIES = 50;

export interface HistoryEntry {
  id: string;
  date: string; // ISO
  ageMonths: number;
  level: RiskLevel;
  routeLabels: string[];
  signs: string[];
  generalDangerSigns: boolean;
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function addHistoryEntry(profile: ChildProfile, result: EngineResult): void {
  const entry: HistoryEntry = {
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    ageMonths: profile.ageMonths,
    level: result.overallLevel,
    routeLabels: result.routes.map((r) => r.routeLabel),
    signs: result.routes.flatMap((r) => r.matchedSigns).slice(0, 8),
    generalDangerSigns: result.generalDangerSignsPresent,
  };
  try {
    const next = [entry, ...loadHistory()].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn("No se pudo guardar el historial:", error);
  }
}

export function removeHistoryEntry(id: string): HistoryEntry[] {
  const next = loadHistory().filter((e) => e.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Sin efecto si no esta disponible.
  }
  return next;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sin efecto si no esta disponible.
  }
}
