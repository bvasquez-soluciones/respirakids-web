import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { AppButton, Badge, Button } from "../../components/ui";
import { SectionBackground } from "../../components/motion/SectionBackground";
import { HeroCarousel } from "./HeroCarousel";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative isolate overflow-hidden px-6 py-12 md:py-20">
      <SectionBackground variant="aqua-drift" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-6 flex justify-start">
            <Badge dotColor="teal">Aplicación de orientación pediátrica y prevención</Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} className="mb-6 text-left font-heading text-4xl font-bold text-petroleo sm:text-5xl">
            Cuidado y respiración tranquila para tus pequeños
          </motion.h1>
          <motion.p variants={fadeUp} className="mb-8 max-w-xl text-left text-lg text-petroleo/70">
            Identifica a tiempo cualquier dificultad respiratoria con nuestro sistema de semáforo preventivo y recibe orientación oportuna, cercana y sin tecnicismos.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-pill border border-gray-200 bg-white/90 px-5 py-2.5 text-sm shadow-card">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-alerta-verde" />
                Verde: Cuidados habituales
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-alerta-amarillo" />
                Amarillo: Observación atenta
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-alerta-rojo" />
                Rojo: Atención urgente
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-start gap-4">
            <AppButton mode="register" />
            <Link to="/aplicacion">
              <Button variant="secondary">Conocer la aplicación</Button>
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="max-w-md text-left text-sm text-petroleo/50">
            RespiraKids es una herramienta de apoyo y no reemplaza la evaluación médica presencial de un profesional de la salud.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </section>
  );
}
