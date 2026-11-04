"use client";

import * as React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Experience } from "@/components/Experience";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Portfolio() {
  return (
    <SmoothScroll>
      {/* Custom cursor — hidden on touch devices & respects prefers-reduced-motion */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — Engineering Philosophy / About */}
        <Philosophy />

        {/* 03 — Professional Experience */}
        <Experience />

        {/* 04 — Technical Expertise */}
        <TechStack />

        {/* 05 — Featured Projects */}
        <Projects />

        {/* 06 — GitHub Activity */}
        <GitHubActivity />

        {/* 07 — Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
