import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: "Oussema Ben Yahia | Portfolio",
  description: "Official portfolio website of Oussema Ben Yahia, software engineer Student and web developer.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio-delta-blue-uwlp669nrl.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="rlJZY3pbyXPsYR0iHzrN1nanGqiqWp00KsnArsX4Exc" />
        <meta name="author" content="Oussema Ben Yahia" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
