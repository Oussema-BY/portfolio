"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, AlertCircle, Star, GitFork, Code, Lock } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

interface GitHubData {
  user: GitHubUser;
  contributions: { totalContributions: number; weeks: ContributionWeek[] } | null;
  repos: GitHubRepo[];
  error?: string;
}

// ── Heat level helper ─────────────────────────────────────────────────────────
function getLevelClass(level: string, count: number): string {
  if (count === 0) return "heat-0";
  switch (level) {
    case "FIRST_QUARTILE":
      return "heat-1";
    case "SECOND_QUARTILE":
      return "heat-2";
    case "THIRD_QUARTILE":
      return "heat-3";
    case "FOURTH_QUARTILE":
      return "heat-4";
    default:
      if (count >= 1 && count <= 3) return "heat-1";
      if (count >= 4 && count <= 7) return "heat-2";
      if (count >= 8 && count <= 12) return "heat-3";
      return "heat-4";
  }
}

// ── Language Color Map ────────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  Java: "#B07219",
  PHP: "#4F5D95",
  CSS: "#563D7C",
  HTML: "#E34C26",
  Vue: "#4FC08D",
  Rust: "#DEA584",
  Go: "#00ADD8",
  "C++": "#F34B7D",
  C: "#555555",
  Shell: "#89E051",
};

