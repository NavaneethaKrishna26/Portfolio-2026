import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Profile', href: '#about' },
  { name: 'Background', href: '#education' },
  { name: 'Stack', href: '#skills' },
  { name: 'Works', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const mobileLinksContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const mobileLinkItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: 'easeOut' },
  },
};

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const navProgressRaw = useTransform(scrollY, [0, 320], [0, 1]);
  const navProgress = useSpring(navProgressRaw, {
    stiffness: 90,
    damping: 26,
    mass: 0.8,
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
        style={{ '--nav-progress': navProgress }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div className="scroll-progress-bar" style={{ scaleX }} />
        <div className="container navbar-shell">
          <motion.button
            type="button"
            className="logo logo-badge"
            onClick={scrollToTop}
            whileHover={{ scale: 1.03 }}
            aria-label="Back to top"
          >
            NK<span>.dev</span>
          </motion.button>
          
          <div className="desktop-menu">
            <div className="nav-links nav-segmented">
              {navItems.map((item, idx) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className={activeSection === item.href.substring(1) ? 'active' : ''}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <span className="nav-link-label">{item.name}</span>
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
                <span className="theme-toggle-inner">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </span>
              </button>
            </div>
          </div>

          <div className="mobile-toggle">
             <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
               <Menu size={24} />
               <span>Menu</span>
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
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <button type="button" className="logo" onClick={scrollToTop}>
                  NK<span>.dev</span>
                </button>
                <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <motion.div
                className="mobile-nav-links"
                variants={mobileLinksContainer}
                initial="hidden"
                animate="visible"
              >
                {navItems.map((item) => (
                  <motion.a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={activeSection === item.href.substring(1) ? 'active' : ''}
                    variants={mobileLinkItem}
                  >
                    <span className="nav-link-label">{item.name}</span>
                  </motion.a>
                ))}
              </motion.div>
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
