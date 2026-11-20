import { Link } from "react-router-dom";
import { AlertTriangle, Stethoscope, Thermometer, Wind } from "lucide-react";
import { Badge, Button, IconCircle } from "../components/ui";
import { SectionBackground } from "../components/motion/SectionBackground";
import { InfoAccordion } from "../features/resources/InfoAccordion";
import doctorImage from "../assets/mission-doctor-child.webp";

const ALARM_SIGNS = [
  "Coloración azulada en labios o piel (cianosis)",
  "No puede beber líquidos o rechaza el alimento por completo",
  "Está muy decaído(a), le cuesta despertar o está muy irritable sin consuelo",
  "Se le hunde el pecho al respirar (tiraje)",
  "Aleteo nasal al respirar",
  "Quejido con cada respiración",
  "Pausas al respirar (apnea)",
];

const CONSULT_SIGNS = [
  "La tos dura más de 15 días",
  "Hay fiebre persistente por más de 48 horas, o mayor a 38 °C por más de 8 días",
  "Hay pérdida de peso o no ganancia de peso en los últimos 3 meses, junto con síntomas respiratorios",
  "Se escuchan silbidos en el pecho de forma recurrente (3 o más episodios en el último año)",
  "Hay contacto conocido con una persona con tuberculosis",
];

export function SymptomsPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="aqua-drift" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Conoce los síntomas</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">
            Síntomas y signos que conviene observar
          </h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            Saber qué mirar ayuda a reconocer a tiempo cuándo un cuadro respiratorio necesita atención profesional.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 grid grid-cols-1 items-center gap-8 md:grid-cols-[18rem_1fr]">
          <img
            src={doctorImage}
            alt="Pediatra revisando con estetoscopio a un niño que sostiene un peluche"
            className="mx-auto aspect-[3/4] w-full max-w-xs rounded-card object-cover object-top shadow-card"
          />
          <div>
            <h2 className="mb-3 font-heading text-2xl font-bold text-petroleo">Observar con calma ayuda a decidir mejor</h2>
            <p className="mb-3 text-petroleo/70">
              No necesitas equipos médicos para notar que algo cambió: cómo respira, si come, si juega, si está más decaído de lo normal.
            </p>
            <p className="text-petroleo/70">
              Esta guía te explica qué mirar, qué signos son de alarma y cuándo consultar a un profesional de la salud.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <IconCircle icon={Wind} color="teal" size="sm" />
            <h2 className="font-heading text-2xl font-bold text-petroleo">Síntomas frecuentes</h2>
          </div>
          <p className="mb-4 text-petroleo/70">
            Según el Módulo 6 de la Herramienta Clínica Primera Infancia (Minsalud), estos son signos comunes en las infecciones respiratorias agudas.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoAccordion title="Tos y dificultad respiratoria" defaultOpen>
              <p>
                Son las preguntas orientadoras principales de la fuente oficial para definir si un niño o niña puede tener una infección respiratoria aguda.
              </p>
            </InfoAccordion>
            <InfoAccordion title="Congestión nasal, dolor de oído o de garganta">
              <p>Síntomas frecuentes que suelen asociarse a infecciones de vías respiratorias altas.</p>
            </InfoAccordion>
            <InfoAccordion title="Contar la frecuencia respiratoria">
              <p className="mb-2">
                Cuenta las respiraciones durante un minuto completo, con el niño o niña despierto, tranquilo y sin llorar, preferiblemente en brazos de un cuidador.
              </p>
              <p className="text-sm text-petroleo/60">
                Respirar más rápido de lo esperado para la edad (taquipnea) es, según la fuente, uno de los mejores signos individuales para sospechar compromiso respiratorio bajo.
              </p>
            </InfoAccordion>
            <InfoAccordion title="Fiebre y su duración">
              <p>
                La duración de la fiebre importa: la fuente oficial la usa como parte de la valoración cuando persiste más de 48 horas, o cuando supera los 38 °C por más de 8 días.
              </p>
            </InfoAccordion>
          </div>
        </section>

        <section className="mb-12 rounded-card border border-gray-100 bg-white p-6 shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <IconCircle icon={Thermometer} color="verde" size="sm" />
            <h2 className="font-heading text-xl font-bold text-petroleo">El semáforo respiratorio</h2>
          </div>
          <p className="mb-4 text-petroleo/70">
            Al hacer la evaluación, RespiraKids te muestra un nivel de orientación con colores: verde, amarillo o rojo, según los signos que observes. Es una guía rápida, no un diagnóstico.
          </p>
          <Link to="/evaluacion">
            <Button variant="primary">Iniciar evaluación</Button>
          </Link>
        </section>

        <section id="alarma" className="mb-12 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <IconCircle icon={AlertTriangle} color="rojo" size="sm" />
            <h2 className="font-heading text-2xl font-bold text-petroleo">Signos de alarma</h2>
          </div>
          <div className="rounded-card border-2 border-alerta-rojo/30 bg-red-50 p-6">
            <p className="mb-4 font-semibold text-petroleo">
              Si observas cualquiera de estos signos, acude de inmediato a un centro de urgencias pediátricas:
            </p>
            <ul className="list-inside list-disc space-y-2 text-petroleo/80">
              {ALARM_SIGNS.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <IconCircle icon={Stethoscope} color="amarillo" size="sm" />
            <h2 className="font-heading text-2xl font-bold text-petroleo">Cuándo consultar a un profesional</h2>
          </div>
          <p className="mb-4 text-petroleo/70">
            Además de los signos de alarma, conviene buscar valoración médica cuando:
          </p>
          <ul className="list-inside list-disc space-y-2 text-petroleo/80">
            {CONSULT_SIGNS.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </section>

        <p className="text-center text-xs text-petroleo/50">
          Contenido basado en el Módulo 6 (Infección respiratoria aguda) de la Herramienta Clínica Primera Infancia, Ministerio de Salud y Protección Social de Colombia. Informativo; no reemplaza la valoración de un profesional de la salud.
        </p>
      </div>
    </div>
  );
}
