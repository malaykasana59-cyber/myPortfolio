"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profileData } from "@/data/profile";
import { FileText, Menu, Search } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Sandbox", href: "#sandbox" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(["about", "skills", "sandbox", "projects", "experience", "contact"], 300);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  return (
    <>
      <header className="fixed top-3 sm:top-4 inset-x-0 z-40 mx-auto max-w-5xl px-3 sm:px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
          className={`pointer-events-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-[border-color,background-color,box-shadow] duration-200 ${
            isScrolled
              ? "border-border/90 bg-card/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-indigo-950/20"
              : "border-border/70 bg-card/80 backdrop-blur-lg shadow-md shadow-black/5"
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram */}
          <Link
            href="#about"
            className="flex items-center gap-2 sm:gap-2.5 font-bold text-foreground hover:text-primary transition-colors group p-1"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-400 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-primary/30 group-hover:scale-105 transition-transform">
              MK
            </span>
            <span className="hidden sm:inline-block font-semibold tracking-tight text-sm">
              {profileData.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`relative px-3 py-1.5 rounded-full transition-colors duration-200 block text-xs tracking-wide ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBackground"
                        className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 -z-10"
                        transition={motionTokens.spring.slider}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions: Command Menu Trigger + Resume CTA + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Command Palette Button */}
            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors min-h-[36px]"
              title="Open Command Palette (Cmd+K / Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline-block font-mono text-[10px] text-muted-foreground bg-card border border-border px-1.5 py-0.2 rounded">
                ⌘K
              </span>
            </button>

            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/60 hover:bg-secondary text-foreground hover:border-primary/40 transition-colors min-h-[36px]"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Resume</span>
            </a>

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground hover:bg-secondary active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        resumeUrl={profileData.resumeUrl}
      />
    </>
  );
}
