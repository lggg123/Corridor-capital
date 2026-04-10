"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Rotating art deco gold rings
function GoldRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  const rings = [
    { radius: 2.0, tube: 0.04, rotX: 0 },
    { radius: 2.6, tube: 0.03, rotX: Math.PI / 4 },
    { radius: 3.2, tube: 0.025, rotX: Math.PI / 3 },
    { radius: 1.4, tube: 0.05, rotX: Math.PI / 6 },
    { radius: 3.8, tube: 0.02, rotX: -Math.PI / 5 },
  ];

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[r.rotX, 0, 0]}>
          <torusGeometry args={[r.radius, r.tube, 16, 120]} />
          <meshStandardMaterial
            color="#C9A84C"
            metalness={0.9}
            roughness={0.1}
            emissive="#C9A84C"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating gold particle field
function ParticleField({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#080C12"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} color="#C9A84C" intensity={3} />
      <pointLight position={[-5, 5, 0]} color="#C9A84C" intensity={1.5} />
      <GoldRings />
      <ParticleField count={1200} />
    </>
  );
}

export default function CorridorScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Scene />
    </Canvas>
  );
}
