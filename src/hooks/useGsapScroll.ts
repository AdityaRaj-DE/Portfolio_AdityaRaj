import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const useGsapScroll = () => {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Create smooth scrolling
    smoother.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
    });

    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && smoother.current) {
        const target = document.querySelector(hash);
        if (target) {
          smoother.current.scrollTo(target, true, 'center center');
        }
      }
    };

    // Initial hash check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (smoother.current) {
        smoother.current.kill();
        smoother.current = null;
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return smoother;
};

export default useGsapScroll;
