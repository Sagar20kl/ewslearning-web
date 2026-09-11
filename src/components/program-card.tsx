"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Program } from "@/data/programs";
import { Clock, Users, Star, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
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

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col overflow-hidden">
      
      {/* Cover Image & Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={program.coverImage}
          alt={program.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {program.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-600 text-white shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {program.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-slate-800 border border-white/50">
            {program.sector}
          </span>
        </div>

        {/* Mode Tag */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-sm text-emerald-400 border border-slate-700">
            Mode: {program.mode}
          </span>
        </div>

        {/* Rating & Learners */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1 bg-slate-950/60 backdrop-blur-sm px-2 py-1 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{program.rating.toFixed(1)}</span>
            <span className="text-slate-300">({program.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950/60 backdrop-blur-sm px-2 py-1 rounded-md">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{program.enrolledCount.toLocaleString()}+ Learners</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Duration & Level */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Duration: {program.duration}
            </span>
            <span>•</span>
            <span>{program.level}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            {program.title}
          </h3>

          {/* Excerpt Description */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {program.tagline || program.description}
          </p>
        </div>

        {/* Highlights Preview */}
        <div className="pt-2 border-t border-slate-100">
          <ul className="space-y-1 text-[11px] text-slate-600">
            {program.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: Pricing & Explore CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase font-semibold text-slate-400">Corporate & Individual</span>
            <div className="text-lg font-black text-slate-900">
              {currency === "INR" ? `₹${program.priceINR.toLocaleString()}` : `$${program.priceUSD}`}
              <span className="text-xs font-normal text-slate-500"> / seat</span>
            </div>
          </div>

          <Link
            href={`/programs/${program.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 group-hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <span>Overview</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}
