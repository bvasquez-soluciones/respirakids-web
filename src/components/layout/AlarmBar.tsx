import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export function AlarmBar() {
  return (
    <div className="bg-alerta-rojo px-6 py-2 text-center text-sm text-white">
      <AlertTriangle size={14} className="mr-2 inline-block align-[-2px]" />
      Si tu hijo tiene dificultad para respirar o labios azulados, acude a urgencias de inmediato.{" "}
      <Link to="/sintomas#alarma" className="font-semibold underline">
        Ver signos de alarma
      </Link>
    </div>
  );
}
