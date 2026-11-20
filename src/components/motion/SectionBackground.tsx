import { motion, useReducedMotion } from "framer-motion";

type BackgroundVariant =
  | "aqua-drift"
  | "petroleo-glow"
  | "semaphore-orbits"
  | "warm-cream"
  | "mint-wave";

interface SectionBackgroundProps {
  variant: BackgroundVariant;
}

function DriftBlob({
  className,
  style,
  duration = 18,
  delay = 0,
}: {
  className: string;
  style?: React.CSSProperties;
  duration?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      animate={
        prefersReducedMotion
          ? {}
          : { x: [0, 16, -10, 0], y: [0, -12, 10, 0], scale: [1, 1.05, 0.98, 1] }
      }
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const GRADIENTS: Record<BackgroundVariant, string> = {
  "aqua-drift": "linear-gradient(180deg, #E7F3EF 0%, #FFFFFF 55%, #FFFFFF 100%)",
  "petroleo-glow": "linear-gradient(135deg, #1A3C34 0%, #1F5F78 45%, #2E86AB 75%, #E7F3EF 100%)",
  "semaphore-orbits": "linear-gradient(180deg, #FFFFFF 0%, #EEF8F5 50%, #FFFFFF 100%)",
  "warm-cream": "linear-gradient(180deg, #FBF8F3 0%, #F5F1EA 100%)",
  "mint-wave": "linear-gradient(180deg, #FFFFFF 0%, #EAF6F2 60%, #E7F3EF 100%)",
};

export function SectionBackground({ variant }: SectionBackgroundProps) {
  const gradientStyle: React.CSSProperties = { backgroundImage: GRADIENTS[variant] };

  if (variant === "petroleo-glow") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" style={gradientStyle}>
        <DriftBlob
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
          duration={16}
        />
        <DriftBlob
          className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(231,243,239,0.20)" }}
          duration={22}
          delay={1.5}
        />
      </div>
    );
  }

  if (variant === "semaphore-orbits") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" style={gradientStyle}>
        <DriftBlob
          className="absolute -left-10 top-10 h-56 w-56 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(63,169,106,0.10)" }}
          duration={19}
        />
        <DriftBlob
          className="absolute right-10 top-1/2 h-56 w-56 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(233,185,73,0.15)" }}
          duration={21}
          delay={1}
        />
        <DriftBlob
          className="absolute -bottom-16 left-1/3 h-56 w-56 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(217,83,79,0.10)" }}
          duration={23}
          delay={2}
        />
      </div>
    );
  }

  if (variant === "warm-cream") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" style={gradientStyle}>
        <DriftBlob
          className="absolute -right-20 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(236,90,46,0.08)" }}
          duration={25}
        />
        <DriftBlob
          className="absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(46,134,171,0.10)" }}
          duration={20}
          delay={2}
        />
      </div>
    );
  }

  if (variant === "mint-wave") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" style={gradientStyle}>
        <svg className="absolute bottom-0 left-0 w-full opacity-40" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 C360,180 1080,20 1440,100 L1440,200 L0,200 Z" fill="#2E86AB" opacity="0.12" />
        </svg>
        <DriftBlob
          className="absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(46,134,171,0.12)" }}
          duration={18}
        />
      </div>
    );
  }

  // "aqua-drift"
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={gradientStyle}>
      <DriftBlob
        className="absolute -left-24 -top-20 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(46,134,171,0.15)" }}
        duration={20}
      />
      <DriftBlob
        className="absolute -right-16 top-1/3 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(236,90,46,0.10)" }}
        duration={24}
        delay={2}
      />
    </div>
  );
}