import React, { useState, useEffect } from 'react';

const LOADER_DURATION = 1800;
const FADE_OUT_DURATION = 600;

const Loader = ({ onDone }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Progress bar animation and loader completion
  useEffect(() => {
    const interval = 30;
    const steps = LOADER_DURATION / interval;
    let step = 0;

    const id = setInterval(() => {
      step++;
      setProgress(Math.min((step / steps) * 100, 100));
      if (step >= steps) {
        clearInterval(id);
        setFadingOut(true);
      }
    }, interval);

    const doneTimer = setTimeout(() => onDone(), LOADER_DURATION + FADE_OUT_DURATION);

    return () => {
      clearInterval(id);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse at 20% 50%, rgba(67, 56, 202, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadingOut ? 'none' : 'all',
      }}
    >
      {/* Progress bar */}
      <div style={{
        width: 'clamp(160px, 30vw, 280px)',
        height: '1.5px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(to right, #4f46e5, #818cf8)',
          borderRadius: '2px',
          transition: 'width 0.03s linear',
          boxShadow: '0 0 8px rgba(99,102,241,0.5)',
        }} />
      </div>
    </div>
  );
};


export default Loader;
