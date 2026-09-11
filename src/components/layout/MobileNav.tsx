"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, FileText, ExternalLink, Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/Icons";
import { profileData } from "@/data/profile";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { motionTokens } from "@/lib/motionTokens";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
  activeSection: string;
  resumeUrl: string;
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  activeSection,
  resumeUrl,
}: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, isOpen);

  // Lock body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter / x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={motionTokens.spring.snappy}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-[290px] sm:max-w-xs bg-card/95 backdrop-blur-2xl border-l border-border p-5 sm:p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-400 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-primary/30">
                    MK
                  </span>
                  <div>
                    <span className="font-bold text-foreground text-sm block">
                      {profileData.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Software Engineering @ DTU
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-95 transition-all focus:outline-none"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all min-h-[44px] ${
                        isActive
                          ? "bg-primary/15 text-primary font-bold border border-primary/25 shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:scale-[0.98]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeMobileDot"
                          className="w-2 h-2 rounded-full bg-primary"
                          transition={motionTokens.spring.slider}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Socials */}
            <div className="space-y-4 pt-6 border-t border-border mt-6">
              {/* Social icons row */}
              <div className="flex items-center justify-center gap-2 pb-1">
                {profileData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-border bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25 active:scale-[0.98] transition-all min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>

              <p className="text-center text-[11px] text-muted-foreground">
                📍 {profileData.location}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
