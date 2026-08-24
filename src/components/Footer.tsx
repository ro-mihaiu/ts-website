import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Youtube, MessageSquare, Shield, FileText, Cookie, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                <Image src="/logo.gif" alt="TheySix" fill className="object-cover" unoptimized />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">TheySix</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your primary hub for high-efficiency Minecraft Java & Bedrock farm schematics, world downloads, and video tutorials.
            </p>
            <a href="mailto:theysixyt.business@gmail.com" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-400 transition-colors">
              theysixyt.business@gmail.com
            </a>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://www.youtube.com/@TheySix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Java"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-red-500 transition-colors border border-slate-800"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/theysix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-[#5865F2] transition-colors border border-slate-800"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile + Tablet Accordions */}
          <div className="lg:hidden space-y-3">
            <details className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <summary className="cursor-pointer list-none text-xs font-bold text-slate-200 tracking-wider uppercase font-mono flex items-center justify-between">
                <span>Farms & Community</span>
                <span className="text-slate-500 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <ul className="space-y-2 text-sm mt-3">
                <li>
                  <Link href="/?category=java" className="hover:text-[#9fff99] transition-colors">
                    Java Edition Farms
                  </Link>
                </li>
                <li>
                  <Link href="/?category=bedrock" className="hover:text-slate-200 transition-colors">
                    Bedrock Edition Farms
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-cyan-400 transition-colors">
                    About & Contact
                  </Link>
                </li>
                <li>
                  <Link href="/server/about" className="hover:text-amber-400 transition-colors">
                    Minecraft Server
                  </Link>
                </li>
                <li>
                  <Link href="/bot/about" className="hover:text-cyan-400 transition-colors">
                    TheySix Helper (Discord Bot)
                  </Link>
                </li>
              </ul>
            </details>

            <details className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <summary className="cursor-pointer list-none text-xs font-bold text-slate-200 tracking-wider uppercase font-mono flex items-center justify-between">
                <span>Socials</span>
                <span className="text-slate-500 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <ul className="space-y-2 text-sm mt-3">
                <li>
                  <a
                    href="https://www.youtube.com/@TheySix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-red-400 transition-colors"
                  >
                    <span>YouTube (Java)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@TheySixMC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-red-400 transition-colors"
                  >
                    <span>YouTube (Bedrock)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@TheySixCreations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-amber-400 transition-colors"
                  >
                    <span>YouTube (Minecraft Builds)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/theysix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-[#5865F2] transition-colors"
                  >
                    <span>Discord Community</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/TheySixYT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-sky-400 transition-colors"
                  >
                    <span>X (Twitter)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/theysixyt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-pink-400 transition-colors"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              </ul>
            </details>
          </div>

          {/* Editions & Navigation */}
          <div className="hidden lg:block space-y-3">
            <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">Farms & Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=java" className="hover:text-[#9fff99] transition-colors">
                  Java Edition Farms
                </Link>
              </li>
              <li>
                <Link href="/?category=bedrock" className="hover:text-slate-200 transition-colors">
                  Bedrock Edition Farms
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About & Contact
                </Link>
              </li>
              <li>
                <Link href="/server/about" className="hover:text-amber-400 transition-colors">
                  Minecraft Server
                </Link>
              </li>
              <li>
                <Link href="/bot/about" className="hover:text-cyan-400 transition-colors">
                  TheySix Helper (Discord Bot)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Bot Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">Legal & Bot Docs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cookies" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Cookie className="w-3.5 h-3.5" /> Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/tos" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <FileText className="w-3.5 h-3.5" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Shield className="w-3.5 h-3.5" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/bot/tos" className="hover:text-slate-300 transition-colors">
                  Bot Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/bot/privacy" className="hover:text-slate-300 transition-colors">
                  Bot Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Col */}
          <div className="hidden lg:block space-y-3">
            <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">TheySix Socials</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@TheySix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-red-400 transition-colors"
                >
                  <span>YouTube (Java)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@TheySixMC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-red-400 transition-colors"
                >
                  <span>YouTube (Bedrock)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@TheySixCreations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-amber-400 transition-colors"
                >
                  <span>YouTube (Minecraft Builds)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/theysix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-[#5865F2] transition-colors"
                >
                  <span>Discord Community</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/TheySixYT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-sky-400 transition-colors"
                >
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/theysixyt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-pink-400 transition-colors"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TheySix. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl text-slate-400">
            NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
          </p>
        </div>
      </div>
    </footer>
  );
}

