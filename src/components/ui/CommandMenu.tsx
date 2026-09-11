"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Search,
  User,
  Cpu,
  Code2,
  Briefcase,
  Mail,
  Copy,
  Download,
  Moon,
  Sun,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { profileData } from "@/data/profile";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Actions" | "Social";
  icon: React.ElementType;
  shortcut?: string;
  perform: () => void;
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, isOpen);

  const handleClose = () => {
    setIsOpen(false);
    setSearch("");
  };

  // Listen for Cmd+K / Ctrl+K and custom event (bound once on mount)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen((prev) => {
          if (prev) setSearch("");
          return false;
        });
      }
    };

    const handleOpenCustom = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-menu", handleOpenCustom);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-menu", handleOpenCustom);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const navigateTo = (hash: string) => {
    handleClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    toast.success("Email copied to clipboard!");
    handleClose();
  };

  const downloadResume = () => {
    window.open(profileData.resumeUrl, "_blank");
    handleClose();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.info(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
    handleClose();
  };

  const items: CommandItem[] = [
    {
      id: "nav-about",
      label: "Go to About & Profile",
      category: "Navigation",
      icon: User,
      perform: () => navigateTo("#about"),
    },
    {
      id: "nav-skills",
      label: "Go to Skills & Tech Stack",
      category: "Navigation",
      icon: Cpu,
      perform: () => navigateTo("#skills"),
    },
    {
      id: "nav-terminal",
      label: "Open Interactive Code Sandbox",
      category: "Navigation",
      icon: Code2,
      perform: () => navigateTo("#sandbox"),
    },
    {
      id: "nav-projects",
      label: "Browse Featured Projects",
      category: "Navigation",
      icon: Sparkles,
      perform: () => navigateTo("#projects"),
    },
    {
      id: "nav-experience",
      label: "View Experience & DTU Education",
      category: "Navigation",
      icon: Briefcase,
      perform: () => navigateTo("#experience"),
    },
    {
      id: "nav-contact",
      label: "Jump to Contact Form",
      category: "Navigation",
      icon: Mail,
      perform: () => navigateTo("#contact"),
    },
    {
      id: "action-copy-email",
      label: "Copy Malay's Email Address",
      category: "Actions",
      icon: Copy,
      shortcut: "malaykasana59@gmail.com",
      perform: copyEmail,
    },
    {
      id: "action-resume",
      label: "Download Resume (PDF)",
      category: "Actions",
      icon: Download,
      perform: downloadResume,
    },
    {
      id: "action-theme",
      label: `Switch Theme (Current: ${theme === "dark" ? "Dark" : "Light"})`,
      category: "Actions",
      icon: theme === "dark" ? Sun : Moon,
      perform: toggleTheme,
    },
    {
      id: "social-github",
      label: "Open GitHub Profile (@malaykasana59-cyber)",
      category: "Social",
      icon: Github,
      perform: () => {
        window.open("https://github.com/malaykasana59-cyber", "_blank");
        handleClose();
      },
    },
    {
      id: "social-linkedin",
      label: "Open LinkedIn Profile (Malay Kasana)",
      category: "Social",
      icon: Linkedin,
      perform: () => {
        window.open("https://linkedin.com/in/malay-kasana-a53333378", "_blank");
        handleClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog Card */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-border/90 bg-card text-foreground shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-secondary/30">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search (e.g. Projects, DTU, Email)..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-secondary border border-border">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.perform}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-secondary/70 focus:bg-secondary/70 focus:outline-none transition-colors group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.label}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.shortcut && (
                          <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary border border-border hidden sm:inline-block">
                            {item.shortcut}
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer with key helper */}
            <div className="px-4 py-2 bg-secondary/50 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Command className="w-3.5 h-3.5 text-primary" />
                <span>Command Palette</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Navigation & Actions</span>
                <span>ESC to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
