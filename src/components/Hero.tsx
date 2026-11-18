"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { motion } from "framer-motion";

// ── Animated Canvas — Connected Tech Nodes ──────────────────────────────────
function TechCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const NUM_NODES = Math.min(28, Math.floor((width * height) / 22000));
    const CONNECT_DIST = Math.min(160, width * 0.2);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      label: string;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }

    const LABELS = [
      "React", "Next.js", "TypeScript", "Node.js", "NestJS",
      "Supabase", "PostgreSQL", "Tailwind", "API", "Auth",
      "Git", "Vercel", "Angular", "Spring", "n8n",
      "AI", "Docker", "REST", "OAuth", "GSAP",
    ];

    const nodes: Node[] = Array.from({ length: NUM_NODES }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 2 + Math.random() * 1.5,
      label: LABELS[i % LABELS.length],
      opacity: 0.5 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    }));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(n.pulse) * 0.3 + 0.7;
        const r = n.r * pulse;

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grad.addColorStop(0, `rgba(99, 102, 241, ${n.opacity * 0.3})`);
        grad.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${n.opacity})`;
        ctx.fill();

        // Label (only large enough nodes)
        if (r > 2) {
          ctx.font = `500 9px system-ui, sans-serif`;
          ctx.fillStyle = `rgba(161, 161, 170, ${n.opacity * 0.7})`;
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y - r - 5);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

// ── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(words[0]);
      return;
    }

    const current = words[index];
    const speed = deleting ? 50 : 90;
    const pause = deleting ? 0 : 1800;

    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && display === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplay(deleting ? display.slice(0, -1) : current.slice(0, display.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [display, deleting, index, words]);

  return (
    <span style={{ color: "#6366F1" }}>
      {display}
      <span
        className="inline-block w-0.5 h-6 ml-0.5 align-middle"
        style={{
          backgroundColor: "#6366F1",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}

// ── Main Hero Component ───────────────────────────────────────────────────────
export function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById("projects");
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -72, duration: 1.2 });
      } else {
        const offset = 72;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
      }
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -72, duration: 1.2 });
      } else {
        const offset = 72;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#09090B" }}
    >
      {/* Background canvas */}
      <div className="absolute inset-0">
        <TechCanvas />
      </div>

      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16 md:pt-0 md:pb-0">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-8 sm:mb-10"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="pulse-dot" />
          <span className="text-[11px] sm:text-xs font-medium text-[#A1A1AA]">
            Available for full-time &amp; remote opportunities
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 sm:mb-6"
        >
          <h1
            className="font-bold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(1.95rem, 5.5vw, 4.75rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
            }}
          >
            <span className="sr-only">Oussema Ben Yahia — Full-Stack Developer &amp; Software Engineer based in Tunisia. </span>
            <span className="block text-white mb-1.5 sm:mb-2">I BUILD DIGITAL PRODUCTS</span>
            <span className="block text-white mb-1.5 sm:mb-2">THAT SOLVE</span>
            <span className="block" style={{ color: "#6366F1" }}>
              REAL PROBLEMS.
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#71717A] mb-3 sm:mb-4 px-2"
          style={{ fontSize: "clamp(0.925rem, 2vw, 1.2rem)", lineHeight: 1.65 }}
        >
          Full-Stack Developer crafting scalable web applications, SaaS platforms,
          and intelligent digital solutions.
        </motion.p>

        {/* Identity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-xs sm:text-sm font-medium text-[#52525B]">
            Oussema Ben Yahia &mdash;{" "}
            <Typewriter
              words={["Full-Stack Developer", "React & Next.js Engineer", "SaaS Builder", "API Architect"]}
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-12 w-full max-w-sm sm:max-w-none mx-auto"
        >
          <button
            onClick={scrollToWork}
            data-cursor="explore"
            data-cursor-label="EXPLORE"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              boxShadow: "0 0 32px rgba(99,102,241,0.3)",
            }}
          >
            View Selected Work
            <ArrowDown className="w-4 h-4" />
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            data-cursor-label="OPEN"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#A1A1AA] hover:text-white transition-all cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </motion.div>

        {/* Social Links & Get In Touch — Hidden on mobile as requested */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden sm:flex items-center justify-center gap-3"
        >
          {[
            {
              href: "https://github.com/Oussema-BY",
              icon: <Github className="w-4 h-4" />,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/oussema-ben-yahia/",
              icon: <Linkedin className="w-4 h-4" />,
              label: "LinkedIn",
            },
            {
              href: "mailto:oussemabenyahia89@gmail.com",
              icon: <Mail className="w-4 h-4" />,
              label: "Email",
            },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#71717A] hover:text-white transition-all hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {icon}
            </a>
          ))}

          <div
            className="w-px h-5 mx-1"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          />

          <button
            onClick={scrollToContact}
            className="text-xs font-medium text-[#52525B] hover:text-[#A1A1AA] transition-colors cursor-pointer"
          >
            Get in touch →
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator — Hidden on mobile as requested */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#3F3F46]">
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="absolute top-0 w-full"
            style={{ backgroundColor: "#6366F1", height: "40%" }}
            animate={{ y: ["0%", "150%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

