import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "alert";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover",
  secondary: "border-2 border-teal text-petroleo bg-transparent hover:bg-teal-light",
  alert: "bg-alerta-rojo text-white hover:opacity-90",
};

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 font-semibold font-heading transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {Icon && iconPosition === "left" && <Icon size={18} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={18} />}
    </motion.button>
  );
}