import React, { useState, useEffect } from 'react';

const FULL_TEXT = 'Navaneetha Krishna R';
const TYPING_SPEED = 80;      // ms per character
const HOLD_DURATION = 600;    // ms to hold after typing finishes
const FADE_OUT_DELAY = 200;   // ms after hold before fade starts
const LOADER_TOTAL = FULL_TEXT.length * TYPING_SPEED + HOLD_DURATION + FADE_OUT_DELAY + 600; // ≈ total visible time

const Loader = ({ onDone }) => {
  const [displayText, setDisplayText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Typing effect
  useEffect(() => {
    if (displayText.length < FULL_TEXT.length) {
      const t = setTimeout(() => {
        setDisplayText(FULL_TEXT.slice(0, displayText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setTypingDone(true), HOLD_DURATION);
      return () => clearTimeout(t);
    }
  }, [displayText]);

  // Trigger fade-out after typing is done
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setFadingOut(true), FADE_OUT_DELAY);
    return () => clearTimeout(t);
  }, [typingDone]);

  // Notify parent once fade-out finishes
  useEffect(() => {
    if (!fadingOut) return;
    const t = setTimeout(() => onDone(), 650);
    return () => clearTimeout(t);
  }, [fadingOut, onDone]);

  // Progress bar animation — reaches 100% at the same time typing finishes
  useEffect(() => {
    const totalTypingMs = FULL_TEXT.length * TYPING_SPEED;
    const interval = 30;
    const steps = totalTypingMs / interval;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setProgress(Math.min((step / steps) * 100, 100));
      if (step >= steps) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
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
      {/* Boot label */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(99,102,241,0.7)',
        marginBottom: '2.5rem',
        fontWeight: 500,
        animation: 'loaderFadeIn 0.8s ease both',
      }}>
        Initializing portfolio
      </p>

      {/* Main typing text */}
      <h1 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontWeight: 400,
        fontSize: 'clamp(1.75rem, 5vw, 3rem)',
        color: '#f5f5f5',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        minHeight: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        marginBottom: '1rem',
        animation: 'loaderFadeIn 0.5s ease both',
      }}>
        {displayText}
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: 'var(--accent-color, #6366f1)',
          marginLeft: '4px',
          verticalAlign: 'middle',
          animation: typingDone ? 'cursorBlink 1s step-end infinite' : 'none',
          opacity: typingDone ? 1 : 1,
        }} />
      </h1>


      {/* Progress bar */}
      <div style={{
        marginTop: '2.5rem',
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

      <style>{`
        @keyframes loaderFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
};


export default Loader;
