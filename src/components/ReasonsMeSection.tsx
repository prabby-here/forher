"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DraggableCard from "./DraggableCard";

const reasons = [
  "I will always choose you. 💕",
  "I will bring you food when you're sad. 🍕",
  "I will hype you up every single day. 🥳",
  "I will listen to your overthinking. 🧠💭",
  "I will annoy you lovingly. 😜",
  "I promise midnight talks & morning texts. 🌙",
  "I'll be your safe place, always. 🏠",
  "I will never let you feel alone. 🤝",
];

const cardColors = [
  "#E8A0BF",
  "#D4A0CF",
  "#C9A0D9",
  "#BEA0E3",
  "#D9A0C4",
  "#E0A0B8",
  "#CDA0CC",
  "#D6A0BD",
];

const rotations = [-6, 4, -3, 5, -4, 6, -5, 3];

export default function ReasonsMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="why-me"
      ref={containerRef}
      className="relative min-h-screen py-14 sm:py-20 px-3 sm:px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: "#CDB4DB" }}
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
          Reasons Why I Can Be Yours? 💖
        </h2>
        <p
          className="text-center text-white/80 mb-10 sm:mb-16 text-sm sm:text-lg"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Drag each card away to see the next one 💌
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
