import { useEffect, useState } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the loading screen
    const tl = gsap.timeline({
      onComplete: () => {
        onLoadingComplete();
      }
    });

    // Fade in
    tl.to('.loading-screen', {
      opacity: 1,
      duration: 0.25,
      ease: 'power2.inOut'
    });

    // Animate progress
    tl.to('.progress-bar', {
      width: '100%',
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      }
    });

    // Fade out
    tl.to('.loading-screen', {
      y: -500,
      opacity: 0.1,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-[#101010] flex flex-col items-center justify-center opacity-0">
      <div className="w-screen h-0.5 bg-[#444444] rounded-full overflow-hidden">
        <div 
          className="progress-bar h-full bg-[#888888] rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 