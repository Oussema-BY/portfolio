"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Lock,
  Wrench,
  Bot,
} from "lucide-react";

// True branded technology icons
import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiNodedotjs,
  SiNestjs,
  SiSpringboot,
  SiPhp,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiMysql,
  SiGoogle,
  SiResend,
  SiGit,
  SiGithub,
  SiVercel,
  SiGreensock,
  SiN8N,
  SiLangchain,
} from "react-icons/si";

import {
  TbApi,
  TbShieldLock,
  TbChartDots,
  TbBrain,
  TbSparkles,
  TbLayersIntersect,
} from "react-icons/tb";

type TechItem = {
  name: string;
  icon: React.ReactNode;
  brandColor: string;
};

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: TechItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Code2 className="w-4 h-4" />,
    color: "#38BDF8",
    items: [
      { name: "React.js", icon: <SiReact className="w-5 h-5" />, brandColor: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" />, brandColor: "#FAFAFA" },
      { name: "Angular", icon: <SiAngular className="w-5 h-5" />, brandColor: "#DD0031" },
      { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" />, brandColor: "#3178C6" },
      { name: "JavaScript", icon: <SiJavascript className="w-5 h-5" />, brandColor: "#F7DF1E" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" />, brandColor: "#06B6D4" },
      { name: "shadcn/ui", icon: <SiShadcnui className="w-5 h-5" />, brandColor: "#FAFAFA" },
      { name: "Framer Motion", icon: <SiFramer className="w-5 h-5" />, brandColor: "#0055FF" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Server className="w-4 h-4" />,
    color: "#3B82F6",
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5" />, brandColor: "#5FA04E" },
      { name: "NestJS", icon: <SiNestjs className="w-5 h-5" />, brandColor: "#E0234E" },
      { name: "Spring Boot", icon: <SiSpringboot className="w-5 h-5" />, brandColor: "#6DB33F" },
      { name: "PHP", icon: <SiPhp className="w-5 h-5" />, brandColor: "#777BB4" },
      { name: "REST APIs", icon: <TbApi className="w-5 h-5" />, brandColor: "#3B82F6" },
    ],
  },
  {
    id: "database",
    label: "Databases",
    icon: <Database className="w-4 h-4" />,
    color: "#06B6D4",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" />, brandColor: "#4169E1" },
      { name: "Supabase", icon: <SiSupabase className="w-5 h-5" />, brandColor: "#3ECF8E" },
      { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" />, brandColor: "#47A248" },
      { name: "MySQL", icon: <SiMysql className="w-5 h-5" />, brandColor: "#4479A1" },
    ],
  },
  {
    id: "auth",
    label: "Auth & APIs",
    icon: <Lock className="w-4 h-4" />,
    color: "#10B981",
    items: [
      { name: "Better Auth", icon: <TbShieldLock className="w-5 h-5" />, brandColor: "#38BDF8" },
      { name: "Google OAuth", icon: <SiGoogle className="w-5 h-5" />, brandColor: "#EA4335" },
      { name: "Resend", icon: <SiResend className="w-5 h-5" />, brandColor: "#FAFAFA" },
      { name: "API Integrations", icon: <TbLayersIntersect className="w-5 h-5" />, brandColor: "#10B981" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Wrench className="w-4 h-4" />,
    color: "#F59E0B",
    items: [
      { name: "Git", icon: <SiGit className="w-5 h-5" />, brandColor: "#F05032" },
      { name: "GitHub", icon: <SiGithub className="w-5 h-5" />, brandColor: "#FAFAFA" },
      { name: "Vercel", icon: <SiVercel className="w-5 h-5" />, brandColor: "#FAFAFA" },
      { name: "GSAP", icon: <SiGreensock className="w-5 h-5" />, brandColor: "#88CE02" },
      { name: "Recharts", icon: <TbChartDots className="w-5 h-5" />, brandColor: "#22B5BF" },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    icon: <Bot className="w-4 h-4" />,
    color: "#8B5CF6",
    items: [
      { name: "LLM Integrations", icon: <TbBrain className="w-5 h-5" />, brandColor: "#A78BFA" },
      { name: "n8n Workflows", icon: <SiN8N className="w-5 h-5" />, brandColor: "#EA4B71" },
      { name: "LangChain", icon: <SiLangchain className="w-5 h-5" />, brandColor: "#00A67E" },
      { name: "AI-assisted Dev", icon: <TbSparkles className="w-5 h-5" />, brandColor: "#F59E0B" },
    ],
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export function TechStack() {
  const [active, setActive] = React.useState("frontend");
  const sectionRef = React.useRef<HTMLElement>(null);
  const visible = useSectionReveal(sectionRef);

  const activeCategory = CATEGORIES.find((c) => c.id === active) || CATEGORIES[0];

  return (
    <section
      id="expertise"
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
            <div className="w-5 h-px" style={{ backgroundColor: "#38BDF8" }} />
            <span className="text-label" style={{ color: "#38BDF8" }}>
              Technical Ecosystem
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
            Engineering Stack &amp; Technologies
          </h2>
          <p
            className="max-w-xl text-sm sm:text-base leading-relaxed"
            style={{ color: "#71717A" }}
          >
            Real production technologies tested in live software. No fake percentages or
            vanity bars — only genuine hands-on engineering capability.
          </p>
        </motion.div>

        {/* Categories & Tech Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-[240px_1fr] gap-5 md:gap-6"
        >
          {/* Category Navigation - Horizontal scroll on mobile, vertical list on desktop */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar -mx-2 px-2 lg:mx-0 lg:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-left transition-all flex-shrink-0 cursor-pointer"
                style={{
                  background:
                    active === cat.id
                      ? "rgba(56, 189, 248, 0.12)"
                      : "rgba(255,255,255,0.02)",
                  border:
                    active === cat.id
                      ? "1px solid rgba(56, 189, 248, 0.35)"
                      : "1px solid rgba(255,255,255,0.06)",
                  color: active === cat.id ? "#FAFAFA" : "#71717A",
                }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor:
                      active === cat.id ? `${cat.color}25` : "rgba(255,255,255,0.04)",
                    color: active === cat.id ? cat.color : "#52525B",
                  }}
                >
                  {cat.icon}
                </span>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {cat.label}
                </span>
                {active === cat.id && (
                  <span
                    className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div
            className="rounded-2xl p-5 sm:p-7 transition-all"
            style={{
              backgroundColor: "#111113",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    backgroundColor: `${activeCategory.color}20`,
                    color: activeCategory.color,
                  }}
                >
                  {activeCategory.icon}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {activeCategory.label}
                  </h3>
                  <p className="text-xs" style={{ color: "#52525B" }}>
                    {activeCategory.items.length} verified technologies
                  </p>
                </div>
              </div>
            </div>

            {/* Grid of true icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {activeCategory.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 rounded-xl group transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(56,189,248,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(56,189,248,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.025)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0px)";
                  }}
                >
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: item.brandColor,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-center text-[#A1A1AA] group-hover:text-white transition-colors truncate w-full">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { label: "Frontend", value: "8+", sub: "frameworks & libraries" },
            { label: "Backend", value: "5+", sub: "runtimes & APIs" },
            { label: "Databases", value: "4", sub: "relational & document" },
            { label: "AI & Tools", value: "8+", sub: "production tools" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3.5 sm:p-4 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="text-xl sm:text-2xl font-bold mb-0.5"
                style={{ color: "#38BDF8" }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-medium text-white">{stat.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "#52525B" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
