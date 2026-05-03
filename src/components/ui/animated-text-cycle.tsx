"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  // Get the width of the current word
  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      let maxWidth = 0;
      for (let i = 0; i < elements.length; i++) {
        const w = elements[i].getBoundingClientRect().width;
        if (w > maxWidth) maxWidth = w;
      }
      setWidth(`${maxWidth}px`);
    }
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Container animation for the whole word
  const containerVariants: Variants = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3
      } as any
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2
      } as any
    },
  };

  return (
    <span className="relative inline-block" style={{ width }}>
      {/* Hidden measurement div with all words rendered */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentIndex}
          className={`inline-block font-bold ${className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ whiteSpace: "nowrap", position: "absolute", left: 0, top: 0 }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
