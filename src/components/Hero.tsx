"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowDown, Download, ChevronDown, MapPin } from "lucide-react";
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
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, idx) => {
        const pulse = Math.sin(n.pulse) * 0.3 + 0.7;
        const r = n.r * pulse;
        const nodeColor = idx % 2 === 0 ? "56, 189, 248" : "2, 132, 199";

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grad.addColorStop(0, `rgba(${nodeColor}, ${n.opacity * 0.3})`);
        grad.addColorStop(1, `rgba(${nodeColor}, 0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${n.opacity})`;
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



// ── Main Hero Component ───────────────────────────────────────────────────────
export function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
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
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(56,189,248,0.08) 0%, transparent 70%)",
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

        {/* Location / context chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-8 sm:mb-10"
          style={{
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.18)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase"
            style={{ color: "#38BDF8" }}
          >
            <MapPin className="w-3.5 h-3.5" />
            Tunis, TN
          </span>
          <span
            className="w-px h-3"
            style={{ backgroundColor: "rgba(56,189,248,0.3)" }}
          />
          <span className="text-[10px] sm:text-[11px] font-medium text-[#71717A]">
            Open to remote · Full-time
          </span>
        </motion.div>

        {/* Main headline — personal, conversational, human */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mb-5 sm:mb-7"
        >
          <h1
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(2.1rem, 5.8vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            <span className="sr-only">Oussema Ben Yahia — Full-Stack Developer based in Tunisia.</span>

            {/* Line 1: personal name opener */}
            <span className="block text-white mb-2">
              Hey, I&rsquo;m Oussema.
            </span>

            {/* Line 2: the real hook */}
            <span className="block mb-2" style={{ color: "#A1A1AA", fontWeight: 500, fontSize: "clamp(1.1rem, 2.8vw, 2.4rem)", letterSpacing: "-0.02em" }}>
              I turn ideas into{" "}
              <span
                className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] bg-clip-text text-transparent font-bold"
                style={{ fontSize: "inherit" }}
              >
                products that ship.
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline — versatile full-stack software engineer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#71717A] mb-6 sm:mb-8 px-2"
          style={{ fontSize: "clamp(0.925rem, 1.9vw, 1.15rem)", lineHeight: 1.7 }}
        >
          Full-stack software engineer bridging client vision with resilient architecture.
          {" "}From responsive web applications to distributed backends and database design &mdash;
          I build high-performance systems ready for real-world production.
        </motion.p>

        {/* Capability chips — true full-stack versatility */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-9 sm:mb-11 max-w-3xl mx-auto"
        >
          {[
            { label: "Frontend", stack: "React · Next.js · Angular" },
            { label: "Backend", stack: "Node.js · NestJS · Spring Boot" },
            { label: "Database", stack: "PostgreSQL · Supabase · MongoDB" },
            { label: "Architecture", stack: "REST APIs · Scalable Systems" },
          ].map(({ label, stack }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#A1A1AA",
              }}
            >
              <span style={{ color: "#38BDF8", fontWeight: 700 }}>{label}</span>
              <span style={{ color: "#3F3F46" }}>•</span>
              <span style={{ color: "#D4D4D8" }}>{stack}</span>
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-12 w-full max-w-sm sm:max-w-none mx-auto"
        >
          <button
            onClick={scrollToWork}
            data-cursor="explore"
            data-cursor-label="EXPLORE"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #38BDF8, #0284C7)",
              boxShadow: "0 0 32px rgba(56,189,248,0.28)",
            }}
          >
            See What I&apos;ve Built
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
            Grab My Resume
          </a>
        </motion.div>

        {/* Social Links & Get In Touch */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.54 }}
          className="hidden sm:flex items-center justify-center gap-3"
        >
          {[
            { href: "https://github.com/Oussema-BY", icon: <Github className="w-4 h-4" />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/oussema-ben-yahia/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
            { href: "mailto:oussemabenyahia89@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email" },
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
            Let&apos;s talk →
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator — clean chevron */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="hidden md:flex absolute bottom-9 left-1/2 -translate-x-1/2 flex-col items-center gap-1 cursor-pointer group"
        aria-label="Scroll to work"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="w-5 h-5 transition-colors group-hover:text-white"
            style={{ color: "#3F3F46" }}
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}

