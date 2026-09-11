"use client";

import React, { useState, useMemo } from "react";
import { PROGRAMS, Program } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";
import { Search, Filter, BookOpen, Sparkles, Building2, SlidersHorizontal, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  const sectors = ["All", "Corporate", "Industrial", "Municipal", "Universal"];
  const modes = ["All", "Online", "Offline", "Hybrid"];
  const levels = ["All", "Beginner", "Intermediate", "Executive / Professional"];

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSector = selectedSector === "All" || p.sector === selectedSector;
      const matchesMode = selectedMode === "All" || p.mode === selectedMode;
      const matchesLevel = selectedLevel === "All" || p.level === selectedLevel;

      return matchesSearch && matchesSector && matchesMode && matchesLevel;
    });
  }, [searchQuery, selectedSector, selectedMode, selectedLevel]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSector("All");
    setSelectedMode("All");
    setSelectedLevel("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            Academy Curriculum
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Sustainability & Waste Management Programs
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All programs are customizable based on your specific sector, group size (10 to 500+ employees), and delivery mode (Online, In-Person Workshops, or Hybrid).
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          
          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search programs by keyword (e.g. BRSR, EPR, Segregation, Recycling)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all text-slate-900"
              />
            </div>

            {(selectedSector !== "All" || selectedMode !== "All" || selectedLevel !== "All" || searchQuery) && (
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-emerald-700 hover:border-emerald-500 bg-slate-50 transition-all flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
            
            {/* Sector */}
            <div>
              <label className="font-bold text-slate-700 block mb-2">Industry Sector</label>
              <div className="flex flex-wrap gap-1.5">
                {sectors.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSector(s)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedSector === s
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="font-bold text-slate-700 block mb-2">Delivery Mode</label>
              <div className="flex flex-wrap gap-1.5">
                {modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMode(m)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedMode === m
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <label className="font-bold text-slate-700 block mb-2">Experience Tier</label>
              <div className="flex flex-wrap gap-1.5">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(l)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedLevel === l
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Results Count & Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filteredPrograms.length} {filteredPrograms.length === 1 ? "Program" : "Programs"}</span>
            <span>All courses award a verified digital certificate</span>
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No programs match your exact filter criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting your filters or contact our academic advisors for a custom curriculum.
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </div>

        {/* Custom Sector Request Callout */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Looking for Custom Onsite Corporate Training?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We design bespoke environmental compliance workshops for manufacturing plants, hospitals, tech campuses, and hotel chains.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-98 transition-all shrink-0 shadow-lg"
          >
            Request Custom Syllabus
          </Link>
        </div>

      </div>
    </div>
  );
}
