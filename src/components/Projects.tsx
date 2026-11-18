"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  status: "live" | "private" | "in-progress";
  accentColor: string;
  technologies: string[];
  highlights: string[];
  websiteUrl?: string;
  githubUrl?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    architecture: string;
    myRole: string;
  };
};

// Precise order requested:
// 1. Powerline CRM
// 2. Extel Official Website
// 3. Manufacture Tricotage
// 4. TuniJobs (no github link)
// 5. L'Escalier Consulting
// 6. Taskly
const PROJECTS: Project[] = [
  {
    id: "powerline",
    title: "PowerLine CRM",
    tagline: "Production CRM & Sales Platform",
    description:
      "A production-grade CRM and sales management platform used by real teams. Contributed to frontend engineering, authentication systems, permission management, and deployment.",
    image: "/powerline.png",
    category: "SaaS Platform",
    status: "private",
    accentColor: "#d99556",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Authentication",
      "RBAC",
      "Git",
    ],
    highlights: [
      "Role-based access control (RBAC) implementation",
      "CRM pipeline and customer overview dashboard engineering",
      "Authentication, session management and permission guards",
      "High-density data tables, filtering, and reporting views",
      "Production deployment and continuous integration",
    ],
    caseStudy: {
      problem:
        "Sales teams needed a reliable CRM with granular permission controls and a responsive interface that wouldn't slow down high-volume workflows.",
      solution:
        "Engineered a role-based permission system alongside frontend dashboard improvements, delivering a performant and intuitive CRM experience.",
      architecture:
        "React frontend with TypeScript, backed by RESTful APIs. Authentication handled server-side with JWT and role guards. Component-driven UI for reusability.",
      myRole:
        "Frontend engineering, RBAC implementation, API integration, UI component development, and deployment contributions.",
    },
  },
  {
    id: "extel-website",
    title: "Extel Official Website",
    tagline: "Corporate & Services Web Platform",
    description:
      "Official corporate website for Extel Tunisie — showcasing the company's services, expertise, and digital solutions with a modern, professional web presence.",
    image: "/extel.png",
    category: "Corporate Web",
    status: "live",
    accentColor: "#14b8a6",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "Vercel",
    ],
    highlights: [
      "Modern corporate identity with premium visual design and brand consistency",
      "Service showcase and digital capabilities presentation",
      "Responsive, mobile-first architecture across all devices",
      "Optimized performance, Core Web Vitals, and SEO architecture",
      "Contact pipeline and inquiry management integration",
    ],
    websiteUrl: "https://extel.com.tn",
    caseStudy: {
      problem:
        "Extel Tunisie required a modern, professional digital presence that accurately reflects the company's services and builds trust with potential clients.",
      solution:
        "Designed and developed a polished corporate website with clear service categorization, optimized performance, and direct contact channels.",
      architecture:
        "Next.js App Router with TypeScript, Tailwind CSS styling, Vercel edge deployment, and semantic HTML for full accessibility and SEO.",
      myRole:
        "Frontend design, development, responsive implementation, performance optimization, and production deployment.",
    },
  },
  {
    id: "manufacture",
    title: "Manufacture Tricotage",
    tagline: "Product Showcase & Brand Platform",
    description:
      "A modern, responsive brand platform and product catalog for an industrial textile and knitwear manufacturer, highlighting manufacturing capabilities and customer inquiries.",
    image: "/manifacture.png",
    category: "Brand Platform",
    status: "live",
    accentColor: "#0c4074ff",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
    ],
    highlights: [
      "High-resolution interactive product catalog showcase",
      "Sleek brand aesthetic tailored to European industrial buyers",
      "Mobile-first responsive architecture with smooth micro-interactions",
      "Optimized Core Web Vitals and image performance",
    ],
    websiteUrl: "https://manifacturetricotage.vercel.app/",
    caseStudy: {
      problem:
        "A textile manufacturer required an international digital presence to showcase their industrial machinery, fabric portfolio, and client references.",
      solution:
        "Designed and deployed a high-performance Next.js web application with optimized media loading, responsive grids, and direct inquiry channels.",
      architecture:
        "Next.js App Router, Tailwind CSS, Vercel edge caching, semantic HTML with full accessibility.",
      myRole:
        "Frontend design, responsive development, image optimization, and production deployment.",
    },
  },
  {
    id: "tunijobs",
    title: "TuniJobs",
    tagline: "AI-Powered Job Matching Platform",
    description:
      "An intelligent job matching platform connecting candidates and recruiters in Tunisia, featuring automated CV analysis, algorithmic scoring, and automated candidate workflows.",
    image: "/tuni-jobs.jpg",
    category: "AI Application",
    status: "in-progress",
    accentColor: "#8B5CF6",
    technologies: [
      "Angular",
      "Spring Boot",
      "Supabase",
      "PostgreSQL",
      "n8n Workflows",
      "LLM / AI",
      "PrimeNG",
    ],
    highlights: [
      "AI-driven CV parsing, semantic extraction, and skill evaluation",
      "Automated recruitment workflow pipelines powered by n8n",
      "Comprehensive recruiter portal with candidate pipeline management",
      "Applicant profile builder and automated matching scoring",
      "Instant email and alert automation for candidate milestones",
    ],
    caseStudy: {
      problem:
        "Manual resume screening is slow and error-prone, leaving talented candidates overlooked and recruiters overwhelmed by irrelevant submissions.",
      solution:
        "Constructed an automated platform integrating LLM-based CV parsing with n8n event triggers to calculate real candidate compatibility scores instantly.",
      architecture:
        "Angular frontend with PrimeNG UI, Spring Boot Java REST backend, Supabase database, and webhook-driven n8n automation pipelines.",
      myRole:
        "Full-stack development: Angular client components, Spring Boot API endpoints, database structure, and n8n workflow integration.",
    },
  },
  {
    id: "escalier",
    title: "L'Escalier Consulting",
    tagline: "Corporate Website & Admin Dashboard",
    description:
      "Corporate web platform for L'Escalier Consulting, featuring an integrated admin management portal, corporate service showcase, and secure contact pipeline.",
    image: "/escalier.jpg",
    category: "Corporate Web",
    status: "live",
    accentColor: "#89DA11",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    highlights: [
      "Executive corporate branding with refined typography",
      "Protected admin dashboard for updating services and content",
      "Complete SEO architecture, structured metadata, and fast loading",
      "Direct client inquiry management via Supabase database integration",
    ],
    websiteUrl: "https://escalierconsulting.vercel.app",
    caseStudy: {
      problem:
        "The consulting firm required a trustworthy corporate platform with a private admin area to manage inquiries and content without technical assistance.",
      solution:
        "Built a full-stack Next.js web application paired with Supabase authentication and database storage for dynamic corporate management.",
      architecture:
        "Next.js App Router, Supabase Auth and Database, Tailwind CSS styling, deployed on Vercel.",
      myRole:
        "Full-stack architecture, frontend design, database schema, and deployment configuration.",
    },
  },
  {
    id: "taskly",
    title: "Taskly",
    tagline: "Task Management Web Application",
    description:
      "Collaborative web application to create, manage and track team projects, featuring interactive Kanban and Scrum workflows, sprint planning, and performance metrics.",
    image: "/taskly.jpg",
    category: "Project Management",
    status: "in-progress",
    accentColor: "#06B6D4",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Recharts",
      "AG Grid",
      "Supabase Auth",
      "PostgreSQL",
      "Git",
    ],
    highlights: [
      "Built a responsive interface with Next.js, Tailwind CSS, Shadcn/UI and dynamic components (drag and drop, charts)",
      "Implemented secure authentication and permission management with Supabase Auth",
      "Developed the business logic for managing projects, tasks, users and sprints",
      "Integrated AG Grid for advanced data filtering and batch updates",
      "Interactive velocity and sprint progress charts built with Recharts",
    ],
    caseStudy: {
      problem:
        "Engineering teams needed a lightweight, responsive project tracker that combines drag-and-drop task boards with clear sprint analytics without cumbersome enterprise bloat.",
      solution:
        "Created Taskly: a high-performance web app with interactive Kanban boards, role-based project access, and real-time sprint burndown charts.",
      architecture:
        "Next.js with React 19, Supabase Auth & PostgreSQL persistence, AG Grid for high-density tables, and Recharts for visual progress tracking.",
      myRole:
        "Frontend and backend engineering: implemented dynamic drag-and-drop boards, Supabase authentication & permissions, and sprint management logic.",
    },
  },
];

