'use client';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This ensures GSAP ScrollTrigger updates perfectly in sync with Lenis
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1, // Adjust this for how "heavy" or smooth the scroll feels (0 to 1)
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}