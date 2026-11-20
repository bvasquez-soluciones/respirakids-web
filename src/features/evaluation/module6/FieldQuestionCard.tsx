import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { FieldQuestion } from "./fieldQuestions";
import { Button } from "../../../components/ui";

interface FieldQuestionCardProps {
  question: FieldQuestion;
  onAnswer: (value: boolean | number) => void;
}

export function FieldQuestionCard({ question, onAnswer }: FieldQuestionCardProps) {
  const [numericValue, setNumericValue] = useState("");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.field}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <h2 className="mb-6 text-center font-heading text-xl font-semibold text-petroleo sm:text-2xl">
          {question.text}
        </h2>

        {question.inputType === "boolean" ? (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onAnswer(true)}
              className="flex-1 rounded-card border-2 border-gray-200 bg-white px-5 py-4 font-semibold text-petroleo transition-colors hover:border-teal"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => onAnswer(false)}
              className="flex-1 rounded-card border-2 border-gray-200 bg-white px-5 py-4 font-semibold text-petroleo transition-colors hover:border-teal"
            >
              No
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="number"
              min={0}
              value={numericValue}
              onChange={(e) => setNumericValue(e.target.value)}
              placeholder={question.numericPlaceholder}
              className="rounded-card border-2 border-gray-200 px-5 py-4 text-center text-lg focus:border-teal focus:outline-none"
            />
            <Button
              variant="primary"
              fullWidth
              disabled={numericValue === ""}
              onClick={() => onAnswer(Number(numericValue))}
            >
              Continuar
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
