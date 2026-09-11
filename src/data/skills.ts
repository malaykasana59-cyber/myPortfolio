import { Skill, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Backend",
  "Databases",
  "Frontend",
  "DevOps & Cloud",
  "Tools & Arch",
];

export const skillsData: Skill[] = [
  // Languages
  { name: "C++ (C++17/20)", category: "Languages", level: "Expert", iconName: "Code2", highlight: true },
  { name: "C Programming", category: "Languages", level: "Advanced", iconName: "Binary", highlight: true },
  { name: "Python", category: "Languages", level: "Advanced", iconName: "Terminal", highlight: true },
  { name: "SQL", category: "Languages", level: "Advanced", iconName: "Database", highlight: true },
  { name: "HTML5 & Modern CSS3", category: "Languages", level: "Advanced", iconName: "Layout" },

  // Backend & Core CS
  { name: "Data Structures & Algorithms", category: "Backend", level: "Expert", iconName: "Workflow", highlight: true },
  { name: "OOP (Object-Oriented Design)", category: "Backend", level: "Expert", iconName: "Cpu", highlight: true },
  { name: "Backend Architecture", category: "Backend", level: "Intermediate", iconName: "Server", highlight: true },
  { name: "RESTful API Design", category: "Backend", level: "Intermediate", iconName: "Network" },
  { name: "System Memory & Pointers", category: "Backend", level: "Advanced", iconName: "KeyRound" },

  // Databases
  { name: "PostgreSQL", category: "Databases", level: "Advanced", iconName: "Database", highlight: true },
  { name: "RDBMS Design & Normalization", category: "Databases", level: "Advanced", iconName: "FolderTree", highlight: true },
  { name: "Complex SQL Querying", category: "Databases", level: "Advanced", iconName: "Flame", highlight: true },
  { name: "Data Modeling & Indexing", category: "Databases", level: "Intermediate", iconName: "Layers" },

  // Frontend
  { name: "Modern Responsive CSS", category: "Frontend", level: "Advanced", iconName: "Palette", highlight: true },
  { name: "AI-Assisted Frontend Dev", category: "Frontend", level: "Advanced", iconName: "Sparkles", highlight: true },
  { name: "Next.js & React UI", category: "Frontend", level: "Intermediate", iconName: "Globe" },
  { name: "Flexbox, Grid & Animations", category: "Frontend", level: "Advanced", iconName: "Layout" },

  // DevOps & Cloud
  { name: "Git & Version Control", category: "DevOps & Cloud", level: "Advanced", iconName: "GitBranch", highlight: true },
  { name: "GitHub Collaboration", category: "DevOps & Cloud", level: "Advanced", iconName: "GitPullRequest", highlight: true },
  { name: "Linux OS & Environment", category: "DevOps & Cloud", level: "Advanced", iconName: "TerminalSquare", highlight: true },
  { name: "Bash & Shell Scripting", category: "DevOps & Cloud", level: "Intermediate", iconName: "Terminal" },

  // Tools & Arch
  { name: "Algorithmic Problem Solving", category: "Tools & Arch", level: "Expert", iconName: "Compass", highlight: true },
  { name: "Competitive Programming", category: "Tools & Arch", level: "Advanced", iconName: "CheckCircle2", highlight: true },
  { name: "Debugging & GDB", category: "Tools & Arch", level: "Intermediate", iconName: "Boxes" },
  { name: "Clean Architecture Principles", category: "Tools & Arch", level: "Advanced", iconName: "ShieldCheck", highlight: true },
];
