"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Activity, Copy, Check, Terminal, Code2, FolderGit2 } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Project } from "@/types";
import { toast } from "sonner";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { motionTokens } from "@/lib/motionTokens";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copiedClone, setCopiedClone] = useState(false);

  // Active focus trap
  useFocusTrap(modalRef, isOpen);

  // Escape key listener & body scroll lock
  useEffect(() => {
    if (!isOpen || !project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, project, onClose]);

  if (!project) return null;

  const cloneCommand = project.githubUrl
    ? `git clone ${project.githubUrl}.git`
    : `git clone https://github.com/malaykasana59-cyber/${project.id}.git`;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    toast.success("Git clone command copied to clipboard!");
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card: Bottom Sheet on Mobile, Centered Card on Tablet/Desktop */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={motionTokens.spring.snappy}
            className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl border border-border/90 bg-card text-foreground shadow-2xl overflow-hidden z-10 max-h-[88vh] sm:max-h-[85vh] flex flex-col my-0 sm:my-8"
          >
            {/* Header Banner */}
            <div className="relative p-5 sm:p-8 bg-gradient-to-br from-primary/15 via-indigo-500/10 to-transparent border-b border-border/80 shrink-0">
              {/* Mobile sheet drag handle indicator */}
              <div className="w-12 h-1.5 rounded-full bg-muted mx-auto mb-3 sm:hidden" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-card/80 border border-border text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-95 transition-all w-9 h-9 flex items-center justify-center"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 text-[10px] sm:text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <h2
                id="project-modal-title"
                className="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight pr-8"
              >
                {project.title}
              </h2>

              {project.metrics && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-card/90 border border-border/80 text-[11px] sm:text-xs font-semibold text-primary">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{project.metrics}</span>
                </div>
              )}
            </div>

            {/* Modal Body with smooth touch scroll */}
            <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1 overscroll-contain">
              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span>Architecture & Implementation</span>
                </h3>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>Technology Stack</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 sm:px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium border border-border/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Git Clone Terminal Box */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4 text-primary" />
                  <span>Quick Clone Repository</span>
                </h3>
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono text-xs">
                  <code className="truncate pr-2 select-all text-slate-300 text-[11px] sm:text-xs">
                    {cloneCommand}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyClone}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white active:scale-95 transition-all shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
                    aria-label="Copy clone command"
                    title="Copy command"
                  >
                    {copiedClone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Links */}
            <div className="p-4 sm:p-6 bg-secondary/40 border-t border-border/80 flex flex-wrap items-center justify-end gap-2.5 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-xs sm:text-sm font-semibold active:scale-95 transition-all min-h-[40px]"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20 min-h-[40px]"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-transparent text-muted-foreground hover:text-foreground text-xs sm:text-sm font-medium transition-colors min-h-[40px]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
