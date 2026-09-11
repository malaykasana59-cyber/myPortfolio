import { Project } from "@/types";

export const projectCategories = [
  "All",
  "AI / Systems",
  "Frontend",
  "Full-Stack",
  "DevOps & Tools",
] as const;

export const projectsData: Project[] = [
  {
    id: "chessy-python-engine",
    title: "Chessy - Python Chess GUI with Stockfish",
    description:
      "A Chess.com-style desktop chess application integrated with the Stockfish chess engine, featuring move validation, interactive engine analysis, and deep game reviews.",
    detailedDescription:
      "Engineered with Python and UCI engine communication protocols. Implements real-time board state serialization (FEN/PGN), minimax move evaluation visualizations, blunder alerts, and clean interactive piece animations.",
    tags: ["Python", "Stockfish AI", "Algorithms", "GUI", "Game Theory"],
    category: "AI / Systems",
    imageUrl: "/images/projects/project-chessy.webp",
    githubUrl: "https://github.com/malaykasana59-cyber/Chessy",
    featured: true,
    metrics: "Stockfish AI • Real-Time Analysis",
  },
  {
    id: "car-insurance-system",
    title: "Car Insurance Management System",
    description:
      "An object-oriented software system built with C++ and relational database design for policy lifecycle management, driver risk assessment, and claim processing.",
    detailedDescription:
      "Designed leveraging core Object-Oriented Programming (OOP) principles in C++. Features modular classes for Policyholders, Vehicles, Coverage Plans, and Claims, coupled with mathematical risk rating algorithms and data integrity validation.",
    tags: ["C++", "OOP", "SQL", "Relational DB", "Algorithms"],
    category: "Full-Stack",
    imageUrl: "/images/projects/project-insurance.webp",
    githubUrl: "https://github.com/malaykasana59-cyber/car-insurance-system",
    featured: true,
    metrics: "Deterministic Risk Engine • OOP Architecture",
  },
  {
    id: "amazon-storefront-clone",
    title: "Amazon E-Commerce Storefront Clone",
    description:
      "A pixel-perfect, fully responsive clone of Amazon's e-commerce storefront focusing on modern CSS architectures, fluid multi-device layouts, and interactive navigation.",
    detailedDescription:
      "Engineered using semantic HTML5 and advanced modern CSS3 (Flexbox & CSS Grid). Delivers seamless breakpoint adaptations, category banners, promotional carousels, and responsive checkout navigation without external styling frameworks.",
    tags: ["HTML5", "Modern CSS3", "Responsive Layout", "Flexbox & Grid", "UI/UX"],
    category: "Frontend",
    imageUrl: "/images/projects/project-amazon.webp",
    githubUrl: "https://github.com/malaykasana59-cyber",
    featured: true,
    metrics: "100% Responsive • Zero CSS Frameworks",
  },
  {
    id: "getting-started-dsa",
    title: "DSA & Algorithmic Problem Solving Suite",
    description:
      "A curated repository of high-efficiency Data Structures and Algorithms implementations in modern C++, targeting time/space complexity optimization.",
    detailedDescription:
      "Covers fundamental and advanced data structures: Dynamic Arrays, Linked Lists, Binary Search Trees, Heaps, Graphs, and Dynamic Programming. Contains solutions and complexity benchmarks for classic algorithmic challenges.",
    tags: ["C++", "Data Structures", "Algorithms", "C++17", "Problem Solving"],
    category: "AI / Systems",
    imageUrl: "/images/projects/project-dsa.webp",
    githubUrl: "https://github.com/malaykasana59-cyber/Getting-Started-with-DSA",
    featured: false,
    metrics: "O(log N) Efficiency • 100+ Algorithms",
  },
  {
    id: "relational-database-sql-engine",
    title: "Relational SQL Schema & Database Architecture",
    description:
      "Structured SQL database modeling suite demonstrating 3NF relational normalization, index optimization, and transactional ACID consistency in PostgreSQL.",
    detailedDescription:
      "Features real-world schema designs, foreign key integrity constraints, complex multi-table joins, subqueries, and execution plan profiling (EXPLAIN ANALYZE) to minimize query latency.",
    tags: ["PostgreSQL", "SQL", "Normalization", "Indexing", "ACID"],
    category: "Full-Stack",
    imageUrl: "/images/projects/project-sql.webp",
    githubUrl: "https://github.com/malaykasana59-cyber",
    featured: false,
    metrics: "3NF Normalization • Sub-millisecond Queries",
  },
];
