"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    title: "LuxeStay",
    category: "Hotel Landing Page",
    description:
      "Responsive luxury landing page with animations and booking form. Resulted in a 40% increase in client inquiries.",
    color: "from-amber-600/20 to-orange-600/20",
    media: "https://cdn.dribbble.com/userupload/46505142/file/dc7ca2bd26531f3332e68cbba5e65d02.mp4",
    type: "video",
  },
  {
    id: 2,
    title: "BrewLab",
    category: "Coffee Brand Identity",
    description: "Complete branding system including logo, colors, and typography. Delivered multiple concepts within 48 hours.",
    color: "from-stone-600/20 to-neutral-600/20",
    media: "https://cdn.dribbble.com/userupload/17480907/file/original-a852d1790482c8fa61bef2c26ee29f1a.mp4",
    type: "video",
  },
  {
    id: 3,
    title: "FlowSync",
    category: "Productivity Dashboard",
    description: "Designed and developed a productivity dashboard.",
    color: "from-emerald-600/20 to-teal-600/20",
    image: "url('https://cdn.dribbble.com/userupload/42933143/file/original-d47aad0a19c51613c0a06b069e89decd.png?resize=2048x1536&vertical=center')",
  },
  {
    id: 4,
    title: "BugSquash",
    category: "CSS Debugging",
    description: "Fixed major cross-browser issues without changing HTML logic. Refactored 800+ lines of CSS code for optimal performance.",
    color: "from-blue-600/20 to-indigo-600/20",
    image: "url('https://images.pexels.com/photos/31343632/pexels-photo-31343632.jpeg')",
  }
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" ref={containerRef} className="py-32 px-6 bg-background relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Selected Works
          </motion.h2>
          <div className="w-full h-[1px] bg-border mt-8" />
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className={`group relative flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
    >
      <div
        className="w-full md:w-3/5 h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden relative cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)]"
          style={{
            x: translateX,
            y: translateY,
            background: project.type !== 'video' ? project.image : 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {project.type === 'video' && (
            <video
              src={project.media}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay opacity-30 group-hover:opacity-80 transition-opacity duration-700`} />
        </motion.div>
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center space-y-6">
        <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
          {project.category}
        </span>
        <h3 className="text-4xl md:text-5xl font-bold">{project.title}</h3>
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          {project.description}
        </p>

        <div className="pt-6">
          <Button variant="cinematic" className="rounded-full w-fit group/btn">
            View Case Study
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
