import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdditiveBlending, MathUtils } from 'three';

const STREAM_COUNT = 1800;
const GRID_SIZE = 44;
const SPREAD = 10;

const DataStream = () => {
  const pointsRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, base, speeds } = useMemo(() => {
    const pos = new Float32Array(STREAM_COUNT * 3);
    const basePos = new Float32Array(STREAM_COUNT * 3);
    const velocity = new Float32Array(STREAM_COUNT);

    const gridColumns = Math.round(Math.sqrt(STREAM_COUNT));
    const cell = SPREAD / GRID_SIZE;

    for (let i = 0; i < STREAM_COUNT; i += 1) {
      const gx = i % gridColumns;
      const gz = Math.floor(i / gridColumns) % gridColumns;
      const x = gx * cell - SPREAD * 0.5 + MathUtils.randFloatSpread(0.08);
      const y = MathUtils.randFloat(-5.5, 5.5);
      const z = gz * cell - SPREAD * 0.5 + MathUtils.randFloatSpread(0.08);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      velocity[i] = MathUtils.randFloat(0.012, 0.03);
    }

    return { positions: pos, base: basePos, speeds: velocity };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const cursorX = mouseRef.current.x * 3.2;
    const cursorY = -mouseRef.current.y * 2.6;

    for (let i = 0; i < STREAM_COUNT; i += 1) {
      const ix = i * 3;
      let x = positions[ix];
      let y = positions[ix + 1];
      let z = positions[ix + 2];

      y += speeds[i];
      if (y > 5.8) {
        y = -5.8;
      }

      const dx = x - cursorX;
      const dy = y - cursorY;
      const distance = Math.sqrt(dx * dx + dy * dy) + 0.0001;
      const influence = Math.max(0, 1 - distance / 2.2);
      const swirl = influence * 0.03;

      x += -dy * swirl;
      z += dx * swirl;

      x = MathUtils.damp(x, base[ix], 2.8, 0.016);
      z = MathUtils.damp(z, base[ix + 2], 2.8, 0.016);

      positions[ix] = x;
      positions[ix + 1] = y;
      positions[ix + 2] = z;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = Math.sin(t * 0.14) * 0.04;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0.2, -2.5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={STREAM_COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.028}
        transparent
        opacity={0.22}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const DataStreamBackground = () => {
  return (
    <div className="data-stream-layer" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} gl={{ alpha: true, antialias: true }}>
        <DataStream />
      </Canvas>
    </div>
  );
};

export default DataStreamBackground;
