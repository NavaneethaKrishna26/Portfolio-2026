import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Award, Code, Terminal, Layers } from 'lucide-react';
import heroImg from '../assets/hero.png';

const aboutData = {
  intro: "I am a passionate and consistent learner with a strong interest in building scalable backend systems and solving real-world problems. My growth mindset drives me to dive deep into development ecosystems and craft efficient, maintainable software.",
  coreStrength: "Strong foundation in Java backend, REST API development, and problem solving.",
  drive: "I enjoy turning ideas into real-world applications that people can use.",
  traits: ["Consistent Learner", "Problem Solver", "Backend Focused", "Quick Adaptor"],
  philosophy: "I believe consistency and continuous learning are the keys to mastering software development.",
  stats: [
    { label: "9.2 CGPA", icon: <Award size={16} /> },
    { label: "Hands-on Projects", icon: <Code size={16} /> },
    { label: "Backend Enthusiast", icon: <Terminal size={16} /> }
  ],
  timeline: [
    { title: "Started with NEET preparation", desc: "Built foundational discipline, resilience, and analytical thinking." },
    { title: "Transitioned into Computer Science", desc: "Discovered an immense passion for programming and logical problem-solving." },
    { title: "Built Multiple Projects", desc: "Gained hands-on building experience by bringing various ideas to life." },
    { title: "Current Focus", desc: "Sharpening backend and full stack skills to build scalable applications." }
  ]
};

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 variants={fadeUp} className="section-title">Profile</motion.h2>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* Minimal Profile Element */}
            <motion.div variants={fadeUp} style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: '180px', height: '180px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-color)',
                  border: '2px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                  position: 'relative'
                }}>
                <img
                  src={heroImg}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '50%' }}
                />
                {/* Decorative border circle */}
                <div style={{
                  position: 'absolute',
                  top: '-8px', left: '-8px', right: '-8px', bottom: '-8px',
                  border: '1px dashed var(--accent-color)',
                  borderRadius: '50%',
                  opacity: 0.4,
                  animation: 'spin 20s linear infinite'
                }}></div>
              </div>
            </motion.div>

            {/* Content Sidebar */}
            <motion.div variants={fadeUp} style={{ flex: '1 1 500px', maxWidth: '700px' }}>
              
              {/* Introduction */}
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                {aboutData.intro}
              </p>

              {/* Core Strength */}
              <motion.div variants={slideIn} style={{ marginBottom: '1.5rem' }}>
                <p style={{ 
                  fontSize: '1.05rem', 
                  color: 'var(--text-main)', 
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Layers size={18} style={{ color: 'var(--accent-color)' }} />
                  {aboutData.coreStrength}
                </p>
              </motion.div>


              {/* Enhanced Quote */}
              <motion.p variants={fadeUp} style={{
                fontSize: '1.25rem',
                color: 'var(--accent-color)',
                fontWeight: '600',
                marginBottom: '2.5rem',
                borderLeft: '3px solid var(--accent-color)',
                paddingLeft: '1.5rem',
                fontStyle: 'italic',
                lineHeight: '1.6'
              }}>
                "{aboutData.drive}"
              </motion.p>

              {/* Badges / Traits */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                {aboutData.traits.map((trait, i) => (
                  <motion.span 
                    variants={fadeUp}
                    key={i} 
                    className="tag" 
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      fontSize: '0.85rem', 
                      fontWeight: '600',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      padding: '0.5rem 1rem'
                    }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>

              {/* Philosophy Line */}
              <motion.p variants={fadeUp} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
                {aboutData.philosophy}
              </motion.p>

              {/* Mini Stats */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 0' }}>
                {aboutData.stats.map((stat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <span style={{ color: 'var(--accent-color)', display: 'flex' }}>{stat.icon}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{stat.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Read More Toggle */}
              <motion.button
                variants={fadeUp}
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-outline"
                style={{ fontSize: '0.95rem', padding: '0.6rem 1.5rem', borderRadius: '2rem' }}
              >
                {isExpanded ? 'Show Less' : 'My Journey'}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>

              {/* Journey Timeline (Expandable) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '2.5rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingLeft: '1.25rem', borderLeft: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                      {aboutData.timeline.map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          style={{ position: 'relative' }}
                        >
                          <div style={{
                            position: 'absolute',
                            left: '-1.65rem',
                            top: '0.25rem',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg-color)',
                            border: '2px solid var(--accent-color)',
                            boxShadow: '0 0 0 3px var(--bg-secondary)'
                          }}></div>
                          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.35rem', fontWeight: '600' }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default About;
