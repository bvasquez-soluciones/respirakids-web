import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type LungVisualState = "neutral" | "verde" | "amarillo" | "rojo";

const STATE_COLORS: Record<LungVisualState, { main: string; light: string; emissive: string }> = {
  neutral: { main: "#2E86AB", light: "#8ECAE6", emissive: "#2E86AB" },
  verde: { main: "#3FA96A", light: "#8CE0AE", emissive: "#3FA96A" },
  amarillo: { main: "#F2A93B", light: "#FBD98A", emissive: "#F2A93B" },
  rojo: { main: "#E4572E", light: "#F2A08A", emissive: "#E4572E" },
};

const PETROLEO = "#1A3C34";

function LungLobe({
  position,
  scaleBase,
  phaseOffset,
  color,
}: {
  position: [number, number, number];
  scaleBase: [number, number, number];
  phaseOffset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const breath = Math.sin(t * 1.2 + phaseOffset) * 0.08 + 1;
    meshRef.current.scale.set(
      scaleBase[0] * breath,
      scaleBase[1] * breath,
      scaleBase[2] * breath
    );
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.25}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

function LungLobeWireframe({
  position,
  scaleBase,
  phaseOffset,
  color,
}: {
  position: [number, number, number];
  scaleBase: [number, number, number];
  phaseOffset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const breath = Math.sin(t * 1.2 + phaseOffset) * 0.08 + 1;
    meshRef.current.scale.set(
      scaleBase[0] * breath * 1.02,
      scaleBase[1] * breath * 1.02,
      scaleBase[2] * breath * 1.02
    );
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function Trachea({ emissiveColor }: { emissiveColor: string }) {
  return (
    <mesh position={[0, 1.4, 0]}>
      <cylinderGeometry args={[0.18, 0.25, 1.2, 16]} />
      <meshStandardMaterial
        color={PETROLEO}
        transparent
        opacity={0.4}
        emissive={emissiveColor}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function ScanRing({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    const y = (Math.sin(t * 0.9) * 0.5 + 0.5) * 3.6 - 1.8;
    ringRef.current.position.y = y;

    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    const fade = 1 - Math.abs(y) / 1.8;
    material.opacity = 0.15 + fade * 0.35;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.3, 1.4, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

function AmbientParticles({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 60;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.cos(phi);
      arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.03} transparent opacity={0.5} />
    </points>
  );
}

function Scene({ colors }: { colors: { main: string; light: string; emissive: string } }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color={colors.light} />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color={PETROLEO} />

      <group>
        <Trachea emissiveColor={colors.emissive} />
        <LungLobe position={[-0.85, 0, 0]} scaleBase={[0.9, 1.3, 0.7]} phaseOffset={0} color={colors.main} />
        <LungLobe position={[0.85, 0, 0]} scaleBase={[0.9, 1.3, 0.7]} phaseOffset={0.15} color={colors.main} />
        <LungLobeWireframe position={[-0.85, 0, 0]} scaleBase={[0.9, 1.3, 0.7]} phaseOffset={0} color={colors.light} />
        <LungLobeWireframe position={[0.85, 0, 0]} scaleBase={[0.9, 1.3, 0.7]} phaseOffset={0.15} color={colors.light} />
        <ScanRing color={colors.light} />
        <AmbientParticles color={colors.light} />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
}

interface LungVisual3DProps {
  state?: LungVisualState;
}

export function LungVisual3D({ state = "neutral" }: LungVisual3DProps) {
  const colors = STATE_COLORS[state];

  return (
    <div className="h-[420px] w-full sm:h-[480px] md:h-[520px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <Scene colors={colors} />
      </Canvas>
    </div>
  );
}