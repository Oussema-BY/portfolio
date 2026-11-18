import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const SITE_URL = "https://oussemabenyahia.vercel.app";
const FULL_NAME = "Oussema Ben Yahia";
const TITLE = `${FULL_NAME} | Full-Stack Developer & Software Engineer`;
const DESCRIPTION =
  "Oussema Ben Yahia is a Full-Stack Developer and Software Engineer based in Tunis, Tunisia. Specializing in React, Next.js, TypeScript, Node.js, Supabase, and AI-integrated web applications.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },

  description: DESCRIPTION,

  keywords: [
    "Oussema Ben Yahia",
    "Oussema Ben Yahia Developer",
    "Oussema Ben Yahia Full Stack Developer",
    "Full-Stack Developer Tunisia",
    "Software Engineer Tunisia",
    "Next.js Developer Tunisia",
    "React Developer Tunisia",
    "Freelance Web Developer Tunisia",
    "Next.js Supabase Developer",
    "AI Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Supabase",
    "SaaS Developer",
    "Web Developer Tunis",
    "Full-Stack Engineer",
  ],

  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: `${FULL_NAME} — Portfolio`,
    images: [
      {
        url: `${SITE_URL}/oussema.JPG`,
        width: 800,
        height: 800,
        alt: `${FULL_NAME} — Full-Stack Developer & Software Engineer based in Tunisia`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/oussema.JPG`],
    creator: "@OussemaBY",
  },

  verification: {
    google: "rlJZY3pbyXPsYR0iHzrN1nanGqiqWp00KsnArsX4Exc",
  },

  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: FULL_NAME,
      givenName: "Oussema",
      familyName: "Ben Yahia",
      url: SITE_URL,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/oussema.JPG`,
        width: 400,
        height: 400,
      },
      jobTitle: "Full-Stack Developer & Software Engineer",
      description:
        "Full-Stack Developer based in Tunis, Tunisia. Building scalable web applications, SaaS platforms, and AI-integrated digital solutions using React, Next.js, TypeScript, and Node.js.",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "Supabase",
        "Angular",
        "Spring Boot",
        "REST APIs",
        "Full-Stack Development",
        "SaaS Development",
        "AI Integration",
        "Web Application Development",
      ],
      sameAs: [
        "https://github.com/Oussema-BY",
        "https://www.linkedin.com/in/oussema-ben-yahia/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tunis",
        addressCountry: "TN",
      },
      email: "oussemabenyahia89@gmail.com",
      nationality: {
        "@type": "Country",
        name: "Tunisia",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University — Engineering degree in AI & Data Science",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${FULL_NAME} — Full-Stack Developer Portfolio`,
      description: DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: `${FULL_NAME} — Full-Stack Developer & Software Engineer`,
      description: DESCRIPTION,
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/#project-extel`,
      name: "Extel Official Website",
      description:
        "Official corporate website for Extel Tunisie — showcasing the company's services, expertise, and digital solutions.",
      url: "https://extel.com.tn",
      creator: { "@id": `${SITE_URL}/#person` },
      programmingLanguage: ["TypeScript", "Next.js", "React"],
    },
    {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/#project-manufacture`,
      name: "Manufacture Tricotage",
      description:
        "Modern textile manufacturer showcase and product catalog platform with interactive fabric collections.",
      url: "https://manifacturetricotage.vercel.app/",
      creator: { "@id": `${SITE_URL}/#person` },
      programmingLanguage: ["TypeScript", "Next.js", "React"],
    },
    {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/#project-escalier`,
      name: "L'Escalier Consulting",
      description:
        "Corporate web platform for L'Escalier Consulting with dynamic service showcases and client pipeline management.",
      url: "https://escalierconsulting.vercel.app",
      creator: { "@id": `${SITE_URL}/#person` },
      programmingLanguage: ["TypeScript", "Next.js", "React"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="author" content={FULL_NAME} />
        <meta name="theme-color" content="#09090B" />
        <meta name="color-scheme" content="dark" />

        {/* Geo / regional targeting */}
        <meta name="geo.region" content="TN" />
        <meta name="geo.placename" content="Tunis, Tunisia" />
        <meta name="language" content="English" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F7Y0BBH990"
          strategy="afterInteractive"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F7Y0BBH990', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
