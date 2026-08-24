"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare, Compass, Youtube, Box, Server, Bot, Hammer, BookOpen, ChevronDown } from "lucide-react";
import { JavaBrandIcon } from "@/components/JavaBrandIcon";

function JavaLogo({ className }: { className: string }) {
  return <JavaBrandIcon size={20} className={className} />;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileFarmsOpen, setIsMobileFarmsOpen] = useState(false);
  const [isMobileExtrasOpen, setIsMobileExtrasOpen] = useState(false);
  const pathname = usePathname();

  const farmLinks = [
    { href: "/?category=java#farms", label: "Java Edition", icon: JavaLogo },
    { href: "/?category=bedrock#farms", label: "Bedrock Edition", icon: Box },
    { href: "/?category=build#farms", label: "Builds", icon: Hammer },
    { href: "/#farms", label: "Both", icon: Compass },
  ];

  const extraLinks = [
    { href: "/server", label: "Minecraft Server", icon: Server },
    { href: "/bot/about", label: "Discord Bot", icon: Bot },
  ];

  const baseLinks = [
    { href: "/socials", label: "Socials", icon: Youtube },
    { href: "/about", label: "About", icon: BookOpen },
  ];
  const socialsLink = baseLinks[0];
  const aboutLink = baseLinks[1];

  const isFarmsActive = pathname === "/";
  const isExtrasActive = pathname.startsWith("/server") || pathname.startsWith("/bot");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group-hover:border-cyan-500/60 transition-all shadow-md">
              <Image src="/logo.gif" alt="TheySix Logo" fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                TheySix <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-normal">FARMS</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">World & Schematic Vault</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isFarmsActive
                    ? "bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Compass className="w-4 h-4" />
                All Farms
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-700 bg-slate-950/95 p-2 opacity-0 translate-y-1 transition-all duration-200 shadow-xl shadow-black/40 backdrop-blur-xl group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                {farmLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isExtrasActive
                    ? "bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Server className="w-4 h-4" />
                Extras
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full mt-2 w-60 rounded-xl border border-slate-700 bg-slate-950/95 p-2 opacity-0 translate-y-1 transition-all duration-200 shadow-xl shadow-black/40 backdrop-blur-xl group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                {extraLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = (link.href === "/server" && pathname.startsWith("/server")) || (link.href === "/bot/about" && pathname.startsWith("/bot"));
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? "bg-slate-800 text-cyan-400" : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {baseLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
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
              onClick={() => {
                const nextOpen = !isOpen;
                setIsOpen(nextOpen);
                if (!nextOpen) {
                  setIsMobileFarmsOpen(false);
                  setIsMobileExtrasOpen(false);
                }
              }}
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
        <>
          <button aria-label="Close navigation menu" onClick={() => setIsOpen(false)} className="fixed inset-0 top-16 z-40 bg-black/40 lg:hidden" />
          <div className="absolute right-4 top-[calc(100%+0.5rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-700 bg-slate-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl lg:hidden">
          <div className="mt-1">
            <button
              type="button"
              onClick={() => setIsMobileFarmsOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isFarmsActive ? "bg-slate-800 text-cyan-400 border border-slate-700" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-3">
                <Compass className="w-5 h-5" />
                All Farms
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isMobileFarmsOpen ? "rotate-180" : ""}`} />
            </button>

            {isMobileFarmsOpen && (
              <div className="mt-1 ml-2 border-l border-slate-800 pl-2">
                {farmLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileFarmsOpen(false);
                        setIsMobileExtrasOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-1">
            <button
              type="button"
              onClick={() => setIsMobileExtrasOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isExtrasActive ? "bg-slate-800 text-cyan-400 border border-slate-700" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-3">
                <Server className="w-5 h-5" />
                Extras
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isMobileExtrasOpen ? "rotate-180" : ""}`} />
            </button>

            {isMobileExtrasOpen && (
              <div className="mt-1 ml-2 border-l border-slate-800 pl-2">
                {extraLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = (link.href === "/server" && pathname.startsWith("/server")) || (link.href === "/bot/about" && pathname.startsWith("/bot"));
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileFarmsOpen(false);
                        setIsMobileExtrasOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-slate-800 text-cyan-400" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href={socialsLink.href}
            onClick={() => {
              setIsOpen(false);
              setIsMobileFarmsOpen(false);
              setIsMobileExtrasOpen(false);
            }}
            className={`mt-1 flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
              pathname === socialsLink.href
                ? "bg-slate-800 text-cyan-400 border border-slate-700"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Youtube className="w-5 h-5" />
            {socialsLink.label}
          </Link>

          <Link
            href={aboutLink.href}
            onClick={() => {
              setIsOpen(false);
              setIsMobileFarmsOpen(false);
              setIsMobileExtrasOpen(false);
            }}
            className={`mt-1 flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
              pathname === aboutLink.href
                ? "bg-slate-800 text-cyan-400 border border-slate-700"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            {aboutLink.label}
          </Link>

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
        </>
      )}
    </header>
  );
}
