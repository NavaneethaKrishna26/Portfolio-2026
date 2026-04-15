import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, User, Award, Code, BookOpen } from 'lucide-react';
import heroImg from '../assets/hero.png';

const aboutData = {
  intro: "I am a fresher Full Stack Developer driven by a strong passion for continuous learning. I hold a firm belief that consistency and a growth mindset are the core of tackling complex problems. My interest lies in diving deep into development ecosystems and crafting efficient, maintainable web applications.",
  drive: "I enjoy turning ideas into real-world applications that people can use.",
  traits: ["Consistent", "Problem Solver", "Creative", "Adaptable"],
  stats: [
    { label: "9+ CGPA", icon: <Award size={16} /> },
    { label: "5+ Projects", icon: <Code size={16} /> },
    { label: "Fresher Developer", icon: <BookOpen size={16} /> }
  ],
  timeline: [
    { title: "Started with NEET preparation", desc: "Built foundational discipline, resilience, and analytical skills." },
    { title: "Transitioned into Computer Science", desc: "Discovered an immense passion for programming and logical problem-solving." },
    { title: "Built multiple projects", desc: "Gained significant hands-on experience by bringing various ideas to life." },
    { title: "Focusing on Backend & Full Stack", desc: "Sharpening my skills in scalable architectures, APIs, and modern frontends." }
  ]
};

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
          <motion.h2 variants={fadeUp} className="section-title">About Me</motion.h2>

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
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {aboutData.intro}
              </p>

              {/* What Drives Me Statement */}
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-main)',
                fontWeight: '500',
                marginBottom: '2rem',
                borderLeft: '3px solid var(--accent-color)',
                paddingLeft: '1.25rem',
                fontStyle: 'italic'
              }}>
                "{aboutData.drive}"
              </p>

              {/* Quick Traits */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                {aboutData.traits.map((trait, i) => (
                  <span key={i} className="tag" style={{ backgroundColor: 'var(--bg-color)', fontSize: '0.8rem', fontWeight: '500' }}>
                    {trait}
                  </span>
                ))}
              </div>

              {/* Mini Stats */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 0' }}>
                {aboutData.stats.map((stat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <span style={{ color: 'var(--accent-color)', display: 'flex' }}>{stat.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Read More Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-outline"
                style={{ fontSize: '0.9rem', padding: '0.5rem 1.25rem', borderRadius: '2rem' }}
              >
                {isExpanded ? 'Show Less' : 'My Journey'}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Journey Timeline (Expandable) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '2.5rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingLeft: '1.25rem', borderLeft: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {aboutData.timeline.map((item, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <div style={{
                            position: 'absolute',
                            left: '-1.65rem',
                            top: '0.25rem',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg-color)',
                            border: '2px solid var(--accent-color)'
                          }}></div>
                          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.25rem', fontWeight: '600' }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {item.desc}
                          </p>
                        </div>
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
