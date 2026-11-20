import { SectionBackground } from "../../components/motion/SectionBackground";
import { RevealOnScroll } from "../../components/motion/RevealOnScroll";
import { LungVisual3D } from "../evaluation/3d/LungVisual3D";

export function BreathingSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24">
      <SectionBackground variant="petroleo-glow" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <RevealOnScroll>
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-3xl" />
            <LungVisual3D state="neutral" />
          </div>
        </RevealOnScroll>

        <div>
          <RevealOnScroll delay={0.1}>
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal-light">
              Cada respiración cuenta
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Aprende a observar cómo respira tu hijo o hija
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="mb-4 text-white/85">
              Contar la frecuencia respiratoria, observar si hay hundimiento del pecho, aleteo nasal o silbidos al respirar son señales clave para saber si un niño o niña necesita atención.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.4}>
            <p className="text-sm text-white/60">
              Esta información se basa en el Módulo 6 de la Herramienta Clínica Primera Infancia del Ministerio de Salud de Colombia.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
