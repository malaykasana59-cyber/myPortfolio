"use client";

import { motion } from "framer-motion";
import { Code2, Trophy, GraduationCap, Cpu } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { motionTokens } from "@/lib/motionTokens";

const stats = [
  {
    icon: Code2,
    value: "100+",
    label: "Algorithmic Problems Solved",
    subtext: "Trees, DP, Graphs & Arrays in C++",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Cpu,
    value: "5+",
    label: "Systems & Web Projects",
    subtext: "Chessy, Car Insurance, Storefront Clone",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: GraduationCap,
    value: "DTU '29",
    label: "Delhi Technological University",
    subtext: "Software Engineering (DCE Legacy)",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: Trophy,
    value: "C++ & SQL",
    label: "Core Specialization",
    subtext: "Low-level efficiency & 3NF RDBMS",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
];

export function StatsSection() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: motionTokens.duration.normal,
                delay: index * 0.08,
                ease: motionTokens.easing.smooth,
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-4 sm:p-6 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-[color,background-color,border-color,box-shadow] duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Subtle top ambient glow */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${stat.gradient} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-primary/15 transition-[background-color,transform] duration-200">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight tabular-nums">
                  <AnimatedCounter value={stat.value} duration={1.2} />
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-foreground mt-1 text-balance">
                  {stat.label}
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 font-medium leading-snug">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
