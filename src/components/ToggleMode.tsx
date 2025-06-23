import { useTheme } from "./ThemeProvider";
import { useEffect, useRef } from "react";
import gsap from 'gsap';

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sunIconRef = useRef<SVGSVGElement>(null);
  const moonIconRef = useRef<SVGSVGElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!toggleRef.current) return;

      // Initial animation for toggle entrance
      gsap.from(toggleRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 2.0
      });

      // Add hover animation
      toggleRef.current.addEventListener('mouseenter', () => {
        gsap.to(toggleRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      toggleRef.current.addEventListener('mouseleave', () => {
        gsap.to(toggleRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });

    }, toggleRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate icon transition when theme changes
    if (theme === "dark") {
      gsap.to(sunIconRef.current, {
        rotation: 360,
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      gsap.to(moonIconRef.current, {
        rotation: -360,
        scale: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.15,
        ease: "power2.inOut"
      });
    } else {
      gsap.to(moonIconRef.current, {
        rotation: -360,
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      gsap.to(sunIconRef.current, {
        rotation: 360,
        scale: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.15,
        ease: "power2.inOut"
      });
    }
  }, [theme]);

  return (
    <button
      ref={toggleRef}
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full transition-colors duration-300 flex hover:text-zinc-200 items-center justify-center group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Sun Icon */}
      <svg
        ref={sunIconRef}
        className={`absolute w-6 h-6 transition-all duration-300 hover:text-zinc-200 ${
          theme === "light" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>

      {/* Moon Icon */}
      <svg
        ref={moonIconRef}
        className={`absolute w-6 h-6 transition-all duration-300 ${
          theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
      </svg>

      {/* Background glow effect */}
      {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
    </button>
  );
};

export default ToggleMode;
