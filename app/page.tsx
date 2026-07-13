'use client';
import Image from "next/image";
import Navbar from "./components/Navbar";
import { News_Cycle } from "next/font/google";
import { Layout, Minus, Play } from "lucide-react";
import LavaLampScene from "./components/LavaLampScene";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";

const news = News_Cycle({
  weight: ['400'],
  subsets: ['latin']
});

const descriptionText = "oevra is the first app designed to enhance your creativity and help you get into the flow state based on neuroscience and psychology.";
const descriptionText1 = "realize your creative potential";

const slideData = [
  {
    id: "01",
    tag: "BE MORE\nCREATIVE",
    heading: "Creativity is a skill anyone\ncan learn and improve.",
    desc: "The oevra app is designed to enhance your creative thinking skills and create the optimal conditions (inside and out) for your creativity to thrive — all based on volumes of research in neuroscience and psychology. After only a month of practice, your brain will gain more creative ways of thinking and relating to the world around you.",
    image: "/p1.avif"
  },
  {
    id: "02",
    tag: "DEEP FOCUS\nAND FLOW",
    heading: "Daily practices and tools\ndesigned to activate the\nflow state.",
    desc: "The flow state isn't just a productivity hack — it's key to happiness and satisfaction at work, and it's got proven mental health benefits. You can get into the flow state anytime thanks to our interactive tools and exercises, designed with science in mind.",
    image: "/p21.avif"
  },
  {
    id: "03",
    tag: "GET\nINSPIRED",
    heading: "Reimagine creativity as\npart of your mental\nwellness routine.",
    desc: "Creativity is proven to benefit mental health. Mindfulness practices are central to the oevra creative process — because improving your relationship with yourself improves your creativity too.",
    image: "/p31.avif"
  },
  {
    id: "04",
    tag: "THINK\nBIGGER",
    heading: "Improve your cognitive\nperformance and brain\nhealth.",
    desc: "Neuroscience studies show that creativity helps improve memory, mood, and productivity. It's also neuroprotective, meaning it's good for your brain's health long-term.",
    image: "/p41.avif"
  },
  {
    id: "05",
    tag: "GET\nUNBLOCKED",
    heading: "Demystify the creative\nprocess with structured\npractices.",
    desc: "Don't let procrastination, perfectionism, stress or distractions get in your way anymore. The oevra app helps you break through whatever is holding you back from being your most creative, inspired self. Bye, writer's block.",
    image: "/p51.avif"
  }
];

