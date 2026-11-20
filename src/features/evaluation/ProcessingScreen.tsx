import { motion } from "framer-motion";
import { LungVisual3D } from "./3d/LungVisual3D";

export function ProcessingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center"
    >
      <LungVisual3D />
      <p className="mt-4 text-center font-medium text-petroleo/70">
        Analizando la información...
      </p>
    </motion.div>
  );
}
