import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Network, Database, Settings, Zap, 
  Key, ShieldCheck, Box, Layout, Code2, Search, Map, 
  Blocks, MonitorPlay, Server, GitBranch
} from 'lucide-react';

const skillsData = [
  {
    title: "Frontend",
    items: ["React (Vite)", "JavaScript", "HTML", "CSS", "API Integration", "Component Design", "UI Flow Planning"]
  },
  {
    title: "Backend",
    items: ["Spring Boot", "REST API Design", "Layered Architecture", "JWT Authentication", "DTO Pattern", "Validation", "Exception Handling"]
  },
  {
    title: "Database",
    items: ["MySQL", "Database Design", "Relationships", "Query Optimization"]
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Figma", "VS Code"]
  },
  {
    title: "System & Architecture",
    highlight: true,
    items: ["API Contract Design", "Full Stack Integration", "MVC Architecture", "Pagination", "Error Handling", "Clean Code Practices"]
  },
  {
    title: "Development Workflow",
    highlight: true,
    workflow: true,
    items: ["Requirement Analysis", "MVP Planning", "API Design", "DB Design", "Implementation", "Integration", "Testing", "Presentation"]
  }
];

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const getIcon = (skillName) => {
  const mapping = {
    // Brand Logos
    "React (Vite)": { type: "img", src: devicon("react/react-original.svg") },
    "JavaScript": { type: "img", src: devicon("javascript/javascript-original.svg") },
    "HTML": { type: "img", src: devicon("html5/html5-original.svg") },
    "CSS": { type: "img", src: devicon("css3/css3-original.svg") },
    "Spring Boot": { type: "img", src: devicon("spring/spring-original.svg") },
    "MySQL": { type: "img", src: devicon("mysql/mysql-original.svg") },
    "Git": { type: "img", src: devicon("git/git-original.svg") },
    "GitHub": { type: "img", src: devicon("github/github-original.svg") },
    "Figma": { type: "img", src: devicon("figma/figma-original.svg") },
    "VS Code": { type: "img", src: devicon("vscode/vscode-original.svg") },
    "Postman": { type: "img", src: devicon("postman/postman-original.svg") },
    
    // Abstract Concepts with colorful Lucide Icons
    "JWT Authentication": { type: "lucide", comp: <Key size={18} color="#eab308" /> }, // Yellow
    "REST API Design": { type: "lucide", comp: <Network size={18} color="#06b6d4" /> }, // Cyan
    "API Integration": { type: "lucide", comp: <Zap size={18} color="#f59e0b" /> }, // Amber
    "Component Design": { type: "lucide", comp: <Box size={18} color="#ec4899" /> }, // Pink
    "UI Flow Planning": { type: "lucide", comp: <Layout size={18} color="#8b5cf6" /> }, // Purple
    "Database Design": { type: "lucide", comp: <Database size={18} color="#10b981" /> }, // Emerald
    "Validation": { type: "lucide", comp: <ShieldCheck size={18} color="#14b8a6" /> }, // Teal
    "Clean Code Practices": { type: "lucide", comp: <Code2 size={18} color="#3b82f6" /> }, // Blue
    "Layered Architecture": { type: "lucide", comp: <Blocks size={18} color="#8b5cf6" /> }, // Purple
    "Exception Handling": { type: "lucide", comp: <ShieldCheck size={18} color="#ef4444" /> }, // Red
    "Relationships": { type: "lucide", comp: <GitBranch size={18} color="#f97316" /> }, // Orange
    "Query Optimization": { type: "lucide", comp: <Zap size={18} color="#eab308" /> }, // Yellow
    
    // Workflow Icons
    "Requirement Analysis": { type: "lucide", comp: <Search size={18} color="#3b82f6" /> },
    "MVP Planning": { type: "lucide", comp: <Map size={18} color="#8b5cf6" /> },
    "API Design": { type: "lucide", comp: <Network size={18} color="#06b6d4" /> },
    "DB Design": { type: "lucide", comp: <Database size={18} color="#10b981" /> },
    "Implementation": { type: "lucide", comp: <Code2 size={18} color="#f59e0b" /> },
    "Integration": { type: "lucide", comp: <Blocks size={18} color="#ef4444" /> },
    "Testing": { type: "lucide", comp: <ShieldCheck size={18} color="#14b8a6" /> },
    "Presentation": { type: "lucide", comp: <MonitorPlay size={18} color="#ec4899" /> }
  };
  
  return mapping[skillName] || { type: "lucide", comp: <Settings size={18} color="#94a3b8" /> };
};

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = skillsData[activeIndex];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section bg-secondary" id="skills">
      <div className="container">
        
        {/* Header Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>My Skills</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '650px' }}>
            I focus on building clean, scalable, and well-structured full stack applications.
          </p>
        </motion.div>

        {/* INTERACTIVE TAB WINDOW UX */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="skills-dashboard"
        >
          
          {/* SIDEBAR NAVIGATION */}
          <div className="skills-sidebar">
            {skillsData.map((category, index) => (
              <button
                key={category.title}
                className={`sidebar-btn ${activeIndex === index ? 'active-tab' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="btn-content">
                  <span>{category.title}</span>
                  {category.highlight && <Sparkles size={14} className="highlight-indicator" />}
                </div>
                {/* Active Indicator Line */}
                {activeIndex === index && (
                  <motion.div 
                    layoutId="active-indicator" 
                    className="active-line" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* DYNAMIC CONTENT PANE */}
          <div className="skills-pane">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="pane-inner"
              >
                <h3 className="pane-title">
                  {activeCategory.title}
                  {activeCategory.highlight && <Sparkles size={18} className="highlight-icon" />}
                </h3>

                <div className={`pane-tags ${activeCategory.workflow ? 'workflow-mode' : ''}`}>
                  {activeCategory.items.map((item, i) => {
                    const iconDef = getIcon(item);
                    return (
                      <React.Fragment key={i}>
                        <span className={`detail-tag ${activeCategory.highlight ? 'accent-tag' : ''}`}>
                          <span className="skill-icon">
                            {iconDef.type === 'img' ? (
                               <img src={iconDef.src} alt={item} className={item === 'GitHub' ? 'github-icon' : ''} />
                            ) : (
                               iconDef.comp
                            )}
                          </span>
                          <span>{item}</span>
                        </span>
                        {activeCategory.workflow && i < activeCategory.items.length - 1 && (
                          <span className="workflow-arrow">
                            <ArrowRight size={16} />
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Strengths & Value Statement */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="value-section"
        >
          <h4 className="strengths-line">
            Problem Solving &bull; System Thinking &bull; Clean Code &bull; Scalable Design
          </h4>
          <p className="value-statement">
            "I can design and build full-stack applications with clear API contracts, structured backend architecture, and seamless frontend integration."
          </p>
        </motion.div>

      </div>

      <style>{`
        /* NEW UX: Skills Dashboard Layout */
        .skills-dashboard {
          display: flex;
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          overflow: hidden;
          margin-bottom: 4rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.02);
          min-height: 400px;
        }

        /* SIDEBAR STYLES */
        .skills-sidebar {
          width: 30%;
          min-width: 250px;
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
        }

        .sidebar-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 1.25rem 2rem;
          text-align: left;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.3s ease, background-color 0.3s ease;
          outline: none;
        }

        .sidebar-btn:hover {
          color: var(--text-main);
          background-color: rgba(0,0,0,0.02);
        }
        
        html.dark .sidebar-btn:hover { background-color: rgba(255,255,255,0.02); }

        .sidebar-btn.active-tab {
          color: var(--text-main);
          font-weight: 600;
          background-color: var(--bg-color);
        }

        .btn-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .highlight-indicator {
          color: var(--accent-color);
        }

        .active-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: var(--accent-color);
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        /* PANE CONTENT STYLES */
        .skills-pane {
          flex: 1;
          padding: 3rem;
          display: flex;
          align-items: flex-start;
        }

        .pane-inner {
          width: 100%;
        }

        .pane-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .highlight-icon {
          color: var(--accent-color);
          opacity: 0.8;
        }

        .pane-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* Specialized flow for Development Sequence */
        .workflow-mode {
          align-items: center;
        }

        .detail-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: var(--bg-secondary);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          padding: 0.75rem 1.25rem;
          border-radius: 3rem;
          font-size: 0.95rem;
          font-weight: 500;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .detail-tag:hover {
          transform: translateY(-2px);
          border-color: var(--text-muted);
        }

        .accent-tag {
          border-color: rgba(37, 99, 235, 0.2);
          background-color: rgba(37, 99, 235, 0.02);
        }

        html.dark .accent-tag {
          border-color: rgba(59, 130, 246, 0.3);
          background-color: rgba(59, 130, 246, 0.05);
        }

        .skill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .skill-icon img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        /* Fix GitHub icon turning invisible on dark mode since original is black */
        html.dark .github-icon {
           filter: invert(1);
        }

        .workflow-arrow {
          color: var(--accent-color);
          display: flex;
          align-items: center;
          opacity: 0.6;
        }

        /* BOTTOM SECTION */
        .value-section {
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 3rem;
        }

        .strengths-line {
          color: var(--text-main);
          font-size: 1.05rem;
          letter-spacing: 1px;
          margin-bottom: 1.25rem;
          font-weight: 600;
        }

        .value-statement {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          font-style: italic;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 900px) {
          .skills-dashboard {
            flex-direction: column;
            min-height: auto;
          }
          
          .skills-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            flex-direction: row;
            overflow-x: auto;
            padding: 0;
          }
          
          /* Hide scrollbar for clean tab look on mobile */
          .skills-sidebar::-webkit-scrollbar { display: none; }
          .skills-sidebar { -ms-overflow-style: none; scrollbar-width: none; }

          .sidebar-btn {
            padding: 1rem 1.5rem;
            white-space: nowrap;
          }

          .active-line {
            left: 0;
            top: auto;
            bottom: 0;
            width: 100%;
            height: 3px;
            border-radius: 4px 4px 0 0;
          }

          .skills-pane {
            padding: 2rem 1.5rem;
          }

          .strengths-line {
             font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
