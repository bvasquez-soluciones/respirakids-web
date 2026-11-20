import { useState } from "react";
import { Mail, Clock } from "lucide-react";
import { Badge, Button, Card, IconCircle } from "../components/ui";
import { SectionBackground } from "../components/motion/SectionBackground";
import { BACKEND_AVAILABLE } from "../config/app";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("sending");
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      // El backend guarda el mensaje aunque el correo falle; en ese caso no confirmamos el envio.
      const result = await response.json();
      if (result.emailSent === false) throw new Error("Correo no enviado");

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="relative isolate overflow-hidden px-6 py-16">
        <SectionBackground variant="mint-wave" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <Badge dotColor="teal">Contacto y atención</Badge>
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-petroleo sm:text-4xl">Contáctanos</h1>
          <p className="mx-auto max-w-2xl text-petroleo/70">
            ¿Tienes preguntas sobre RespiraKids? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Card>
            <h2 className="mb-6 font-heading text-xl font-semibold text-petroleo">Envíanos un mensaje</h2>

            {!BACKEND_AVAILABLE ? (
              <p className="text-petroleo/70">
                Escríbenos a{" "}
                <a href="mailto:respirakids.app@gmail.com" className="font-semibold text-teal underline">
                  respirakids.app@gmail.com
                </a>{" "}
                y te responderemos lo antes posible.
              </p>
            ) : status === "sent" ? (
              <div className="rounded-card border-2 border-alerta-verde bg-green-50 p-6 text-center">
                <p className="font-semibold text-petroleo">¡Gracias por escribirnos!</p>
                <p className="mt-1 text-sm text-petroleo/70">Tu mensaje fue recibido. Te contactaremos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-petroleo/80">Nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-petroleo/80">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-petroleo/80">Mensaje</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-teal focus:outline-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-alerta-rojo">
                    Hubo un problema al enviar tu mensaje. Intenta nuevamente.
                  </p>
                )}
                <Button type="submit" variant="primary" fullWidth disabled={status === "sending"}>
                  {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            )}
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex items-start gap-3">
                <IconCircle icon={Mail} color="teal" size="sm" />
                <div>
                  <h3 className="font-heading font-semibold text-petroleo">Correo</h3>
                  <p className="text-sm text-petroleo/70">respirakids.app@gmail.com</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-3">
                <IconCircle icon={Clock} color="teal" size="sm" />
                <div>
                  <h3 className="font-heading font-semibold text-petroleo">Horario</h3>
                  <p className="text-sm text-petroleo/70">Lunes a viernes: 8:00 - 18:00</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
