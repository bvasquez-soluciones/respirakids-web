import { useEffect, useMemo, useState } from "react";
import { MODULE6_FIELD_QUESTIONS } from "./fieldQuestions";
import { classifyEvaluation } from "./api";
import { saveModule6Session, loadModule6Session, clearModule6Session } from "./sessionStorage";
import { addHistoryEntry } from "../../history/historyStorage";
import type { ChildProfile, ObservableAnswers, EngineResult } from "./types";

export type Module6Phase = "profile" | "questions" | "processing" | "result" | "error";

export function useModule6Flow() {
  const [phase, setPhase] = useState<Module6Phase>("profile");
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [answers, setAnswers] = useState<Partial<ObservableAnswers>>({});
  const [result, setResult] = useState<EngineResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Restaurar progreso si el usuario recargo la pagina a mitad de la evaluación.
  useEffect(() => {
    const stored = loadModule6Session();
    if (stored) {
      setProfile(stored.profile);
      setAnswers(stored.answers);
      setPhase("questions");
    }
  }, []);

  // Guardar progreso mientras se responde, solo en fase de preguntas.
  useEffect(() => {
    if (phase === "questions" && profile) {
      saveModule6Session({ profile, answers });
    }
  }, [answers, profile, phase]);

  const applicableQuestions = useMemo(() => {
    return MODULE6_FIELD_QUESTIONS.filter((q) => !q.appliesIf || q.appliesIf(answers));
  }, [answers]);

  const answeredFields = Object.keys(answers);
  const currentQuestion = applicableQuestions.find((q) => !answeredFields.includes(q.field));
  const totalQuestions = applicableQuestions.length;
  const currentIndex = applicableQuestions.findIndex((q) => q.field === currentQuestion?.field);

  function startQuestions(childProfile: ChildProfile) {
    setProfile(childProfile);
    setPhase("questions");
  }

  async function answerCurrent(value: boolean | number) {
    if (!currentQuestion) return;

    const updatedAnswers = { ...answers, [currentQuestion.field]: value };
    setAnswers(updatedAnswers);

    const nextApplicable = MODULE6_FIELD_QUESTIONS.filter((q) => !q.appliesIf || q.appliesIf(updatedAnswers));
    const nextUnanswered = nextApplicable.find((q) => !Object.keys(updatedAnswers).includes(q.field));

    if (!nextUnanswered && profile) {
      setPhase("processing");
      try {
        const finalAnswers = buildFullAnswers(updatedAnswers);
        const engineResult = await classifyEvaluation(profile, finalAnswers);
        setResult(engineResult);
        addHistoryEntry(profile, engineResult);
        setPhase("result");
        clearModule6Session(); // Evaluación terminada; ya no hace falta el borrador temporal.
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Error desconocido");
        setPhase("error");
      }
    }
  }

  return {
    phase,
    profile,
    answers,
    currentQuestion,
    currentIndex,
    totalQuestions,
    result,
    errorMessage,
    startQuestions,
    answerCurrent,
  };
}

function buildFullAnswers(partial: Partial<ObservableAnswers>): ObservableAnswers {
  return {
    cyanosis: partial.cyanosis ?? false,
    unableToDrinkOrFeed: partial.unableToDrinkOrFeed ?? false,
    alteredConsciousness: partial.alteredConsciousness ?? false,
    visibleChestIndrawing: partial.visibleChestIndrawing ?? false,
    nasalFlaring: partial.nasalFlaring ?? false,
    grunting: partial.grunting ?? false,
    apnea: partial.apnea ?? false,
    hasCough: partial.hasCough ?? false,
    hasBreathingDifficulty: partial.hasBreathingDifficulty ?? false,
    hasNasalCongestion: partial.hasNasalCongestion ?? false,
    hasEarPain: partial.hasEarPain ?? false,
    hasSoreThroat: partial.hasSoreThroat ?? false,
    hasFever: partial.hasFever ?? false,
    ...partial,
  };
}