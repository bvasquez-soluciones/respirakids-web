import { Link } from "react-router-dom";
import {
  Bot,
  HeartPulse,
  Lock,
  MessagesSquare,
  Pill,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  UserRoundPlus,
  ClipboardList,
  Siren,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppButton, Badge, Card, IconCircle } from "../components/ui";
import { RevealOnScroll } from "../components/motion/RevealOnScroll";
import { SectionBackground } from "../components/motion/SectionBackground";
import babyImage from "../assets/hero-mother-baby.jpg";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const STEPS: Feature[] = [
  {
    icon: UserRoundPlus,
    title: "Crea el perfil de tu hijo",
    text: "Registras a tu niño o niña (menores de 5 años) con sus datos básicos y aceptas el uso de su información, niño por niño.",
  },
  {
    icon: ClipboardList,
    title: "Cuéntanos qué le pasa",
    text: "Marcas los síntomas en tarjetas sencillas e ilustradas, sin términos médicos. Toma pocos minutos.",
  },
  {
    icon: HeartPulse,
    title: "Recibe tu semáforo",
    text: "La aplicación te muestra verde, amarillo o rojo, qué señales lo causaron y qué hacer ahora. Si es rojo, te dice que vayas a urgencias.",
  },
];

const FEATURES: Feature[] = [
  {
    icon: HeartPulse,
    title: "Semáforo respiratorio",
    text: "Más de 25 reglas basadas en la Herramienta Clínica Primera Infancia (AIEPI) del Ministerio de Salud. Ante la duda, siempre sube de nivel, nunca baja.",
  },
  {
    icon: TrendingUp,
    title: "Historial y evolución",
    text: "Cada evaluación queda guardada. Indica si tu hijo mejoró, sigue igual o empeoró y la aplicación te guía en el siguiente paso.",
  },
  {
    icon: MessagesSquare,
    title: "Conexión con profesionales de la salud",
    text: "Escribe a un profesional de la salud desde la aplicación. Tú decides si lo autorizas a ver el expediente de tu hijo o prefieres solo conversar.",
  },
  {
    icon: Pill,
    title: "Plan de medicamentos",
    text: "Las indicaciones de tu profesional quedan organizadas y puedes marcar cada toma para llevar el control. La aplicación no receta: lo hace tu profesional.",
  },
  {
    icon: Bot,
    title: "Asistente que cita su fuente",
    text: "Resuelve tus dudas usando solo la información clínica de la fuente oficial y la cita. Si no la encuentra, te lo dice y te sugiere consultar.",
  },
  {
    icon: Lock,
    title: "Tus datos, bajo tu control",
    text: "Consentimiento por cada niño, cumplimiento de la Ley 1581 de 2012, sin venta de datos y con derecho a pedir que se borren.",
  },
];

