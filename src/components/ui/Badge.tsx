import type { ReactNode } from "react";

type DotColor = "verde" | "amarillo" | "rojo" | "teal";

interface BadgeProps {
  children: ReactNode;
  dotColor?: DotColor;
}

const dotColorMap: Record<DotColor, string> = {
  verde: "bg-alerta-verde",
  amarillo: "bg-alerta-amarillo",
  rojo: "bg-alerta-rojo",
  teal: "bg-teal",
};

export function Badge({ children, dotColor = "teal" }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-petroleo">
      <span className={`h-2 w-2 rounded-full ${dotColorMap[dotColor]}`} />
      {children}
    </span>
  );
}
