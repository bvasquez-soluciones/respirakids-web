import { Link } from "react-router-dom";
import icon from "../../assets/respirakids-icon.png";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <img src={icon} alt="" aria-hidden="true" className="h-9 w-auto" />
            <span className="font-heading text-lg font-semibold text-petroleo">RespiraKids</span>
          </div>
          <p className="mb-4 text-petroleo/70">
            Orientación y prevención de enfermedades respiratorias agudas en la infancia.
          </p>
          <div className="rounded-card border border-gray-200 bg-white p-4 text-sm text-petroleo/70">
            <strong className="text-petroleo">Aviso médico orientativo:</strong> RespiraKids es una herramienta informativa y educativa. No reemplaza la consulta médica profesional, el diagnóstico clínico ni la atención de urgencia.
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-heading font-semibold text-petroleo">Navegación</h4>
          <ul className="space-y-2 text-petroleo/70">
            <li><Link to="/" className="hover:text-teal">Inicio</Link></li>
            <li><Link to="/evaluacion" className="hover:text-teal">Evaluación</Link></li>
            <li><Link to="/aplicacion" className="hover:text-teal">La aplicación</Link></li>
            <li><Link to="/prevencion" className="hover:text-teal">Prevención</Link></li>
            <li><Link to="/sintomas" className="hover:text-teal">Síntomas</Link></li>
            <li><Link to="/enfermedades" className="hover:text-teal">Enfermedades</Link></li>
            <li><Link to="/historial" className="hover:text-teal">Historial</Link></li>
            <li><Link to="/asistente" className="hover:text-teal">Asistente</Link></li>
            <li><Link to="/recursos" className="hover:text-teal">Recursos</Link></li>
            <li><Link to="/profesionales" className="hover:text-teal">Profesionales</Link></li>
            <li><Link to="/contacto" className="hover:text-teal">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading font-semibold text-petroleo">Fuente clínica</h4>
          <p className="text-sm text-petroleo/70">
            El contenido educativo y de orientación de RespiraKids se basa en la{" "}
            <a href="https://herramientaclinicaprimerainfancia.minsalud.gov.co/modulo-6/" target="_blank" rel="noreferrer" className="text-teal underline">
              Herramienta Clínica Primera Infancia
            </a>{" "}
            del Ministerio de Salud y Protección Social de Colombia.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-4 text-sm text-petroleo/60 sm:flex-row">
          <span>© 2026 RespiraKids. Todos los derechos reservados.</span>
          <span>Aplicación informativa y educativa. No sustituye la valoración profesional.</span>
        </div>
      </div>
    </footer>
  );
}
