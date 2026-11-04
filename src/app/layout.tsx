import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://oussemabenyahia.vercel.app"),
  title: "Oussema Ben Yahia | Full-Stack Developer",
  description:
    "Full-Stack Developer crafting scalable web applications, SaaS platforms, and intelligent digital solutions. Based in Tunis, Tunisia.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "SaaS",
    "Web Development",
    "Tunisia",
    "Oussema Ben Yahia",
  ],
  authors: [{ name: "Oussema Ben Yahia" }],
  creator: "Oussema Ben Yahia",
  robots: "index, follow",
  alternates: {
    canonical: "https://oussemabenyahia.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oussemabenyahia.vercel.app/",
    title: "Oussema Ben Yahia | Full-Stack Developer",
    description:
      "Full-Stack Developer crafting scalable web applications, SaaS platforms, and intelligent digital solutions.",
    siteName: "Oussema Ben Yahia Portfolio",
    images: [
      {
        url: "/oussema.JPG",
        width: 1200,
        height: 630,
        alt: "Oussema Ben Yahia — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussema Ben Yahia | Full-Stack Developer",
    description:
      "Full-Stack Developer crafting scalable web applications, SaaS platforms, and intelligent digital solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="rlJZY3pbyXPsYR0iHzrN1nanGqiqWp00KsnArsX4Exc"
        />
        <meta name="author" content="Oussema Ben Yahia" />
        <meta name="theme-color" content="#09090B" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
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