export default function Home() {
  const heroHeadingRef = useRef<HTMLDivElement>(null);
  const heroDescriptionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLImageElement>(null);
  const thirdImageRef = useRef<HTMLImageElement>(null);
  const fourthImageRef = useRef<HTMLImageElement>(null);
  const fifthImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Heading Animation
    if (heroHeadingRef.current) {
      gsap.from(heroHeadingRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });
    }

    // 2. Hero Paragraph Word-by-Word Animation
    if (heroDescriptionRef.current) {
      gsap.from(heroDescriptionRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power2.out",
        delay: 1.2
      });
    }

    // 3. Third Section (Converge, Full-Screen Zoom, and Cross-fade sequence)
    if (thirdSectionRef.current && imageContainerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top top",
          end: "+=700%", // Extended significantly to accommodate 5 slides
          scrub: 1,
          pin: true,
        },
      });

      const otherImages = [
        secondaryImageRef.current,
        thirdImageRef.current,
        fourthImageRef.current,
        fifthImageRef.current
      ];

      // Step 1: All peripheral images converge to the center and fade out
      tl.to(otherImages, {
        left: "50%",
        top: "50%",
        scale: 0.3,
        opacity: 0,
        rotation: () => Math.random() * 30 - 15,
        duration: 1,
        ease: "power2.inOut",
      }, 0);

      // Step 2: Fade out the initial small text
      tl.to('.initial-text', {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, 0.2);

      // Step 3: Main image container expands to cover the entire viewport
      tl.to(imageContainerRef.current, {
        width: "100vw",
        height: "100vh",
        duration: 1.5,
        ease: "power2.inOut"
      }, 0.4);

      // Step 4: Fade in the first slide's text overlay
      tl.to('.slide-text-0', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 1.5);

      // Step 5: Loop through remaining slides to create the cross-fade effect
      for (let i = 1; i < slideData.length; i++) {
        // Add a reading pause
        tl.to({}, { duration: 1 });

        // Fade out previous text
        tl.to(`.slide-text-${i - 1}`, { opacity: 0, y: -20, duration: 0.5 }, `transition-${i}`);

        // Crossfade to next image
        tl.to(`.slide-img-${i}`, { opacity: 1, duration: 0.8 }, `transition-${i}`);

        // Fade in new text (slightly overlapping the image fade)
        tl.fromTo(`.slide-text-${i}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          `transition-${i}+=0.3`
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* SECTION 1: HERO */}
      <div className="h-screen relative text-white">
        <div className="fixed inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <LavaLampScene />
          </Canvas>
          <div className="absolute inset-0 backdrop-blur-2xl z-10 pointer-events-none" />
        </div>

        <Navbar />

        <div
          ref={heroHeadingRef}
          className={`${news.className} flex items-center pt-25 px-60 gap-5 justify-center flex-col w-full text-7xl font-mono tracking-wider`}
        >
          <p>
            {descriptionText1.split(" ").map((word, index) => (
              <span key={index} className="inline-block mr-4">
                {word}
              </span>
            ))}
          </p>
          <p className="flex w-full items-center">
            overcome any blocks
            <span className="border border-l-0 border-r-0 mb-3 m-2 border-t-0 border-white w-1/6"></span>
          </p>
          <p className="flex w-full items-center">
            <span className="border border-white border-t-0 border-l-0 border-r-0 w-1/6 m-2 "></span>
            find inspiration within
          </p>
        </div>

        <div ref={heroDescriptionRef} className="w-1/4 absolute bottom-15 right-85">
          {descriptionText.split(" ").map((word, index) => (
            <span key={index} className="inline-block mr-1">
              {word}
            </span>
          ))}
        </div>

        <div className="flex absolute bottom-23 right-25 items-center gap-2">
          GET STARTED <Minus className="w-3 font-bold" /> <Minus /> <Play className="w-4 h-4 fill-white" />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="relative z-20 h-screen flex flex-col text-mauve-200 items-center justify-center  backdrop-blur-md">
        <p className="absolute top-20 left-80">Available Now</p>
        <div className="text-8xl font-light font-sans absolute top-15 left-110">
          <p>the immersive portal</p>
          <p>that supports</p>
          <p>your creative</p>
          <p>practice</p>
        </div>
        <div className="w-1/3 absolute right-0 bottom-30">
          <p>Whether or not you consider yourself creative, oevra is designed to train your brain to think more creatively — with structured daily practices, guided exercises, focus tools, courses, and everything you need to break through creative blocks.</p>
        </div>
        <p className="absolute bottom-20 flex right-86">GET THE APP <Minus /><Minus /><Play /></p>
      </div>

      {/* SECTION 3: IMAGE GRID TO CROSS-FADING SLIDES */}
      <div ref={thirdSectionRef} className="relative z-20 h-screen overflow-hidden ">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full max-w-7xl">

            {/* Main Animated Container */}
            <div
              ref={imageContainerRef}
              className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden w-[17rem] h-[24rem] shadow-2xl"
            >

              {/* Stacked Images for Crossfading */}
              {slideData.map((slide, index) => (
                <Image
                  key={slide.id}
                  className={`slide-img-${index} absolute inset-0 object-cover ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  priority={index === 0}
                />
              ))}

              {/* Initial Small Text */}
              <div className="initial-text relative z-10 flex flex-col items-center mt-auto pb-4">
                <p className="text-white/80">(01)</p>
                <p className="text-center font-sans font-light text-white">Be More<br /> Creative</p>
              </div>

              {/* Stacked Overlay Texts */}
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none">
                {slideData.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`slide-text-${index} absolute inset-0 flex flex-col justify-center px-12 lg:px-40 text-white opacity-0`}
                  >
                    <div className="max-w-2xl">
                      <p className="font-mono text-sm tracking-widest mb-1">({slide.id})</p>
                      <p className="font-mono text-sm tracking-widest mb-8 whitespace-pre-line">{slide.tag}</p>

                      <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight whitespace-pre-line">
                        {slide.heading}
                      </h2>

                      <p className="max-w-md text-sm lg:text-base leading-relaxed">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peripheral Scattered Images (Fade out early in scroll) */}
            <Image
              ref={secondaryImageRef}
              src={'/p2.avif'}
              alt="photo2"
              height={1000}
              width={1000}
              className="absolute left-[15%] top-[15%] -translate-x-1/2 -translate-y-1/2 z-10 h-80 w-56 object-cover shadow-xl"
            />
            <Image
              ref={thirdImageRef}
              src={'/p3.avif'}
              alt="photo3"
              height={1000}
              width={1000}
              className="absolute left-[85%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10 h-88 w-64 object-cover shadow-xl"
            />
            <Image
              ref={fourthImageRef}
              src={'/p4.avif'}
              alt="photo4"
              height={1000}
              width={1000}
              className="absolute left-[25%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-0 h-72 w-64 object-cover shadow-xl"
            />
            <Image
              ref={fifthImageRef}
              src={'/p5.avif'}
              alt="photo5"
              height={1000}
              width={1000}
              className="absolute left-[75%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-0 h-80 w-56 object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
      <div className="h-[700vh]">

      </div>
      <div className="h-screen w-full relative flex items-center flex-col justify-center">
        <div className="text-8xl pt-56 font-light ">
          <p className="flex items-center justify-center gap-10"><span className="text-sm">App Features</span> the creative </p>
          <p className="flex justify-center items-center">process <span><Image className="rounded-2xl" src={'/p6.avif'} alt="photo" height={35} width={125} /></span> down to</p>
          <p>a science</p>
        </div>
        <div className="pt-56">
          Meet your creative OS - a suite of daily practices, tools, <br />
          courses and more, designed based on science and <br />
          psychology for holistic support.
        </div>
      </div>
      <div className="h-screen w-full mt-32">
        <div className="flex flex-col items-center justify-center pt-20">
          <p className="uppercase text-mauve-400">Choose your preferred subscription</p>
          <div className="flex gap-10">
            <p className="text-5xl font-light">Try the overa app <br /> with a 7 day free trial</p>
            <p className="pt-10"> Join the community for conscious creativity.<br />
              Choose your membership plan and commit to your<br />
               creative practice today (or try it out for free).

            </p>
            <br/>
            
          </div>
          <p className="pl-40 mt-20">GET  the APP --</p>
          <div className="flex gap-10 mt-20">
            <div className="bg-green-50 rounded-2xl p-10 w-110 flex flex-col gap-5">
              <p className="text-4xl font-light">Monthly Subscription</p>
              <p className="text-olive-600">$15/MONTH</p>
              <p className="font-light">7 days free | renews each month</p>
              <p className="rounded-full border border-olive-400 w-fit p-4 py-2 font-mono text-olive-400  text-sm">SUBSCRIBE</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-10 flex w-110 flex-col gap-5">
              <p className="text-4xl font-light">Yearly Plan</p>
              <p className="text-olive-600">$150/YEAR</p>
              <p className="font-light">only $12.5 per month | 7 days free | cancel anytime</p>
              <p className="rounded-full border bg-olive-400 w-fit p-4 py-2 font-mono text-olive-50 text-sm">ACTIVATE NOW</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}