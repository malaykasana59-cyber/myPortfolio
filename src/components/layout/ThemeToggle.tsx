"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-border bg-secondary/30 flex items-center justify-center opacity-50" />
    );
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="relative w-9 h-9 rounded-full border border-border bg-card/80 hover:bg-secondary/80 flex items-center justify-center text-foreground transition-[color,background-color,border-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
      title={`Theme: ${theme} (Click to toggle)`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "system" ? (
          <motion.div
            key="system"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Laptop className="w-4 h-4 text-primary" />
          </motion.div>
        ) : isDark ? (
          <motion.div
            key="dark"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Sun className="w-4 h-4 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
