"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Cpu, Brain } from "lucide-react";

type Experience = {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  description: string;
  contributions: string[];
  technologies: string[];
  link?: string;
};

// Updated exact order and verified dates:
// 1. PowerLine CRM: Juin 2026 – Septembre 2026
// 2. Extel Tunisie: Janvier 2026 – Avril 2026
// 3. JuniorsCV (projet L'Escalier Consulting): Juin 2025 – Août 2025
const EXPERIENCES: Experience[] = [
  {
    id: "powerline",
    company: "PowerLine CRM",
    role: "Software Engineer",
    type: "Production Platform",
    location: "Remote",
    period: "Juin 2026 – Septembre 2026",
    description:
      "Contributed to software engineering on a production CRM and sales management platform. Focused on frontend improvements, role-based authentication, permission management, and deployment workflows.",
    contributions: [
      "Engineered frontend features for the CRM dashboard, pipeline views, and sales analytics",
      "Implemented role-based authentication (RBAC) and permission management system",
      "Enhanced UI components, data tables, and real-time filtering for sales teams",
      "Contributed to backend API integration for CRM customer data flows",
      "Participated in production deployment and release processes",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Authentication",
      "RBAC",
      "Git",
      "CI/CD",
    ],
  },
  {
    id: "extel",
    company: "Extel Tunisie",
    role: "Full-Stack Web Developer",
    type: "Web & SaaS Development",
    location: "Tunis, Tunisia",
    period: "Janvier 2026 – Avril 2026",
    description:
      "Full-stack development across client SaaS applications, dynamic websites, and internal coworking management systems. Handled frontend engineering, backend integrations, and SEO performance.",
    contributions: [
      "Developed SaaS applications and coworking space management platforms from frontend to backend",
      "Built and integrated secure REST APIs for dynamic web applications and booking calendars",
      "Implemented SEO best practices, structured metadata, and Core Web Vitals optimizations",
      "Designed and developed responsive, accessible user interfaces with modern component architecture",
      "Collaborated on frontend/backend integration with modern authentication and database systems",
      "Contributed to production deployment pipelines on Vercel and cloud infrastructure",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
      "REST APIs",
    ],
  },
  {
    id: "juniorscv",
    company: "JuniorsCV",
    role: "Full-Stack Web Developer",
    type: "Client Web Application",
    location: "Tunis, Tunisia",
    period: "Juin 2025 – Août 2025",
    description:
      "Designed and developed the corporate web platform and integrated administrative management dashboard for L'Escalier Consulting. Focused on clean user experience, dynamic service presentation, and reliable client inquiry handling.",
    contributions: [
      "Architected the modern corporate web platform with Next.js, React, and Tailwind CSS",
      "Developed an integrated admin dashboard for service catalog and content updates",
      "Integrated Supabase database storage and secure contact pipeline for incoming leads",
      "Optimized load times, responsiveness, and cross-device display for mobile, tablet, and desktop",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    link: "https://escalierconsulting.vercel.app",
  },
];

function TimelineCard({
  exp,
  index,
  isLast,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className={`relative pl-8 sm:pl-10 ${isLast ? "" : "mb-8 sm:mb-12"}`}>
      {/* Node Dot positioned exactly over the timeline line */}
      <div
        className="absolute left-0 top-6 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full z-20 flex items-center justify-center transition-colors duration-300"
        style={{
          backgroundColor: "#0C0C0E",
          border: "2px solid #41464F",
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: expanded ? "#38BDF8" : "#71717A" }}
        />
      </div>

      {/* Experience Card */}
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: "#111113",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: expanded ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Card header — always visible */}
        <button
          className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 group cursor-pointer"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: "rgba(56, 189, 248, 0.1)",
                  color: "#38BDF8",
                }}
              >
                {exp.type}
              </span>
              <span className="text-xs text-[#52525B]">{exp.location}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 tracking-tight">
              {exp.role}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-white/90">
                {exp.company}
              </span>
              <span className="text-[#41464F]">·</span>
              <span className="text-[#38BDF8] font-medium font-mono text-xs">
                {exp.period}
              </span>
            </div>
          </div>

          <div
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 mt-1"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#71717A]" />
          </div>
        </button>

        {/* Expandable detailed content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed mb-4 text-[#8E8E93]">
                  {exp.description}
                </p>

                {/* Key Contributions */}
                <div className="mb-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                    Key Engineering Contributions
                  </div>
                  <ul className="space-y-1.5">
                    {exp.contributions.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-[#A1A1AA] leading-relaxed"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: "#38BDF8" }}
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Stack */}
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#52525B] mb-2">
                    Technical Environment
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
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

                {exp.link && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:underline"
                    >
                      Visit Corporate Project
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Experience() {
  const timelineRef = React.useRef<HTMLDivElement>(null);

  // Link scroll position to progress
  // Offset: line starts filling when top of timeline hits middle of screen, reaches 100% when bottom passes middle
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 65%"],
  });

  // Smooth out scroll progress with a lightweight spring
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: "#0C0C0E" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: "#38BDF8" }} />
            <span className="text-label" style={{ color: "#38BDF8" }}>
              Professional Experience
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
            Engineering Timeline
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed text-[#71717A] max-w-xl"
          >
            Verified software engineering and web development contributions across production applications and corporate platforms.
          </p>
        </div>

        {/* Timeline Container with Scroll-based Color Transformation Line */}
        <div ref={timelineRef} className="relative ml-2 sm:ml-3">
          {/* 1. Base Gray Vertical Line (#41464F) */}
          <div
            className="absolute left-0 top-6 bottom-6 w-[2px] -translate-x-1/2 z-0"
            style={{ backgroundColor: "#41464F" }}
          />

          {/* 2. Active Sky Blue Progress Line (#38BDF8) filling progressively top-to-bottom on scroll */}
          <motion.div
            className="absolute left-0 top-6 bottom-6 w-[2px] -translate-x-1/2 z-10 origin-top"
            style={{
              backgroundColor: "#38BDF8",
              scaleY,
            }}
          />

          {/* Experience Cards positioned strictly to the right of the timeline */}
          <div className="relative z-10">
            {EXPERIENCES.map((exp, i) => (
              <TimelineCard
                key={exp.id}
                exp={exp}
                index={i}
                isLast={i === EXPERIENCES.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Academic / Formation note — Redesigned Engineering Credential Card */}
        <div className="mt-10 md:mt-12 ml-2 sm:ml-3 pl-8 sm:pl-10">
          <div
            className="rounded-2xl p-5 sm:p-6 transition-all relative overflow-hidden"
            style={{
              backgroundColor: "#111113",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              boxShadow: "0 0 32px rgba(56, 189, 248, 0.05)",
            }}
          >
            {/* Top subtle ambient highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), rgba(168, 85, 247, 0.4), transparent)",
              }}
            />

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Tech/Engineering Icon */}
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform"
                style={{
                  backgroundColor: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#38BDF8",
                }}
              >
                <Cpu className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: "rgba(56, 189, 248, 0.12)",
                      color: "#38BDF8",
                    }}
                  >
                    Engineering Education
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(168, 85, 247, 0.12)",
                      border: "1px solid rgba(168, 85, 247, 0.25)",
                      color: "#C084FC",
                    }}
                  >
                    <Brain className="w-3 h-3" />
                    AI &amp; Data Science Specialization
                  </span>
                  <span className="text-xs text-[#52525B]">Evening Track</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight">
                  Software Engineering Degree &mdash; Specialization in AI &amp; Data Science
                </h4>

                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-4 max-w-2xl">
                  Advanced engineering degree program pursued concurrently with professional software development. Bridges rigorous full-stack system architecture with an in-depth specialization in Artificial Intelligence, Machine Learning algorithms, predictive analytics, and intelligent automation.
                </p>

                {/* Criteria Groups */}
                <div className="space-y-2.5">
                  {/* AI & Data Science Criteria */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C084FC] mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />
                      AI &amp; Data Science Criteria
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Artificial Intelligence",
                        "Data Science & Analytics",
                        "Machine Learning Models",
                        "LLM & NLP Engineering",
                        "Data Pipelines & Processing",
                      ].map((field) => (
                        <span
                          key={field}
                          className="px-2 py-0.5 rounded text-[11px] font-medium"
                          style={{
                            backgroundColor: "rgba(168, 85, 247, 0.08)",
                            border: "1px solid rgba(168, 85, 247, 0.2)",
                            color: "#D8B4FE",
                          }}
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Software Engineering Criteria */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#38BDF8] mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      Software Engineering Core
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Software Architecture",
                        "Distributed Systems",
                        "Algorithms & Data Structures",
                        "Database Optimization",
                        "Design Patterns & Clean Code",
                      ].map((field) => (
                        <span
                          key={field}
                          className="px-2 py-0.5 rounded text-[11px] font-medium"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "#A1A1AA",
                          }}
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
