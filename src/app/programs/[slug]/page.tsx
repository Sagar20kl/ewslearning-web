"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PROGRAMS, Program } from "@/data/programs";
import { 
  Clock, 
  Users, 
  Star, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Download, 
  Lock, 
  ArrowRight,
  Send
} from "lucide-react";

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const program = PROGRAMS.find((p) => p.slug === slug) || PROGRAMS[0];

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "mod-1": true,
    "mod-c1": true,
    "mod-s1": true,
    "mod-e1": true,
  });

  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  useEffect(() => {
    const saved = localStorage.getItem("ews_currency") as "INR" | "USD" | null;
    if (saved) setCurrency(saved);

    const handleCurrencyChange = () => {
      const updated = localStorage.getItem("ews_currency") as "INR" | "USD" | null;
      if (updated) setCurrency(updated);
    };

    window.addEventListener("currency_change", handleCurrencyChange);
    return () => window.removeEventListener("currency_change", handleCurrencyChange);
  }, []);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalLessons = program.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-emerald-400">Programs</Link>
            <span>/</span>
            <span className="text-emerald-300 font-semibold truncate">{program.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  Sector: {program.sector}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                  Mode: {program.mode}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {program.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {program.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {program.tagline}
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{program.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({program.reviewCount} corporate reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{program.enrolledCount.toLocaleString()}+ Certified Learners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Duration: {program.duration}</span>
                </div>
              </div>

              {/* Instructor Capsule */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-800">
                  <Image src={program.instructor.avatar} alt={program.instructor.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Lead Faculty & Advisory:</div>
                  <div className="text-sm font-bold text-white">{program.instructor.name}</div>
                  <div className="text-xs text-emerald-400">{program.instructor.role} ({program.instructor.organization})</div>
                </div>
              </div>

            </div>

            {/* Right Card: Quick Actions (Desktop Sticky Placement below) */}
          </div>

        </div>
      </section>

      {/* Main Page Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 lg:-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Overview, Outcomes, Syllabus */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Program Overview</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {program.description}
              </p>

              {/* Program Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {program.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You'll Learn (Outcomes) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Key Learning Outcomes & Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Curriculum Syllabus */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Curriculum & Module Syllabus
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {program.curriculum.length} Modules • {totalLessons} Comprehensive Lessons • {program.duration} Total Learning Time
                  </p>
                </div>
                <Link
                  href={`/learn/${program.slug}`}
                  className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Interactive Learning Room</span>
                </Link>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-4 pt-2">
                {program.curriculum.map((module) => {
                  const isExpanded = !!expandedModules[module.id];
                  return (
                    <div
                      key={module.id}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                    >
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full px-5 py-4 bg-slate-100/70 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-900">{module.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span>{module.duration}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white divide-y divide-slate-100 space-y-3">
                          {module.lessons.map((lesson) => (
                            <div key={lesson.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-xs">
                              <div className="flex items-start gap-2.5">
                                {lesson.isFreePreview ? (
                                  <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                                    <span>{lesson.title}</span>
                                    {lesson.isFreePreview && (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        Free Preview
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-slate-500 text-[11px] mt-0.5">{lesson.summary}</p>
                                </div>
                              </div>
                              <span className="text-slate-400 font-mono text-[11px] shrink-0">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Target Audience & Prerequisites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-slate-900">Who Should Attend?</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {program.targetAudience.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-slate-900">Prerequisites</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {program.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Enrollment & Corporate Quote Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              {/* Enrollment Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                
                {/* Media Preview Box */}
                <div className="relative h-48 w-full bg-slate-900 group">
                  <Image
                    src={program.coverImage}
                    alt={program.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <Link
                    href={`/learn/${program.slug}`}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 hover:bg-slate-950/20 transition-all text-white"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold mt-2">Preview Course Sample</span>
                  </Link>
                </div>

                <div className="p-6 space-y-6">
                  
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">
                        {currency === "INR" ? `₹${program.priceINR.toLocaleString()}` : `$${program.priceUSD}`}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ professional seat</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      Includes Lifetime Portal Access & Verified Digital Certificate
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link
                      href={`/learn/${program.slug}`}
                      className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Start Learning Now</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="w-full py-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Request Group / Corporate Discount</span>
                    </Link>
                  </div>

                  {/* Checklist */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                    <div className="font-bold text-slate-900">This training includes:</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{program.duration} On-Demand HD Video Lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Audit Checklists & Compliance Templates (Excel/PDF)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tamper-Proof Verifiable Digital Certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Statutorily Aligned with Indian & Global Norms</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
