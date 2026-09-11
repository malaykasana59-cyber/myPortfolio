"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillsData, skillCategories } from "@/data/skills";
import { SkillCategory } from "@/types";
import { motionTokens } from "@/lib/motionTokens";
import {
  Code2,
  FileCode,
  Terminal,
  Binary,
  Database,
  Layout,
  Atom,
  Globe,
  Palette,
  Sparkles,
  Layers,
  Server,
  Cpu,
  Zap,
  Network,
  Workflow,
  Radio,
  FolderTree,
  Flame,
  KeyRound,
  Cloud,
  Boxes,
  CloudSun,
  GitPullRequest,
  TerminalSquare,
  GitBranch,
  CheckCircle2,
  Compass,
  Send,
  ShieldCheck,
  Search,
  X,
} from "lucide-react";

// Icon mapping dictionary
const iconMap: Record<string, React.ElementType> = {
  Code2,
  FileCode,
  Terminal,
  Binary,
  Database,
  Layout,
  Atom,
  Globe,
  Palette,
  Sparkles,
  Layers,
  Server,
  Cpu,
  Zap,
  Network,
  Workflow,
  Radio,
  FolderTree,
  Flame,
  KeyRound,
  Cloud,
  Boxes,
  CloudSun,
  GitPullRequest,
  TerminalSquare,
  GitBranch,
  CheckCircle2,
  Compass,
  Send,
  ShieldCheck,
};

export function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => ["All", ...skillCategories] as const, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skillsData.length };
    skillCategories.forEach((cat) => {
      counts[cat] = skillsData.filter((s) => s.category === cat).length;
    });
    return counts;
  }, []);

  // Filter skills by selected category and live search query
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Technologies & Competencies"
        title="Technical Stack & Expertise"
        subtitle="Languages, low-level tooling, database architectures, and engineering principles I actively work with."
      />

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-6 sm:mb-8 relative px-1">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g., C++, SQL, Linux, OOP)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full border border-border/80 bg-card/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-[border-color,box-shadow] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-muted-foreground hover:text-foreground p-1 rounded-full"
              aria-label="Clear skill search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills with animated spring glider */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-1">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
              className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-1.5 min-h-[36px] ${
                isSelected
                  ? "text-white font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 bg-card border border-border"
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="activeSkillPill"
                  className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25 -z-10"
                  transition={motionTokens.spring.slider}
                />
              )}
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.iconName] || Code2;

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-[border-color,box-shadow] duration-200 bg-card flex flex-col justify-between overflow-hidden ${
                  skill.highlight
                    ? "border-primary/40 hover:border-primary/70 shadow-sm hover:shadow-lg hover:shadow-primary/5"
                    : "border-border/80 hover:border-border hover:shadow-sm"
                }`}
              >
                {/* Top: Icon + Level */}
                <div className="flex items-start justify-between gap-1.5 mb-2.5 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-[background-color,transform] duration-200">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span
                    className={`text-[9px] sm:text-[10px] font-semibold uppercase px-1.5 sm:px-2 py-0.5 rounded-md border ${
                      skill.level === "Expert"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : skill.level === "Advanced"
                        ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Skill Name & Category */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {skill.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 font-medium truncate">
                    {skill.category}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Fallback for empty search */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">No skills found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-xs text-primary underline font-medium"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
