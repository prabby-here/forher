"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DraggableCard from "./DraggableCard";

const reasons = [
  "You make my world brighter. ☀️",
  "You smile like sunshine. 🌻",
  "You are dangerously cute. 🥰",
  "You make life feel safe. 🛡️",
  "You are my peace. 🕊️",
  "Your laugh is my favorite sound. 🎵",
  "You make ordinary moments magical. ✨",
  "You're the reason I believe in love. 💗",
];

const cardColors = [
  "#8EC8E8",
  "#7DBEE0",
  "#9DD0EE",
  "#8CC4E4",
  "#7AB8DC",
  "#A0D4F0",
  "#90C6E6",
  "#86C0E0",
];

const rotations = [5, -4, 6, -3, 4, -6, 3, -5];

export default function ReasonsYouSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="why-you"
      ref={containerRef}
      className="relative min-h-screen py-14 sm:py-20 px-3 sm:px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: "#BDE0FE" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-white mb-3 sm:mb-4 px-2"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Reasons Why You Can Be Mine? 💘
        </h2>
        <p
          className="text-center text-white/80 mb-10 sm:mb-16 text-sm sm:text-lg"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Drag each card away to see the next one 💙
        </p>

        <div className="relative w-[260px] sm:w-[300px] md:w-[360px] h-[180px] sm:h-[200px] md:h-[220px]">
          {reasons.map((reason, i) => (
            <DraggableCard
              key={i}
              initialRotation={rotations[i % rotations.length]}
              bgColor={cardColors[i % cardColors.length]}
              index={i}
              total={reasons.length}
              constraintRef={containerRef}
            >
              {reason}
            </DraggableCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
