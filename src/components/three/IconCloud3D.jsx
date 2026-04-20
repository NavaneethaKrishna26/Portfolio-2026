import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, useTexture } from '@react-three/drei';
import { Color, MathUtils } from 'three';

const iconItems = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', position: [-1.9, 0.85, -0.2] },
  { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', position: [1.7, 0.5, -0.1] },
  { name: 'Spring Boot', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', position: [-0.65, -1.25, 0.2] },
  { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', position: [1.15, -1.35, 0.1] },
];

const FloatingIcon = ({ item, index }) => {
  const meshRef = useRef(null);
  const glowRef = useRef(null);
  const spinTarget = useRef(0);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(item.src);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current || !glowRef.current) return;

    const floatPhase = t * 0.8 + index * 1.7;
    meshRef.current.position.y = item.position[1] + Math.sin(floatPhase) * 0.12;
    meshRef.current.position.x = item.position[0] + Math.cos(floatPhase * 0.75) * 0.08;

    const currentY = meshRef.current.rotation.y;
    meshRef.current.rotation.y = MathUtils.damp(currentY, spinTarget.current, 5.2, delta);
    glowRef.current.material.opacity = MathUtils.damp(glowRef.current.material.opacity, hovered ? 0.4 : 0.12, 6.5, delta);
  });

  return (
    <Billboard follow={false}>
      <group
        onPointerOver={() => {
          setHovered(true);
          spinTarget.current += Math.PI * 2;
        }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={glowRef} position={[0, 0, -0.01]}>
          <planeGeometry args={[1.22, 1.22]} />
          <meshBasicMaterial color={new Color('#7c3aed')} transparent opacity={0.12} toneMapped={false} />
        </mesh>

        <mesh ref={meshRef} position={item.position}>
          <planeGeometry args={[0.98, 0.98]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.02} toneMapped={false} />
        </mesh>
      </group>
    </Billboard>
  );
};

const IconCloudScene = () => {
  const ambient = useMemo(() => new Color('#64748b'), []);

  return (
    <div className="icon-cloud-3d" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight color={ambient} intensity={0.35} />
        {iconItems.map((item, index) => (
          <FloatingIcon key={item.name} item={item} index={index} />
        ))}
      </Canvas>
    </div>
  );
};

export default IconCloudScene;
