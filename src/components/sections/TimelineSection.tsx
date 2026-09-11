"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experienceData, educationData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { Briefcase, GraduationCap, Download, Building2 } from "lucide-react";
import { motionTokens } from "@/lib/motionTokens";

export function TimelineSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SectionHeading
        badge="Career & Academic Journey"
        title="Experience & Education"
        subtitle="A chronological timeline of software engineering pursuits, open-source building, DTU academic credentials, and continuous mastery."
      />

      {/* Tab Switcher with Spring Glider */}
      <div className="flex items-center justify-center mb-8 sm:mb-12 px-1">
        <div className="relative inline-flex p-1 rounded-full bg-card border border-border/80 shadow-md">
          <button
            type="button"
            onClick={() => setActiveTab("experience")}
            className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 min-h-[38px] ${
              activeTab === "experience"
                ? "text-white font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "experience" && (
              <motion.span
                layoutId="activeTimelinePill"
                className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25 -z-10"
                transition={motionTokens.spring.slider}
              />
            )}
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Experience</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                activeTab === "experience"
                  ? "bg-white/20 text-white"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {experienceData.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("education")}
            className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 min-h-[38px] ${
              activeTab === "education"
                ? "text-white font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "education" && (
              <motion.span
                layoutId="activeTimelinePill"
                className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25 -z-10"
                transition={motionTokens.spring.slider}
              />
            )}
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Education</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                activeTab === "education"
                  ? "bg-white/20 text-white"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {educationData.length}
            </span>
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "experience" ? (
            <motion.div
              key="experience-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
            >
              {experienceData.map((exp, index) => (
                <TimelineItem
                  key={exp.id}
                  title={exp.role}
                  organization={exp.company}
                  organizationUrl={exp.companyUrl}
                  location={exp.location}
                  period={exp.period}
                  type={exp.type}
                  description={exp.description}
                  skills={exp.skills}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
            >
              {/* Institution Highlight Callout */}
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 via-indigo-500/5 to-purple-500/5 backdrop-blur-sm flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground flex flex-wrap items-center gap-2">
                    <span>Delhi Technological University (DTU)</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
                      Formerly DCE
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed text-pretty">
                    Founded in 1941, DTU is one of India&apos;s oldest and most prestigious engineering institutions. Enrolled in the Software Engineering undergraduate program focusing on algorithms, object-oriented systems, and distributed database designs.
                  </p>
                </div>
              </div>

              {educationData.map((edu, index) => (
                <TimelineItem
                  key={edu.id}
                  title={edu.degree}
                  organization={edu.institution}
                  organizationUrl={edu.institutionUrl}
                  location={edu.location}
                  period={edu.period}
                  honors={edu.honors}
                  coursework={edu.coursework}
                  isEducation={true}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Resume Download Banner */}
      <div className="mt-8 sm:mt-12 text-center">
        <a
          href={profileData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-border bg-card hover:bg-secondary text-foreground text-xs sm:text-sm font-semibold shadow-sm hover:border-primary/40 active:scale-95 transition-all min-h-[44px]"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Download Detailed Curriculum Vitae (PDF)</span>
        </a>
      </div>
    </section>
  );
}
