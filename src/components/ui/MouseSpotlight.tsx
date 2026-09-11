"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useSpring } from "framer-motion";

const emptySubscribe = () => () => {};

export function MouseSpotlight() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient, mouseX, mouseY]);

  if (!isClient) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden lg:block"
      style={{
        background: `radial-gradient(600px circle at var(--x, 0px) var(--y, 0px), rgba(99, 102, 241, 0.07), transparent 80%)`,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-50 dark:opacity-40 blur-3xl bg-gradient-to-r from-primary/10 via-indigo-500/10 to-purple-500/5"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
    </motion.div>
  );
}
