"use client";

import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/Icons";
import { profileData } from "@/data/profile";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter / x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "email":
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-sm mt-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand and Description */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-indigo-400 text-white flex items-center justify-center text-xs font-bold">
                MK
              </span>
              <span className="font-bold text-foreground text-sm tracking-tight">
                {profileData.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Building scalable systems, resilient architectures, and polished web applications.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {profileData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label={social.label}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="ml-2 w-8 h-8 rounded-full border border-border bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span>Built with Next.js, Tailwind CSS & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
