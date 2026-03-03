"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  spin: number;
}

export default function FloatingHearts({ count = 15 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [viewH, setViewH] = useState(900);

  useEffect(() => {
    setViewH(window.innerHeight);
    // Reduce count on mobile for performance
    const isMobile = window.innerWidth < 640;
    const actualCount = isMobile ? Math.min(count, 8) : count;
    const generated: Heart[] = Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
      drift: Math.sin(i) * 60,
      spin: Math.random() > 0.5 ? 360 : -360,
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -viewH],
            x: [0, heart.drift],
            rotate: [0, heart.spin],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
