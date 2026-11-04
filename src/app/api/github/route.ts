import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Oussema-BY";

// ── Strict Allowlist: ONLY these 6 repositories are permitted ─────────────────
const ALLOWED_REPOS = [
  "TuniRH",
  "Escalier-Consulting",
  "portfolio",
  "manifacturetricotage-test",
  "cabine_medical",
  "EXTEL",
] as const;

// ── Curated fallback metadata for the 6 approved repositories ──────────────────
const REPO_FALLBACKS: Record<
  string,
  {
    name: string;
    description: string;
    language: string;
    html_url: string;
  }
> = {
  tunirh: {
    name: "TuniRH",
    description:
      "AI-powered HR and recruitment platform featuring automated CV analysis, candidate matching pipelines, and workflow automation.",
    language: "TypeScript",
    html_url: `https://github.com/${GITHUB_USERNAME}/TuniRH`,
  },
  "escalier-consulting": {
    name: "Escalier-Consulting",
    description:
      "Corporate web platform for L'Escalier Consulting with dynamic service showcases, protected admin portal, and client pipeline management.",
    language: "TypeScript",
    html_url: `https://github.com/${GITHUB_USERNAME}/Escalier-Consulting`,
  },
  portfolio: {
    name: "portfolio",
    description:
      "Personal developer portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.",
    language: "TypeScript",
    html_url: `https://github.com/${GITHUB_USERNAME}/portfolio`,
  },
  "manifacturetricotage-test": {
    name: "manifacturetricotage-test",
    description:
      "Modern textile manufacturer showcase and product catalog platform with interactive fabric collections and buyer inquiry pipelines.",
    language: "TypeScript",
    html_url: `https://github.com/${GITHUB_USERNAME}/manifacturetricotage-test`,
  },
  cabine_medical: {
    name: "cabine_medical",
    description:
      "Medical clinic and practice management web application for patient records, appointment scheduling, and clinical workflows.",
    language: "TypeScript",
    html_url: `https://github.com/${GITHUB_USERNAME}/cabine_medical`,
  },
  extel: {
    name: "EXTEL",
    description:
      "Official corporate web platform for Extel Tunisie, featuring digital services, enterprise solutions, and dynamic inquiry pipelines.",
    language: "TypeScript",
    html_url: `https://github.com/${GITHUB_USERNAME}/EXTEL`,
  },
};

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
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

interface GitHubData {
  user: GitHubUser;
  contributions: {
    totalContributions: number;
    weeks: ContributionWeek[];
  } | null;
  repos: GitHubRepo[];
  error?: string;
}

function getGitHubToken(): string {
  return (
    process.env.GITHUB_TOKEN ||
    process.env["process.env.GITHUB_TOKEN"] ||
    ""
  ).trim();
}

