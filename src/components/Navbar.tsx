"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Why Me?", href: "#why-me" },
  { label: "Why You?", href: "#why-you" },
  { label: "Final Question", href: "#final" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3"
      style={{
        backgroundColor: scrolled ? "rgba(255,240,246,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      <a
        href="#home"
        className="text-2xl font-bold"
        style={{
          fontFamily: "'Pacifico', cursive",
          color: "#d4618c",
        }}
      >
        💖
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-2">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 hover:text-white"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              color: "#7a5a6a",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#FFB3C6";
              (e.target as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "transparent";
              (e.target as HTMLElement).style.color = "#7a5a6a";
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl cursor-pointer p-2"
        style={{ color: "#d4618c" }}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-0 right-0 md:hidden flex flex-col items-center gap-2 py-4 rounded-b-3xl shadow-xl"
            style={{ backgroundColor: "rgba(255,240,246,0.97)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 rounded-2xl text-base font-semibold w-4/5 text-center"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  color: "#7a5a6a",
                  backgroundColor: "#FFC8DD",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
