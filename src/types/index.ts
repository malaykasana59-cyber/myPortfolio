export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  typingTitles: string[];
  bio: string;
  detailedBio: string;
  location: string;
  email: string;
  availability: {
    status: "available" | "busy" | "open_to_offers";
    label: string;
  };
  socials: SocialLink[];
  resumeUrl: string;
  avatarUrl?: string;
}

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "DevOps & Cloud"
  | "Tools & Arch";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  iconName: string;
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  category: "Full-Stack" | "Frontend" | "AI / Systems" | "DevOps & Tools";
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  type: "Full-time" | "Contract" | "Internship" | "Remote";
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: string;
  honors?: string;
  coursework?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck?: string;
}
