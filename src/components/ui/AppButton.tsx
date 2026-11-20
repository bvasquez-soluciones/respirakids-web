import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../config/app";

interface AppButtonProps {
  mode?: "register" | "login";
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}

const styles = {
  primary: "bg-cta text-white hover:bg-cta-hover",
  secondary: "border-2 border-teal text-petroleo hover:bg-teal-light",
};

// Lleva a la aplicacion; si todavia no se configuro su direccion, lleva a Contacto.
export function AppButton({ mode = "register", variant = "primary", children }: AppButtonProps) {
  const href = mode === "register" ? APP_REGISTER_URL : APP_LOGIN_URL;
  const fallback = mode === "register" ? "Solicitar acceso" : "Escríbenos";
  const label = children ?? (href ? (mode === "register" ? "Empezar ahora" : "Iniciar sesión") : fallback);
  const className = `inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 font-heading font-semibold transition-colors ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {label} {variant === "primary" && <ArrowRight size={18} />}
      </a>
    );
  }
  return (
    <Link to="/contacto" className={className}>
      {label} {variant === "primary" && <ArrowRight size={18} />}
    </Link>
  );
}
