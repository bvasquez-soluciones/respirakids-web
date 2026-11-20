import { ShieldCheck, HeartHandshake, BookOpenCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "../../components/motion/RevealOnScroll";

const INDICATORS = [
  {
    icon: ShieldCheck,
    title: "Fuente oficial",
    text: "Contenido basado en el Ministerio de Salud de Colombia",
  },
  {
    icon: HeartHandshake,
    title: "Enfoque cercano",
    text: "Pensado junto a familias, sin tecnicismos innecesarios",
  },
  {
    icon: BookOpenCheck,
    title: "Siempre complementario",
    text: "Orienta, pero nunca reemplaza al profesional de salud",
  },
];

export function TrustSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      {/* Blob decorativo grande detras del contenido, no interfiere con lectura */}
      <div className="pointer-events-none absolute -right-32 top-1/2 -z-0 h-96 w-96 -translate-y-1/2 rounded-full bg-teal/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 -z-0 h-64 w-64 rounded-full bg-cta/6 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        {/* Bloque de texto grande, asimetrico */}
        <RevealOnScroll>
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
            Por qué confiar en RespiraKids
          </span>
          <h2 className="mb-5 font-heading text-3xl font-bold leading-tight text-petroleo sm:text-4xl">
            Orientación seria, construida sobre criterios reales de salud infantil
          </h2>
          <p className="max-w-lg text-petroleo/70">
            No improvisamos criterios clínicos. Cada nivel de riesgo y cada recomendación que ves en RespiraKids
            se apoya en fuentes oficiales, revisadas con cuidado, y con un límite claro: acompañar sin sustituir
            nunca la valoración de un profesional.
          </p>
        </RevealOnScroll>

        {/* Indicadores flotantes, escalonados, no en fila pareja */}
        <div className="relative flex flex-col gap-4">
          {INDICATORS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                style={{ marginLeft: i % 2 === 1 ? "1.5rem" : "0" }}
                className="flex items-start gap-4 rounded-card border border-gray-100 bg-white p-5 shadow-card"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-light text-teal">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-petroleo">{item.title}</h3>
                  <p className="text-sm text-petroleo/60">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
