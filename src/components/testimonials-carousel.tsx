"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), TESTIMONIALS.length - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const scrollNext = () => {
    if (activeIndex < TESTIMONIALS.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <div className="relative space-y-6">
      {/* Mobile Swipe Header Controls */}
      <div className="flex md:hidden items-center justify-between px-1 text-xs text-slate-500 font-medium">
        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full text-[11px] border border-emerald-200/60 shadow-xs">
          <Quote className="w-3 h-3 text-emerald-600" />
          Swipe cards left & right ➔
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
            className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={activeIndex === TESTIMONIALS.length - 1}
            aria-label="Next testimonial"
            className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Testimonials Track: Horizontal Swipeable Snap Track on Mobile (<md), 3-Column Grid on Desktop (md+) */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-4 pt-1 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TESTIMONIALS.map((t, idx) => {
          const impactText = (t as any).impactMetric || (t as any).programTaken || "Verified Compliance";
          const quoteText = t.content || (t as any).quote || "";
          const companyName = t.company || (t as any).organization || "";

          return (
            <div
              key={t.id}
              className="w-[84vw] sm:w-[380px] md:w-auto shrink-0 snap-center h-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 select-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100/80 inline-flex items-center gap-1">
                    <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                    {impactText}
                  </span>
                  <span className="text-slate-300 text-xs font-mono font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &quot;{quoteText}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 border-2 border-emerald-500/30 shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{t.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{t.role}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold truncate">{companyName}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Dot Indicator Bar */}
      <div className="flex md:hidden items-center justify-center gap-2 pt-1">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? "w-7 bg-emerald-600 shadow-xs"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
