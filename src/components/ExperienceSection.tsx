"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const milestones = [
  { year: "2024 — Present", role: "Junior UI/UX Designer", company: "Compugen Inc., Toronto", desc: "Designed high-fidelity Figma prototypes for 8 projects and performed QA on 20+ pages." },
  { year: "2022 — Present", role: "Freelance Web Designer & Developer", company: "Independent", desc: "Built 15+ responsive landing pages and fixed 50+ HTML/CSS bugs with 100% client satisfaction." },
  { year: "2021 — 2022", role: "Academic Project Lead", company: "St. Xavier's College", desc: "Led a 4-member team building a responsive event portal, achieving highest grade in department." }
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      });
    }

    const nodes = gsap.utils.toArray<HTMLElement>(".milestone-node");
    nodes.forEach((node, i) => {
      gsap.fromTo(node,
        { scale: 0, opacity: 0, boxShadow: "0 0 0 rgba(255,255,255,0)" },
        {
          scale: 1,
          opacity: 1,
          boxShadow: "0 0 30px rgba(255,255,255,0.8)",
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: node,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-32 text-center">
          Career Trajectory
        </h2>

        <div className="relative">
          {/* Animated Path */}
          <svg className="absolute left-1/2 -translate-x-1/2 w-[100px] h-full z-0 top-0 hidden md:block" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              d="M50,0 Q80,200 50,400 T50,800" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-primary/30"
            />
          </svg>

          {/* Timeline Line for Mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:hidden" />

          <div className="space-y-32">
            {milestones.map((item, i) => (
              <div key={i} className={`relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                <div className={`w-full md:w-5/12 ${i % 2 === 0 ? "md:text-left" : "md:text-right"} pl-12 md:pl-0`}>
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <span className="text-primary font-mono tracking-widest text-sm mb-2 block">{item.year}</span>
                    <h3 className="text-3xl font-bold">{item.role}</h3>
                    <p className="text-xl text-muted-foreground mt-1 mb-4">{item.company}</p>
                    <p className="text-muted-foreground font-light">{item.desc}</p>
                  </motion.div>
                </div>

                <div className="absolute left-4 md:static md:w-2/12 flex justify-center -translate-x-1/2 md:translate-x-0">
                  <div className="milestone-node w-6 h-6 rounded-full bg-background border-4 border-primary z-20" />
                </div>

                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
