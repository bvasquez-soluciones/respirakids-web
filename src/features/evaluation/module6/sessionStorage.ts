import type { ChildProfile, ObservableAnswers } from "./types";

const STORAGE_KEY = "respirakids_module6_session";

interface StoredSession {
  profile: ChildProfile;
  answers: Partial<ObservableAnswers>;
}

export function saveModule6Session(data: StoredSession): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("No se pudo guardar el progreso temporal:", error);
  }
}

export function loadModule6Session(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch (error) {
    console.warn("No se pudo leer el progreso guardado:", error);
    return null;
  }
}

export function clearModule6Session(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sin efecto si no esta disponible.
  }
}