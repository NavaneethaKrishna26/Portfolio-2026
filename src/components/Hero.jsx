import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';

const roles = ["Full Stack Developer", "Problem Solver", "Java Enthusiast"];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [roleLoop, setRoleLoop] = useState(0);
  const [roleTypingSpeed, setRoleTypingSpeed] = useState(150);

  // Rotating Roles
  useEffect(() => {
    let ticker = setTimeout(() => {
      const i = roleLoop % roles.length;
      const fullText = roles[i];

      setCurrentRole(prev =>
        isDeletingRole
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      setRoleTypingSpeed(isDeletingRole ? 50 : 150);

      if (!isDeletingRole && currentRole === fullText) {
        setTimeout(() => setIsDeletingRole(true), 1500);
      } else if (isDeletingRole && currentRole === '') {
        setIsDeletingRole(false);
        setRoleLoop(roleLoop + 1);
        setRoleTypingSpeed(150);
      }
    }, roleTypingSpeed);

    return () => clearTimeout(ticker);
  }, [currentRole, isDeletingRole, roleLoop, roleTypingSpeed]);

  // Static Tagline typing effect (once)
  const fullTagline = "I build scalable and user-friendly web applications";
  const [tagline, setTagline] = useState('');
  const [taglineComplete, setTaglineComplete] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const parallaxY = useSpring(mouseY, { stiffness: 90, damping: 24 });

  useEffect(() => {
    if (tagline.length < fullTagline.length) {
      const timeout = setTimeout(() => {
        setTagline(fullTagline.slice(0, tagline.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setTaglineComplete(true);
    }
  }, [tagline]);

  const revealVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', delay }
    })
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Opposite-direction movement for subtle parallax depth.
    mouseX.set(-x * 20);
    mouseY.set(-y * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="hero" id="home" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Background Enhancement */}
      <div className="hero-bg">
        <div className="hero-shape shape1"></div>
        <motion.div className="hero-parallax-layer" style={{ x: parallaxX, y: parallaxY }}>
          <div className="hero-shape shape2"></div>
        </motion.div>
      </div>

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <motion.div className="hero-content" initial="hidden" animate="visible">
          <motion.span variants={revealVariants} custom={0} className="hero-greeting" style={{ display: 'block', marginBottom: '1rem' }}>
            Hi, I'm
          </motion.span>

          <motion.h1 variants={revealVariants} custom={0.2} className="hero-title">
            Navaneetha Krishna R
          </motion.h1>

          <motion.h2 variants={revealVariants} custom={0.4} className="hero-subtitle" style={{ minHeight: '3.6rem', marginBottom: '1rem' }}>
            {currentRole}<span style={{ borderRight: '3px solid var(--accent-color)', marginLeft: '4px', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
          </motion.h2>

          <motion.p variants={revealVariants} custom={0.6} className="hero-desc" style={{ marginBottom: '1rem', minHeight: '1.8rem' }}>
            {tagline}
            {!taglineComplete && <span style={{ opacity: 0.7 }}>_</span>}
          </motion.p>



          <motion.div variants={revealVariants} custom={0.4} className="hero-btns">
            <a href="#projects" className="btn btn-hero-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" download="Navaneetha_Krishna_Resume.pdf" className="btn btn-hero-secondary">
              Download Resume <Download size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="scroll-indicator"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>

      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: var(--accent-color) }
        }
      `}</style>
    </section>
  );
};

export default Hero;
