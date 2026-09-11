"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card/90 border border-border/80 shadow-lg shadow-black/10 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Scroll back to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        >
          {/* Circular SVG progress ring */}
          <svg viewBox="0 0 48 48" className="absolute w-full h-full -rotate-90 pointer-events-none p-0.5">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-border/40"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-primary transition-all duration-100"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <ArrowUp className="w-4 h-4 z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
