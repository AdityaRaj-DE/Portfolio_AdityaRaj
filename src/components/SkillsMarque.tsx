import React, { useEffect, useState } from "react";
import ScrollVelocity from "../blocks/TextAnimations/ScrollVelocity/ScrollVelocity";

const SkillsMarque: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Detect theme changes
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        // Initial check
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative h-[10rem] overflow-hidden w-full  bg-transparent">
            {isDarkMode && (
                <>
                    <div className="pointer-events-none sm:w-0 absolute left-0 top-0 h-full lg:w-80 z-10" style={{ background: "linear-gradient(to right, #101010 40%, transparent 100%)" }} />
                    <div className="pointer-events-none absolute sm:w-0 right-0 top-0 h-full lg:w-80 z-10" style={{ background: "linear-gradient(to left, #101010 40%, transparent 100%)" }} />
                </>
            )}
            <ScrollVelocity
                texts={['React ● TypeScript ● JavaScript ● Tailwind CSS ● Vite ● GSAP ● Framer Motion ● Figma ●']}
                velocity={80}
                className="custom-scroll-text py-4"
            />
        </div>
    );
};

export default SkillsMarque;
