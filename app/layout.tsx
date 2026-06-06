import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "Charles Jikeme — Social Media Growth Strategist",
  description:
    "Helping startups and brands grow through audience-focused content strategy, storytelling, trend adaptation, and consistent execution. 800,000+ views generated.",
  keywords: [
    "social media strategist",
    "content creator",
    "growth strategist",
    "TikTok marketing",
    "startup marketing",
    "Port Harcourt",
    "Nigeria",
  ],
  authors: [{ name: "Charles Jikeme" }],
  creator: "Charles Jikeme",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charlesjikeme.com",
    title: "Charles Jikeme — Social Media Growth Strategist",
    description:
      "Building Visibility Through Strategy, Consistency & Audience Psychology. 800,000+ Views Generated.",
    siteName: "Charles Jikeme Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Charles Jikeme — Social Media Growth Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charles Jikeme — Social Media Growth Strategist",
    description:
      "Building Visibility Through Strategy, Consistency & Audience Psychology.",
    images: ["/og-image.jpg"],
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.classList.add(theme);
              } catch(e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
