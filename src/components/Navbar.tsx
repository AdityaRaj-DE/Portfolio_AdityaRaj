import { HashLink as Link } from "react-router-hash-link";
import { useCallback, useEffect, useRef } from "react";
import gsap from 'gsap';
import ToggleMode from './ToggleMode';

const NavBar = () => {
  const navRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const toggleRef = useRef<HTMLLIElement>(null);

  const scrollWithOffset = useCallback((el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100; // Adjusted offset for better alignment
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
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!navRef.current) return;

      // Initial animation for navbar entrance
      const tl = gsap.timeline();

      // Animate the navbar container
      tl.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 1.4
      });

      // Animate navigation links in sequence
      navLinksRef.current.forEach((link, index) => {
        if (link) {
          tl.from(link, {
            y: -30,
            opacity: 0,
            duration: 0.3,
            delay: index * 0.1,
            ease: "back.out(1.7)"
          }, "-=0.3");
        }
      });

      // Animate toggle button
      if (toggleRef.current) {
        tl.from(toggleRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          delay: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.2");
      }

      // Add hover animations for each link
      navLinksRef.current.forEach((link) => {
        if (link) {
          const linkElement = link.querySelector('a');
          if (linkElement) {
            // Hover in animation
            linkElement.addEventListener('mouseenter', () => {
              gsap.to(linkElement, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
              });
            });

            // Hover out animation
            linkElement.addEventListener('mouseleave', () => {
              gsap.to(linkElement, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
              });
            });
          }
        }
      });

    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="flex justify-center lg:w-screen lg:h-28">
      <ul className="flex justify-center lg:gap-8 items-center lg:rounded-full py-1 lg:my-6 lg:w-8/12 px-1 bg-clip-padding border-[#1a1a1a] border-2 backdrop-filter backdrop-blur-lg bg-opacity-10 font-medium">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 341 251"
            fill="none"
            className="h-5 "
          >
            <path
              d="M341 0.5V81.4132C341 148.497 286.005 202.552 218.931 201.395L196 201V162.5H211C260.706 162.5 301 122.206 301 72.5V35.5H196V183L255.25 162.5H298C321.748 162.5 341 181.752 341 205.5V205.5V250.5H301V226.655V226.655C301 213.42 290.392 202.627 277.159 202.399L196 201V250.5H159V35.5H134C84.2944 35.5 44 75.7944 44 125.5V162.5H159V203.5H44V250.5H0.5V120.5C0.5 54.2258 54.2258 0.5 120.5 0.5H159H341Z"
              fill="#888888"
            />
          </svg>
        </li>
        
        <li ref={(el) => { navLinksRef.current[0] = el; }}>
          <Link
            smooth
            to="#home"
            scroll={scrollWithOffset}
            className="py-2 lg:text-xl  text-xs px-2 rounded-full hover:text-zinc-200 transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li ref={(el) => { navLinksRef.current[1] = el; }}>
          <Link
            smooth
            to="#skills"
            scroll={scrollWithOffset}
            className="py-2 lg:text-xl text-xs px-2 rounded-full hover:text-zinc-200 transition-colors duration-300"
          >
            Skills
          </Link>
        </li>
        <li ref={(el) => { navLinksRef.current[2] = el; }}>
          <Link
            smooth
            to="#projects"
            scroll={scrollWithOffset}
            className="py-2 lg:text-xl text-xs px-2 rounded-full hover:text-zinc-200 transition-colors duration-300"
          >
            Projects
          </Link>
        </li>
        <li ref={(el) => { navLinksRef.current[3] = el; }}>
          <Link
            smooth
            to="#contact"
            scroll={scrollWithOffset}
            className="py-2 lg:text-xl text-xs px-2 rounded-full hover:text-zinc-200 transition-colors duration-300"
          >
            Contact
          </Link>
        </li>
        <li ref={(el) => { navLinksRef.current[4] = el; }}>
          <Link
            to="/Resume.pdf"
            className="py-2 lg:text-xl text-xs px-2 rounded-full hover:text-zinc-200 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
        </li>
        <li ref={toggleRef}>
          <ToggleMode />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
