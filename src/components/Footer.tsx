"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Download, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | string, options?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.3 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="py-12 px-6"
      style={{
        backgroundColor: "#07070A",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #38BDF8, #0284C7)",
                }}
              >
                OBY
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "#FAFAFA" }}
              >
                Oussema Ben Yahia
              </span>
            </div>
            <p className="text-xs" style={{ color: "#3F3F46" }}>
              Full-Stack Developer · Tunis, Tunisia
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Oussema-BY"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-white transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/oussema-ben-yahia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-white transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:oussemabenyahia89@gmail.com"
              aria-label="Email"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-white transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-white transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Download className="w-3.5 h-3.5" />
            </a>

            <div
              className="w-px h-5 mx-1"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-white transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            color: "#3F3F46",
          }}
        >
          <p>© 2026 Oussema Ben Yahia. All rights reserved.</p>
          <p>Built with Next.js, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

