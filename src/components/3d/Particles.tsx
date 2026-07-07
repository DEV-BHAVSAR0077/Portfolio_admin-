"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 500 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
      const factor = Math.random();
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -0.5 + Math.random();
      const yFactor = -0.5 + Math.random();
      const zFactor = -0.5 + Math.random();
      
      temp.push({ x, y, z, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { x, y, z, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      const t = factor + speed + (state.clock.getElapsedTime() * speed);
      
      dummy.position.set(
        x + Math.cos(t) * xFactor,
        y + Math.sin(t) * yFactor,
        z + Math.cos(t) * zFactor
      );
      
      const s = Math.max(0.1, Math.cos(t));
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    mesh.current?.instanceMatrix.needsUpdate && (mesh.current.instanceMatrix.needsUpdate = true);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  );
}
