import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui";
import logo from "../../assets/respirakids-logo.png";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "La aplicación", to: "/aplicacion" },
  { label: "Prevención", to: "/prevencion" },
  { label: "Síntomas", to: "/sintomas" },
  { label: "Enfermedades", to: "/enfermedades" },
  { label: "Profesionales", to: "/profesionales" },
  { label: "Contacto", to: "/contacto" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap font-medium transition-colors ${isActive ? "text-teal" : "text-petroleo/80 hover:text-petroleo"}`;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img src={logo} alt="RespiraKids" className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link to="/evaluacion" className="whitespace-nowrap">
            <Button variant="primary">
              <span className="sm:hidden">Evaluación</span>
              <span className="hidden sm:inline">Iniciar evaluación</span>
            </Button>
          </Link>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-petroleo lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gray-100 bg-white px-6 py-3 lg:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
              <span className="block py-2">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
