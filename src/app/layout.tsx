import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const antonSc = localFont({
  src: "../fonts/AntonSC-Regular.ttf",
  variable: "--font-anton-sc",
  weight: "400",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GetCracked.GG — Companion app for League of Legends",
  description:
    "The League companion that doesn't melt your PC. Runes locked in before the loading screen — tierlist, builds, and global profiles in one window.",
  openGraph: {
    title: "GetCracked.GG",
    description:
      "The League companion that doesn't melt your PC. 42 MB at idle, 18 MB installer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${antonSc.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
