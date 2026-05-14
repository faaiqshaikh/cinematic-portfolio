"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    title: "CANDU Reactor Temperature Monitor Simulation",
    category: "Desktop Application",
    description:
      "This simulator models the heat exchange between the nuclear fuel and the coolant inside a CANDU reactor over time. It calculates how temperatures in both systems change second by second, starting from defined initial conditions, and displays those changes live, the same way a real control room operator would monitor reactor thermal behaviour.",
    color: "from-amber-600/20 to-orange-600/20",
    image: "url('https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg')",
    link: "https://github.com/mohammedfaiqshaikh/CANDU-Reactor-Temperature-Monitor-Simulator",
  },
  {
    id: 3,
    title: "Giant Buffalo",
    category: "Photoshop Image Composition",
    description: "Complete image composition using multiple images in photoshop. Delivered within 2 hours.",
    color: "from-stone-600/20 to-neutral-600/20",
    image: "url('https://cdn.myportfolio.com/c2c06ee4-36c6-4096-b78b-0469de252508/d51584d6-7726-4085-ac7a-4f1b2f067257_rw_1920.png?h=0c1e7cc22121504072f781adb1237c45')",
    link: "https://faiqstudio.myportfolio.com/photoshop-image-composition-giant-buffalo",
  },
  {
    id: 2,
    title: "AI Driver Monitoring",
    category: "UI/UX",
    description: "Designed the UI/UX for AI based driver monitoring system using Figma.",
    color: "from-emerald-600/20 to-teal-600/20",
    image: "url('https://cdn.myportfolio.com/c2c06ee4-36c6-4096-b78b-0469de252508/4800b8cd-229a-4e54-9aaa-902b9fd9bcc3_rw_1920.png?h=3d0fee4d9838e4bd4edc08fb6fde5dfc')",
    link: "https://www.figma.com/proto/q14EJ2WtkQ1336VKrYIrvS/Welcome-Page?node-id=410-32",
  },
  {
    id: 4,
    title: "Raindeer",
    category: "Image Editing",
    description: "Applied glowing horn effect using advanced photoshop tools.",
    color: "from-blue-600/20 to-indigo-600/20",
    image: "url('https://cdn.myportfolio.com/c2c06ee4-36c6-4096-b78b-0469de252508/efd3ef71-1cda-4233-bd62-59005701e88b_rw_1200.png?h=59d17ea6be44f2bce49a3c20d99b6baa')",
    link: "https://faiqstudio.myportfolio.com/reindeers-glowing-horn-using-photoshop",
  },
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

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]);

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
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay opacity-30 md:group-hover:opacity-80 transition-opacity duration-700`} />
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
            View Project
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform md:group-hover/btn:translate-x-1 md:group-hover/btn:-translate-y-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
