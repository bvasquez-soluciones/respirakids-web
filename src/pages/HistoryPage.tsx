import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Lock, Trash2 } from "lucide-react";
import { Badge, Button, Card, IconCircle } from "../components/ui";
import { SectionBackground } from "../components/motion/SectionBackground";
import {
  clearHistory,
  loadHistory,
  removeHistoryEntry,
  type HistoryEntry,
} from "../features/history/historyStorage";

const levelStyles = {
  verde: { label: "Verde", dot: "bg-alerta-verde", accent: "verde" as const },
  amarillo: { label: "Amarillo", dot: "bg-alerta-amarillo", accent: "amarillo" as const },
  rojo: { label: "Rojo", dot: "bg-alerta-rojo", accent: "rojo" as const },
};

function formatAge(months: number): string {
  if (months < 24) return `${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `${years} años`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" });
}

export function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>(() => loadHistory());

  function handleRemove(id: string) {
    setEntries(removeHistoryEntry(id));
  }

  function handleClear() {
    if (!window.confirm("¿Borrar todo el historial de este dispositivo?")) return;
    clearHistory();
    setEntries([]);
  }

  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="mint-wave" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Seguimiento</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">Historial de evaluaciones</h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            Consulta las evaluaciones que has realizado para ver cómo ha evolucionado el cuadro respiratorio y compartirlo con el profesional de salud.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <Card className="mb-8">
          <div className="flex items-start gap-3">
            <IconCircle icon={Lock} color="teal" size="sm" />
            <p className="text-sm text-petroleo/70">
              <strong className="text-petroleo">Tu privacidad:</strong> el historial se guarda solo en este dispositivo y navegador. No pedimos nombres ni datos que identifiquen al niño. Si borras los datos del navegador, se pierde.
            </p>
          </div>
        </Card>

        {entries.length === 0 ? (
          <div className="rounded-card bg-teal-light p-10 text-center">
            <div className="mb-4 flex justify-center">
              <IconCircle icon={ClipboardList} color="teal" size="lg" />
            </div>
            <h2 className="mb-2 font-heading text-xl font-bold text-petroleo">Aún no hay evaluaciones</h2>
            <p className="mb-6 text-petroleo/70">Cuando completes una evaluación, aparecerá aquí con su fecha y su nivel de semáforo.</p>
            <Link to="/evaluacion">
              <Button variant="primary">Iniciar evaluación</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-petroleo">
                {entries.length} {entries.length === 1 ? "evaluación" : "evaluaciones"}
              </h2>
              <button type="button" onClick={handleClear} className="text-sm text-petroleo/60 underline hover:text-alerta-rojo">
                Borrar todo
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {entries.map((entry) => {
                const style = levelStyles[entry.level];
                return (
                  <li key={entry.id}>
                    <Card accentColor={style.accent}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className={`h-3 w-3 rounded-full ${style.dot}`} />
                            <span className="font-heading font-semibold text-petroleo">Nivel {style.label}</span>
                          </div>
                          <p className="text-sm text-petroleo/60">
                            {formatDate(entry.date)} · Edad: {formatAge(entry.ageMonths)}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Eliminar esta evaluación"
                          onClick={() => handleRemove(entry.id)}
                          className="rounded-lg p-2 text-petroleo/50 hover:bg-gray-100 hover:text-alerta-rojo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {entry.generalDangerSigns && (
                        <p className="mt-3 text-sm font-medium text-alerta-rojo">Se detectaron signos de alarma generales.</p>
                      )}
                      {entry.routeLabels.length > 0 && (
                        <p className="mt-3 text-sm text-petroleo/70">
                          <strong className="text-petroleo">Posibles vías a validar:</strong> {entry.routeLabels.join(", ")}
                        </p>
                      )}
                      {entry.signs.length > 0 && (
                        <p className="mt-1 text-sm text-petroleo/70">
                          <strong className="text-petroleo">Signos detectados:</strong> {entry.signs.join("; ")}
                        </p>
                      )}
                    </Card>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <p className="mt-10 text-center text-xs text-petroleo/50">
          El historial es una ayuda de seguimiento y no constituye un diagnóstico. Ante cualquier duda, consulta a un profesional de la salud.
        </p>
      </div>
    </div>
  );
}
