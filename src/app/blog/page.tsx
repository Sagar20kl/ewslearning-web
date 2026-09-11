"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { INITIAL_BLOGS, BlogPost } from "@/data/blogs";
import { 
  Sparkles, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Globe2, 
  ShieldCheck, 
  Bot, 
  RefreshCw,
  BookOpen
} from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ["All", "Global Policy", "Circular Economy", "ESG & BRSR", "Clean Energy", "Waste Tech"];

  // Fetch blogs from API
  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setBlogs(json.data);
        }
      }
    } catch (e) {
      console.log("Using cached blog data:", e);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleGenerateOnDemand = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/blog/generate", { method: "POST" });
      if (res.ok) {
        await loadBlogs();
      }
    } catch (err) {
      console.error("Auto generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const filtered = blogs.filter((b) => {
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = blogs[0];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Automation Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
            Global Sustainability Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sustainability Insights & Weekly Global Policy Dispatches
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Curated weekly dispatches analyzing international environmental treaties, CPCB statutory circulars, EU CBAM carbon border tariffs, and circular economy breakthroughs.
          </p>

          {/* Quick AI Trigger Banner */}
          <div className="pt-2">
            <button
              onClick={handleGenerateOnDemand}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition-all active:scale-98 shadow-md"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>Fetching Worldwide News & Synthesizing Blog...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>⚡ Fetch Live Global News & Publish New Weekly Blog</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Featured Blog Banner */}
        {featured && (
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl overflow-hidden text-white border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Latest Weekly Dispatch
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-emerald-300 border border-slate-700">
                  {featured.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                {featured.title}
              </h2>

              <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {featured.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {featured.publishedAt}
                </span>
                {featured.isAutoGenerated && (
                  <span className="flex items-center gap-1 text-emerald-300 font-mono">
                    <Bot className="w-3.5 h-3.5" />
                    Auto-Compiled from Worldwide News Wires
                  </span>
                )}
              </div>

              <div className="pt-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                >
                  <span>Read Full Weekly Briefing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px] w-full bg-slate-800">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
            </div>

          </div>
        )}

        {/* Filter & Search Bar */}
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
              placeholder="Search sustainability articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} Published Articles</span>
            <span>Automated dispatches published every Monday</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/85 text-emerald-400 backdrop-blur-sm">
                    {blog.category}
                  </div>
                  {blog.isAutoGenerated && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-md">
                      <Bot className="w-3 h-3" />
                      Weekly AI Digest
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium mb-1 flex items-center gap-2">
                      <span>{blog.readTime}</span>
                      <span>•</span>
                      <span>{blog.publishedAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                        <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">
                        {blog.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:underline"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
