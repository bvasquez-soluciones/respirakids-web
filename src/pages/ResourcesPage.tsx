import { Link } from "react-router-dom";
import { ArrowRight, Bot, ClipboardCheck, History, Library, ShieldCheck, Stethoscope, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge, Card, IconCircle } from "../components/ui";
import { RevealOnScroll } from "../components/motion/RevealOnScroll";
import { SectionBackground } from "../components/motion/SectionBackground";
import { InfoAccordion } from "../features/resources/InfoAccordion";

interface ResourceLink {
  icon: LucideIcon;
  title: string;
  text: string;
  to: string;
}

const LEARN: ResourceLink[] = [
  { icon: ShieldCheck, title: "Prevención", text: "Hábitos en casa para reducir el riesgo de infecciones respiratorias.", to: "/prevencion" },
  { icon: Wind, title: "Síntomas y signos de alarma", text: "Qué observar y cuándo acudir a urgencias o consultar.", to: "/sintomas" },
  { icon: Stethoscope, title: "Enfermedades respiratorias", text: "Fichas de las condiciones más frecuentes en la infancia.", to: "/enfermedades" },
];

const TOOLS: ResourceLink[] = [
  { icon: ClipboardCheck, title: "Evaluación con semáforo", text: "Orientación sobre el nivel de atención recomendado.", to: "/evaluacion" },
  { icon: History, title: "Historial del niño", text: "Seguimiento de tus evaluaciones, guardado en tu dispositivo.", to: "/historial" },
  { icon: Bot, title: "Asistente de orientación", text: "Respuestas a dudas sobre la aplicación y la salud respiratoria.", to: "/asistente" },
];

function LinkGrid({ items }: { items: ResourceLink[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {items.map((item, i) => (
        <RevealOnScroll key={item.to} delay={i * 0.1}>
          <Link to={item.to} className="block h-full">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <div className="mb-4">
                <IconCircle icon={item.icon} color="teal" size="md" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-petroleo">{item.title}</h3>
              <p className="mb-3 text-sm text-petroleo/70">{item.text}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal">
                Ir <ArrowRight size={14} />
              </span>
            </Card>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
}

export function ResourcesPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="aqua-drift" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Recursos educativos</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">
            Todo para cuidar la salud respiratoria infantil
          </h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            Un punto de partida con el contenido y las herramientas de RespiraKids para padres, madres y cuidadores.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-14">
          <h2 className="mb-6 font-heading text-2xl font-bold text-petroleo">Aprende</h2>
          <LinkGrid items={LEARN} />
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-heading text-2xl font-bold text-petroleo">Herramientas</h2>
          <LinkGrid items={TOOLS} />
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center gap-3">
            <IconCircle icon={Library} color="teal" size="sm" />
            <h2 className="font-heading text-2xl font-bold text-petroleo">Preguntas frecuentes</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoAccordion title="¿RespiraKids diagnostica enfermedades?">
              <p>No. Es una herramienta de orientación preliminar. No diagnostica, no prescribe tratamientos y no reemplaza la valoración de un profesional de la salud.</p>
            </InfoAccordion>
            <InfoAccordion title="¿En qué se basa el contenido?">
              <p>
                En el Módulo 6 (Infección respiratoria aguda) de la Herramienta Clínica Primera Infancia del Ministerio de Salud y Protección Social de Colombia.
              </p>
            </InfoAccordion>
            <InfoAccordion title="¿Qué hago si veo un signo de alarma?">
              <p>
                Acude de inmediato a un centro de urgencias pediátricas. Los signos de alarma están listados en la página de síntomas.
              </p>
            </InfoAccordion>
            <InfoAccordion title="¿Mis datos están seguros?">
              <p>
                No pedimos nombres ni datos que identifiquen al niño. El historial se guarda únicamente en tu dispositivo y puedes borrarlo cuando quieras.
              </p>
            </InfoAccordion>
          </div>
        </section>

        <p className="text-center text-xs text-petroleo/50">
          Contenido basado en el Módulo 6 de la Herramienta Clínica Primera Infancia, Ministerio de Salud y Protección Social de Colombia. Informativo; no reemplaza la valoración de un profesional de la salud.
        </p>
      </div>
    </div>
  );
}
