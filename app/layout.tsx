import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HAHM Lab — Molecular Intelligence for Drug Discovery",
  description: "Hoang Manh Ha's research profile in bioinformatics, cheminformatics, computational drug discovery, and AI for medicinal material quality.",
  keywords: ["Hoang Manh Ha", "HAHM Lab", "cheminformatics", "bioinformatics", "computational drug discovery", "Hanoi University of Pharmacy"],
  authors: [{ name: "Hoang Manh Ha" }],
  openGraph: {
    title: "HAHM Lab — Molecular Intelligence for Drug Discovery",
    description: "Research at the intersection of pharmaceutical science, molecular data, and artificial intelligence.",
    type: "website",
  },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
