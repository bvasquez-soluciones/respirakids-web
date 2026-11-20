import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Frown,
  Droplets,
  Flame,
  Lock,
  Pause,
  Play,
  ShieldCheck,
  Stethoscope,
  Wind,
} from "lucide-react";
import type { ReactNode } from "react";
import heroImage from "../../assets/hero-mother-baby.jpg";

interface Slide {
  id: string;
  title: string;
  text: string;
  visual: ReactNode;
}

const INTERVAL_MS = 6000;

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 bg-gradient-to-br from-teal-light via-white to-white p-6 pb-28 sm:p-8 sm:pb-32">
      {children}
    </div>
  );
}

function SymptomsVisual() {
  const items = [
    { icon: Frown, label: "Tos", on: true },
    { icon: Wind, label: "Respira rápido", on: true },
    { icon: Flame, label: "Fiebre", on: false },
    { icon: Droplets, label: "Congestión", on: true },
  ];
  return (
    <Panel>
      <p className="font-heading text-sm font-semibold text-petroleo/60">¿Qué observas en Sofía?</p>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon: Icon, label, on }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-card border-2 bg-white p-3 shadow-card ${
              on ? "border-teal" : "border-gray-100"
            }`}
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${on ? "bg-teal text-white" : "bg-gray-100 text-petroleo/50"}`}>
              {on ? <Check size={18} /> : <Icon size={18} />}
            </span>
            <span className="text-sm font-medium text-petroleo">{label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SemaphoreVisual() {
  return (
    <Panel>
      <div className="flex items-center gap-4 rounded-card bg-white p-4 shadow-card">
        <div className="flex flex-col gap-2 rounded-full bg-petroleo p-2">
          <span className="h-6 w-6 rounded-full bg-alerta-verde/30" />
          <span className="h-6 w-6 rounded-full bg-alerta-amarillo" />
          <span className="h-6 w-6 rounded-full bg-alerta-rojo/30" />
        </div>
        <div>
          <p className="font-heading text-lg font-bold text-petroleo">Nivel amarillo</p>
          <p className="text-sm text-petroleo/70">Conviene consultar a un profesional pronto.</p>
        </div>
      </div>
      <div className="rounded-card bg-white p-4 text-sm text-petroleo/70 shadow-card">
        <p className="mb-1 font-semibold text-petroleo">Señales detectadas</p>
        <p>Respiración rápida para su edad · Tos</p>
      </div>
    </Panel>
  );
}

function ProfessionalVisual() {
  return (
    <Panel>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-white">
          <Stethoscope size={20} />
        </span>
        <div>
          <p className="font-heading text-sm font-semibold text-petroleo">Profesional de la salud</p>
          <p className="flex items-center gap-1 text-xs text-alerta-verde">
            <span className="h-2 w-2 rounded-full bg-alerta-verde" /> Conectado
          </p>
        </div>
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-petroleo shadow-card">
        Hola, vi la evaluación de Sofía. ¿Desde cuándo tiene la tos?
      </div>
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cta p-3 text-sm text-white">
        Desde ayer en la noche. Hoy respira más rápido.
      </div>
      <div className="flex items-center gap-2 rounded-card border border-teal/30 bg-white/70 p-3 text-xs text-petroleo/70">
        <Lock size={14} className="shrink-0 text-teal" />
        Tú decides si compartes el expediente completo.
      </div>
    </Panel>
  );
}

function FollowUpVisual() {
  const rows = [
    { day: "Lun", dot: "bg-alerta-rojo", label: "Rojo" },
    { day: "Mié", dot: "bg-alerta-amarillo", label: "Amarillo" },
    { day: "Vie", dot: "bg-alerta-verde", label: "Verde" },
  ];
  return (
    <Panel>
      <p className="font-heading text-sm font-semibold text-petroleo/60">Evolución de Sofía</p>
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.day} className="flex items-center gap-3 rounded-card bg-white p-3 shadow-card">
            <span className={`h-3 w-3 rounded-full ${r.dot}`} />
            <span className="w-10 text-sm font-semibold text-petroleo">{r.day}</span>
            <span className="text-sm text-petroleo/70">{r.label}</span>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-2 rounded-card bg-white/70 p-3 text-xs text-petroleo/70">
        <ShieldCheck size={14} className="shrink-0 text-teal" />
        Datos protegidos según la Ley 1581 de 2012. No se venden.
      </p>
    </Panel>
  );
}

const SLIDES: Slide[] = [
  {
    id: "familia",
    title: "Cuidamos cada respiro",
    text: "Orientación clara para familias cuando la salud respiratoria de un niño genera dudas.",
    visual: (
      <img src={heroImage} alt="Madre sosteniendo a su bebé con tranquilidad" className="h-full w-full object-cover object-[65%_center]" />
    ),
  },
  {
    id: "sintomas",
    title: "Registra los síntomas fácil",
    text: "Tarjetas sencillas para contar lo que observas, sin términos médicos.",
    visual: <SymptomsVisual />,
  },
  {
    id: "semaforo",
    title: "Recibe tu semáforo",
    text: "Verde, amarillo o rojo, con las señales que lo causaron y qué hacer ahora.",
    visual: <SemaphoreVisual />,
  },
  {
    id: "profesionales",
    title: "Habla con profesionales",
    text: "Conéctate por mensajes con profesionales de la salud, con tu permiso.",
    visual: <ProfessionalVisual />,
  },
  {
    id: "seguimiento",
    title: "Sigue su evolución",
    text: "Un historial por niño para ver si mejora, con tus datos bajo tu control.",
    visual: <FollowUpVisual />,
  },
];

export function HeroCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userStopped, setUserStopped] = useState(false);

  const go = useCallback((next: number) => setIndex((next + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || userStopped || prefersReducedMotion) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, userStopped, prefersReducedMotion]);

  const slide = SLIDES[index];

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Qué ofrece la aplicación RespiraKids"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-white shadow-card sm:aspect-[5/5] lg:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
            aria-live={paused || userStopped ? "polite" : "off"}
          >
            {slide.visual}
          </motion.div>
        </AnimatePresence>

        {/* Titulo e informacion de la diapositiva */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-petroleo/90 via-petroleo/70 to-transparent p-5 pt-16 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-heading text-xl font-bold">{slide.title}</h2>
              <p className="mt-1 text-sm text-white/85">{slide.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir a: ${s.title}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-cta" : "w-2.5 bg-petroleo/25 hover:bg-petroleo/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={userStopped ? "Reanudar rotación automática" : "Pausar rotación automática"}
            onClick={() => setUserStopped(!userStopped)}
            className="rounded-full p-2 text-petroleo/60 hover:bg-white hover:text-petroleo"
          >
            {userStopped ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button type="button" aria-label="Anterior" onClick={() => go(index - 1)} className="rounded-full p-2 text-petroleo/60 hover:bg-white hover:text-petroleo">
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Siguiente" onClick={() => go(index + 1)} className="rounded-full p-2 text-petroleo/60 hover:bg-white hover:text-petroleo">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
