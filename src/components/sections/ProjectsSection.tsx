"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projectsData, projectCategories } from "@/data/projects";
import { Project } from "@/types";
import { Search, X, Sparkles, Filter } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projectsData.length };
    projectCategories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = projectsData.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesFeatured = !featuredOnly || project.featured;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesFeatured && matchesSearch;
    });
  }, [activeCategory, featuredOnly, searchQuery]);

  return (
    <section id="projects" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        badge="Showcase & Engineering"
        title="Featured Engineering Projects"
        subtitle="A curated selection of scalable systems, full-stack web applications, low-level C++ architectures, and AI engine integrations."
      />

      {/* Filter and Search Bar */}
      <div className="max-w-xl mx-auto mb-6 sm:mb-8 space-y-3 px-1">
        {/* Live Search Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects (e.g. C++, Stockfish, SQL)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full border border-border/80 bg-card/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-[border-color,box-shadow] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-muted-foreground hover:text-foreground p-1 rounded-full"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Featured Only Toggle & Summary */}
        <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors min-h-[34px] ${
              featuredOnly
                ? "bg-primary/10 border-primary/30 text-primary font-semibold"
                : "border-border bg-card/60 hover:bg-secondary text-muted-foreground"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Featured Only</span>
          </button>

          <span className="tabular-nums font-medium text-[11px] sm:text-xs">
            Showing {filteredProjects.length} of {projectsData.length}
          </span>
        </div>
      </div>

      {/* Category Filter Tabs with Count Badges & Spring Glider */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-1">
        {projectCategories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
              className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-1.5 min-h-[36px] ${
                isActive
                  ? "text-white font-semibold"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeProjectPill"
                  className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25 -z-10"
                  transition={motionTokens.spring.slider}
                />
              )}
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                  isActive ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fallback for empty filter */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-muted-foreground space-y-3">
          <Filter className="w-8 h-8 mx-auto opacity-40" />
          <p className="text-sm">No projects found matching the current criteria.</p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
              setFeaturedOnly(false);
            }}
            className="text-xs text-primary underline font-medium"
          >
            Reset all project filters
          </button>
        </div>
      )}

      {/* Interactive Project Quick View Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
