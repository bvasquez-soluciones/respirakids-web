import { AnimatePresence, motion } from "framer-motion";
import { LungVisual3D } from "./3d/LungVisual3D";
import { ProgressBar } from "./ProgressBar";
import { ProcessingScreen } from "./ProcessingScreen";
import { ChildProfileStep } from "./module6/ChildProfileStep";
import { FieldQuestionCard } from "./module6/FieldQuestionCard";
import { EngineResultScreen } from "./module6/EngineResultScreen";
import { useModule6Flow } from "./module6/useModule6Flow";

export function EvaluationFlow() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    result,
    errorMessage,
    startQuestions,
    answerCurrent,
  } = useModule6Flow();

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="mb-2 text-center font-heading text-xl font-bold text-petroleo sm:text-2xl md:text-3xl">
        Evaluación respiratoria
      </h1>
      <p className="mb-6 text-center text-sm text-petroleo/70 sm:text-base">
        Responde con calma. Solo tomará unos minutos.
      </p>

      <AnimatePresence mode="wait">
        {phase === "profile" && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ChildProfileStep onSubmit={startQuestions} />
          </motion.div>
        )}

        {phase === "questions" && currentQuestion && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center"
          >
            <LungVisual3D state="neutral" />
            <div className="mt-6 flex w-full flex-col items-center">
              {totalQuestions > 0 && <ProgressBar current={currentIndex + 1} total={totalQuestions} />}
              <div className="mt-8 flex w-full justify-center">
                <FieldQuestionCard question={currentQuestion} onAnswer={answerCurrent} />
              </div>
            </div>
          </motion.div>
        )}

        {phase === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProcessingScreen />
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center"
          >
            <EngineResultScreen result={result} />
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <p className="text-alerta-rojo">{errorMessage || "Ocurrió un error al procesar la evaluación."}</p>
            <p className="mt-2 text-sm text-petroleo/70">
              Verifica que el backend esté corriendo en http://localhost:4000 y recarga la página.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
