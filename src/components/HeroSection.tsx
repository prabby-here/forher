"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import FloatingHearts from "./FloatingHearts";

const names = [
    "Haneela💖",
  "My Love",
  "Cutie",
  "Pagli",
  "Princess",
  "Beautiful",
  "Sohni Kudi",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateNames = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % names.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateNames, 2000);
    return () => clearInterval(interval);
  }, [rotateNames]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "#FFF0F6" }}
    >
      <FloatingHearts count={18} />

      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
          style={{
            fontFamily: "'Baloo 2', cursive",
            color: "#4a3040",
          }}
        >
          <span>Hello</span>
          <span className="inline-block relative min-h-[1.3em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={names[currentIndex]}
                className="inline-block px-4 py-1 sm:px-5 md:px-8 md:py-2 rounded-2xl text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl"
                style={{ backgroundColor: "#FFB3C6" }}
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -30, opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
              >
                {names[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          className="text-base sm:text-xl md:text-2xl mt-6 sm:mt-8 px-2"
          style={{
            fontFamily: "'Quicksand', sans-serif",
            color: "#7a5a6a",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          I made something special for you 💌
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-3xl opacity-50">↓</span>
      </motion.div>
    </section>
  );
}
