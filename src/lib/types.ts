/* ── TypeScript interfaces for portfolio data ── */

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  featured: boolean;
  category: string;
  websiteUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  description: string;
  category: string;
}

export interface SkillCategory {
  label: string;
  color: string;
  dot: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Freelance' | 'Academic Project' | 'Education';
  bullets: string[];
  technologies: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

export interface NavItem {
  href: string;
  label: string;
}
