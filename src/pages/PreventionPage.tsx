import { Link } from "react-router-dom";
import { Baby, Cigarette, HandHeart, Home, Syringe, Users, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge, Button, Card, IconCircle } from "../components/ui";
import { RevealOnScroll } from "../components/motion/RevealOnScroll";
import { SectionBackground } from "../components/motion/SectionBackground";
import heroImage from "../assets/hero-mother-baby.jpg";

interface Habit {
  icon: LucideIcon;
  title: string;
  text: string;
}

const HABITS: Habit[] = [
  {
    icon: HandHeart,
    title: "Lavado de manos frecuente",
    text: "Lávate las manos antes de tocar o alimentar al niño o niña, y enséñale a hacerlo. Reduce la transmisión de virus respiratorios comunes.",
  },
  {
    icon: Syringe,
    title: "Vacunación al día",
    text: "Mantener el esquema de vacunación según la edad ayuda a prevenir enfermedades respiratorias graves, como la tos ferina.",
  },
  {
    icon: Cigarette,
    title: "Aire libre de humo",
    text: "La exposición al humo de tabaco, incluso de forma pasiva, aumenta el riesgo y la gravedad de las infecciones respiratorias en la infancia.",
  },
  {
    icon: Home,
    title: "Hogar ventilado e iluminado",
    text: "Procura ventilación e iluminación en el hogar. La Herramienta Clínica Primera Infancia la recomienda, en especial para prevenir la tuberculosis.",
  },
  {
    icon: Utensils,
    title: "Alimentación adecuada",
    text: "Una alimentación adecuada acompaña las defensas del niño o niña. Consulta con el equipo de salud las recomendaciones según su edad.",
  },
  {
    icon: Users,
    title: "Cuidado con los contagios",
    text: "Los adultos con síntomas respiratorios pueden usar tapabocas cerca de los niños y evitar el contacto cercano, sobre todo con bebés pequeños.",
  },
];

export function PreventionPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="mint-wave" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Prevención</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">
            Cómo proteger la salud respiratoria de tu hijo
          </h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            Hábitos sencillos en casa que ayudan a reducir el riesgo de infecciones respiratorias en la infancia.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <RevealOnScroll>
          <img
            src={heroImage}
            alt="Madre sosteniendo a su bebé en brazos con tranquilidad"
            className="mb-14 h-64 w-full rounded-card object-cover shadow-card sm:h-80"
          />
        </RevealOnScroll>

        <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HABITS.map((habit, i) => (
            <RevealOnScroll key={habit.title} delay={(i % 3) * 0.1}>
              <Card className="h-full">
                <div className="mb-4">
                  <IconCircle icon={habit.icon} color="teal" size="md" />
                </div>
                <h2 className="mb-2 font-heading text-lg font-semibold text-petroleo">{habit.title}</h2>
                <p className="text-sm text-petroleo/70">{habit.text}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <Card accentColor="amarillo" className="mb-14">
            <div className="flex items-start gap-4">
              <IconCircle icon={Baby} color="amarillo" size="sm" />
              <div>
                <h2 className="mb-1 font-heading text-lg font-semibold text-petroleo">Con los bebés, más cuidado</h2>
                <p className="text-sm text-petroleo/70">
                  Los lactantes tienen las vías respiratorias más pequeñas y se complican con mayor facilidad. Si tu bebé tiene tos, respiración rápida o dificultad para alimentarse, no esperes a que pase solo: consulta a un profesional de la salud.
                </p>
              </div>
            </div>
          </Card>
        </RevealOnScroll>

        <div className="rounded-card bg-teal-light p-8 text-center">
          <h2 className="mb-2 font-heading text-xl font-bold text-petroleo">¿Ya hay síntomas?</h2>
          <p className="mb-4 text-petroleo/70">
            Conoce los signos a observar o usa la evaluación para recibir una orientación.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/sintomas">
              <Button variant="secondary">Ver síntomas</Button>
            </Link>
            <Link to="/evaluacion">
              <Button variant="primary">Iniciar evaluación</Button>
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-petroleo/50">
          Recomendaciones generales de salud pública y de la Herramienta Clínica Primera Infancia, Ministerio de Salud y Protección Social de Colombia. Informativo; no reemplaza la valoración de un profesional de la salud.
        </p>
      </div>
    </div>
  );
}
