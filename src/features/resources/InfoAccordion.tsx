import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../../components/ui";

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function InfoAccordion({ title, children, defaultOpen = false }: InfoSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="mb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-heading text-lg font-semibold text-petroleo">{title}</h3>
        <ChevronDown
          size={20}
          className={`shrink-0 text-teal transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4 text-petroleo/80">{children}</div>}
    </Card>
  );
}