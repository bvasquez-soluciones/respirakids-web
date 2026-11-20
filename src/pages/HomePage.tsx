import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Badge, Button, Card } from "../components/ui";
import { RevealOnScroll } from "../components/motion/RevealOnScroll";
import { SectionBackground } from "../components/motion/SectionBackground";
import { HeroSection } from "../features/home/HeroSection";
import { WhatIsSection } from "../features/home/WhatIsSection";
import { BreathingSection } from "../features/home/BreathingSection";
import { SemaphoreSection } from "../features/home/SemaphoreSection";
import { TrustSection } from "../features/home/TrustSection";
import missionImage from "../assets/mission-doctor-child.webp";

export function HomePage() {
  return (
    <div>
      <HeroSection />

      <WhatIsSection />

      <BreathingSection />

      <SemaphoreSection />

      <TrustSection />

      {/* MISION: imagen con profundidad (blob detras + tarjeta flotante), no un rectangulo plano */}
      <section className="relative isolate overflow-hidden px-6 py-24">
        <SectionBackground variant="warm-cream" />
        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 md:grid-cols-2">
          <RevealOnScroll>
            <div className="mb-4">
              <Badge dotColor="teal">Propósito y compromiso</Badge>
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-petroleo">Nuestra misión</h2>
            <p className="mb-4 text-petroleo/80">
              Acompañamos a las familias en la detección temprana de signos respiratorios, brindando información clara cuando más la necesitan.
            </p>
            <p className="mb-6 text-petroleo/70">
              RespiraKids nace como una respuesta serena y estructurada frente a la incertidumbre habitual ante cuadros respiratorios infantiles, basada en fuentes oficiales del Ministerio de Salud de Colombia.
            </p>
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-light text-teal">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="mb-1 font-heading font-semibold text-petroleo">
                    Orientación preventiva, siempre complementaria
                  </h3>
                  <p className="text-sm text-petroleo/70">
                    Nuestro contenido y sistema de clasificación sirven como guía rápida. En ningún caso sustituyen la evaluación, diagnóstico o prescripción de un profesional de la salud.
                  </p>
                </div>
              </div>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="relative mx-auto max-w-sm">
              {/* Blob organico detras de la foto, le da masa/profundidad */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-full w-full rounded-[2rem] bg-teal/12 blur-md" />
              <div className="pointer-events-none absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-cta/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-card shadow-card">
                <img
                  src={missionImage}
                  alt="Pediatra revisando con estetoscopio a un niño en un consultorio, mientras el niño sostiene un peluche"
                  className="h-80 w-full object-cover object-top sm:h-96"
                />
              </div>

              {/* Tarjeta flotante que se superpone al borde de la imagen */}
              <div className="absolute -bottom-6 -left-6 flex max-w-[220px] items-center gap-3 rounded-card border border-gray-100 bg-white p-4 shadow-card">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta/10 text-cta">
                  <Sparkles size={18} />
                </div>
                <p className="text-xs font-medium text-petroleo/80">
                  Atención temprana, con calidez y sin tecnicismos
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 text-center">
        <SectionBackground variant="mint-wave" />
        <RevealOnScroll>
          <div className="relative z-10">
            <h2 className="mb-4 font-heading text-3xl font-bold text-petroleo">
              ¿Listo para comenzar?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-petroleo/70">
              La evaluación toma solo unos minutos y te dará una orientación clara sobre el nivel de atención recomendado.
            </p>
            <Link to="/evaluacion">
              <Button variant="primary">Iniciar evaluación</Button>
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
