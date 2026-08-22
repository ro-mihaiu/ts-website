"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare, Compass, Sparkles, Youtube, Layers, Server, Bot } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "All Farms", icon: Compass },
    { href: "/?category=java", label: "Java Edition", icon: Layers },
    { href: "/?category=bedrock", label: "Bedrock Edition", icon: Sparkles },
    { href: "/server", label: "Minecraft Server", icon: Server },
    { href: "/bot/about", label: "Discord Bot", icon: Bot },
    { href: "/socials", label: "Socials", icon: Youtube },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group-hover:border-cyan-500/60 transition-all shadow-md">
              <Image
                src="/logo.gif"
                alt="TheySix Logo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                TheySix <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-normal">FARMS</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">World & Schematic Vault</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href === "/server" && pathname.startsWith("/server")) || (link.href === "/bot/about" && pathname.startsWith("/bot"));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Discord Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://discord.gg/theysix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold transition-all shadow-md shadow-[#5865F2]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Discord</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href === "/server" && pathname.startsWith("/server")) || (link.href === "/bot/about" && pathname.startsWith("/bot"));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800 text-cyan-400 border border-slate-700"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href="https://discord.gg/theysix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#5865F2] text-white font-medium shadow"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              Join our Discord Server
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
