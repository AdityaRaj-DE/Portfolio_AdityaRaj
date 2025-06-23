import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useGsap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a timeline for the projects section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      }
    });

    // Animate the title
    tl.from(".project-title", {
      y: 100,
      opacity: 0,
      duration: 1
    });

    // Animate each project
    const projects = containerRef.current.querySelectorAll('.project-item');
    projects.forEach((project, index) => {
      tl.from(project, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.3
      }, "-=0.5");
    });

    return () => {
      tl.kill();
    };
  }, []);

  return containerRef;
};

export default useGsap; 