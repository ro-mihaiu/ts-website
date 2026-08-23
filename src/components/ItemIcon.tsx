"use client";

import React, { useState, useEffect } from "react";

interface ItemIconProps {
  name: string;
  color?: string;
  icon?: string;
  className?: string;
  alt?: string;
}

/**
 * Generate candidate icon paths in `/items/` based on item name
 */
export function getItemIconCandidates(name: string, customIcon?: string): string[] {
  const candidates: string[] = [];

  if (customIcon) {
    if (customIcon.startsWith("/")) {
      candidates.push(customIcon);
    } else {
      candidates.push(`/items/${customIcon}`);
    }
  }

  // Raw cleaned name
  const trimmed = name.trim();

  // Cleaned name removing parenthetical notes like "(Roof)", "(Stone Bricks)", "(Nether Portals)"
  const cleanWithoutParens = trimmed.replace(/\s*\([^)]*\)/g, "").trim();

  // Primary snake_case slug
  const snake = cleanWithoutParens
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  // Kebab case slug
  const kebab = cleanWithoutParens
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Singular version (e.g. "hoppers" -> "hopper", "pistons" -> "piston", "chests" -> "chest")
  const singularSnake = snake.replace(/(?:ies|s)$/i, (match) => {
    if (match.toLowerCase() === "ies") return "y";
    return "";
  });

  if (snake) {
    candidates.push(`/items/${snake}.png`);
    candidates.push(`/items/${snake}.webp`);
    candidates.push(`/items/${snake}.svg`);
  }

  if (singularSnake && singularSnake !== snake) {
    candidates.push(`/items/${singularSnake}.png`);
    candidates.push(`/items/${singularSnake}.webp`);
  }

  if (kebab && kebab !== snake) {
    candidates.push(`/items/${kebab}.png`);
  }

  // Check sub-parts for compound names (e.g., "Oak / Spruce Trapdoors" -> "trapdoors", "trapdoor", "oak_trapdoor")
  const words = cleanWithoutParens.toLowerCase().split(/[\s/&+,]+/);

  // Check key Minecraft nouns
  const keyNouns = [
    "hopper", "chest", "piston", "sticky_piston", "observer", "redstone_dust",
    "redstone", "repeater", "comparator", "dispenser", "dropper", "trapdoor",
    "campfire", "scaffolding", "obsidian", "glass", "smooth_stone", "stone",
    "bed", "water_bucket", "lava_bucket", "slime_block", "honey_block",
    "target_block", "fence", "slab", "brick", "tnt"
  ];

  for (const noun of keyNouns) {
    if (words.some((w) => w.includes(noun.replace(/_/g, "")) || noun.includes(w))) {
      const nounCandidate = `/items/${noun}.png`;
      if (!candidates.includes(nounCandidate)) {
        candidates.push(nounCandidate);
      }
    }
  }

  // Exact name matches as fallbacks
  candidates.push(`/items/${encodeURIComponent(cleanWithoutParens)}.png`);
  candidates.push(`/items/${encodeURIComponent(trimmed)}.png`);

  return candidates;
}

/**
 * ItemIcon component:
 * Loads matching icon from `/items/<item>.png`.
 * Gracefully falls back to a sleek colored block indicator if the icon is not uploaded yet.
 */
export function ItemIcon({
  name,
  color = "#888888",
  icon,
  className = "w-6 h-6",
  alt,
}: ItemIconProps) {
  const candidates = getItemIconCandidates(name, icon);
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCandidateIdx(0);
    setHasFailed(false);
    setIsLoaded(false);
  }, [name, icon]);

  const currentSrc = candidates[candidateIdx] || "";

  const handleError = () => {
    if (candidateIdx + 1 < candidates.length) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setHasFailed(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (hasFailed || !currentSrc) {
    // Fallback: Modern Minecraft color-coded block dot
    return (
      <div
        className={`${className} rounded-md border border-white/20 shadow-sm shrink-0 flex items-center justify-center`}
        style={{ backgroundColor: color }}
        title={name}
      >
        <span className="sr-only">{name}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className} shrink-0 flex items-center justify-center`}>
      {/* Fallback placeholder while loading */}
      {!isLoaded && (
        <div
          className="w-full h-full rounded-md border border-white/10 opacity-60 animate-pulse"
          style={{ backgroundColor: color }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt || name}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full object-contain ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          } transition-all duration-200 [image-rendering:pixelated]`}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
