"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar, ExternalLink, ChevronRight } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";

interface TimelineItemProps {
  title: string;
  organization: string;
  organizationUrl?: string;
  location: string;
  period: string;
  type?: string;
  description?: string[];
  skills?: string[];
  honors?: string;
  coursework?: string[];
  isEducation?: boolean;
  index: number;
}

export function TimelineItem({
  title,
  organization,
  organizationUrl,
  location,
  period,
  type,
  description,
  skills,
  honors,
  coursework,
  isEducation = false,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: motionTokens.duration.normal, delay: index * 0.08, ease: motionTokens.easing.smooth }}
      className="relative pl-7 sm:pl-10 pb-8 sm:pb-12 last:pb-2 group"
    >
      {/* Vertical Rail Line with animated gradient highlight */}
      <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-0 w-[2px] bg-border group-hover:bg-gradient-to-b group-hover:from-primary/60 group-hover:to-border transition-colors duration-300 group-last:hidden" />

      {/* Node Bullet Indicator */}
      <div className="absolute left-0 top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/40 bg-card flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-sm">
        {isEducation ? (
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </div>

      {/* Content Box */}
      <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card/90 backdrop-blur-sm p-4 sm:p-6 shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-[border-color,box-shadow] duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors text-balance">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
              {organizationUrl ? (
                <a
                  href={organizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{organization}</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              ) : (
                <span className="text-xs sm:text-sm font-semibold text-primary">
                  {organization}
                </span>
              )}

              {type && (
                <span className="text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                  {type}
                </span>
              )}
            </div>
          </div>

          {/* Date & Location Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground tabular-nums">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full bg-secondary/60 border border-border/60">
              <Calendar className="w-3 h-3 text-primary" />
              <span>{period}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full bg-secondary/60 border border-border/60">
              <MapPin className="w-3 h-3 text-primary" />
              <span>{location}</span>
            </span>
          </div>
        </div>

        {/* Honors / Distinctions */}
        {honors && (
          <div className="mb-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{honors}</span>
          </div>
        )}

        {/* Bullet descriptions */}
        {description && description.length > 0 && (
          <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span className="text-pretty">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Coursework list */}
        {coursework && coursework.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-border/60">
            <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider mb-2">
              Key Academic Modules:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="px-2 sm:px-2.5 py-0.5 rounded-lg bg-secondary text-secondary-foreground text-[10px] sm:text-[11px] font-medium border border-border/60"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech Skills used */}
        {skills && skills.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 sm:px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[10px] sm:text-[11px] font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
