import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';

const roles = ["Full Stack Developer", "Problem Solver", "Java Enthusiast"];

const Hero = () => {
  const heroRef = useRef(null);
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
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 80,
    damping: 24,
    mass: 0.7,
  });
  const subtitleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), {
    stiffness: 80,
    damping: 24,
    mass: 0.7,
  });

  const orbNearY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), {
    stiffness: 75,
    damping: 25,
  });
  const orbMidY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 75,
    damping: 25,
  });
  const orbFarY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), {
    stiffness: 75,
    damping: 25,
  });

  const heroNameOpacity = useSpring(useTransform(scrollYProgress, [0, 0.9], [1, 0]), {
    stiffness: 85,
    damping: 24,
  });
  const heroNameScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.95]), {
    stiffness: 85,
    damping: 24,
  });
  const heroButtonsOpacity = useSpring(useTransform(scrollYProgress, [0, 0.9], [1, 0]), {
    stiffness: 85,
    damping: 24,
  });
  const heroButtonsScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.95]), {
    stiffness: 85,
    damping: 24,
  });

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

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Background Enhancement */}
      <div className="hero-bg">
        <motion.div className="hero-orb orb-purple" style={{ y: orbFarY }} />
        <motion.div className="hero-orb orb-blue" style={{ y: orbMidY }} />
        <motion.div className="hero-orb orb-slate" style={{ y: orbNearY }} />
      </div>

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <motion.div className="hero-content" initial="hidden" animate="visible">
          <motion.span variants={revealVariants} custom={0} className="hero-greeting" style={{ display: 'block', marginBottom: '1rem' }}>
            Hi, I'm
          </motion.span>

          <motion.h1 variants={revealVariants} custom={0.2} className="hero-title" style={{ y: titleY, opacity: heroNameOpacity, scale: heroNameScale }}>
            Navaneetha Krishna R
          </motion.h1>

          <motion.h2 variants={revealVariants} custom={0.4} className="hero-subtitle" style={{ minHeight: '3.6rem', marginBottom: '1rem', y: subtitleY }}>
            {currentRole}<span style={{ borderRight: '3px solid var(--accent-color)', marginLeft: '4px', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
          </motion.h2>

          <motion.p variants={revealVariants} custom={0.6} className="hero-desc" style={{ marginBottom: '1rem', minHeight: '1.8rem' }}>
            {tagline}
            {!taglineComplete && <span style={{ opacity: 0.7 }}>_</span>}
          </motion.p>



          <motion.div variants={revealVariants} custom={0.4} className="hero-btns" style={{ opacity: heroButtonsOpacity, scale: heroButtonsScale }}>
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