export function AppPage() {
  return (
    <div>
      {/* Presentacion */}
      <div className="relative isolate overflow-hidden px-6 py-20">
        <SectionBackground variant="aqua-drift" />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <RevealOnScroll>
            <div className="mb-4">
              <Badge dotColor="teal">La aplicación</Badge>
            </div>
            <h1 className="mb-5 font-heading text-4xl font-bold text-petroleo sm:text-5xl">
              Cuidamos cada respiro de los más pequeños
            </h1>
            <p className="mb-4 text-lg text-petroleo/80">
              Cuando tu hijo tose de noche o respira distinto, lo más difícil es la duda: ¿es algo leve o debo ir ahora?
            </p>
            <p className="mb-8 text-petroleo/70">
              RespiraKids es la aplicación que te acompaña en ese momento. Entiende lo que observas, te da una orientación clara con un semáforo y te conecta con profesionales de la salud, sin reemplazarlos.
            </p>
            <div className="flex flex-wrap gap-3">
              <AppButton mode="register" />
              <AppButton mode="login" variant="secondary" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <img
              src={babyImage}
              alt="Madre sosteniendo a su bebé con tranquilidad"
              className="h-80 w-full rounded-card object-cover shadow-card md:h-[420px]"
            />
          </RevealOnScroll>
        </div>
      </div>

      {/* Como funciona */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <RevealOnScroll>
          <h2 className="mb-2 text-center font-heading text-3xl font-bold text-petroleo">Así funciona</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-petroleo/70">
            Tres pasos para pasar de la preocupación a saber qué hacer.
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <RevealOnScroll key={step.title} delay={i * 0.12}>
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cta font-heading font-bold text-white">
                    {i + 1}
                  </span>
                  <IconCircle icon={step.icon} color="teal" size="sm" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-petroleo">{step.title}</h3>
                <p className="text-sm text-petroleo/70">{step.text}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Semaforo */}
      <section className="relative isolate overflow-hidden px-6 py-20">
        <SectionBackground variant="warm-cream" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <RevealOnScroll>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-petroleo">Un semáforo que se entiende al instante</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card accentColor="verde">
              <h3 className="mb-1 font-heading font-semibold text-petroleo">Verde</h3>
              <p className="text-sm text-petroleo/70">No se encontraron señales de alerta. Sigue observando a tu hijo. Verde no significa «sano».</p>
            </Card>
            <Card accentColor="amarillo">
              <h3 className="mb-1 font-heading font-semibold text-petroleo">Amarillo</h3>
              <p className="text-sm text-petroleo/70">Conviene consultar o contactar a un profesional pronto. La aplicación te ayuda a hacerlo.</p>
            </Card>
            <Card accentColor="rojo">
              <h3 className="mb-1 font-heading font-semibold text-petroleo">Rojo</h3>
              <p className="text-sm text-petroleo/70">Hay signos de alarma. Ve a urgencias de inmediato; no esperes respuesta de la aplicación.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Funciones */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <RevealOnScroll>
          <h2 className="mb-2 text-center font-heading text-3xl font-bold text-petroleo">Todo lo que necesitas en un solo lugar</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-petroleo/70">
            Información clara, seguimiento y acompañamiento profesional, pensados para las familias.
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <RevealOnScroll key={f.title} delay={(i % 3) * 0.1}>
              <Card className="h-full">
                <div className="mb-4">
                  <IconCircle icon={f.icon} color="teal" size="md" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-petroleo">{f.title}</h3>
                <p className="text-sm text-petroleo/70">{f.text}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Profesionales */}
      <section className="relative isolate overflow-hidden px-6 py-20">
        <SectionBackground variant="mint-wave" />
        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <RevealOnScroll>
            <div className="mb-4 flex items-center gap-3">
              <IconCircle icon={Stethoscope} color="teal" size="md" />
              <Badge dotColor="teal">Respaldo profesional</Badge>
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-petroleo">Detrás de la aplicación hay profesionales de la salud</h2>
            <p className="mb-6 text-petroleo/70">
              Los profesionales ven en un panel qué niños necesitan atención primero, reciben tus solicitudes y te responden por mensajes, siempre con tu permiso para ver el expediente.
            </p>
            <Link to="/profesionales" className="font-semibold text-teal underline">
              Conoce cómo trabajan los profesionales →
            </Link>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <Card>
              <div className="flex items-start gap-3">
                <IconCircle icon={Siren} color="rojo" size="sm" />
                <p className="text-sm text-petroleo/70">
                  <strong className="text-petroleo">Importante:</strong> la atención es por mensajes y no es un canal de urgencias. Ante signos de alarma, acude de inmediato a un servicio de salud.
                </p>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </section>

      {/* Confianza y cierre */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <RevealOnScroll>
          <div className="mb-4 flex justify-center">
            <IconCircle icon={ShieldCheck} color="teal" size="lg" />
          </div>
          <h2 className="mb-3 font-heading text-3xl font-bold text-petroleo">Empieza hoy a cuidar cada respiro</h2>
          <p className="mx-auto mb-8 max-w-xl text-petroleo/70">
            Crea tu cuenta, registra a tu hijo y ten a la mano una orientación clara cuando más la necesites.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AppButton mode="register" />
            <AppButton mode="login" variant="secondary" />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-xs text-petroleo/50">
            RespiraKids es una herramienta de apoyo: no constituye un diagnóstico médico ni reemplaza la valoración de un profesional de la salud.
          </p>
        </RevealOnScroll>
      </section>
    </div>
  );
}
