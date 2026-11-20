import type { LucideIcon } from "lucide-react";

type IconColor = "teal" | "verde" | "amarillo" | "rojo";
type IconSize = "sm" | "md" | "lg";

interface IconCircleProps {
  icon: LucideIcon;
  color?: IconColor;
  size?: IconSize;
}

const bgColorMap: Record<IconColor, string> = {
  teal: "bg-teal-light text-teal",
  verde: "bg-green-100 text-alerta-verde",
  amarillo: "bg-amber-100 text-alerta-amarillo",
  rojo: "bg-red-100 text-alerta-rojo",
};

const sizeMap: Record<IconSize, { wrapper: string; icon: number }> = {
  sm: { wrapper: "h-10 w-10", icon: 18 },
  md: { wrapper: "h-14 w-14", icon: 24 },
  lg: { wrapper: "h-20 w-20", icon: 32 },
};

export function IconCircle({ icon: Icon, color = "teal", size = "md" }: IconCircleProps) {
  const { wrapper, icon } = sizeMap[size];
  return (
    <div className={`flex items-center justify-center rounded-full ${wrapper} ${bgColorMap[color]}`}>
      <Icon size={icon} />
    </div>
  );
}
