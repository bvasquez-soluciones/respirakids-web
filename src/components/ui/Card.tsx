import type { ReactNode } from "react";

type AccentColor = "verde" | "amarillo" | "rojo" | "none";

interface CardProps {
  children: ReactNode;
  accentColor?: AccentColor;
  className?: string;
}

const accentColorMap: Record<AccentColor, string> = {
  verde: "border-t-4 border-t-alerta-verde",
  amarillo: "border-t-4 border-t-alerta-amarillo",
  rojo: "border-t-4 border-t-alerta-rojo",
  none: "",
};

export function Card({ children, accentColor = "none", className = "" }: CardProps) {
  return (
    <div className={`rounded-card bg-white p-6 shadow-card ${accentColorMap[accentColor]} ${className}`}>
      {children}
    </div>
  );
}
