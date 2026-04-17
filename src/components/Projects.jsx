import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, LayoutTemplate, Box } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'Food Ordering Application',
    description: 'A full-stack food ordering platform with user and admin roles, allowing users to browse menus, manage carts, and place orders, while admins manage restaurants, items, and orders.',
    features: [
      'Role-based access (ADMIN / USER)',
      'JWT authentication',
      'Order lifecycle tracking (PENDING → DELIVERED)',
      'Admin dashboard for full control'
    ],
    tech: ['Java 17', 'Spring Boot', 'Spring Security + JWT', 'MySQL', 'React 19', 'Axios', 'Vite'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/Food-ordering-application-Code-Blooded.git',
    category: 'Full Stack',
    badge: 'Full Stack'
  },
  {
    id: 2,
    title: 'JWT Authentication App',
    description: 'A focused full-stack application demonstrating secure JWT authentication flow from login to protected routes.',
    features: [
      'User registration and login',
      'JWT stored in localStorage',
      'Protected routes with React Router',
      'Clean minimal auth flow'
    ],
    tech: ['Spring Boot', 'Spring Security + JWT', 'React 19', 'React Router', 'Vite'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/JWT.git',
    category: 'Full Stack',
    badge: 'Backend Focused'
  },
  {
    id: 3,
    title: 'Subscription Tracking App',
    description: 'A subscription management system to track services like Netflix and Spotify with billing cycles and cost tracking.',
    features: [
      'Full CRUD operations',
      'Monthly/annual billing tracking',
      'Cost calculation and filtering',
      'Form validation and toast notifications'
    ],
    tech: ['Spring Boot', 'MySQL', 'JWT', 'React 19', 'Tailwind CSS', 'Hook Form'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/Subscription-tracking-2.git',
    category: 'Full Stack',
    badge: 'Full Stack'
  },
  {
    id: 4,
    title: 'Leave Management System',
    description: 'A role-based system for managing employee leave requests with approval workflows.',
    features: [
      'Roles: EMPLOYEE / MANAGER / ADMIN',
      'Manager-based approval system',
      'Secure endpoints with @PreAuthorize',
      'Dashboard-based UI'
    ],
    tech: ['Spring Boot', 'Spring Security + JWT', 'MySQL', 'React 19', 'Axios'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/Leave-Management-System.git',
    category: 'Full Stack',
    badge: 'Full Stack'
  },
  {
    id: 5,
    title: 'Smart University Management',
    description: 'A full-stack university portal with role-based dashboards for students, faculty, and admins.',
    features: [
      'Assignment submission and feedback',
      'Attendance tracking system',
      'Role-based dashboards',
      'Public pages (courses, placements, etc.)'
    ],
    tech: ['Spring Boot', 'JWT', 'MySQL', 'React 19', 'React Router', 'Axios'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/smart-university-management-system.git',
    category: 'Full Stack',
    badge: 'Full Stack'
  },
  {
    id: 6,
    title: 'Team Evaluation System',
    description: 'A hackathon evaluation platform where teams are scored and ranked based on multiple criteria.',
    features: [
      'Team registration system',
      'Admin scoring dashboard',
      'Auto-calculated average scores',
      'Leaderboard with ranking'
    ],
    tech: ['Spring Boot', 'JWT', 'MySQL', 'React 19', 'Axios'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/2-3-26.git',
    category: 'Full Stack',
    badge: 'Backend Focused'
  },
  {
    id: 7,
    title: 'MealDB 2.0',
    description: 'A frontend application that fetches and displays meals from TheMealDB API with advanced filtering and sorting capabilities.',
    features: [
      'Search by name, category, cuisine',
      'Difficulty filtering by ingredients',
      'Sorting and favorites system'
    ],
    tech: ['React 19', 'Vite', 'CSS', 'REST API'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/MealDB2.0.git',
    category: 'Frontend',
    badge: 'Frontend UI'
  },
  {
    id: 8,
    title: 'Job App Backend',
    description: 'A backend REST API for managing job listings, companies, and reviews with secure JWT authentication.',
    features: [
      'CRUD operations for jobs, companies',
      'JWT-based authentication',
      'Global exception handling',
      'Structured API design'
    ],
    tech: ['Java 17', 'Spring Boot', 'Spring Security + JWT', 'MySQL', 'Hibernate'],
    githubDomain: 'https://github.com/NavaneethaKrishna26/job-app-backend.git',
    category: 'Backend',
    badge: 'Backend Focused'
  }
];

const renderIcon = (badge) => {
  if (badge.includes("Backend")) return <Server size={14} />;
  if (badge.includes("Frontend")) return <LayoutTemplate size={14} />;
  return <Box size={14} />;
};

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="project-card"
    >
      <div className="project-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {renderIcon(project.badge)}
        {project.badge}
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      {/* Expandable section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="project-features">
              <ul>
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="project-tech">
              {project.tech.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer actions */}
      <div className="project-links" style={{ marginTop: '1.25rem' }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-outline"
        >
          {expanded ? 'Show Less' : 'Know More'}
        </button>
        <a href={project.githubDomain} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <Code2 size={16} /> View Code
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => 
        filter === 'Backend' ? (p.category === 'Backend' || p.badge === 'Backend Focused') : 
        filter === 'Frontend' ? p.category === 'Frontend' : 
        p.category === filter
      );

  const renderIcon = (badge) => {
    if (badge.includes("Backend")) return <Server size={14} />;
    if (badge.includes("Frontend")) return <LayoutTemplate size={14} />;
    return <Box size={14} />;
  };

  return (
    <section className="section bg-secondary" id="projects">
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Projects</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '750px' }}>
            Here are some of the projects I’ve built, focusing on backend architecture, authentication, and full stack systems.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="projects-filter">
          {['All', 'Full Stack', 'Backend', 'Frontend'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} renderIcon={renderIcon} />
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Projects;
