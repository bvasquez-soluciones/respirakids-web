import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ParallaxImageProps {
  imageUrl: string;
  alt: string;
  children?: ReactNode;
  reverse?: boolean;
}

export function ParallaxImage({ imageUrl, alt, children, reverse = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // ~20% más lento que el scroll

  return (
    <div ref={ref} className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${reverse ? "md:[direction:rtl]" : ""}`}>
      <div className="overflow-hidden rounded-card shadow-card [direction:ltr]">
        <motion.img
          src={imageUrl}
          alt={alt}
          style={
            prefersReducedMotion
              ? {}
              : { scale, opacity, y }
          }
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>
      <div className="[direction:ltr]">{children}</div>
    </div>
  );
}