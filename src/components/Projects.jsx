import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'Demo Project One',
    description: 'A brief description of this scalable web application and its purpose.',
    tech: ['React', 'Spring Boot', 'MySQL'],
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 2,
    title: 'Demo Project Two',
    description: 'A clean and minimal interface for managing everyday tasks.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: 3,
    title: 'Demo Project Three',
    description: 'A robust backend integration with secure authentication.',
    tech: ['React', 'Spring Boot', 'JWT'],
    liveLink: '#',
    githubLink: '#'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Projects = () => {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} className="project-card" variants={cardVariants}>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t, index) => (
                  <span key={index} className="tag">{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <Code2 size={16} /> Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
