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
  Search, 
  Filter, 
  Download, 
  Sparkles, 
  Globe2, 
  Leaf, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  Target, 
  ArrowRight,
  CheckCircle2,
  Building2,
  CalendarPlus
} from "lucide-react";

const MONTHS = ["All", "Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"];
const CATEGORIES = [
  "All",
  "UN & Global Observance",
  "Waste & Recycling",
  "Climate & Energy",
  "Water & Nature",
  "Indian Statutory Compliance"
];

export default function SustainabilityCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = SUSTAINABILITY_EVENTS.filter((evt) => {
    const matchMonth = selectedMonth === "All" || evt.month === selectedMonth;
    const matchCategory = selectedCategory === "All" || evt.category === selectedCategory;
    const matchSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchMonth && matchCategory && matchSearch;
  });

  const handleExportICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//EWS Learning//Sustainability Calendar//EN\nCALSCALE:GREGORIAN\n";
    const year = new Date().getFullYear();

    SUSTAINABILITY_EVENTS.forEach((evt) => {
      const monthMap: Record<string, string> = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
      };
      const monthStr = monthMap[evt.month] || "01";
      const dayStr = evt.day.toString().padStart(2, "0");
      const dtStart = `${year}${monthStr}${dayStr}`;

      icsContent += "BEGIN:VEVENT\n";
      icsContent += `SUMMARY:${evt.title} (EWS Sustainability Calendar)\n`;
      icsContent += `DESCRIPTION:${evt.tagline.replace(/\n/g, " ")} - ${evt.enterpriseAction.replace(/\n/g, " ")}\n`;
      icsContent += `DTSTART;VALUE=DATE:${dtStart}\n`;
      icsContent += `DTEND;VALUE=DATE:${dtStart}\n`;
      icsContent += `URL:https://ewslearning.com/calendar\n`;
      icsContent += "END:VEVENT\n";
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `EWS_Global_Sustainability_Calendar_${year}.ics`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Globe2 className="w-96 h-96 text-emerald-400" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CalendarIcon className="w-3.5 h-3.5" />
              Annual Environmental & Statutory Registry
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Global & Indian Sustainability Calendar
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Track all international UN environmental observances, World Earth & Water Days, SDG Flag Weeks, and mandatory Indian statutory compliance deadlines (CPCB Plastic EPR, BEE Energy Days).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportICS}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 group"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Export All Dates to Outlook / Apple / Google (.ICS)</span>
              </button>

              <Link
                href="/corporate"
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Plan Corporate Campus Drives</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-emerald-600">20+</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Global Observances</div>
            <div className="text-[11px] text-slate-500">UNEP, UN-Habitat & CPCB</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-teal-600">17 SDGs</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">UN Sustainable Goals</div>
            <div className="text-[11px] text-slate-500">Integrated impact metrics</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-blue-600">100%</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Action Blueprints</div>
            <div className="text-[11px] text-slate-500">Practical steps for companies</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-slate-900">1-Click</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Calendar Sync</div>
            <div className="text-[11px] text-slate-500">Google, Outlook & Apple</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          
          {/* Search bar & Category filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event name (e.g. Earth Day, Water, EPR, Plastic, Ozone, COP)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Month Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {MONTHS.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedMonth === m
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {m === "All" ? "Full Year" : m}
              </button>
            ))}
          </div>

        </div>

        {/* Calendar Events Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Scheduled Milestones & Observances</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {filteredEvents.length} Events
              </span>
            </h2>
            <span className="text-xs text-slate-500">Updated for 2026</span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-base font-bold text-slate-800">No matching sustainability events found</div>
              <p className="text-xs text-slate-500">Try clearing your search query or selecting &quot;Full Year&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredEvents.map((event) => {
                const googleCalUrl = generateGoogleCalendarUrl(event);
                
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-400 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-5 group"
                  >
                    {/* Top Row: Date Pill & Category */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {/* Date badge */}
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center justify-center font-black shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <span className="text-[10px] uppercase tracking-wider font-bold -mb-0.5">{event.month}</span>
                          <span className="text-lg leading-tight">{event.day}</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-700">{event.date}</div>
                          <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                        event.category === "Indian Statutory Compliance"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : event.category === "Waste & Recycling"
                          ? "bg-teal-100 text-teal-800"
                          : event.category === "Climate & Energy"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {event.category}
                      </span>
                    </div>

                    {/* Tagline & Description */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-800 italic">
                        &quot;{event.tagline}&quot;
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Action Blueprint Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <Target className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Enterprise & Campus Action:</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {event.enterpriseAction}
                      </p>
                    </div>

                    {/* Bottom Row: SDG Goals & Google Calendar Link */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      
                      {/* SDG goal badges */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-bold mr-1">SDG:</span>
                        {event.sdgGoals.map((sdg) => (
                          <span
                            key={sdg}
                            title={`UN Sustainable Development Goal #${sdg}`}
                            className="w-5 h-5 rounded-md bg-slate-900 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-2xs"
                          >
                            {sdg}
                          </span>
                        ))}
                      </div>

                      {/* Add to Google Calendar button */}
                      <a
                        href={googleCalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-colors shadow-2xs"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                        <span>Add to Google Cal</span>
                      </a>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
