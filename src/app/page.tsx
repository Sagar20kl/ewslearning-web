"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROGRAMS } from "@/data/programs";
import { RESOURCES } from "@/data/resources";
import { TESTIMONIALS, PARTNERS } from "@/data/testimonials";
import { ProgramCard } from "@/components/program-card";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion-wrapper";
import { AnimatedButton } from "@/components/animated-button";
import { SustainabilityCalendarWidget } from "@/components/sustainability-calendar-widget";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  BarChart3, 
  Building2, 
  Recycle, 
  TreePine, 
  GraduationCap, 
  PlayCircle,
  Calculator,
  ChevronRight,
  Globe2,
  TrendingUp,
  FileCheck
} from "lucide-react";

export default function HomePage() {
  const [employeeCount, setEmployeeCount] = useState(250);
  const [wasteTonnes, setWasteTonnes] = useState(10);

  const estimatedDiversion = Math.min(96, Math.round(75 + (employeeCount > 100 ? 15 : 8)));
  const estimatedCarbonOffset = Math.round(wasteTonnes * 1.85 * 12);
  const estimatedSavingsINR = Math.round(wasteTonnes * 3200 * 12);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Subtle glowing ambient circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <FadeIn duration={0.6} className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                AI-Driven Environmental Education for Everyone, Everywhere
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">Sustainable Futures</span> through Environmental Education
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                We equip forward-thinking enterprises, industrial leaders, and workforces with practical training in <strong>Waste Management</strong>, <strong>Corporate ESG Compliance (BRSR)</strong>, and <strong>Circular Economy</strong> frameworks.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <AnimatedButton href="/programs" variant="primary" icon className="w-full sm:w-auto px-8 py-4 text-sm">
                  Explore Training Programs
                </AnimatedButton>

                <AnimatedButton href="/learn/waste-management-recycling" variant="dark" className="w-full sm:w-auto px-6 py-4 text-sm">
                  <PlayCircle className="w-4 h-4 text-emerald-400 mr-1" />
                  Try Interactive Video Demo
                </AnimatedButton>
              </div>

              {/* Key Trust Checkmarks */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Customized by Industry Sector
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Mode: Online / Offline / Hybrid
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Duration: 2 to 8 Hours
                </span>
              </div>

            </FadeIn>

            {/* Right Card / Interactive Preview */}
            <FadeIn delay={0.2} duration={0.7} className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-md hover:border-emerald-500/40 transition-colors duration-300">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    EWS Learning Live Impact
                  </span>
                </div>

                {/* Hero Feature Box */}
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
                    <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold mb-1">
                      <span>Corporate Workforce Trained</span>
                      <span>7,380+ Ground Staff</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[88%] rounded-full transition-all duration-1000"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                      <div className="text-xs text-slate-400 font-medium">Avg. Waste Diverted</div>
                      <div className="text-2xl font-black text-emerald-400 mt-1">94.2%</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Post-training audit score</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                      <div className="text-xs text-slate-400 font-medium">Verified Certificates</div>
                      <div className="text-2xl font-black text-teal-300 mt-1">6,400+</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">CPCB & BRSR compliant</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Ajay Kushwaha</div>
                        <div className="text-[11px] text-emerald-400">Waste Management & Recycling</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified ✓
                    </span>
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 2. CORPORATE CLIENTS & PARTNERS MARQUEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Trusted by Leaders Across Manufacturing, Corporate Real Estate & Municipal Bodies
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 text-xs font-bold text-slate-700"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{partner.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({partner.category})</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 2.5 FEATURED PROGRAMS / COURSES (PLACED ABOVE CALENDAR ON ALL SCREENS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Verified Masterclasses
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Academy Programs
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Flexible delivery models tailored for corporate teams, plant directors, and sustainability managers.
            </p>
          </div>

          <AnimatedButton href="/programs" variant="secondary" icon>
            View Full Course Catalog ({PROGRAMS.length} Courses)
          </AnimatedButton>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROGRAMS.slice(0, 3).map((program) => (
            <StaggerItem key={program.id}>
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. SIDE-BY-SIDE ENTERPRISE CAPABILITY + 30% RIGHT-SIDE SUSTAINABILITY CALENDAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (70%): Enterprise Decarbonization & Compliance Capabilities */}
          <FadeIn className="lg:col-span-8 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Statutory Compliance & Decarbonization
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Transforming Workforces into Certified Environmental Stewards
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                EWS Learning equips Indian and multinational corporations with hands-on compliance frameworks, CPCB plastic EPR audit toolkits, and measurable landfill diversion methodologies.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  <Recycle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-xs">95%+ Landfill Diversion</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  5-stream source segregation protocols that convert plant waste into revenue streams.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-xs">SEBI BRSR Evidence Packs</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  One-click exportable training attendance logs and audit manifests for statutory auditors.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-xs">Verified Certifications</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tamper-proof digital credentials with LinkedIn integration and public registry lookup.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/corporate"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Enterprise Corporate Hub</span>
              </Link>
              <Link
                href="/programs"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
              >
                <span>View All 4 Curricula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Right Column (30%): Compact Scrollable Sustainability Calendar Widget */}
          <FadeIn delay={0.15} className="lg:col-span-4 h-full">
            <SustainabilityCalendarWidget />
          </FadeIn>

        </div>
      </section>

      {/* 3. FOUR CORE SERVICE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            End-to-End Environmental Capability
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Environmental Training & Advisory Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tailored curricula delivering measurable compliance, landfill diversion, and tangible ESG milestones.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <StaggerItem>
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Recycle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Waste Management & Recycling Programs
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Comprehensive training in 5-stream segregation, organic composting, and authorized recycler integration.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link href="/programs/waste-management-recycling" className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:underline">
                  <span>View Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Corporate Sustainability & ESG Strategy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Master SEBI BRSR Core Principles, Scope 1-3 GHG accounting, and corporate net-zero roadmaps.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link href="/programs/corporate-sustainability-esg" className="text-xs font-bold text-teal-700 flex items-center gap-1 group-hover:underline">
                  <span>View Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <TreePine className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Circular Economy & EPR Compliance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Practical pathways for Extended Producer Responsibility, plastic credit trading, and zero-waste audits.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link href="/programs/circular-economy-epr" className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:underline">
                  <span>View Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-800 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                  Sustainable Workforce Development
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive workshops empowering ground housekeeping, operations, and facility teams with green skills.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link href="/programs/sustainable-workforce-development" className="text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:underline">
                  <span>View Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>

      {/* 4. INTERACTIVE SUSTAINABILITY ROI CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                <Calculator className="w-3.5 h-3.5" />
                Interactive Business Case
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Calculate Your Facility&apos;s Landfill Diversion & Carbon ROI
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                See how training your ground workforce and staff directly lowers waste disposal tipping fees and fulfills mandatory SEBI BRSR environmental disclosures.
              </p>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Total Workforce / Campus Headcount</span>
                    <span className="text-emerald-400 font-mono font-bold">{employeeCount} Staff</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="2500"
                    step="25"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Estimated Monthly Waste Generated</span>
                    <span className="text-teal-300 font-mono font-bold">{wasteTonnes} Tonnes / Mo</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={wasteTonnes}
                    onChange={(e) => setWasteTonnes(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Metrics Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 hover:border-emerald-500/40 transition-colors">
                <div className="text-xs text-slate-400 font-semibold">Landfill Diversion</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">{estimatedDiversion}%</div>
                <div className="text-[11px] text-slate-400">Post-implementation</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 hover:border-teal-500/40 transition-colors">
                <div className="text-xs text-slate-400 font-semibold">Annual CO₂ Offset</div>
                <div className="text-3xl sm:text-4xl font-black text-teal-300">{estimatedCarbonOffset} T</div>
                <div className="text-[11px] text-slate-400">MT CO₂e prevented</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 hover:border-emerald-500/40 transition-colors">
                <div className="text-xs text-slate-400 font-semibold">Est. Annual Value</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">₹{(estimatedSavingsINR / 100000).toFixed(1)} L</div>
                <div className="text-[11px] text-slate-400">Recyclable revenue & savings</div>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* 5. VERIFIED TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeIn className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Proven Industry Impact & Testimonials
          </h2>
          <p className="text-slate-600 text-sm">
            Read how organizations achieved certified compliance and measurable zero-waste milestones.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <TestimonialsCarousel />
        </FadeIn>
      </section>

      {/* 7. NEWSLETTER & CTA DISPATCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center max-w-4xl mx-auto space-y-6 border border-slate-800 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
            <Globe2 className="w-3.5 h-3.5" />
            Stay Ahead of Indian & Global Environmental Mandates
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-xl mx-auto">
            Ready to Upskill Your Workforce & Ensure 100% ESG Compliance?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Schedule a confidential briefing with our environmental engineering faculty to design a customized training roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <AnimatedButton href="/contact" variant="primary" icon className="w-full sm:w-auto px-8 py-3.5">
              Request Corporate Training Proposal
            </AnimatedButton>
            <AnimatedButton href="/corporate" variant="dark" className="w-full sm:w-auto px-6 py-3.5">
              Explore Corporate Portal
            </AnimatedButton>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
