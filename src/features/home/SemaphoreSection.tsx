import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "../../components/motion/RevealOnScroll";
import { SectionBackground } from "../../components/motion/SectionBackground";

const LEVELS = [
  {
    level: "verde" as const,
    title: "Riesgo bajo",
    subtitle: "Síntomas leves",
    icon: CheckCircle,
    signs: ["Congestión nasal leve", "Tos ocasional", "Buen apetito y actividad"],
    accent: "border-alerta-verde bg-green-50 text-alerta-verde",
  },
  {
    level: "amarillo" as const,
    title: "Riesgo moderado",
    subtitle: "Atención preventiva",
    icon: AlertTriangle,
    signs: ["Fiebre persistente", "Tos que interrumpe el sueño", "Respiración algo acelerada"],
    accent: "border-alerta-amarillo bg-amber-50 text-alerta-amarillo",
  },
  {
    level: "rojo" as const,
    title: "Alerta máxima",
    subtitle: "Urgencia pediátrica",
    icon: AlertCircle,
    signs: ["Hundimiento del pecho al respirar", "Coloración azulada", "Dificultad extrema para respirar"],
    accent: "border-alerta-rojo bg-red-50 text-alerta-rojo",
  },
];

export function SemaphoreSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24">
      <SectionBackground variant="semaphore-orbits" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <RevealOnScroll>
          <h2 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">
            Cómo interpretamos el nivel de riesgo
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mb-14 max-w-2xl text-petroleo/70">
            Una guía visual para reconocer la intensidad de los síntomas respiratorios y saber qué medidas tomar.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LEVELS.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.level} delay={i * 0.15} y={40}>
                <div className={`h-full rounded-card border-2 bg-white p-6 text-left shadow-card ${item.accent.split(" ")[0]}`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${item.accent}`}
                  >
                    <Icon size={26} />
                  </motion.div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-petroleo/50">
                    {item.subtitle}
                  </span>
                  <h3 className="mb-3 font-heading text-xl font-bold text-petroleo">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.signs.map((sign, j) => (
                      <motion.li
                        key={sign}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3 + j * 0.08 }}
                        className="flex items-center gap-2 text-sm text-petroleo/70"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${item.accent.split(" ")[0].replace("border-", "bg-")}`} />
                        {sign}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