function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const configs = {
    live: { label: "Live", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
    private: { label: "Production", color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
    "in-progress": { label: "Active", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  };
  const cfg = configs[status];
  return (
    <span
      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  const [showCase, setShowCase] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="project-card rounded-2xl overflow-hidden flex flex-col justify-between"
      style={{
        backgroundColor: "#111113",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top accent line */}
      <div>
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
          }}
        />

        {/* Project Image */}
        <div
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: "16/10", backgroundColor: "#0A0A0B" }}
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline} by Oussema Ben Yahia`}
            fill
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Top badges */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md"
              style={{
                backgroundColor: "rgba(9,9,11,0.85)",
                border: `1px solid ${project.accentColor}35`,
                color: project.accentColor,
              }}
            >
              {project.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="mb-3">
            <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 tracking-tight">
              {project.title}
            </h3>
            <p
              className="text-xs font-medium"
              style={{ color: project.accentColor }}
            >
              {project.tagline}
            </p>
          </div>

          <p
            className="text-xs sm:text-sm mb-4 leading-relaxed"
            style={{ color: "#8E8E93" }}
          >
            {project.description}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 mb-5">
            {project.highlights.slice(0, 3).map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs"
                style={{ color: "#A1A1AA" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span className="leading-snug">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#99999F",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer / Actions */}
      <div
        className="p-5 sm:p-6 pt-0 mt-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center gap-2 pt-3">
          {project.websiteUrl && (() => {
            const hex = project.accentColor.length === 9 ? project.accentColor.slice(0, 7) : project.accentColor;
            const isLightColor = hex.toLowerCase() === "#89da11";
            return (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                data-cursor-label="OPEN"
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:opacity-95 hover:shadow-lg cursor-pointer ${
                  isLightColor ? "text-[#09090B] font-bold" : "text-white"
                }`}
                style={{
                  backgroundColor: hex,
                  background: `linear-gradient(135deg, ${hex}, ${hex})`,
                  boxShadow: `0 0 20px ${hex}33`,
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Website
              </a>
            );
          })()}

          {project.caseStudy && (
            <button
              onClick={() => setShowCase(!showCase)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                marginLeft: project.websiteUrl ? "0" : "auto",
                width: project.websiteUrl ? "auto" : "100%",
              }}
            >
              {showCase ? "Hide Details" : "Case Study"}
              {showCase ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Expandable Case Study */}
        <AnimatePresence>
          {showCase && project.caseStudy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="mt-4 pt-4 space-y-3.5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {[
                  { label: "Problem", content: project.caseStudy.problem },
                  { label: "Solution", content: project.caseStudy.solution },
                  { label: "Architecture", content: project.caseStudy.architecture },
                  { label: "My Contributions", content: project.caseStudy.myRole },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <div
                      className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: project.accentColor }}
                    >
                      {label}
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#A1A1AA" }}
                    >
                      {content}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const visible = useSectionReveal(sectionRef);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: "#09090B" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: "#6366F1" }} />
            <span className="text-label" style={{ color: "#6366F1" }}>
              Selected Products
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 md:mb-4 tracking-tight"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 3rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Engineering Portfolio &amp; Applications
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-2xl"
            style={{ color: "#71717A" }}
          >
            Full-stack web applications, SaaS platforms, and enterprise solutions
            engineered from architecture to production.
          </p>
        </motion.div>

        {/* Projects Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
