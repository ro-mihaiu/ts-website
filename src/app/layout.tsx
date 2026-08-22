import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theysix.ro-mihaiu.xyz"),
  title: "TheySix | Minecraft Java & Bedrock Farm Schematics & Downloads",
  description:
    "Official website of TheySix. Explore 500+ high-efficiency Minecraft Java and Bedrock farm designs, schematics (.litematic), world downloads, and video tutorials.",
  keywords: [
    "TheySix",
    "Minecraft Farms",
    "Java Farms",
    "Bedrock Farms",
    "Litematica Schematics",
    "Minecraft World Download",
    "Gunpowder Farm",
    "Iron Farm",
    "Gold Farm",
    "Raid Farm"
  ],
  authors: [{ name: "TheySix" }],
  openGraph: {
    title: "TheySix - Minecraft Farm Vault",
    description: "Download high-efficiency Minecraft Java & Bedrock farm schematics and world saves.",
    url: "https://theysix.ro-mihaiu.xyz",
    siteName: "TheySix",
    images: [
      {
        url: "/logo.gif",
        width: 400,
        height: 400,
        alt: "TheySix Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo.gif",
    shortcut: "/logo.gif",
    apple: "/logo.gif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0e14] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
