"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { NeuralNetwork } from "@/components/3d/NeuralNetwork";
import { Particles } from "@/components/3d/Particles";

export function Hero3DBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <NeuralNetwork />
      <Particles count={150} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </Canvas>
  );
}
