"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  LayoutTemplate,
  Code2,
  Puzzle,
  Rocket,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    id: "idea",
    icon: <Lightbulb className="w-5 h-5" />,
    label: "IDEA",
    title: "Understand the Problem",
    description:
      "Every product starts with a real problem. I invest time understanding the user's context, constraints, and what success actually looks like before writing a single line of code.",
    color: "#F59E0B",
  },
  {
    id: "architecture",
    icon: <LayoutTemplate className="w-5 h-5" />,
    label: "ARCHITECTURE",
    title: "Design the System",
    description:
      "I plan the data model, API structure, authentication flow, and component hierarchy before coding. Good architecture makes development faster and future changes easier.",
    color: "#6366F1",
  },
  {
    id: "development",
    icon: <Code2 className="w-5 h-5" />,
    label: "DEVELOPMENT",
    title: "Build with Purpose",
    description:
      "Clean TypeScript, maintainable components, and meaningful abstractions. I write code that the next developer (or future me) can understand and extend confidently.",
    color: "#3B82F6",
  },
  {
    id: "integration",
    icon: <Puzzle className="w-5 h-5" />,
    label: "INTEGRATION",
    title: "Connect Everything",
    description:
      "APIs, databases, authentication, third-party services — integration is where products come to life. I ensure data flows correctly, securely, and reliably.",
    color: "#06B6D4",
  },
  {
    id: "deployment",
    icon: <Rocket className="w-5 h-5" />,
    label: "DEPLOYMENT",
    title: "Ship to Production",
    description:
      "Performance optimization, SEO, error handling, and monitoring before going live. I care about what happens after launch, not just during development.",
    color: "#10B981",
  },
  {
    id: "improve",
    icon: <RefreshCw className="w-5 h-5" />,
    label: "IMPROVE",
    title: "Iterate & Refine",
    description:
      "Real-world feedback shapes better products. I monitor, listen, and iterate continuously to improve the experience based on how the product is actually used.",
    color: "#8B5CF6",
  },
];

const PRINCIPLES = [
  "Build practical solutions, not over-engineered abstractions",
  "Design maintainable architecture that evolves with the product",
  "Create intuitive user experiences backed by solid engineering",
  "Integrate APIs and databases with security and reliability in mind",
  "Develop complete digital products from concept to deployment",
  "Continuously improve based on real-world feedback and usage",
];

function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export function Philosophy() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const visible = useSectionReveal(sectionRef);
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <section
      id="about"
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
              Engineering Philosophy
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
            How I Architect &amp; Build Products
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ color: "#71717A" }}
          >
            A disciplined, production-minded engineering methodology: from initial user need to scalable architecture and automated deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 md:gap-10 items-start">
          {/* Workflow steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className="flex gap-4 cursor-pointer group"
                onClick={() => setActiveStep(i)}
              >
                {/* Step number + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <button
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor:
                        activeStep === i
                          ? `${step.color}20`
                          : "rgba(255,255,255,0.03)",
                      border:
                        activeStep === i
                          ? `1px solid ${step.color}50`
                          : "1px solid rgba(255,255,255,0.06)",
                      color: activeStep === i ? step.color : "#52525B",
                      boxShadow:
                        activeStep === i
                          ? `0 0 16px ${step.color}15`
                          : "none",
                    }}
                    aria-label={`Step: ${step.label}`}
                  >
                    {step.icon}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2 min-h-[1.5rem]"
                      style={{
                        backgroundColor:
                          activeStep > i
                            ? `${step.color}40`
                            : "rgba(255,255,255,0.05)",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-5">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-0.5 transition-colors"
                    style={{
                      color: activeStep === i ? step.color : "#3F3F46",
                    }}
                  >
                    {step.label}
                  </div>
                  <h3
                    className="text-sm font-semibold mb-1.5 transition-colors"
                    style={{
                      color: activeStep === i ? "#FAFAFA" : "#71717A",
                    }}
                  >
                    {step.title}
                  </h3>
                  {activeStep === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs leading-relaxed"
                      style={{ color: "#A1A1AA" }}
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Principles card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "#111113",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-0.5 w-full rounded-full mb-6"
                style={{
                  background: "linear-gradient(90deg, #6366F1, #3B82F6, transparent)",
                }}
              />

              <h3 className="text-sm font-semibold text-white mb-5">
                Engineering Principles
              </h3>

              <ul className="space-y-3">
                {PRINCIPLES.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-2.5"
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                      style={{ color: "#6366F1" }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
                      {p}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom quote */}
              <div
                className="mt-6 pt-5 text-xs leading-relaxed italic"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  color: "#52525B",
                }}
              >
                &ldquo;Good software is built on clear thinking, not clever
                tricks.&rdquo;
              </div>
            </div>

            {/* Quick stat cards */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[
                { label: "Products Built", value: "10+" },
                { label: "Years Building", value: "2+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    backgroundColor: "#111113",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="text-xl font-bold mb-0.5"
                    style={{ color: "#6366F1" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "#52525B" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

