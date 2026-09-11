"use client";

import React from "react";
import Link from "next/link";
import { Recycle, BarChart3, Building2, TreePine, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: "waste",
      icon: Recycle,
      title: "Waste Management Audits & Stream Analysis",
      subtitle: "Eliminate landfill liabilities and unlock secondary material recovery.",
      description: "Our certified environmental auditors conduct deep-dive waste stream characterizations across manufacturing campuses, tech parks, and residential townships. We implement 5-stream segregation, establish chain-of-custody documentation, and ensure 100% compliance with Municipal Solid Waste (MSW) and Hazardous Waste Rules.",
      features: [
        "Onsite material flow characterization & diversion metrics",
        "Form 10 hazardous manifest & CPCB compliance filing",
        "Integration with authorized recyclers & secondary raw material buyers",
        "Bilingual ground-staff standard operating procedures (SOPs)"
      ],
      ctaText: "Explore Waste Training",
      ctaLink: "/programs/waste-management-recycling"
    },
    {
      id: "corporate",
      icon: BarChart3,
      title: "Corporate Sustainability & BRSR Advisory",
      subtitle: "Boardroom-ready ESG governance and decarbonization roadmaps.",
      description: "We help listed and pre-IPO enterprises navigate SEBI's BRSR Core mandates, Greenhouse Gas (GHG) Protocol Scope 1/2/3 accounting, and Science-Based Targets (SBTi). We convert abstract sustainability goals into audit-proof quantitative disclosures that satisfy institutional investors.",
      features: [
        "Complete BRSR 9-Principle reporting matrix setup",
        "Activity data collection systems across distributed business units",
        "Supply chain ESG vendor questionnaires & scoring",
        "Net-zero transition timelines and internal carbon pricing models"
      ],
      ctaText: "Explore ESG Programs",
      ctaLink: "/programs/corporate-sustainability"
    },
    {
      id: "recycling",
      icon: Building2,
      title: "Recycling Industry Trainings & EPR Fulfilment",
      subtitle: "Plastic, battery, and e-waste regulatory compliance enablement.",
      description: "Navigating Extended Producer Responsibility (EPR) mandates is critical for Producers, Importers, and Brand Owners (PIBOs). We deliver end-to-end training and operational protocols for formalizing collection networks, auditing recyclers, and managing CPCB portal credits.",
      features: [
        "Plastic Waste Management (PWM) Rules Category I-IV credit models",
        "E-waste recycling and circular take-back schemes",
        "Battery Waste Management Rules compliance",
        "Post-Consumer Recycled (PCR) material specification"
      ],
      ctaText: "Explore EPR Programs",
      ctaLink: "/programs/circular-economy-epr"
    },
    {
      id: "workforces",
      icon: TreePine,
      title: "Sustainable Workforces & Green Skills Academy",
      subtitle: "Transforming everyday employees into proactive climate champions.",
      description: "Achieving organizational net-zero goals requires active participation from every department. Our interactive e-learning modules and on-premise workshops empower employees with actionable green habits, reducing campus utility consumption and fostering an eco-conscious culture.",
      features: [
        "Gamified micro-learning suitable for all employee tiers",
        "Departmental Green Challenges (HR, IT, Cafeteria, Operations)",
        "Verified digital employee green badges & certificates",
        "Real-time employee participation analytics for CSR/HR reports"
      ],
      ctaText: "Explore Workforce Programs",
      ctaLink: "/programs/sustainable-workforces"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            End-to-End Capabilities
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            EWS Sustainability & Environmental Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We partner with enterprises, industrial plants, and academic institutions to deliver actionable training, audit frameworks, and compliance excellence.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {services.map((s, index) => (
            <div
              key={s.id}
              id={s.id}
              className={`bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <s.icon className="w-7 h-7" />
                </div>
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{s.title}</h2>
                  <p className="text-sm font-semibold text-emerald-700 mt-1">{s.subtitle}</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {s.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href={s.ctaLink}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>{s.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Request Consultation
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 rounded-2xl p-8 text-white space-y-6">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  Compliance & Quality Guarantee
                </div>
                <h3 className="text-xl font-bold">Audit-Ready Certification</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every training program and advisory service is designed in strict conformance with statutory CPCB, SPCB, and SEBI regulations.
                </p>
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-emerald-300">
                  ⚡ 100% of participants pass statutory audit knowledge assessments.
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
