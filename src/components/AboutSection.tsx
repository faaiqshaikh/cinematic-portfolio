"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen -z-10" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Crafting pixel-perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">landing pages</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">identities</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            Hi, I'm Mohammedfaiq Shaikh. I specialize in designing memorable brand identities and building highly responsive layouts. I approach every project with mobile-first thinking, creative problem-solving, and a dedication to unlimited revisions until the final result is flawless.</p>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 p-8 rounded-3xl bg-white/5 dark:bg-black/40 backdrop-blur-2xl border border-white/10 dark:border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            <div className="relative z-20 space-y-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Core Strengths</h3>
              <div className="space-y-4">
                {[
                  { label: "Turnaround Time", value: "Lightning Fast" },
                  { label: "Bug Fixes", value: "100% Efficiency" },
                  { label: "Communication", value: "Crystal Clear" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-muted-foreground font-mono text-sm">{stat.label}</span>
                    <span className="text-foreground font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating UI elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 -top-8 p-4 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 z-20"
          >
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
