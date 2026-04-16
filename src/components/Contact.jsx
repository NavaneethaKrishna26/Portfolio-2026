import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Code2, Briefcase, Download, Check } from 'lucide-react';

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
              {copied ? <Check size={20} /> : <Mail size={20} />}
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
              <Code2 size={20} />
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
              <Briefcase size={20} />
              Connect on LinkedIn
            </motion.a>
          </motion.div>

          <motion.p className="response-time" variants={itemVariants}>
            I usually respond within 24 hours
          </motion.p>

          <motion.div className="resume-container" variants={itemVariants}>
            <a href="#resume-link" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1.05rem', borderRadius: '2rem' }}>
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
