import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadDone = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader onDone={handleLoadDone} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: loading ? 'none' : 'all',
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;

