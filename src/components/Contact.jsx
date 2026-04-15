import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, Code2, Download } from 'lucide-react';

const Contact = () => {
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-text">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="contact-links">
            <a href="mailto:email@example.com" className="contact-icon" aria-label="Email" title="Email">
              <Mail size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="LinkedIn" title="LinkedIn">
              <Briefcase size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="GitHub" title="GitHub">
              <Code2 size={24} />
            </a>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <a href="#resume-link" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Download Resume <Download size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
