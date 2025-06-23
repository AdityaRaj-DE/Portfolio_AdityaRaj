import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      if (!footerRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
      if (contentRef.current) {
        tl.from(contentRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        });
      }
      socialLinksRef.current.forEach((link, index) => {
        if (link) {
          tl.from(link, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.1
          }, "-=0.2");
        }
      });
      if (copyrightRef.current) {
        tl.from(copyrightRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, "-=0.1");
      }
      ScrollTrigger.refresh();
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="border-t pb-8 border-[#222222] border-2 px-2 sm:px-4 md:px-8">
      <div ref={contentRef} className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Left side - Brand/Name */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Aditya Raj</h3>
            <p className="text-[#aaaaaa] text-xs md:text-sm">
              Full Stack Developer & UI/UX Designer
            </p>
          </div>

          <div className="text-center md:text-right">
            <p ref={copyrightRef} className="text-[#666666] text-xs md:text-sm">
              © {currentYear} Aditya Raj. All rights reserved.
            </p>
            <p className="text-[#666666] text-[10px] md:text-xs mt-1">
              Built with React & TypeScript
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#222222]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-[#666666] text-[10px] md:text-xs">
              
            </div>
            <div className="text-[#666666] text-[10px] md:text-xs">
              Made with ❤️ in India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
