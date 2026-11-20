import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, HeartPulse, MessagesSquare, TrendingUp } from "lucide-react";
import { RevealOnScroll } from "../../components/motion/RevealOnScroll";
import { SectionBackground } from "../../components/motion/SectionBackground";
import { AppButton, Badge, Card, IconCircle } from "../../components/ui";

const PILLARS = [
  {
    icon: ClipboardCheck,
    title: "Cuéntanos qué observas",
    text: "Marcas los síntomas de tu hijo en tarjetas sencillas, sin términos médicos.",
  },
  {
    icon: HeartPulse,
    title: "Recibe tu semáforo",
    text: "Verde, amarillo o rojo, con las señales que lo causaron y qué hacer ahora.",
  },
  {
    icon: TrendingUp,
    title: "Sigue su evolución",
    text: "Cada evaluación queda en su historial para ver si mejora o empeora.",
  },
  {
    icon: MessagesSquare,
    title: "Habla con profesionales",
    text: "Conéctate por mensajes con profesionales de la salud y decide qué información compartir.",
  },
];

export function WhatIsSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24">
      <SectionBackground variant="warm-cream" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <RevealOnScroll>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 flex justify-center">
              <Badge dotColor="teal">¿Qué es RespiraKids?</Badge>
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">
              La aplicación que te acompaña cuando tu hijo respira distinto
            </h2>
            <p className="mb-3 text-lg text-petroleo/80">
              Toser de noche, respirar rápido, rechazar la comida: lo más difícil no es el síntoma, es la duda de si es leve o si hay que ir ahora.
            </p>
            <p className="text-petroleo/70">
              RespiraKids te da una orientación clara, basada en la guía AIEPI del Ministerio de Salud, te ayuda a seguir la evolución de tu niño y te conecta con profesionales de la salud. Orienta y acompaña; nunca reemplaza al médico.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <RevealOnScroll key={pillar.title} delay={i * 0.1}>
              <Card className="h-full">
                <div className="mb-4">
                  <IconCircle icon={pillar.icon} color="teal" size="md" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-petroleo">{pillar.title}</h3>
                <p className="text-sm text-petroleo/70">{pillar.text}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <AppButton mode="register" />
            <Link to="/aplicacion" className="inline-flex items-center gap-2 font-semibold text-teal underline">
              Conoce la aplicación a fondo <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-petroleo/50">
            RespiraKids es una herramienta de apoyo: no diagnostica, no prescribe tratamientos ni reemplaza la valoración de un profesional de la salud.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
