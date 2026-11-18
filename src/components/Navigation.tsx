"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "expertise", label: "Expertise" },
  { href: "projects", label: "Projects" },
  { href: "github", label: "GitHub" },
  { href: "contact", label: "Contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = React.useState("home");
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Track scroll for nav background
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section with IntersectionObserver
  React.useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href)).filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -72, duration: 1.2 });
      } else {
        const offset = 72;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? "rgba(9,9,11,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 group"
              aria-label="Go to top"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #38BDF8, #0284C7)",
                  boxShadow: "0 0 16px rgba(56,189,248,0.3)",
                }}
              >
                OBY
              </div>
              <span
                className="text-sm font-semibold hidden sm:block"
                style={{ color: "#FAFAFA", letterSpacing: "-0.01em" }}
              >
                Oussema Ben Yahia
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`nav-link ${activeSection === item.href ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/Oussema-BY"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/oussema-ben-yahia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #38BDF8, #0284C7)",
                  boxShadow: "0 0 20px rgba(56,189,248,0.25)",
                }}
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: "64px" }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(9,9,11,0.97)", backdropFilter: "blur(16px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 p-6 pt-8">
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(item.href)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      activeSection === item.href
                        ? "text-white bg-white/8"
                        : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #38BDF8, #0284C7)" }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Oussema-BY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/oussema-ben-yahia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:oussemabenyahia89@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

