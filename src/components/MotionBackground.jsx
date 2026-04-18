import React from 'react';
import { motion } from 'framer-motion';

const MotionBackground = () => {
  // Create an array of circles with random properties
  const circles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 10,
  }));

  return (
    <div className="motion-bg-container">
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="motion-circle"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            delay: circle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="motion-bg-overlay" />
    </div>
  );
};

export default MotionBackground;
