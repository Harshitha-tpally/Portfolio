import { Layers, Smartphone, Terminal, type LucideIcon } from "lucide-react";

/* ---- Edit these ---- */
export const NAME = "Harshitha Tangallapelli";
export const FIRST = "Harshitha";
export const LAST = "Tangallapelli";
export const PHOTO = ""; // e.g. a hosted image URL; leave empty to show the monogram artwork
export const EMAIL = "26EG105B61@anurag.edu.in";
export const LINKEDIN = "https://www.linkedin.com/in/your-profile";
export const GITHUB = "https://github.com/your-username";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "intro", label: "Intro" },
  { id: "study", label: "Study" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const KEYWORDS = [
  "C",
  "C++",
  "Java",
  "Data Structures",
  "Algorithms",
  "Problem-Solving",
  "Software Development",
  "App Development",
];

export type Status = "Learning" | "Beginner" | "Exploring" | "Planning";

export const LANGUAGES: { name: string; status: Status; level: number }[] = [
  { name: "C", status: "Learning", level: 2 },
  { name: "C++", status: "Learning", level: 2 },
  { name: "Java", status: "Beginner", level: 1 },
];

export const INTERESTS: { name: string; status: Status }[] = [
  { name: "Data Structures & Algorithms", status: "Exploring" },
  { name: "Software Development", status: "Exploring" },
  { name: "App Development", status: "Exploring" },
  { name: "Problem-Solving", status: "Learning" },
];

export const ROADMAP = [
  { when: "Now", title: "Programming fundamentals", text: "C, C++ and Java basics, plus logical thinking and problem-solving." },
  { when: "Next", title: "Data Structures & Algorithms", text: "Building a solid base for writing efficient programs." },
  { when: "Later", title: "Software & app development", text: "Turning what I learn into small, practical projects." },
];

export const PROJECTS: {
  title: string;
  text: string;
  tech: string;
  status: Status;
  Icon: LucideIcon;
  pattern: "pattern-dots" | "pattern-grid" | "pattern-stripes";
}[] = [
  { title: "Project Title One", text: "Placeholder: a small C program to practise fundamentals.", tech: "C", status: "Planning", Icon: Terminal, pattern: "pattern-dots" },
  { title: "Project Title Two", text: "Placeholder: practising data structures with C++.", tech: "C++", status: "Learning", Icon: Layers, pattern: "pattern-grid" },
  { title: "Project Title Three", text: "Placeholder: a beginner Java application idea.", tech: "Java", status: "Planning", Icon: Smartphone, pattern: "pattern-stripes" },
];

export const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
