import { Link } from "react-router-dom";
import { BellRing, FileLock2, MessagesSquare, Pill, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge, Card, IconCircle } from "../components/ui";
import { RevealOnScroll } from "../components/motion/RevealOnScroll";
import { SectionBackground } from "../components/motion/SectionBackground";

interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Users,
    title: "Panel de pacientes con semáforo",
    text: "Ve de un vistazo el nivel de cada niño, su edad y las señales de su última evaluación para saber a quién atender primero.",
  },
  {
    icon: BellRing,
    title: "Alertas de pacientes en rojo",
    text: "Los niños con evaluación roja de los que eres responsable aparecen destacados para que actúes a tiempo.",
  },
  {
    icon: MessagesSquare,
    title: "Atención por mensajes",
    text: "Recibe solicitudes de familias, toma los casos que puedas atender y cierra cada caso al terminar. Tienes cupo de casos y puedes pausar nuevas solicitudes cuando no estés disponible.",
  },
  {
    icon: FileLock2,
    title: "Expediente con autorización",
    text: "Accedes al historial, la ficha y los medicamentos de un niño solo si su cuidador te lo autoriza. Cada acceso queda registrado.",
  },
  {
    icon: Pill,
    title: "Indicaciones de medicamentos",
    text: "Registra las indicaciones para el niño y consulta el cumplimiento de las tomas que marca la familia.",
  },
  {
    icon: ShieldCheck,
    title: "Uso responsable de los datos",
    text: "Cumplimiento de la Ley 1581 de 2012, consentimiento por niño, auditoría de accesos y sin venta de datos.",
  },
];

export function ProfessionalsPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="petroleo-glow" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Para profesionales de la salud</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            Acompaña a las familias donde más lo necesitan
          </h1>
          <p className="mx-auto max-w-2xl text-white/80">
            Con RespiraKids llegas a las familias con la información ordenada: sabes quién necesita atención primero y atiendes por mensajes, con su permiso.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <RevealOnScroll key={b.title} delay={(i % 3) * 0.1}>
              <Card className="h-full">
                <IconCircle icon={b.icon} color="teal" />
                <h3 className="mb-2 mt-4 font-heading font-semibold text-petroleo">{b.title}</h3>
                <p className="text-sm text-petroleo/70">{b.text}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        <Card className="mb-12">
          <p className="text-sm text-petroleo/70">
            <strong className="text-petroleo">Alcance de la atención:</strong> es por mensajes. No incluye llamadas ni videollamadas y no es un canal de urgencias; ante signos de alarma, se indica a la familia acudir de inmediato a un servicio de salud.
          </p>
        </Card>

        <div className="rounded-card bg-teal-light p-8 text-center">
          <h2 className="mb-2 font-heading text-xl font-bold text-petroleo">¿Eres profesional de la salud y quieres unirte?</h2>
          <p className="mb-6 text-petroleo/70">
            Escríbenos desde la página de contacto. Las cuentas de profesionales las crea o aprueba un administrador.
          </p>
          <Link
            to="/contacto"
            className="inline-block rounded-pill bg-cta px-6 py-3 font-heading font-semibold text-white hover:bg-cta-hover"
          >
            Solicitar acceso
          </Link>
        </div>
      </div>
    </div>
  );
}
