import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Bot, Send, User } from "lucide-react";
import { Badge } from "../components/ui";
import { SectionBackground } from "../components/motion/SectionBackground";
import {
  SUGGESTIONS,
  getAssistantAnswer,
  type AssistantAnswer,
} from "../features/assistant/assistantLogic";

interface Message {
  from: "user" | "bot";
  text: string;
  answer?: AssistantAnswer;
}

const WELCOME: Message = {
  from: "bot",
  text: "¡Hola! Soy el asistente de RespiraKids. Puedo orientarte sobre la aplicación, el semáforo, síntomas y prevención. No diagnostico ni recomiendo medicamentos. Si tu hijo tiene dificultad para respirar o labios azulados, acude a urgencias.",
};

export function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    const answer = getAssistantAnswer(trimmed);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: answer.text, answer },
    ]);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="aqua-drift" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Asistente de orientación</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">¿Tienes dudas? Pregúntanos</h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            Un asistente que responde preguntas sobre la aplicación y la salud respiratoria infantil, con información basada en fuentes oficiales.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-card border border-gray-100 bg-white shadow-card">
          <div className="flex h-[420px] flex-col gap-4 overflow-y-auto p-5" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    m.from === "user" ? "bg-cta/10 text-cta" : "bg-teal-light text-teal"
                  }`}
                >
                  {m.from === "user" ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.from === "user"
                      ? "bg-cta text-white"
                      : m.answer?.urgent
                        ? "border-2 border-alerta-rojo/40 bg-red-50 text-petroleo"
                        : "bg-gray-50 text-petroleo/90"
                  }`}
                >
                  {m.answer?.urgent && (
                    <p className="mb-1 flex items-center gap-1 font-semibold text-alerta-rojo">
                      <AlertTriangle size={14} /> Posible signo de alarma
                    </p>
                  )}
                  <p>{m.text}</p>
                  {m.answer?.link && (
                    <Link to={m.answer.link.to} className="mt-2 inline-block font-semibold text-teal underline">
                      {m.answer.link.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-gray-100 px-5 py-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-pill border border-teal/30 px-3 py-1.5 text-xs font-medium text-petroleo hover:border-teal hover:text-teal"
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-100 p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              placeholder="Escribe tu pregunta..."
              aria-label="Escribe tu pregunta"
              className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-teal focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cta text-white hover:bg-cta-hover"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-petroleo/50">
          Este asistente da información general con respuestas predefinidas. No diagnostica, no receta y no reemplaza la valoración de un profesional de la salud.
        </p>
      </div>
    </div>
  );
}