// ── Heatmap Component ─────────────────────────────────────────────────────────
function ContributionHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const [tooltip, setTooltip] = React.useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Build month labels
  const months: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, wi) => {
    const day = week.contributionDays[0];
    if (!day) return;
    const d = new Date(day.date);
    const label = d.toLocaleString("en-US", { month: "short" });
    if (wi === 0 || months[months.length - 1]?.label !== label) {
      months.push({ label, weekIndex: wi });
    }
  });

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="relative">
      {/* Mobile scroll hint */}
      <div className="flex md:hidden items-center justify-between text-[11px] text-[#52525B] mb-2 px-1">
        <span>Contributions Heatmap</span>
        <span>Swipe horizontally →</span>
      </div>

      <div className="overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
        <div className="relative w-full">
          {/* Month labels */}
          <div className="relative h-4 mb-1 ml-7">
            {months.map(({ label, weekIndex }) => (
              <span
                key={`${label}-${weekIndex}`}
                className="text-[9px] text-[#52525B] select-none absolute"
                style={{
                  left: `${weekIndex * 17}px`,
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-[4px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[4px] mr-1 mt-0 flex-shrink-0">
              {WEEKDAYS.map((day, di) => (
                <div
                  key={day}
                  className="text-[9px] select-none"
                  style={{
                    height: "13px",
                    lineHeight: "13px",
                    color: di % 2 === 1 ? "#52525B" : "transparent",
                    width: "22px",
                    textAlign: "right",
                    paddingRight: "2px",
                  }}
                >
                  {di % 2 === 1 ? day : ""}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[4px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[4px]">
                  {/* Pad missing days at start of first week */}
                  {wi === 0 &&
                    Array.from({
                      length: 7 - week.contributionDays.length,
                    }).map((_, pi) => (
                      <div key={`pad-${pi}`} className="w-[13px] h-[13px]" />
                    ))}
                  {week.contributionDays.map((day) => {
                    const dateFormatted = new Date(day.date).toLocaleDateString(
                      "en-US",
                      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
                    );
                    const tooltipText =
                      day.contributionCount === 0
                        ? `No contributions on ${dateFormatted}`
                        : `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${dateFormatted}`;

                    return (
                      <div
                        key={day.date}
                        className={`heatmap-cell heatmap-cell-lg ${getLevelClass(day.contributionLevel, day.contributionCount)}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget
                            .closest(".relative")
                            ?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              text: tooltipText,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top,
                            });
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label={tooltipText}
                        role="gridcell"
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="tooltip pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[10px] text-[#52525B]">Less</span>
        {["heat-0", "heat-1", "heat-2", "heat-3", "heat-4"].map((cls) => (
          <div key={cls} className={`heatmap-cell ${cls}`} style={{ cursor: "default" }} />
        ))}
        <span className="text-[10px] text-[#52525B]">More</span>
      </div>
    </div>
  );
}

// ── Repo Card ─────────────────────────────────────────────────────────────────
function RepoCard({ repo }: { repo: GitHubRepo }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="block p-4 rounded-xl transition-all cursor-default"
      style={{
        backgroundColor: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(99,102,241,0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.025)";
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-white truncate">
          {repo.name}
        </h4>
        <span title="Private repository" className="flex items-center">
          <Lock className="w-3.5 h-3.5 flex-shrink-0 text-[#52525B]" />
        </span>
      </div>
      <p
        className="text-xs leading-relaxed mb-3 line-clamp-2"
        style={{ color: "#71717A" }}
      >
        {repo.description || "Production engineering repository and source architecture."}
      </p>
      <div className="flex items-center gap-3">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "#71717A" }}>
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  LANG_COLORS[repo.language] ?? "#6366F1",
              }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs" style={{ color: "#71717A" }}>
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "#71717A" }}>
          <GitFork className="w-3 h-3" />
          {repo.forks_count}
        </span>
        <span className="ml-auto text-xs" style={{ color: "#52525B" }}>
          {updatedDate}
        </span>
      </div>
    </div>
  );
}

// ── Skeleton Loader ───────────────────────────────────────────────────────────
function HeatmapSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex gap-[3px]">
          {Array.from({ length: 53 }).map((_, j) => (
            <div key={j} className="skeleton w-[10px] h-[10px] rounded-sm" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Section Reveal Hook ───────────────────────────────────────────────────────
function useSectionReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

// ── Main Component ────────────────────────────────────────────────────────────
export function GitHubActivity() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const visible = useSectionReveal(sectionRef);
  const [data, setData] = React.useState<GitHubData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!visible) return;
    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/github", { cache: "no-store" });
        if (!res.ok) throw new Error("API error");
        const json: GitHubData = await res.json();
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [visible]);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="py-28 px-6"
      style={{ backgroundColor: "#0C0C0E" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: "#6366F1" }} />
            <span className="text-label" style={{ color: "#6366F1" }}>
              GitHub Activity
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2
                className="font-bold text-white mb-3"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                Code Is Built One
                <br />
                Commit At A Time.
              </h2>
              <p style={{ color: "#71717A", fontSize: "1rem", lineHeight: 1.7 }}>
                Real activity from{" "}
                <a
                  href="https://github.com/Oussema-BY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                  style={{ color: "#6366F1" }}
                >
                  github.com/Oussema-BY
                </a>
              </p>
            </div>
            <a
              href="https://github.com/Oussema-BY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white transition-all flex-shrink-0"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Github className="w-4 h-4" />
              View Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: "#111113",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "#52525B" }} />
            <p className="text-sm font-medium text-white mb-1">
              GitHub activity temporarily unavailable
            </p>
            <p className="text-xs" style={{ color: "#52525B" }}>
              The GitHub API is currently unreachable. Please visit{" "}
              <a
                href="https://github.com/Oussema-BY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                github.com/Oussema-BY
              </a>{" "}
              directly.
            </p>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#111113",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl p-4" style={{ backgroundColor: "#18181B" }}>
                  <div className="skeleton h-7 w-16 mb-2 rounded" />
                  <div className="skeleton h-3 w-24 rounded" />
                </div>
              ))}
            </div>
            <HeatmapSkeleton />
          </div>
        )}

        {/* Data loaded */}
        {data && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {data.contributions && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    backgroundColor: "#111113",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: "#6366F1" }}
                  >
                    {data.contributions.totalContributions.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#52525B]">Total contributions</div>
                </div>
              )}
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#111113",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {data.user.public_repos}
                </div>
                <div className="text-xs text-[#52525B]">Public repositories</div>
              </div>
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#111113",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {data.user.followers}
                </div>
                <div className="text-xs text-[#52525B]">Followers</div>
              </div>
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#111113",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {data.repos.reduce((acc, r) => acc + r.stargazers_count, 0)}
                </div>
                <div className="text-xs text-[#52525B]">Stars received</div>
              </div>
            </div>

            {/* Heatmap */}
            {data.contributions ? (
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  backgroundColor: "#111113",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold text-white">
                    Contribution Calendar
                  </h3>
                  <span className="text-xs text-[#52525B]">Last 12 months</span>
                </div>
                <ContributionHeatmap weeks={data.contributions.weeks} />
              </div>
            ) : (
              <div
                className="rounded-2xl p-6 mb-6 text-center"
                style={{
                  backgroundColor: "#111113",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-sm" style={{ color: "#52525B" }}>
                  Contribution calendar requires GitHub authentication.{" "}
                  <a
                    href="https://github.com/Oussema-BY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6366F1] hover:underline"
                  >
                    View on GitHub ↗
                  </a>
                </p>
              </div>
            )}

            {/* Repos - Strict Allowlist and Exact Order */}
            {(() => {
              const ALLOWED_REPOS = [
                "TuniRH",
                "Escalier-Consulting",
                "portfolio",
                "manifacturetricotage-test",
                "cabine_medical",
                "EXTEL",
              ] as const;

              const displayedRepos = ALLOWED_REPOS.map((target) =>
                data.repos.find((r) => r.name.toLowerCase() === target.toLowerCase())
              ).filter((r): r is GitHubRepo => Boolean(r));

              if (displayedRepos.length === 0) return null;

              return (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Featured Repositories
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {displayedRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </section>
  );
}

