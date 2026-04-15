import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-secondary">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Navaneetha Krishna Krishna R. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Designed and built with React.</p>
      </div>
    </footer>
  );
};

export default Footer;
