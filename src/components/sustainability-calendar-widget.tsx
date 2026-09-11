"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  SUSTAINABILITY_EVENTS, 
  SustainabilityEvent, 
  generateGoogleCalendarUrl 
} from "@/data/sustainability-calendar";
import { 
  Calendar as CalendarIcon, 
  ChevronRight, 
  ArrowRight, 
  CalendarPlus, 
  Target,
  Filter,
  Sparkles
} from "lucide-react";

export function SustainabilityCalendarWidget() {
  const [selectedMonth, setSelectedMonth] = useState<string>("All");

  const months = ["All", "Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"];

  const filteredEvents = SUSTAINABILITY_EVENTS.filter((evt) => {
    return selectedMonth === "All" || evt.month === selectedMonth;
  });

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 flex flex-col justify-between space-y-5 h-full">
      
      {/* Header & Month Dropdown */}
      <div className="space-y-3 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            <CalendarIcon className="w-3 h-3 text-emerald-600" />
            Calendar Glance
          </div>
          <span className="text-[10px] font-bold text-slate-400 font-mono">2026 Registry</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-black text-slate-900 leading-tight">
            Sustainability Days
          </h3>

          {/* Month Dropdown Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none pl-2.5 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:border-emerald-500 focus:outline-hidden cursor-pointer"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m === "All" ? "All Months" : m}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Scrollable Event Feed (Right-Side 30% Width Optimized) */}
      <div 
        className="space-y-3 overflow-y-auto max-h-[420px] pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
        style={{ scrollbarWidth: "thin" }}
      >
        {filteredEvents.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No events found for this month.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const googleCalUrl = generateGoogleCalendarUrl(evt);

            return (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-400 transition-all space-y-2.5 group"
              >
                {/* Date & Title */}
                <div className="flex items-start gap-3">
                  {/* Date badge */}
                  <div className="w-11 h-11 rounded-xl bg-white border border-emerald-200 text-emerald-800 flex flex-col items-center justify-center font-black shrink-0 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <span className="text-[8px] uppercase tracking-wider font-bold -mb-0.5">{evt.month}</span>
                    <span className="text-sm font-black leading-none">{evt.day}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-emerald-700">{evt.date}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        evt.category === "Indian Statutory Compliance"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-200/70 text-slate-700"
                      }`}>
                        {evt.category === "Indian Statutory Compliance" ? "Statutory" : "UN Day"}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                      {evt.title}
                    </h4>
                  </div>
                </div>

                {/* Brief Action / Tagline */}
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed pl-1">
                  {evt.tagline}
                </p>

                {/* SDG Goals & 1-Click Add to Cal */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {evt.sdgGoals.slice(0, 3).map((sdg) => (
                      <span
                        key={sdg}
                        title={`UN SDG #${sdg}`}
                        className="w-4 h-4 rounded bg-slate-800 text-white font-mono text-[8px] font-bold flex items-center justify-center"
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>

                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                  >
                    <CalendarPlus className="w-3 h-3" />
                    <span>Add to Cal</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link to full calendar */}
      <div className="pt-3 border-t border-slate-100 text-center">
        <Link
          href="/calendar"
          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 hover:text-emerald-700 group transition-colors"
        >
          <span>Explore Complete 2026 Registry</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
