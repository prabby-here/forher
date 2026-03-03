"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";

export default function FinalSection() {
  const [answered, setAnswered] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoved, setNoMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#FFB3C6", "#FFC8DD", "#CDB4DB", "#BDE0FE", "#FFAFCC"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#FFB3C6", "#FFC8DD", "#CDB4DB", "#BDE0FE", "#FFAFCC"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleYes = () => {
    setAnswered(true);
    fireConfetti();
  };

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 48;
    // Keep button within visible bounds with padding
    const pad = 20;
    const maxX = (container.width - btnWidth) / 2 - pad;
    const maxY = (container.height - btnHeight) / 2 - pad;
    const safeMaxX = Math.max(maxX, 40);
    const safeMaxY = Math.max(maxY, 40);
    const newX = (Math.random() * 2 - 1) * safeMaxX;
    const newY = (Math.random() * 2 - 1) * safeMaxY;
    setNoPos({ x: newX, y: newY });
    setNoMoved(true);
  }, []);

  // For mobile: move on touch
  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  // Proximity detection for desktop
  useEffect(() => {
    if (answered) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current) return;
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const dist = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) +
          Math.pow(e.clientY - btnCenterY, 2)
      );

      if (dist < 100) {
        moveNoButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [answered, moveNoButton, noPos]);

  return (
    <section
      id="final"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: answered ? "#FFF0F6" : "#FFAFCC" }}
    >
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            className="z-10 text-center flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <motion.h2
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-12 px-2"
              style={{ fontFamily: "'Pacifico', cursive" }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Will you be my girlfriend?
            </motion.h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative w-full max-w-xs sm:max-w-none">
              {/* YES Button */}
              <motion.button
                onClick={handleYes}
                className="px-10 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold text-white rounded-full shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "#FFB3C6",
                  fontFamily: "'Fredoka', sans-serif",
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(255,179,198,0.4)",
                    "0 0 30px 10px rgba(255,179,198,0.6)",
                    "0 0 0 0 rgba(255,179,198,0.4)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                YES 💖
              </motion.button>

              {/* NO Button */}
              <motion.button
                ref={noBtnRef}
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-md cursor-pointer"
                style={{
                  backgroundColor: "#e0d4d8",
                  color: "#8a7a80",
                  fontFamily: "'Fredoka', sans-serif",
                  position: noMoved ? "absolute" : "relative",
                }}
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                NO 🙈
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            className="z-10 text-center"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: 0.3,
            }}
          >
            <motion.div
              className="text-5xl sm:text-7xl md:text-9xl mb-6 sm:mb-8"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💍
            </motion.div>

            <h2
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2"
              style={{
                fontFamily: "'Pacifico', cursive",
                color: "#d4618c",
              }}
            >
              I knew it.
            </h2>

            <motion.p
              className="text-base sm:text-xl md:text-3xl px-4"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                color: "#b05a7a",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              You&apos;re stuck with me now 💍💖
            </motion.p>

            <motion.div
              className="mt-6 sm:mt-8 flex gap-2 sm:gap-3 justify-center text-2xl sm:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {["💕", "💗", "💖", "💘", "💝"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {answered && <FloatingHearts count={25} />}
    </section>
  );
}
