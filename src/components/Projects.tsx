import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText';
import P1 from '../assets/P1.png'
import P2 from '../assets/P2.png'
import P3 from '../assets/P3.png'
import P4 from '../assets/P4.png'
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "top 30px",
          scrub: 1,
        }
      });
      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.5,
        });
      }
      projectCardsRef.current.forEach((card, index) => {
        if (card) {
          tl.from(card, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            delay: index * 0.2
          }, "-=0.3");
        }
      });
      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[60rem] flex flex-col md:flex-row relative px-2 sm:px-4 md:px-8 py-6 md:py-8">
      <div className="w-full flex flex-col gap-4 md:gap-8">
        <div className="text-center">
          <div ref={titleRef} className="w-full py-4 ">
            <ShinyText text="Projects" disabled={false} speed={3} className='custom-class' />
          </div>
        </div>

        <div>
          <div className="w-full flex flex-col no-scrollbar gap-4 md:gap-8 justify-center">
            <div ref={(el) => { projectCardsRef.current[0] = el; }} className='flex flex-col md:flex-row gap-4 md:gap-8 justify-center'>
              <div className="h-full relative flex flex-col">
                <SpotlightCard className="custom-spotlight-card p-6" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="h-56 rounded-2xl">
                    <img src={P1} alt="Project 1" className="w-full rounded-2xl h-full object-cover bg-zinc-800" />
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <h1 className="text-2xl text-[#aaaaaa] font-medium  pt-4 pb-1 ">
                        Air Quality Statistic
                      </h1>
                      <h1 className="lg:w-[20rem] text-xs">
                        This project show the Air Quality using a SQL database
                      </h1>
                    </div>
                    <div className=' flex flex-row my-4 gap-2'>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"></path> </svg>
                      </div>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path> </svg>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
              <div className="h-full relative flex flex-col">
                <SpotlightCard className="custom-spotlight-card p-6" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="h-56 rounded-2xl">
                    <img src={P2} alt="Project 1" className="w-full rounded-2xl h-full object-cover bg-zinc-800" />
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <h1 className="text-2xl text-[#aaaaaa] font-medium  pt-4 pb-1 ">
                        AI Based chatting app
                      </h1>
                      <h1 className="lg:w-[20rem] text-xs">
                        Collaboration chatting application with AI integration
                      </h1>
                    </div>
                    <div className=' flex flex-row my-4 gap-2'>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"></path> </svg>
                      </div>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path> </svg>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
            <div ref={(el) => { projectCardsRef.current[1] = el; }} className='flex flex-col md:flex-row justify-center gap-4 md:gap-8'>
              <div className="h-full relative flex flex-col gap-8">
                <SpotlightCard className="custom-spotlight-card p-6" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="h-56 rounded-2xl">
                    <img src={P3} alt="Project 1" className="w-full rounded-2xl h-full object-cover bg-zinc-800" />
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <h1 className="text-2xl text-[#aaaaaa] font-medium  pt-4 pb-1 ">
                        Notes App
                      </h1>
                      <h1 className="lg:w-[20rem] text-xs">
                        Notes app to create, edit and delete notes
                      </h1>
                    </div>
                    <div className=' flex flex-row my-4 gap-2'>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"></path> </svg>
                      </div>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path> </svg>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
              <div className="h-full relative flex flex-col">
                <SpotlightCard className="custom-spotlight-card p-6" spotlightColor="rgba(255, 255, 255, 0.2)">
                  <div className="h-56 rounded-2xl">
                    <img src={P4} alt="Project 1" className="w-full rounded-2xl h-full object-cover bg-zinc-800" />
                  </div>
                  <div className="flex flex-row">
                    <div>
                      <h1 className="text-2xl text-[#aaaaaa] font-medium  pt-4 pb-1 ">
                        Numbly Game
                      </h1>
                      <h1 className="lg:w-[20rem] text-xs">
                        It is a Number gessing game just like Wordly a word gussing game
                      </h1>
                    </div>
                    <div className=' flex flex-row my-4 gap-2'>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"></path> </svg>
                      </div>
                      <div className='bg-[#222222] rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 p-2"> <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path> </svg>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>

          </div>


        </div>
      </div>

    </div >
  );
};

export default Projects;
