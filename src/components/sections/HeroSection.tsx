"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Terminal,
  Code2,
  Database,
  GraduationCap,
  CheckCircle,
  Maximize2,
  X,
} from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/Icons";
import { profileData } from "@/data/profile";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { motionTokens } from "@/lib/motionTokens";

export function HeroSection() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const photoModalRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice, isLowEnd, prefersReducedMotion } = useDevicePerformance();

  useFocusTrap(photoModalRef, isPhotoModalOpen);

  // 3D tilt effect calculations for the photo card (desktop only)
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 160,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || isLowEnd || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPhotoModalOpen) {
        setIsPhotoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPhotoModalOpen]);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "twitter / x":
      case "twitter":
        return <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "email":
      default:
        return <Mail className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-50 sm:opacity-60 -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] radial-glow rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating subtle background ambient particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-primary blur-[1px]"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-2/3 right-12 w-3 h-3 rounded-full bg-indigo-400 blur-[1px]"
          />
          <motion.div
            animate={{
              x: [0, 15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-purple-400 blur-[1px]"
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
        {/* Left Column: Bio & CTAs */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{profileData.availability.label}</span>
          </motion.div>

          {/* Main Name & Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.normal, delay: 0.08, ease: motionTokens.easing.smooth }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {profileData.name}
              </span>
            </h1>
          </motion.div>

          {/* Dynamic Typing Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.normal, delay: 0.16, ease: motionTokens.easing.smooth }}
            className="text-base sm:text-2xl font-semibold text-muted-foreground min-h-[38px] sm:min-h-[44px] flex items-center justify-center lg:justify-start"
          >
            <span className="mr-2 text-foreground/80">I am a</span>
            <TypewriterText
              words={profileData.typingTitles}
              className="text-primary font-bold"
            />
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.normal, delay: 0.24, ease: motionTokens.easing.smooth }}
            className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty"
          >
            Software Engineering undergraduate at{" "}
            <strong className="text-foreground font-semibold">Delhi Technological University (DTU)</strong>. Passionate
            about Data Structures & Algorithms, low-level efficiency with{" "}
            <strong className="text-foreground font-semibold">C++</strong>, and relational database systems with{" "}
            <strong className="text-foreground font-semibold">PostgreSQL</strong>.
          </motion.p>

          {/* Location & Institution Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionTokens.duration.normal, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-muted-foreground font-medium"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border/60">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{profileData.location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border/60">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>DTU (2025–2029)</span>
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.normal, delay: 0.36, ease: motionTokens.easing.smooth }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
          >
            {/* Primary CTA */}
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-[color,background-color,box-shadow,transform] duration-150"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Sandbox CTA */}
            <Link
              href="#sandbox"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs sm:text-sm font-semibold active:scale-95 transition-[color,background-color,border-color,transform] duration-150"
            >
              <Terminal className="w-4 h-4" />
              <span>Try Sandbox</span>
            </Link>

            {/* Tertiary Resume CTA */}
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-border/80 bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs sm:text-sm font-medium active:scale-95 transition-[color,background-color,border-color,transform] duration-150"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Social Icons Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionTokens.duration.normal, delay: 0.42 }}
            className="flex items-center justify-center lg:justify-start gap-3 pt-2"
          >
            {profileData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border/80 bg-card/70 hover:bg-primary/10 text-muted-foreground hover:text-primary hover:border-primary/40 active:scale-90 transition-[color,background-color,border-color,transform,box-shadow] duration-150 shadow-sm min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label={social.label}
                title={social.platform}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Photo & 3D Interactive Card Showcase */}
        <div className="lg:col-span-5 flex justify-center px-2 sm:px-0">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={
              !isTouchDevice && !isLowEnd && !prefersReducedMotion
                ? {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionTokens.duration.slow, delay: 0.15, ease: motionTokens.easing.smooth }}
            className="relative w-full max-w-[310px] sm:max-w-[360px]"
          >
            {/* Ambient glowing backdrop aura */}
            <div className="absolute -inset-1 rounded-[2.2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-primary via-indigo-500 to-purple-600 opacity-25 blur-2xl animate-tilt pointer-events-none" />

            {/* Photo Card Container */}
            <div className="relative rounded-[2rem] border border-border/80 bg-card/90 backdrop-blur-xl p-3 sm:p-4 shadow-2xl overflow-visible group">
              {/* Image Frame with interactive click to expand */}
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-secondary border border-border/60 cursor-zoom-in block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                title="Click to expand photo & credentials"
                aria-label="Expand Malay Kasana profile photo"
              >
                <Image
                  src={profileData.avatarUrl || "/photo.jpg"}
                  alt={`${profileData.name} - Software Engineering Student at DTU`}
                  fill
                  priority
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 340px, 400px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient vignette over photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 pointer-events-none" />

                {/* Top-Right Expand Icon Hint */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/90 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Photo Overlay Tag */}
                <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 p-2.5 sm:p-3 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 text-left shadow-lg">
                  <div className="flex items-center justify-between gap-1">
                    <div className="truncate">
                      <p className="text-xs font-bold text-foreground flex items-center gap-1">
                        <span className="truncate">{profileData.name}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20 shrink-0" />
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium truncate">
                        B.Tech Software Engineering @ DTU
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] font-bold shrink-0">
                      Open to Work
                    </span>
                  </div>
                </div>
              </button>

              {/* Orbiting Tech Badges - Positioned responsively so they never cause mobile overflow */}
              {/* Badge 1: Top Left */}
              <motion.div
                animate={
                  !prefersReducedMotion
                    ? {
                        y: [0, -5, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 left-1 sm:-left-3 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-card/95 border border-border shadow-lg backdrop-blur-md flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-foreground"
              >
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>C++ & DSA</span>
              </motion.div>

              {/* Badge 2: Top Right */}
              <motion.div
                animate={
                  !prefersReducedMotion
                    ? {
                        y: [0, 5, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-2 right-1 sm:-right-3 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-card/95 border border-border shadow-lg backdrop-blur-md flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-foreground"
              >
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                <span>Stockfish AI</span>
              </motion.div>

              {/* Badge 3: Bottom Right */}
              <motion.div
                animate={
                  !prefersReducedMotion
                    ? {
                        y: [0, -4, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-2 right-1 sm:-right-3 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-card/95 border border-border shadow-lg backdrop-blur-md flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-foreground"
              >
                <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                <span>PostgreSQL</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Photo Lightbox Modal */}
      <AnimatePresence mode="wait">
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.duration.fast }}
              onClick={() => setIsPhotoModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              ref={photoModalRef}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              role="dialog"
              aria-modal="true"
              aria-label="Profile photo lightbox"
              className="relative w-full max-w-md rounded-3xl border border-border/80 bg-card overflow-hidden z-10 shadow-2xl max-h-[92vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Frame */}
              <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/5] bg-secondary shrink-0">
                <Image
                  src={profileData.avatarUrl || "/photo.jpg"}
                  alt={profileData.name}
                  fill
                  sizes="(max-width: 640px) 95vw, 450px"
                  className="object-cover object-center"
                />
              </div>

              {/* Modal Bio Details */}
              <div className="p-5 sm:p-6 space-y-3.5 bg-card overflow-y-auto">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <span>{profileData.name}</span>
                      <CheckCircle className="w-4 h-4 text-primary fill-primary/20" />
                    </h3>
                    <p className="text-xs text-primary font-semibold mt-0.5">
                      Software Engineering Student @ DTU (2025–2029)
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold shrink-0">
                    Available
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {profileData.detailedBio}
                </p>

                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <a
                    href={profileData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </a>

                  <Link
                    href="#contact"
                    onClick={() => setIsPhotoModalOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold active:scale-95 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>Contact Malay</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
