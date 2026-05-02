"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  "HTML5 / CSS3", "JavaScript ES6+", "Responsive Design", "CSS Animations", "Figma", "Adobe XD", "Logo Design", "VS Code", "Git & GitHub", "Flexbox", "CSS Grid", "Bootstrap", "Tailwind CSS"
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 bg-background relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-20 text-center"
        >
          Technical Arsenal
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {skills.map((skill, i) => (
            <SkillChip key={skill} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillChip({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05, 
        type: "spring", 
        stiffness: 100 
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1, 
        rotate: Math.random() * 10 - 5,
        boxShadow: "0 0 20px rgba(255,255,255,0.2)"
      }}
      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer transition-colors hover:bg-white/10 hover:border-white/20 dark:bg-black/40 dark:hover:bg-white/10 relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
      <span className="text-foreground font-mono text-sm md:text-base relative z-10">{skill}</span>
    </motion.div>
  );
}
