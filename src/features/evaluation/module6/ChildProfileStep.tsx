import { useState } from "react";
import { Button, Card } from "../../../components/ui";
import type { ChildProfile } from "./types";

interface ChildProfileStepProps {
  onSubmit: (profile: ChildProfile) => void;
}

export function ChildProfileStep({ onSubmit }: ChildProfileStepProps) {
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("months");
  const [isPremature, setIsPremature] = useState(false);
  const [hasChronicCondition, setHasChronicCondition] = useState(false);
  const [hasKnownAsthma, setHasKnownAsthma] = useState(false);
  const [tbContactHistory, setTbContactHistory] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    const numericAge = Number(ageValue);
    if (!ageValue || Number.isNaN(numericAge) || numericAge < 0) {
      setError("Ingresa una edad válida.");
      return;
    }
    const ageMonths = ageUnit === "years" ? numericAge * 12 : numericAge;

    onSubmit({ ageMonths, isPremature, hasChronicCondition, hasKnownAsthma, tbContactHistory });
  }

  return (
    <Card className="w-full max-w-md">
      <h2 className="mb-4 text-center font-heading text-xl font-semibold text-petroleo">
        Antes de empezar, cuéntanos sobre el niño o niña
      </h2>

      <label className="mb-1 block text-sm font-medium text-petroleo/80">Edad</label>
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          min={0}
          value={ageValue}
          onChange={(e) => setAgeValue(e.target.value)}
          placeholder="Ej: 18"
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-teal focus:outline-none"
        />
        <select
          value={ageUnit}
          onChange={(e) => setAgeUnit(e.target.value as "months" | "years")}
          className="rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-teal focus:outline-none"
        >
          <option value="months">Meses</option>
          <option value="years">Años</option>
        </select>
      </div>
      {error && <p className="mb-3 text-sm text-alerta-rojo">{error}</p>}

      <div className="mb-6 flex flex-col gap-3">
        <label className="flex items-center gap-2 text-sm text-petroleo/80">
          <input type="checkbox" checked={isPremature} onChange={(e) => setIsPremature(e.target.checked)} />
          Nació prematuro(a)
        </label>
        <label className="flex items-center gap-2 text-sm text-petroleo/80">
          <input
            type="checkbox"
            checked={hasChronicCondition}
            onChange={(e) => setHasChronicCondition(e.target.checked)}
          />
          Tiene una enfermedad de base (cardíaca, pulmonar crónica, inmunológica, etc.)
        </label>
        <label className="flex items-center gap-2 text-sm text-petroleo/80">
          <input type="checkbox" checked={hasKnownAsthma} onChange={(e) => setHasKnownAsthma(e.target.checked)} />
          Tiene asma diagnosticada
        </label>
        <label className="flex items-center gap-2 text-sm text-petroleo/80">
          <input
            type="checkbox"
            checked={tbContactHistory}
            onChange={(e) => setTbContactHistory(e.target.checked)}
          />
          Ha tenido contacto con alguien con tuberculosis
        </label>
      </div>

      <Button variant="primary" fullWidth onClick={handleSubmit}>
        Comenzar evaluación
      </Button>
    </Card>
  );
}
