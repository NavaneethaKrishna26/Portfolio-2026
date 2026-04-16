import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Theme setup
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Scroll handling for glassmorphism and active section spy
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on typical viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to get initial section
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div className="scroll-progress-bar" style={{ scaleX }} />
        <div className="container" style={{ position: 'relative' }}>
          <motion.div 
            className="logo" 
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            style={{ cursor: 'pointer', textShadow: isScrolled ? 'none' : '0 0 10px rgba(99, 102, 241, 0.3)' }}
          >
            NK<span>.dev</span>
          </motion.div>
          
          <div className="desktop-menu">
            <div className="nav-links">
              {navItems.map((item, idx) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className={activeSection === item.href.substring(1) ? 'active' : ''}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div 
                      className="active-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            <div className="nav-actions">
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="#contact" className="btn btn-primary cta-btn">
                Let's Talk
              </a>
            </div>
          </div>

          <div className="mobile-toggle">
             <button onClick={() => setMobileMenuOpen(true)}>
               <Menu size={24} />
             </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <div className="logo" onClick={scrollToTop}>NK<span>.dev</span></div>
                <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="mobile-nav-links">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={activeSection === item.href.substring(1) ? 'active' : ''}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mobile-bottom-actions">
                  <button onClick={toggleTheme} className="theme-toggle-mobile">
                    {isDark ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
                  </button>
                  <a href="#contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                    Let's Talk
                  </a>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
