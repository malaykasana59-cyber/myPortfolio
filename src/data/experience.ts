import { ExperienceItem, EducationItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Software Engineering Scholar & Developer",
    company: "Delhi Technological University (DTU)",
    companyUrl: "https://dtu.ac.in",
    location: "Delhi, India",
    period: "2025 — Present",
    type: "Remote",
    description: [
      "Rigorous focus on core Computer Science foundations: low-level memory efficiency, object-oriented design patterns, and algorithmic problem-solving in C++.",
      "Engineered real-world software applications including Chessy (Python + Stockfish AI engine integration) and an object-oriented Car Insurance Management System.",
      "Mastering relational database architectures, 3NF normalization, and query performance optimization using SQL and PostgreSQL.",
    ],
    skills: ["C++", "DSA", "Python", "SQL", "PostgreSQL", "OOP", "Linux"],
  },
  {
    id: "exp-2",
    role: "Open Source & Systems Project Builder",
    company: "GitHub / Self-Directed Projects",
    companyUrl: "https://github.com/malaykasana59-cyber",
    location: "Remote",
    period: "2024 — Present",
    type: "Remote",
    description: [
      "Architected desktop chess analysis application in Python leveraging the UCI protocol to interface directly with the Stockfish chess engine for real-time move evaluations.",
      "Implemented comprehensive Data Structures and Algorithms repository in C++ with complexity analysis and clean modular implementations.",
      "Developed high-fidelity responsive web interfaces using semantic HTML5 and modern CSS3 layouts (Flexbox & CSS Grid) without relying on bloated external CSS frameworks.",
    ],
    skills: ["Git", "GitHub", "Python", "C++", "HTML5", "CSS3", "Stockfish"],
  },
  {
    id: "exp-3",
    role: "Algorithmic Problem Solver",
    company: "Competitive Programming & DSA",
    companyUrl: "https://github.com/malaykasana59-cyber/Getting-Started-with-DSA",
    location: "Self-Paced",
    period: "Ongoing",
    type: "Remote",
    description: [
      "Actively practicing Data Structures and Algorithms with a focus on optimal time (Big-O) and space asymptotic complexities.",
      "Practiced and solved 100+ problems covering arrays, two-pointers, binary search, recursion, trees, and dynamic programming in C++.",
    ],
    skills: ["C++", "Data Structures", "Algorithms", "Big-O Analysis", "Optimization"],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B.Tech) in Software Engineering",
    institution: "Delhi Technological University (Formerly DCE)",
    institutionUrl: "https://dtu.ac.in",
    location: "Shahbad Daulatpur, Bawana Road, Delhi, India",
    period: "2025 — 2029 (Expected)",
    honors: "Premier Engineering Institution in India • Software Engineering Branch",
    coursework: [
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOP) in C++",
      "Relational Database Management Systems (SQL / PostgreSQL)",
      "Computer System Architecture & Fundamentals",
      "Operating Systems & Low-Level Principles",
    ],
  },
];
