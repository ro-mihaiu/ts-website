"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Coffee, Box, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { FarmCard } from "@/components/FarmCard";
import type { FarmWithMetadata } from "@/types/farm";

import { FARM_TYPES } from "@/types/farm";

interface FarmGridProps {
  initialFarms: FarmWithMetadata[];
}

export function FarmGrid({ initialFarms }: FarmGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Sync category state when URL changes (e.g. clicked navbar link)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
      setCurrentPage(1);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Extract unique farm types combining standard list and any custom types
  const farmTypes = useMemo(() => {
    const types = new Set<string>(FARM_TYPES);
    initialFarms.forEach((farm) => {
      if (farm.farmType) types.add(farm.farmType);
    });
    return Array.from(types);
  }, [initialFarms]);

  // Filter and sort farms
  const filteredFarms = useMemo(() => {
    let result = [...initialFarms];

    // Filter by Category (Java / Bedrock)
    if (selectedCategory !== "all") {
      result = result.filter(
        (farm) => farm.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Farm Type
    if (selectedType !== "all") {
      result = result.filter(
        (farm) => farm.farmType.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((farm) => {
        const titleMatch = farm.title.toLowerCase().includes(q);
        const descMatch = farm.description.toLowerCase().includes(q);
        const typeMatch = farm.farmType.toLowerCase().includes(q);
        const dnMatch = farm.dn.toLowerCase().includes(q) || farm.id.toLowerCase().includes(q);
        const tagMatch = farm.tags?.some((t) => t.toLowerCase().includes(q));
        const verMatch = farm.version?.toLowerCase().includes(q);
        return titleMatch || descMatch || typeMatch || dnMatch || tagMatch || verMatch;
      });
    }

    // Sorting
    if (sortBy === "dn_asc") {
      result.sort((a, b) => a.dn.localeCompare(b.dn, undefined, { numeric: true }));
    } else if (sortBy === "dn_desc") {
      result.sort((a, b) => b.dn.localeCompare(a.dn, undefined, { numeric: true }));
    } else if (sortBy === "title_asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // featured
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.dn.localeCompare(b.dn, undefined, { numeric: true });
      });
    }

    return result;
  }, [initialFarms, selectedCategory, selectedType, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredFarms.length / itemsPerPage) || 1;
  const paginatedFarms = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFarms.slice(start, start + itemsPerPage);
  }, [filteredFarms, currentPage, itemsPerPage]);

  const javaCount = initialFarms.filter((f) => f.category === "java").length;
  const bedrockCount = initialFarms.filter((f) => f.category === "bedrock").length;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedType("all");
    setSortBy("featured");
    setCurrentPage(1);
    router.replace("/", { scroll: false });
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search 500+ farms by name, type, tags, or #111-dn..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Farm Type Filter */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[160px] flex-1 md:flex-initial">
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 appearance-none pr-8 cursor-pointer"
              >
                <option value="all">All Farm Types</option>
                {farmTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[150px] flex-1 md:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 appearance-none pr-8 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="dn_asc">DN Number (Low to High)</option>
                <option value="dn_desc">DN Number (High to Low)</option>
                <option value="title_asc">Title (A - Z)</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Edition Switcher Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>All Editions</span>
              <span className="px-1.5 py-0.2 rounded bg-black/30 text-[11px] font-mono">
                {initialFarms.length}
              </span>
            </button>

            <button
              onClick={() => handleCategoryChange("java")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedCategory === "java"
                  ? "bg-[#9fff99] text-slate-950 shadow-lg shadow-[#9fff99]/25 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Java Edition</span>
              <span className={`px-1.5 py-0.2 rounded text-[11px] font-mono ${selectedCategory === "java" ? "bg-black/20 text-slate-950 font-bold" : "bg-black/30"}`}>
                {javaCount}
              </span>
            </button>

            <button
              onClick={() => handleCategoryChange("bedrock")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedCategory === "bedrock"
                  ? "bg-slate-100 text-slate-950 shadow-lg shadow-white/20 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Bedrock Edition</span>
              <span className={`px-1.5 py-0.2 rounded text-[11px] font-mono ${selectedCategory === "bedrock" ? "bg-black/20 text-slate-950 font-bold" : "bg-black/30"}`}>
                {bedrockCount}
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-semibold">{filteredFarms.length}</span> farm designs
          </div>
        </div>
      </div>

      {/* Farm Cards Grid */}
      {paginatedFarms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedFarms.map((farm) => (
            <FarmCard key={`${farm.category}-${farm.dn}`} farm={farm} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel text-center py-16 px-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No farms found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find any farms matching your search filters. Try adjusting your query or resetting filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 font-mono text-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl font-semibold transition-all ${
                  currentPage === pageNum
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

