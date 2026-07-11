'use client';
import Image from "next/image";
import Navbar from "./components/Navbar";
import { News_Cycle } from "next/font/google";
import { Layout, Minus, Play } from "lucide-react";
import LavaLampScene from "./components/LavaLampScene";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";

const news = News_Cycle({
  weight: ['400'],
  subsets: ['latin']
});

// 1. Extract the text so we can split it cleanly in the JSX
const descriptionText = "oevra is the first app designed to enhance your creativity and help you get into the flow state based on neuroscience and psychology.";
const descriptionText1 = "realize your creative potential";

export default function Home() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  // 2. Add a new ref for the paragraph container
  const paraRef = useRef<HTMLDivElement>(null);
  const paraRef1 = useRef<HTMLDivElement>(null);
  const paraRef2 = useRef<HTMLDivElement>(null);
  const paraRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main heading animation
    if (textContainerRef.current) {
      gsap.from(textContainerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        delay: 0.2
      });
    }

    // 3. New word-by-word paragraph animation
    if (paraRef.current) {
      gsap.from(paraRef.current.children, {
        y: 20,                // Slight upward movement
        opacity: 0,           
        duration: 0.8,
        stagger: 0.04,        // A very fast stagger (0.04s) so it reads fluidly like typing/revealing
        ease: "power2.out",
        delay: 1.2            // Triggers right as the main heading finishes
      });
    }

    if (paraRef1.current) {
      gsap.from(paraRef1.current.children, {
        y: 20,                // Slight upward movement
        opacity: 0,           
        duration: 0.7,
        stagger: 0.2,        // A very fast stagger (0.04s) so it reads fluidly like typing/revealing
        ease: "power2.out",
        delay: 0.02            // Triggers right as the main heading finishes
      });
    }
  }, []);

  return (
    <>
      <div className="h-screen relative text-white">
        <div className="fixed inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <LavaLampScene />
          </Canvas>
          
          <div className="absolute inset-0 backdrop-blur-2xl z-10 pointer-events-none" />
        </div>
        
        <Navbar />
        
        <div 
          ref={textContainerRef}
          className={`${news.className} flex items-center pt-25 px-60 gap-5 justify-center flex-col w-full text-7xl font-mono tracking-wider`}
        >
          <p ref={paraRef1}>{descriptionText1.split(" ").map((word, index) => (
            // 'inline-block' is critical! GSAP cannot animate transforms (like y: 20) on standard inline text.
            <span key={index} className="inline-block mr-1">
              {word}
            </span>
          ))}</p>
          <p ref={paraRef} className="flex w-full items-center">
            overcome any blocks 
            <span className="border border-l-0 border-r-0 mb-3 m-2 border-t-0 border-white w-1/6"></span>
          </p>
          <p ref={paraRef} className="flex w-full items-center">
            <span className="border border-white border-t-0 border-l-0 border-r-0 w-1/6 m-2 "></span> 
            find inspiration within
          </p>
        </div>

        {/* 4. Split the text and wrap each word in a span */}
        <div ref={paraRef} className="w-1/4 absolute bottom-15 right-85">
          {descriptionText.split(" ").map((word, index) => (
            // 'inline-block' is critical! GSAP cannot animate transforms (like y: 20) on standard inline text.
            <span key={index} className="inline-block mr-1">
              {word}
            </span>
          ))}
        </div>

        <div className="flex absolute bottom-23 right-25 items-center gap-2">
          GET STARTED <Minus className="w-3 font-bold" /> <Minus /> <Play className="w-4 h-4 fill-white" />
        </div>
      </div>

      <div className="relative z-20 h-screen flex items-center justify-center">
        <h2 className="text-5xl font-mono">Scroll Down... Colors change!</h2>
      </div>
    </>
  );
}