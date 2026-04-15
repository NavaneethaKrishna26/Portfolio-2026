import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    span: 2,
    items: ["API Contract Design", "Full Stack Integration", "MVC Architecture", "Pagination", "Error Handling", "Clean Code Practices"]
  },
  {
    title: "Development Workflow",
    highlight: true,
    workflow: true,
    span: 2,
    items: ["Requirement Analysis", "MVP Planning", "API Design", "DB Design", "Implementation", "Integration", "Testing", "Presentation"]
  }
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="section bg-secondary" id="skills" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>My Skills</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '650px' }}>
            I focus on building clean, scalable, and well-structured full stack applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="skills-layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillsData.map((category, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className={`skill-card ${category.highlight ? 'highlight-card' : ''} ${category.span === 2 ? 'span-2' : ''}`}
            >
              <h3 className="card-title">
                {category.title}
                {category.highlight && <Sparkles size={16} className="highlight-icon" />}
              </h3>
              
              <motion.div 
                 className={`card-tags ${category.workflow ? 'workflow-tags' : ''}`}
                 variants={containerVariants}
              >
                {category.items.map((item, i) => (
                  <React.Fragment key={i}>
                    <motion.span variants={tagVariants} className={`skill-tag ${category.highlight ? 'highlight-tag' : ''}`}>
                      {item}
                    </motion.span>
                    {category.workflow && i < category.items.length - 1 && (
                      <motion.span variants={tagVariants} className="workflow-arrow">
                        <ArrowRight size={14} />
                      </motion.span>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
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
        /* Local Styles for Clean Skills Grid */
        .skills-layout {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .skill-card {
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.75rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .skill-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 30px rgba(0,0,0,0.04);
          border-color: var(--border-color);
        }

        html.dark .skill-card:hover {
          box-shadow: 0 12px 30px rgba(255,255,255,0.03);
          border-color: var(--text-muted);
        }

        /* Span Controls for Desktop */
        .span-2 {
          grid-column: span 2;
        }

        /* Highlighting Logic */
        .highlight-card {
          border: 1px solid var(--accent-color);
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.04);
          background-color: rgba(37, 99, 235, 0.01);
        }
        
        html.dark .highlight-card {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
          background-color: rgba(59, 130, 246, 0.02);
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .highlight-icon {
          color: var(--accent-color);
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .workflow-tags {
          align-items: center;
        }

        .skill-tag {
          background-color: var(--bg-secondary);
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          padding: 0.45rem 0.85rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background-color 0.3s, color 0.3s;
        }

        .skill-tag:hover {
          background-color: var(--bg-color);
          color: var(--text-main);
        }

        .highlight-tag {
          border-color: rgba(37, 99, 235, 0.2);
        }
        
        html.dark .highlight-tag {
          border-color: rgba(59, 130, 246, 0.3);
        }

        .workflow-arrow {
          color: var(--accent-color);
          display: flex;
          align-items: center;
          opacity: 0.8;
        }

        /* Bottom Section Styles */
        .value-section {
          text-align: center;
          margin-top: 2rem;
          padding-top: 3rem;
          border-top: 1px solid var(--border-color);
        }

        .strengths-line {
          color: var(--text-main);
          font-size: 1.05rem;
          letter-spacing: 1px;
          margin-bottom: 1rem;
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

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .skills-layout {
            grid-template-columns: repeat(2, 1fr);
          }
          .span-2 {
             grid-column: span 2; /* Still span 2 to consume entire row on Tablet */
          }
        }

        @media (max-width: 640px) {
          .skills-layout {
            grid-template-columns: 1fr;
          }
          .span-2 {
             grid-column: span 1; /* Reset span on Mobile */
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
