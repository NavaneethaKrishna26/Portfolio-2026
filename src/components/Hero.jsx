import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';

const roles = ["Full Stack Developer", "Problem Solver", "UI Enthusiast"];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero" id="home">
      {/* Background Enhancement */}
      <div className="hero-bg">
        <div className="hero-shape shape1"></div>
        <div className="hero-shape shape2"></div>
      </div>

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="hero-greeting" style={{ display: 'block', marginBottom: '1rem' }}>
            Hi, I'm
          </motion.span>

          <motion.h1 variants={itemVariants} className="hero-title">
            Navaneetha Krishna R
          </motion.h1>

          <motion.h2 variants={itemVariants} className="hero-subtitle" style={{ minHeight: '3.6rem', marginBottom: '1rem' }}>
            {currentRole}<span style={{ borderRight: '3px solid var(--accent-color)', marginLeft: '4px', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="hero-desc" style={{ marginBottom: '1rem', minHeight: '1.8rem' }}>
            {tagline}
            {!taglineComplete && <span style={{ opacity: 0.7 }}>_</span>}
          </motion.p>



          <motion.div variants={itemVariants} className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#resume" className="btn btn-outline">
              Download Resume <Download size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: 'absolute', bottom: '-15vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}
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
