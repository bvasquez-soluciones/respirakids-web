import type { EngineResult } from "./types";
import { Card, Badge, IconCircle } from "../../../components/ui";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { LungVisual3D } from "../3d/LungVisual3D";

interface EngineResultScreenProps {
  result: EngineResult;
}

const LEVEL_META = {
  verde: { title: "Riesgo bajo", icon: CheckCircle, accent: "verde" as const },
  amarillo: { title: "Riesgo moderado", icon: AlertTriangle, accent: "amarillo" as const },
  rojo: { title: "Alerta máxima", icon: AlertCircle, accent: "rojo" as const },
};

export function EngineResultScreen({ result }: EngineResultScreenProps) {
  const meta = LEVEL_META[result.overallLevel];
  const Icon = meta.icon;

  return (
    <div className="flex w-full flex-col items-center">
      <LungVisual3D state={result.overallLevel} />

      <div className="w-full max-w-md">
        <Card accentColor={meta.accent} className="text-center">
          <div className="mb-4 flex justify-center">
            <IconCircle icon={Icon} color={meta.accent} size="lg" />
          </div>
          <div className="mb-2 flex justify-center">
            <Badge dotColor={meta.accent}>Nivel {result.overallLevel}</Badge>
          </div>
          <h2 className="mb-2 font-heading text-2xl font-bold text-petroleo">{meta.title}</h2>
        </Card>

        {result.routes.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {result.routes.map((route) => (
              <Card key={route.routeId} accentColor={meta.accent}>
                <h3 className="mb-1 font-heading font-semibold text-petroleo">{route.routeLabel}</h3>
                {route.matchedSigns.length > 0 && (
                  <ul className="mb-2 list-inside list-disc text-sm text-petroleo/70">
                    {route.matchedSigns.map((sign) => (
                      <li key={sign}>{sign}</li>
                    ))}
                  </ul>
                )}
                <p className="text-sm text-petroleo/80">{route.recommendation}</p>
              </Card>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-xs text-petroleo/50">{result.disclaimer}</p>
      </div>
    </div>
  );
}
