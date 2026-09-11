import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 sm:gap-16">
      <HeroSection />
      <StatsSection />
      <TechStackSection />
      <InteractiveTerminal />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
    </div>
  );
}
