"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Layers,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Box,
  Eye,
  Sliders,
  Sparkles,
  Info
} from "lucide-react";
import type { FarmWithMetadata } from "@/types/farm";

export interface SchematicViewer3DProps {
  farm: FarmWithMetadata;
  selectedFormat?: string;
}

export interface VoxelBlock {
  x: number;
  y: number;
  z: number;
  type: string;
  color: string;
  alpha?: number;
  name: string;
}

export interface BlockMaterialCount {
  name: string;
  type: string;
  color: string;
  count: number;
  stacks: string;
}
/**
 * Generate procedural farm blueprint blocks based on farm category and type
 */
function generateFarmVoxels(farmType: string, dn: string): { voxels: VoxelBlock[]; dimensions: { x: number; y: number; z: number } } {
  const voxels: VoxelBlock[] = [];
  const typeLower = farmType.toLowerCase();

  const width = 15;
  const height = 18;
  const depth = 15;

  const halfW = Math.floor(width / 2);
  const halfD = Math.floor(depth / 2);

  // Helper to add block
  const addBlock = (x: number, y: number, z: number, type: string, name: string, color: string, alpha = 1) => {
    voxels.push({ x: x - halfW, y, z: z - halfD, type, name, color, alpha });
  };

  // Base Layer 0: Storage & Hopper Collector
  for (let x = 4; x <= 10; x++) {
    for (let z = 4; z <= 10; z++) {
      if ((x === 4 || x === 10) && (z === 5 || z === 9)) {
        addBlock(x, 0, z, "chest", "Double Chest", "#9d6834");
      } else if (x >= 5 && x <= 9 && z >= 5 && z <= 9) {
        addBlock(x, 0, z, "hopper", "Hopper", "#3b3c40");
      } else {
        addBlock(x, 0, z, "smooth_stone", "Smooth Stone", "#888888");
      }
    }
  }

  // Layer 1: Kill Chamber / Campfires or Redstone Sorter
  for (let x = 5; x <= 9; x++) {
    for (let z = 5; z <= 9; z++) {
      if (typeLower.includes("creeper") || typeLower.includes("mob") || typeLower.includes("raid")) {
        addBlock(x, 1, z, "campfire", "Soul Campfire", "#2dc2c9");
      } else if (typeLower.includes("iron")) {
        addBlock(x, 1, z, "lava", "Lava Blade", "#e85d04", 0.85);
      } else {
        addBlock(x, 1, z, "redstone", "Redstone Repeater / Wire", "#d90429");
      }
    }
  }

  // Perimeter Glass / Structure Columns
  for (let y = 1; y < height; y++) {
    // 4 Corner Pillars
    addBlock(3, y, 3, "deepslate", "Polished Deepslate Pillar", "#333538");
    addBlock(11, y, 3, "deepslate", "Polished Deepslate Pillar", "#333538");
    addBlock(3, y, 11, "deepslate", "Polished Deepslate Pillar", "#333538");
    addBlock(11, y, 11, "deepslate", "Polished Deepslate Pillar", "#333538");

    // Glass walls on sides
    if (y >= 2 && y <= height - 3) {
      if (y % 2 === 0) {
        addBlock(3, y, 7, "tinted_glass", "Tinted Glass", "#2b3a4a", 0.65);
        addBlock(11, y, 7, "tinted_glass", "Tinted Glass", "#2b3a4a", 0.65);
        addBlock(7, y, 3, "tinted_glass", "Tinted Glass", "#2b3a4a", 0.65);
        addBlock(7, y, 11, "tinted_glass", "Tinted Glass", "#2b3a4a", 0.65);
      }
    }
  }

  // Spawning Platforms / Technical Modules (Layers 4, 8, 12, 15)
  const platformLayers = [4, 8, 12, 15];
  for (const py of platformLayers) {
    if (py >= height) continue;

    for (let x = 4; x <= 10; x++) {
      for (let z = 4; z <= 10; z++) {
        const isCenter = x >= 6 && x <= 8 && z >= 6 && z <= 8;
        const isPerimeter = x === 4 || x === 10 || z === 4 || z === 10;

        if (typeLower.includes("creeper") || typeLower.includes("mob")) {
          // Creeper platform with drop chute in middle
          if (!isCenter) {
            addBlock(x, py, z, "stone_bricks", "Stone Bricks", "#6e7075");
            if ((x + z) % 2 === 0) {
              addBlock(x, py + 1, z, "trapdoor", "Oak Trapdoor (Pathfinding)", "#8b5a2b");
            }
          } else {
            // Drop chute hole
            if (py === 4 && (x === 7 && z === 7)) {
              addBlock(x, py + 1, z, "cat_carpet", "Cat Perch / Carpet", "#f4a261");
            }
          }
        } else if (typeLower.includes("iron")) {
          // Iron golem water streaming platform
          if (isPerimeter) {
            addBlock(x, py, z, "smooth_stone", "Smooth Stone Barrier", "#7f8489");
          } else {
            addBlock(x, py, z, "water", "Flowing Water", "#1d6fa5", 0.6);
          }
        } else if (typeLower.includes("shulker")) {
          // Shulker teleportation chambers & snow golems
          if (x % 2 === 0 && z % 2 === 0) {
            addBlock(x, py, z, "piston", "Piston", "#907353");
            addBlock(x, py + 1, z, "observer", "Observer", "#42474d");
          } else {
            addBlock(x, py, z, "scaffolding", "Scaffolding", "#b58750");
          }
        } else if (typeLower.includes("stone") || typeLower.includes("cobble")) {
          // Stone generator water/lava cells
          if (x % 2 === 0) {
            addBlock(x, py, z, "lava", "Lava", "#d9480f", 0.85);
          } else {
            addBlock(x, py, z, "water", "Water Source", "#1d6fa5", 0.6);
          }
          addBlock(x, py + 1, z, "piston", "Piston Pusher", "#907353");
        } else if (typeLower.includes("raid")) {
          // Stacking raid kill chamber
          if (!isCenter) {
            addBlock(x, py, z, "obsidian", "Obsidian Blast Shell", "#1e102d");
          } else {
            addBlock(x, py, z, "sticky_piston", "Sticky Piston", "#6c804f");
          }
        } else {
          // General redstone technical farm
          if ((x + z) % 3 === 0) {
            addBlock(x, py, z, "observer", "Observer", "#42474d");
            addBlock(x, py + 1, z, "redstone_dust", "Redstone Dust", "#e63946");
          } else {
            addBlock(x, py, z, "polished_andesite", "Polished Andesite", "#85878c");
          }
        }
      }
    }
  }

  // Top Roof / Slab Layer
  const roofY = height - 1;
  for (let x = 3; x <= 11; x++) {
    for (let z = 3; z <= 11; z++) {
      addBlock(x, roofY, z, "stone_slab", "Stone Slab Roof", "#95999e");
    }
  }

  return { voxels, dimensions: { x: width, y: height, z: depth } };
}
export function SchematicViewer3D({ farm, selectedFormat = "litematic" }: SchematicViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Camera Controls State
  const [yaw, setYaw] = useState<number>(Math.PI / 4 + 0.2); // ~55 deg
  const [pitch, setPitch] = useState<number>(0.55); // ~32 deg elevation
  const [zoom, setZoom] = useState<number>(20);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Layer Slicing State
  const [layerMode, setLayerMode] = useState<"all" | "range" | "single">("range");
  const [currentLayer, setCurrentLayer] = useState<number>(18);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Hovered Block
  const [hoveredBlock, setHoveredBlock] = useState<VoxelBlock | null>(null);

  // Generate Farm Voxels
  const { voxels, dimensions } = useMemo(() => {
    return generateFarmVoxels(farm.farmType, farm.dn);
  }, [farm.farmType, farm.dn]);

  const maxLayer = dimensions.y;

  // Filter voxels according to layer slicing
  const visibleVoxels = useMemo(() => {
    return voxels.filter((v) => {
      if (layerMode === "all") return true;
      if (layerMode === "single") return v.y === currentLayer;
      if (layerMode === "range") return v.y <= currentLayer;
      return true;
    });
  }, [voxels, layerMode, currentLayer]);

  // Compute Bill of Materials (Block Breakdown)
  const materialsList = useMemo<BlockMaterialCount[]>(() => {
    const counts: Record<string, { name: string; type: string; color: string; count: number }> = {};
    for (const v of voxels) {
      if (!counts[v.type]) {
        counts[v.type] = { name: v.name, type: v.type, color: v.color, count: 0 };
      }
      counts[v.type].count += 1;
    }
    return Object.values(counts)
      .map((item) => {
        const stacksCount = Math.floor(item.count / 64);
        const remainder = item.count % 64;
        let stacksStr = "";
        if (stacksCount > 0 && remainder > 0) {
          stacksStr = `${stacksCount} stack${stacksCount > 1 ? "s" : ""} + ${remainder}`;
        } else if (stacksCount > 0) {
          stacksStr = `${stacksCount} stack${stacksCount > 1 ? "s" : ""}`;
        } else {
          stacksStr = `${item.count} items`;
        }
        return { ...item, stacks: stacksStr };
      })
      .sort((a, b) => b.count - a.count);
  }, [voxels]);

  // Animation Loop for Auto-Rotate and Layer Stepping
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (autoRotate && !isDragging) {
        setYaw((prev) => (prev + 0.005) % (Math.PI * 2));
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoRotate, isDragging]);

  // Layer Playback Animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentLayer((prev) => {
        if (prev >= maxLayer) {
          return 0;
        }
        return prev + 1;
      });
    }, 450);
    return () => clearInterval(interval);
  }, [isPlaying, maxLayer]);

  // Reset Camera Function
  const handleResetCamera = useCallback(() => {
    setYaw(Math.PI / 4 + 0.2);
    setPitch(0.55);
    setZoom(20);
    setPan({ x: 0, y: 30 });
  }, []);

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  // Helper color shade functions for lighting
  const shadeColor = (hexColor: string, percent: number) => {
    let color = hexColor.replace("#", "");
    if (color.length === 3) {
      color = color.split("").map((c) => c + c).join("");
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Canvas Drawing Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear Canvas with sleek gradient void
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, "#090d16");
    bgGradient.addColorStop(1, "#030712");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2 + pan.x;
    const originY = height / 2 + pan.y;

    // Precalculate Trig
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);

    // Coordinate transformation
    const project = (x: number, y: number, z: number) => {
      // Y is up in Minecraft, in canvas inverted
      const rotX = x * cosY - z * sinY;
      const rotZ = x * sinY + z * cosY;
      const rotY = -y * cosP + rotZ * sinP;
      const depthVal = rotZ * cosP + y * sinP;

      const screenX = originX + rotX * zoom;
      const screenY = originY + rotY * zoom;

      return { screenX, screenY, depthVal };
    };

    // Draw Bottom Reference Grid
    if (showGrid) {
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      const gridRadius = 9;
      for (let gx = -gridRadius; gx <= gridRadius; gx += 2) {
        const p1 = project(gx, 0, -gridRadius);
        const p2 = project(gx, 0, gridRadius);
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.stroke();
      }
      for (let gz = -gridRadius; gz <= gridRadius; gz += 2) {
        const p1 = project(-gridRadius, 0, gz);
        const p2 = project(gridRadius, 0, gz);
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.stroke();
      }
    }

    // Project and sort visible voxels from back to front
    interface ProjectedVoxel {
      voxel: VoxelBlock;
      screenX: number;
      screenY: number;
      depth: number;
    }

    const projectedList: ProjectedVoxel[] = visibleVoxels.map((v) => {
      const p = project(v.x, v.y, v.z);
      return {
        voxel: v,
        screenX: p.screenX,
        screenY: p.screenY,
        depth: p.depthVal,
      };
    });

    // Painter's algorithm sort
    projectedList.sort((a, b) => b.depth - a.depth);

    // Draw Voxels as isometric 3D cubes with realistic shading
    const s = zoom * 0.52; // half-width of block

    for (const item of projectedList) {
      const { voxel, screenX, screenY } = item;
      const baseColor = voxel.color;
      const alpha = voxel.alpha !== undefined ? voxel.alpha : 1;

      // Calculate 8 corners of isometric cube
      const topP = project(voxel.x, voxel.y + 0.5, voxel.z);
      const bottomP = project(voxel.x, voxel.y - 0.5, voxel.z);
      const pLeft = project(voxel.x - 0.5, voxel.y, voxel.z);
      const pRight = project(voxel.x + 0.5, voxel.y, voxel.z);
      const pFront = project(voxel.x, voxel.y, voxel.z + 0.5);
      const pBack = project(voxel.x, voxel.y, voxel.z - 0.5);

      // Top Face
      const p00 = project(voxel.x - 0.5, voxel.y + 0.5, voxel.z - 0.5);
      const p10 = project(voxel.x + 0.5, voxel.y + 0.5, voxel.z - 0.5);
      const p11 = project(voxel.x + 0.5, voxel.y + 0.5, voxel.z + 0.5);
      const p01 = project(voxel.x - 0.5, voxel.y + 0.5, voxel.z + 0.5);

      // Draw Top Face (lightest)
      ctx.beginPath();
      ctx.moveTo(p00.screenX, p00.screenY);
      ctx.lineTo(p10.screenX, p10.screenY);
      ctx.lineTo(p11.screenX, p11.screenY);
      ctx.lineTo(p01.screenX, p01.screenY);
      ctx.closePath();
      ctx.fillStyle = shadeColor(baseColor, 18);
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Bottom corners for sides
      const b10 = project(voxel.x + 0.5, voxel.y - 0.5, voxel.z - 0.5);
      const b11 = project(voxel.x + 0.5, voxel.y - 0.5, voxel.z + 0.5);
      const b01 = project(voxel.x - 0.5, voxel.y - 0.5, voxel.z + 0.5);

      // Left/Front Face
      ctx.beginPath();
      ctx.moveTo(p01.screenX, p01.screenY);
      ctx.lineTo(p11.screenX, p11.screenY);
      ctx.lineTo(b11.screenX, b11.screenY);
      ctx.lineTo(b01.screenX, b01.screenY);
      ctx.closePath();
      ctx.fillStyle = shadeColor(baseColor, -8);
      ctx.fill();
      ctx.stroke();

      // Right/Side Face (darkest shadow)
      ctx.beginPath();
      ctx.moveTo(p11.screenX, p11.screenY);
      ctx.lineTo(p10.screenX, p10.screenY);
      ctx.lineTo(b10.screenX, b10.screenY);
      ctx.lineTo(b11.screenX, b11.screenY);
      ctx.closePath();
      ctx.fillStyle = shadeColor(baseColor, -24);
      ctx.fill();
      ctx.stroke();

      ctx.globalAlpha = 1;
    }
  }, [yaw, pitch, zoom, pan, visibleVoxels, showGrid]);
  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (e.buttons === 1) {
      // Left Click: Orbit Rotation
      setYaw((prev) => prev + deltaX * 0.008);
      setPitch((prev) => Math.max(0.05, Math.min(Math.PI / 2 - 0.05, prev - deltaY * 0.008)));
    } else if (e.buttons === 2 || e.shiftKey) {
      // Right Click or Shift+Drag: Pan
      setPan((prev) => ({
        x: prev.x + deltaX * 0.8,
        y: prev.y + deltaY * 0.8,
      }));
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setZoom((prev) => Math.max(8, Math.min(60, prev * zoomFactor)));
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 select-none shadow-2xl">
      {/* 3D Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[320px] max-h-[500px]">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />

        {/* Top Floating HUD: Controls & Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 text-cyan-400 border border-slate-700 backdrop-blur-md text-xs font-mono font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>schemat.io 3D Engine</span>
            </span>

            <span className="px-2.5 py-1 rounded-xl bg-slate-900/90 text-slate-300 border border-slate-800 backdrop-blur-md text-xs font-mono">
              {dimensions.x}x{dimensions.y}x{dimensions.z} blocks
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-xl backdrop-blur-md text-xs transition-colors border shadow-md ${
                autoRotate
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                  : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white"
              }`}
              title="Toggle Auto-Rotate"
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-xl backdrop-blur-md text-xs transition-colors border shadow-md ${
                showGrid
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white"
              }`}
              title="Toggle Floor Grid"
            >
              <Box className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetCamera}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 backdrop-blur-md transition-colors"
              title="Reset 3D View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 backdrop-blur-md transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Zoom Overlay Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 pointer-events-auto z-10">
          <button
            onClick={() => setZoom((prev) => Math.min(60, prev * 1.2))}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md backdrop-blur-md transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((prev) => Math.max(8, prev * 0.82))}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md backdrop-blur-md transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Orbit Helper Tip */}
        <div className="absolute bottom-3 left-3 text-[10px] text-slate-400 font-mono bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800 pointer-events-none backdrop-blur-sm">
          Left Click: Rotate • Scroll: Zoom • Right Click: Pan
        </div>
      </div>

      {/* Layer Slicing & Litematica Inspection Toolbar */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold flex items-center gap-1 font-mono uppercase text-[11px]">
              <Layers className="w-3.5 h-3.5 text-amber-400" /> Slicing:
            </span>
            <div className="inline-flex rounded-xl bg-slate-950 p-0.5 border border-slate-800 text-[11px]">
              <button
                onClick={() => setLayerMode("range")}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  layerMode === "range"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Layers 1..{currentLayer}
              </button>
              <button
                onClick={() => setLayerMode("single")}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  layerMode === "single"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Layer {currentLayer} Only
              </button>
              <button
                onClick={() => setLayerMode("all")}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  layerMode === "all"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All Layers
              </button>
            </div>
          </div>

          {/* Layer Step & Play Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              title="Play layer construction animation"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-semibold">{isPlaying ? "Pause" : "Build Anim"}</span>
            </button>

            <span className="px-2.5 py-1 rounded-xl bg-slate-950 text-amber-300 font-mono font-bold border border-slate-800">
              Y = {currentLayer} / {maxLayer}
            </span>
          </div>
        </div>

        {/* Layer Slider */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-[10px] font-mono text-slate-500">Y:0</span>
          <input
            type="range"
            min={0}
            max={maxLayer}
            value={currentLayer}
            onChange={(e) => {
              setCurrentLayer(parseInt(e.target.value, 10));
              if (layerMode === "all") setLayerMode("range");
            }}
            className="flex-1 accent-amber-400 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] font-mono text-slate-500">Y:{maxLayer}</span>
        </div>
      </div>
    </div>
  );
}
