"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RESOURCES, Resource } from "@/data/resources";
import { Search, FileText, ArrowRight, Download, BookOpen, Sparkles } from "lucide-react";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Corporate ESG", "Waste Management", "EPR & Policy", "Case Study"];

  const filtered = RESOURCES.filter((r) => {
    const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            EWS Knowledge Hub
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Sustainability Whitepapers, Case Studies & Regulatory Guides
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            In-depth analysis of BRSR core metrics, CPCB plastic waste guidelines, and zero-waste industrial case studies.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={res.coverImage}
                  alt={res.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-emerald-400 backdrop-blur-sm">
                  {res.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium mb-1">
                    {res.readTime} • {res.publishedAt}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {res.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {res.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                      <Image src={res.author.avatar} alt={res.author.name} fill className="object-cover" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700">{res.author.name}</span>
                  </div>

                  <Link
                    href={`/resources/${res.slug}`}
                    className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
