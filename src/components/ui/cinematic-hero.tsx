"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Removed film-grain SVG filter for performance */

  .scroll-indicator-container {
      position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
      display: flex; flex-col; items-center; gap: 12px; z-index: 30;
  }

  .mouse-body {
      width: 26px; height: 42px; 
      border: 2px solid color-mix(in srgb, var(--color-foreground) 20%, transparent);
      border-radius: 20px; position: relative;
      background: color-mix(in srgb, var(--color-foreground) 5%, transparent); 
      backdrop-filter: blur(4px);
  }

  .mouse-wheel {
      width: 4px; height: 8px; 
      background: var(--color-foreground);
      border-radius: 2px; position: absolute; top: 8px; left: 50%;
      transform: translateX(-50%);
      animation: scroll-wheel-anim 2s infinite;
  }

  @keyframes scroll-wheel-anim {
      0% { opacity: 0; transform: translate(-50%, 0); }
      30% { opacity: 1; transform: translate(-50%, 4px); }
      100% { opacity: 0; transform: translate(-50%, 20px); }
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* Hardware acceleration to prevent WebKit clipping bug */
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }

  .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(165deg, rgba(20, 20, 25, 0.95) 0%, rgba(5, 5, 10, 0.98) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      @media (max-width: 768px) {
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
      }
      box-shadow: 
          0 100px 150px -50px rgba(0, 0, 0, 1),
          0 50px 100px -50px rgba(0, 0, 0, 0.9),
          inset 0 1px 1px rgba(255, 255, 255, 0.12),
          inset 0 -1px 1px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: React.ReactNode;
  tagline2?: React.ReactNode;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
}

export function CinematicHero({
  brandName = "Faiq's Studio",
  tagline1 = "Track the journey,",
  tagline2 = "Beyond the Expected.",
  cardHeading = "Accountability, redefined.",
  cardDescription = "Specializing in designing memorable brand identities and building highly responsive layouts.",
  metricValue = 30,
  metricLabel = "Projects Completed",
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [showSpline, setShowSpline] = React.useState(false);

  // 1. Force Scroll Top & Mouse Tracking
  useEffect(() => {
    const timer = setTimeout(() => setShowSpline(true), 2000);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.clearScrollMemory) {
      ScrollTrigger.clearScrollMemory();
    }

    window.scrollTo(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable on mobile for performance
      if (window.scrollY > window.innerHeight * 1.5) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (mouseY - centerY) / 50;
          const rotateY = (centerX - mouseX) / 50;

          gsap.to(mainCardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const timer = setTimeout(() => {
      setShowSpline(true);
    }, 2000);

    const ctx = gsap.context(() => {
      // Initialize Hero States
      gsap.set(".gsap-reveal", { autoAlpha: 0, y: 30 });
      gsap.set(".hero-title-reveal", { yPercent: 100, y: 0, autoAlpha: 0 });

      // 1. Initial Entrance Animation (Cinematic Reveal)
      const titleTl = gsap.timeline({ delay: 0.5 });

      titleTl.to(".hero-title-reveal", {
        yPercent: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.2,
        ease: "expo.out",
      })
        .fromTo(".hero-title-reveal",
          {
            letterSpacing: "0.4em",
            filter: "blur(15px)",
          },
          {
            letterSpacing: "inherit",
            filter: "blur(0px)",
            duration: 2.5,
            stagger: 0.2,
            ease: "power4.out"
          },
          0
        );

      gsap.to(".scroll-indicator-container", {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 2
      });

      // 2. Scroll-Tied Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=150%" : "+=250%",
          scrub: isMobile ? 0.3 : 0.6,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to([".hero-text-wrapper", ".scroll-indicator-container"], {
        scale: 0.9,
        y: -100,
        autoAlpha: 0,
        duration: 2,
        ease: "power2.inOut"
      }, "+=0.3")
        .fromTo(".main-card",
          { scale: 1.5, z: 800, autoAlpha: 0, rotateX: 20 },
          { scale: 1, z: 0, autoAlpha: 1, rotateX: 0, ease: "expo.out", duration: 2.5 },
          "-=1"
        )
        // Reveal About Content inside card
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.9 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")

      tl.to({}, { duration: 1.2 }) // Hold time for reading (reduced for better sensitivity)

      tl.addLabel("pullback")
      tl.to([".main-card", ".card-left-text", ".card-right-text"], {
        y: -window.innerHeight - 300,
        autoAlpha: 0,
        ease: "power3.in",
        duration: 2
      }, "pullback");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 will-change-transform transform-style-3d">
        <div className="overflow-hidden mb-2">
          <h1 className="text-track gsap-reveal hero-title-reveal text-3xl md:text-6xl lg:text-[3.5rem] font-medium tracking-tight leading-none">
            {tagline1}
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-days gsap-reveal hero-title-reveal text-3xl md:text-6xl lg:text-[3.5rem] font-thin tracking-tighter leading-none">
            {tagline2}
          </h1>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="scroll-indicator-container gsap-reveal" style={{ opacity: 0, transform: "translateY(20px)" }}>
        <div className="mouse-body">
          <div className="mouse-wheel" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30 mt-2">Scroll</span>
      </div>

      {/* FOREGROUND LAYER: The Physical Premium Card (Now containing About content) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-fit md:h-[65vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div
            id="about"
            className="relative w-full h-full max-w-6xl mx-auto px-5 md:px-12 flex flex-col lg:grid lg:grid-cols-2 items-start gap-4 md:gap-6 lg:gap-10 z-10 pt-4 md:pt-6 lg:pt-8 pb-8 md:pb-10 lg:pb-12 overflow-y-auto lg:overflow-hidden custom-scrollbar"
          >

            {/* Left Column: About Text */}
            <div className="card-left-text flex flex-col space-y-2 md:space-y-3 lg:space-y-5 text-center lg:text-left w-full">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.1] md:leading-[1.2]">
                Nice to meet you - <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">I'm Faiq Shaikh</span>
              </h2>
              <p className="text-[13px] md:text-sm lg:text-base text-blue-100/70 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                I'm <span className="text-white font-bold">A Frontend Developer & UI/UX Designer</span> with 3+ years of experience creating clean, high-impact digital experiences. I specialize in building responsive interfaces, strong brand visuals, and solving complex UI/UX challenges with precision and speed.
              </p>

              <div className="flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start pt-2 md:pt-4">
                {["UI/UX Design", "React", "GSAP Animation", "Figma"].map((skill) => (
                  <span key={skill} className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] md:text-xs font-medium tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Core Strengths Card */}
            <div className="card-right-text relative w-full max-w-md mx-auto lg:ml-auto group/card mt-16 lg:mt-0">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-2 bg-blue-500/10 rounded-[40px] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 w-full h-[120px] md:h-[250px] lg:h-[350px] xl:h-[500px] flex items-center justify-center transition-all duration-500">
                {/* Removed card background and border to free the robot */}
                <div className="relative z-20 w-[150%] h-[150%] flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 w-[200%] h-[200%] left-[-55%] md:left-[-50%] top-[-50%] origin-center scale-[1.4] md:scale-[0.6] lg:scale-[0.7]">
                      {showSpline && (
                        <Spline
                          scene="https://prod.spline.design/axdRrwIXDvsCMqUi/scene.splinecode"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced floating element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover/card:bg-blue-500/20 transition-colors duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
