import { Routes, Route } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import Home from '../components/Home';
// import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import SkillsMarque from '../components/SkillsMarque';
import Footer from '../components/Footer';

const Routing = () => {
  const smoothScrollToSection = useCallback((hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -100; // Same offset as navbar
      const targetPosition = yCoordinate + yOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for slower scroll
      let start: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const easedProgress = easeInOutCubic(progress);
        const currentPosition = startPosition + (distance * easedProgress);
        
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  useEffect(() => {
    // Smooth scroll behavior for hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        smoothScrollToSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [smoothScrollToSection]);

  return (
    <div className="app-container">
      <section id="home" className="scroll-mt-28">
        <Home />
      </section>
      
      <section id="skills" className="scroll-mt-28">
        <SkillsMarque />
      </section>
      
      <section id="projects" className="scroll-mt-28">
        <Projects />
      </section>
      
      <section id="contact" className="scroll-mt-28">
        <Contact />
      </section>

      <section id="footer" className="scroll-mt-28">
        <Footer/>
      </section>
    
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </div>
  );
};

export default Routing;