"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();

  const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
  const isNumeric = Boolean(match);
  const prefix = match ? match[1] : "";
  const targetNumber = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (!ref.current || !isInView || !isNumeric || prefersReducedMotion) {
      if (ref.current) {
        ref.current.textContent = value;
      }
      return;
    }

    let startTimestamp: number | null = null;
    const durationMs = duration * 1000;
    const node = ref.current;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * targetNumber);
      node.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        node.textContent = value;
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isInView, isNumeric, targetNumber, duration, prefersReducedMotion, prefix, suffix, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
