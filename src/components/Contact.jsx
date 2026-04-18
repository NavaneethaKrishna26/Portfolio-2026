import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Download } from 'lucide-react';

const GmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6.5C2 5.67 2.67 5 3.5 5H20.5C21.33 5 22 5.67 22 6.5V17.5C22 18.33 21.33 19 20.5 19H3.5C2.67 19 2 18.33 2 17.5V6.5Z" fill="#EA4335" fillOpacity="0.15" stroke="#EA4335" strokeWidth="1.5"/>
    <path d="M2 7L12 13L22 7" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" fillOpacity="0.15" stroke="#0A66C2" strokeWidth="1.5"/>
    <path d="M7 10v7M7 7v.5" stroke="#0A66C2" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M11 17v-3.5c0-1.5 1-2.5 2.5-2.5S16 12 16 13.5V17" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 10v7" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('krishnaofficial2026@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Get In Touch
          </motion.h2>

          <motion.p className="contact-text" variants={itemVariants}>
            Let’s build something meaningful together. I’m always open to discussing new opportunities or ideas.
          </motion.p>

          <motion.div className="availability-status" variants={itemVariants}>
            <span className="status-dot"></span>
            Available for opportunities
          </motion.div>

          <motion.div className="contact-actions" variants={containerVariants}>
            <motion.a
              href="mailto:krishnaofficial2026@gmail.com"
              className="contact-action-btn"
              onClick={handleCopyEmail}
              title="Copy Email"
              variants={itemVariants}
            >
              {copied ? <Check size={20} color="#22c55e" /> : <GmailIcon />}
              Email Me
            </motion.a>
            <motion.a
              href="https://github.com/NavaneethaKrishna26"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
              title="View GitHub Profile"
              variants={itemVariants}
            >
              <GitHubIcon />
              View GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/navaneethakrishna2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
              title="Connect on LinkedIn"
              variants={itemVariants}
            >
              <LinkedInIcon />
              Connect on LinkedIn
            </motion.a>
          </motion.div>

          <motion.p className="response-time" variants={itemVariants}>
            I usually respond within 24 hours
          </motion.p>

          <motion.div className="resume-container" variants={itemVariants}>
            <a href="/resume.pdf" download="Navaneetha_Krishna_Resume.pdf" className="btn btn-primary">
              Download Resume <Download size={20} />
            </a>
            <span className="text-small">Last updated: 2026</span>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3 }}
          >
            <Check size={18} color="#22c55e" /> Email copied!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
