"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen py-32 px-6 flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />

      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }} />

      <div ref={contentRef} className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-center leading-tight">
          Let's build something <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic font-serif">extraordinary.</span>
        </h2>

        <p className="text-xl text-neutral-400 mb-16 text-center max-w-lg font-light">
          Whether you need a cutting-edge web application or a cinematic brand experience, the next step is yours.
        </p>

        <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <input
              type="text"
              required
              className="w-full bg-transparent border-b border-neutral-800 py-4 px-2 text-xl focus:outline-none focus:border-white transition-colors peer"
              placeholder="Your Name"
            />
          </div>

          <div className="relative group">
            <input
              type="email"
              required
              className="w-full bg-transparent border-b border-neutral-800 py-4 px-2 text-xl focus:outline-none focus:border-white transition-colors peer"
              placeholder="Email Address"
            />
          </div>

          <div className="relative group">
            <textarea
              rows={3}
              required
              className="w-full bg-transparent border-b border-neutral-800 py-4 px-2 text-xl focus:outline-none focus:border-white transition-colors peer resize-none"
              placeholder="Project Details"
            />
          </div>

          <div className="pt-8 flex justify-center">
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-neutral-200 text-lg px-12 py-6 h-auto tracking-wide group">
              Initiate Sequence
              <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </div>
        </form>

        <div className="mt-24 w-full flex flex-col md:flex-row justify-between items-center text-neutral-400 font-light border-t border-neutral-800 pt-8 text-sm">
          <div className="space-y-2 text-center md:text-left mb-6 md:mb-0">
            <p>Email: <a href="mailto:mohammedfaiqshaikh@gmail.com" className="text-white hover:text-blue-400 transition-colors">mohammedfaiqshaikh@gmail.com</a></p>
            <p>Fiverr: <a href="https://fiverr.com/faaiqsh" target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 transition-colors">fiverr.com/faaiqsh</a></p>
            <p>Location: <span className="text-white">Ontario, Canada</span></p>
          </div>

          <div className="text-center md:text-right">
            <p className="font-mono tracking-widest uppercase text-xs mb-2 text-neutral-600">
              Designed with precision
            </p>
            <p>By Faiq Shaikh</p>
          </div>
        </div>
      </div>
    </section>
  );
}
