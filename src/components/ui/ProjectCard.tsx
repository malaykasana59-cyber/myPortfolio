"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { ExternalLink, Sparkles, Activity, Eye, Terminal } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { motionTokens } from "@/lib/motionTokens";

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Visual Header / Banner */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-gradient-to-br from-secondary/80 via-primary/5 to-secondary/30 border-b border-border/60 flex items-center justify-center p-6">
        {/* Subtle grid pattern inside card banner */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        {/* Ambient Project Graphic / Badge */}
        <div className="relative z-10 text-center space-y-2">
          <span className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-card border border-border/80 flex items-center justify-center shadow-md text-primary font-bold text-base sm:text-lg group-hover:scale-110 group-hover:border-primary/40 transition-transform duration-300">
            {project.category === "AI / Systems" ? (
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            ) : (
              project.title.charAt(0)
            )}
          </span>
          <div className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-background/85 backdrop-blur-sm border border-border text-[10px] sm:text-[11px] font-medium text-muted-foreground">
            {project.category}
          </div>
        </div>

        {/* Featured Pill */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}

        {/* Metrics Banner */}
        {project.metrics && (
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-card/90 backdrop-blur-sm border border-border/80 text-[10px] font-semibold text-primary">
            <Activity className="w-3 h-3 text-emerald-500" />
            <span>{project.metrics}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <button
            type="button"
            onClick={() => onSelect?.(project)}
            className="text-left w-full group/title focus:outline-none"
          >
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover/title:text-primary transition-colors text-balance">
              {project.title}
            </h3>
          </button>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed text-pretty">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-lg bg-secondary/80 text-secondary-foreground border border-border/60 text-[10px] sm:text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links & Quick View Trigger */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-sm min-h-[36px]"
                aria-label={`View live demo of ${project.title}`}
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-foreground text-xs font-medium hover:border-primary/40 active:scale-95 transition-all min-h-[36px]"
                aria-label={`View source code of ${project.title} on GitHub`}
              >
                <Github className="w-3.5 h-3.5 text-foreground" />
                <span>Source</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelect?.(project)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 active:scale-95 transition-all min-h-[36px]"
            title="Inspect project details and clone command"
          >
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
