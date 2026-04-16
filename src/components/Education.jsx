import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const educationData = [
  {
    id: 1,
    degree: "B.E – Computer Science and Engineering (Hons.)",
    institution: "Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
    score: "9.2 CGPA",
    duration: "Nov 2022 – Apr 2026",
    location: "Avadi, Chennai",
    highlight: true,
  },
  {
    id: 2,
    degree: "Higher Secondary",
    institution: "Sri Vidhya Mandir Matriculation Higher Secondary School",
    score: "85%",
    duration: "June 2018 – March 2019",
    location: "Krishnagiri",
    highlight: false,
  },
  {
    id: 3,
    degree: "Secondary School",
    institution: "Sri Vidhya Mandir Matriculation Higher Secondary School",
    score: "97%",
    duration: "June 2016 – March 2017",
    location: "Krishnagiri",
    highlight: false,
  }
];

const Education = () => {
  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Education</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '650px' }}>
            My academic journey and qualifications.
          </p>
        </motion.div>

        <div className="education-timeline">
          {educationData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="education-card"
            >
              <div className="education-dot"></div>
              <div className="education-content">
                <div className="education-header">
                  <h3 className="education-degree">{item.degree}</h3>
                  <div className={`education-score ${item.highlight ? 'score-highlight' : ''}`}>
                    <Award size={16} />
                    <span>{item.score}</span>
                  </div>
                </div>
                <h4 className="education-institution">{item.institution}</h4>
                <div className="education-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{item.duration}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
