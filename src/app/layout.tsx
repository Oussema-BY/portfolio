import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: "Oussema Ben Yahia | Portfolio",
  description: "Official website of Oussema Ben Yahia, software engineer Student and web developer.",
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

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F7Y0BBH990"></script>
        <script
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