function getHeaders(): HeadersInit {
  const token = getGitHubToken();
  return {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-site",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return res.json();
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const headers = getHeaders();
  const token = getGitHubToken();
  const reposMap = new Map<string, GitHubRepo>();

  // 1. Fetch authenticated user repos (includes private & collaborator repos)
  if (token) {
    try {
      const res = await fetch(
        `https://api.github.com/user/repos?per_page=100&affiliation=owner,collaborator,organization_member&visibility=all&sort=updated`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const data: GitHubRepo[] = await res.json();
        if (Array.isArray(data)) {
          for (const repo of data) {
            reposMap.set(repo.name.toLowerCase(), repo);
          }
        }
      }
    } catch (e) {
      console.warn("[github] /user/repos fetch error:", e);
    }
  }

  // 2. Fetch public user repos
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );
    if (res.ok) {
      const data: GitHubRepo[] = await res.json();
      if (Array.isArray(data)) {
        for (const repo of data) {
          if (!reposMap.has(repo.name.toLowerCase())) {
            reposMap.set(repo.name.toLowerCase(), repo);
          }
        }
      }
    }
  } catch (e) {
    console.warn("[github] /users/repos fetch error:", e);
  }

  // 3. For any allowed repo not in list, attempt direct fetch
  await Promise.allSettled(
    ALLOWED_REPOS.map(async (repoName) => {
      const key = repoName.toLowerCase();
      if (reposMap.has(key)) return;
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`,
          {
            headers,
            next: { revalidate: 3600 },
          }
        );
        if (res.ok) {
          const repo: GitHubRepo = await res.json();
          reposMap.set(key, repo);
        }
      } catch {
        // Handled gracefully below
      }
    })
  );

  // 4. Build strictly the 6 allowed repos in exact requested order
  const filteredRepos: GitHubRepo[] = [];
  const now = new Date().toISOString();

  for (let i = 0; i < ALLOWED_REPOS.length; i++) {
    const targetName = ALLOWED_REPOS[i];
    const key = targetName.toLowerCase();
    const liveRepo = reposMap.get(key);
    const fallback = REPO_FALLBACKS[key];

    if (liveRepo) {
      filteredRepos.push({
        id: liveRepo.id,
        name: liveRepo.name,
        full_name: liveRepo.full_name,
        description: liveRepo.description || fallback?.description || null,
        html_url: liveRepo.html_url,
        homepage: liveRepo.homepage,
        language: liveRepo.language || fallback?.language || "TypeScript",
        stargazers_count: liveRepo.stargazers_count ?? 0,
        forks_count: liveRepo.forks_count ?? 0,
        updated_at: liveRepo.updated_at || now,
        topics: liveRepo.topics || [],
        fork: liveRepo.fork ?? false,
      });
    } else if (fallback) {
      // Approved allowlisted repo fallback
      filteredRepos.push({
        id: 900000 + i,
        name: fallback.name,
        full_name: `${GITHUB_USERNAME}/${fallback.name}`,
        description: fallback.description,
        html_url: fallback.html_url,
        homepage: null,
        language: fallback.language,
        stargazers_count: 0,
        forks_count: 0,
        updated_at: now,
        topics: [],
        fork: false,
      });
    }
  }

  return filteredRepos;
}

async function fetchContributions(): Promise<{
  totalContributions: number;
  weeks: ContributionWeek[];
} | null> {
  const token = getGitHubToken();

  // 1. Try GraphQL if GITHUB_TOKEN is available
  if (token) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                  color
                }
              }
            }
          }
        }
      }
    `;

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "portfolio-site",
        },
        body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        const calendar =
          json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          return {
            totalContributions: calendar.totalContributions,
            weeks: calendar.weeks,
          };
        }
      }
    } catch (e) {
      console.warn("[github] GraphQL fetch failed, trying fallback:", e);
    }
  }

  // 2. High-reliability fallback without requiring personal access token
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      {
        headers: { "User-Agent": "portfolio-site" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const days: Array<{ date: string; count: number; level: number }> =
      data.contributions || [];
    if (!days.length) return null;

    const levelMap = [
      "NONE",
      "FIRST_QUARTILE",
      "SECOND_QUARTILE",
      "THIRD_QUARTILE",
      "FOURTH_QUARTILE",
    ];
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    days.forEach((day, index) => {
      currentWeek.push({
        date: day.date,
        contributionCount: day.count,
        contributionLevel: levelMap[day.level] || "NONE",
        color: day.count === 0 ? "#161B22" : "#39D353",
      });

      if (currentWeek.length === 7 || index === days.length - 1) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    });

    return {
      totalContributions:
        data.total?.lastYear ?? days.reduce((a, b) => a + b.count, 0),
      weeks,
    };
  } catch (err) {
    console.error("[github] Fallback contributions failed:", err);
    return null;
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const [user, repos, contributions] = await Promise.allSettled([
      fetchGitHubUser(),
      fetchGitHubRepos(),
      fetchContributions(),
    ]);

    const userData = user.status === "fulfilled" ? user.value : null;
    const reposData = repos.status === "fulfilled" ? repos.value : [];
    const contributionsData =
      contributions.status === "fulfilled" ? contributions.value : null;

    if (!userData) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: 503 }
      );
    }

    const data: GitHubData = {
      user: userData,
      contributions: contributionsData,
      repos: reposData,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[github] Error:", err);
    return NextResponse.json(
      { error: "GitHub API unavailable" },
      { status: 503 }
    );
  }
}
