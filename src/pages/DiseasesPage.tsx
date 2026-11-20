import { Link } from "react-router-dom";
import { AlertTriangle, ShieldCheck, Wind } from "lucide-react";
import { Badge, Button, Card } from "../components/ui";
import { RevealOnScroll } from "../components/motion/RevealOnScroll";
import { SectionBackground } from "../components/motion/SectionBackground";
import { InfoAccordion } from "../features/resources/InfoAccordion";
import { diseases, zoneLabels, type DiseaseZone } from "../features/diseases/diseases";

const zones: DiseaseZone[] = ["altas", "bajas", "otras"];

export function DiseasesPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="aqua-drift" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Conoce las enfermedades</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">
            Enfermedades respiratorias en la infancia
          </h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            Una guía clara de las condiciones respiratorias agudas más frecuentes en niños: qué son, qué síntomas producen, cuándo preocuparse y cómo prevenirlas.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {zones.map((zone) => (
          <section key={zone} id={zone} className="mb-14">
            <h2 className="mb-6 font-heading text-2xl font-bold text-petroleo">{zoneLabels[zone]}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {diseases
                .filter((d) => d.zone === zone)
                .map((d) => (
                  <RevealOnScroll key={d.slug}>
                    <div id={d.slug}>
                      <InfoAccordion title={d.name}>
                        <p className="mb-4">{d.summary}</p>

                        <h4 className="mb-2 flex items-center gap-2 font-heading font-semibold text-petroleo">
                          <Wind size={16} className="text-teal" /> Síntomas frecuentes
                        </h4>
                        <ul className="mb-4 list-inside list-disc space-y-1 text-sm">
                          {d.symptoms.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>

                        <div className="mb-4 rounded-card border border-alerta-rojo/30 bg-red-50 p-4">
                          <h4 className="mb-2 flex items-center gap-2 font-heading font-semibold text-petroleo">
                            <AlertTriangle size={16} className="text-alerta-rojo" /> Signos de alarma
                          </h4>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            {d.alarm.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </div>

                        <h4 className="mb-1 flex items-center gap-2 font-heading font-semibold text-petroleo">
                          <ShieldCheck size={16} className="text-teal" /> Prevención
                        </h4>
                        <p className="text-sm">{d.prevention}</p>
                      </InfoAccordion>
                    </div>
                  </RevealOnScroll>
                ))}
            </div>
          </section>
        ))}

        <Card className="text-center">
          <h2 className="mb-2 font-heading text-xl font-bold text-petroleo">¿Tu hijo tiene síntomas?</h2>
          <p className="mb-4 text-petroleo/70">
            Esta información no sirve para diagnosticar. Si observas síntomas, usa la evaluación para recibir una orientación sobre el nivel de atención recomendado.
          </p>
          <Link to="/evaluacion">
            <Button variant="primary">Iniciar evaluación</Button>
          </Link>
        </Card>

        <p className="mt-10 text-center text-xs text-petroleo/50">
          Contenido basado en el Módulo 6 (Infección respiratoria aguda) de la Herramienta Clínica Primera Infancia, Ministerio de Salud y Protección Social de Colombia. Informativo; no reemplaza la valoración de un profesional de la salud.
        </p>
      </div>
    </div>
  );
}
