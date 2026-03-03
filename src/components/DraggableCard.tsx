"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

interface DraggableCardProps {
  children: React.ReactNode;
  initialRotation?: number;
  bgColor?: string;
  index: number;
  total: number;
  constraintRef: React.RefObject<HTMLDivElement | null>;
}

export default function DraggableCard({
  children,
  initialRotation = 0,
  bgColor = "#FFC8DD",
  index,
  total,
  constraintRef,
}: DraggableCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useTransform(x, [-300, 300], [-25, 25]);

  // Stack offset: bottom card has lowest z-index, top card is on top
  const zIndex = index;
  const stackOffset = (total - 1 - index) * 3;

  return (
    <motion.div
      drag
      dragConstraints={constraintRef}
      dragElastic={0.08}
      dragMomentum={false}
      style={{
        x,
        y,
        rotateZ,
        backgroundColor: bgColor,
        zIndex,
        position: "absolute",
        top: `${stackOffset}px`,
        left: `${stackOffset}px`,
      }}
      initial={{
        rotate: initialRotation,
        scale: 0.85,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
        rotate: initialRotation,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: index * 0.06,
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      }}
      whileDrag={{
        scale: 1.07,
        cursor: "grabbing",
        boxShadow: "0 30px 60px rgba(0,0,0,0.18)",
        zIndex: total + 10,
      }}
      whileTap={{ cursor: "grabbing" }}
      className="w-[260px] sm:w-[300px] md:w-[360px] rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl cursor-grab select-none touch-none"
    >
      <p
        className="text-base sm:text-lg md:text-xl font-semibold text-white text-center leading-relaxed"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        {children}
      </p>
      <p
        className="text-[10px] sm:text-xs text-white/50 text-center mt-2 sm:mt-3"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {index + 1} / {total}
      </p>
    </motion.div>
  );
}
