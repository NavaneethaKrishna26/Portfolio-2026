import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';

const NODE_COUNT = 46;
const SPACE = 8;

const createNodes = () => {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i += 1) {
    nodes.push({
      position: new Vector3(
        MathUtils.randFloatSpread(SPACE),
        MathUtils.randFloatSpread(SPACE),
        MathUtils.randFloatSpread(SPACE)
      ),
      velocity: new Vector3(
        MathUtils.randFloatSpread(0.005),
        MathUtils.randFloatSpread(0.005),
        MathUtils.randFloatSpread(0.005)
      ),
    });
  }
  return nodes;
};

const Constellation = () => {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);
  const lineRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const nodesRef = useRef(createNodes());

  const { linePositions, linePairs } = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < NODE_COUNT; i += 1) {
      for (let j = i + 1; j < NODE_COUNT; j += 1) {
        const distance = nodesRef.current[i].position.distanceTo(nodesRef.current[j].position);
        if (distance < 2.15) {
          pairs.push([i, j]);
        }
      }
    }

    const positions = new Float32Array(pairs.length * 2 * 3);
    return { linePositions: positions, linePairs: pairs };
  }, []);

  const pointPositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      const targetY = mouse.current.x * 0.16;
      const targetX = -mouse.current.y * 0.1;
      groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetY, 5.5, delta);
      groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetX, 5.5, delta);
    }

    for (let i = 0; i < NODE_COUNT; i += 1) {
      const node = nodesRef.current[i];
      node.position.add(node.velocity);

      if (Math.abs(node.position.x) > SPACE * 0.5) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > SPACE * 0.5) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > SPACE * 0.5) node.velocity.z *= -1;

      pointPositions[i * 3] = node.position.x;
      pointPositions[i * 3 + 1] = node.position.y;
      pointPositions[i * 3 + 2] = node.position.z;
    }

    for (let i = 0; i < linePairs.length; i += 1) {
      const [a, b] = linePairs[i];
      const first = nodesRef.current[a].position;
      const second = nodesRef.current[b].position;

      linePositions[i * 6] = first.x;
      linePositions[i * 6 + 1] = first.y;
      linePositions[i * 6 + 2] = first.z;
      linePositions[i * 6 + 3] = second.x;
      linePositions[i * 6 + 4] = second.y;
      linePositions[i * 6 + 5] = second.z;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (lineRef.current) {
      lineRef.current.geometry.attributes.position.needsUpdate = true;
      lineRef.current.material.opacity = 0.2 + (Math.sin(elapsed * 1.8) + 1) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={pointPositions} count={NODE_COUNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#6d28d9" size={0.07} transparent opacity={0.95} depthWrite={false} />
      </points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={linePositions} count={linePairs.length * 2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#64748b" transparent opacity={0.24} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

const ConstellationBackground = () => {
  return (
    <div className="three-constellation-layer" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <Constellation />
      </Canvas>
    </div>
  );
};

export default ConstellationBackground;
