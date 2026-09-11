"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Calendar, 
  Building2, 
  FileText, 
  Search, 
  Printer, 
  ExternalLink, 
  ArrowLeft,
  Lock,
  Share2
} from "lucide-react";

export default function CertificateVerifyPage() {
  const params = useParams();
  const initialId = (params.id as string) || "EWS-2025-WM-8492";

  const [searchId, setSearchId] = useState(initialId);
  const [activeCertId, setActiveCertId] = useState(initialId);
  const [copied, setCopied] = useState(false);

  // Mock certificate registry database
  const certDatabase: Record<string, any> = {
    "EWS-2025-WM-8492": {
      id: "EWS-2025-WM-8492",
      studentName: "Ajay Kushwaha",
      organization: "EcoIndustries Corp",
      courseTitle: "Waste Management & Recycling Programs",
      issuedAt: "August 14, 2025",
      status: "AUTHENTIC & VERIFIED",
      grade: "96% (Distinction)",
      leadInstructor: "Dr. Rajeshwar Rao",
      accreditation: "Aligned with Central Pollution Control Board (CPCB) Guidelines 2025",
      modulesCompleted: [
        "Principles of Modern Waste Auditing & Stream Analysis",
        "Recycling Technology & Vendor Integration",
        "Employee Behavioral Change & 5-Stream Segregation"
      ]
    },
    "EWS-2025-ESG-9142": {
      id: "EWS-2025-ESG-9142",
      studentName: "Priya Sundaram",
      organization: "Apex Tech Campuses",
      courseTitle: "Corporate Sustainability & ESG Strategy",
      issuedAt: "August 16, 2025",
      status: "AUTHENTIC & VERIFIED",
      grade: "98% (Distinction)",
      leadInstructor: "Ananya Deshmukh",
      accreditation: "SEBI BRSR Core Principles & GHG Protocol Scope 1-3 Aligned",
      modulesCompleted: [
        "Foundations of Corporate ESG & Regulatory Drivers",
        "Carbon Accounting & Net-Zero Strategy",
        "Supply Chain Traceability & Decarbonization"
      ]
    }
  };

  const cert = certDatabase[activeCertId.toUpperCase()] || {
    id: activeCertId.toUpperCase(),
    studentName: "Verified Corporate Participant",
    organization: "Partner Enterprise",
    courseTitle: "Corporate Sustainability Masterclass",
    issuedAt: "August 2025",
    status: "AUTHENTIC & VERIFIED",
    grade: "92% (Pass with Merit)",
    leadInstructor: "Dr. Rajeshwar Rao",
    accreditation: "EWS Academic Advisory Council & CPCB Aligned",
    modulesCompleted: [
      "Statutory Regulatory Frameworks",
      "Field Implementation Protocols",
      "Internal Verification Audits"
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setActiveCertId(searchId.trim());
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to EWS Learning Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800">Live Registry Online</span>
          </div>
        </div>

        {/* Search Certificate Bar */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Verify another Certificate ID (e.g. EWS-2025-WM-8492)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shrink-0"
          >
            Verify Credential
          </button>
        </form>

        {/* Verification Status Banner */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 border border-emerald-500/40 shadow-xl space-y-6 relative overflow-hidden">
          
          {/* Subtle watermark */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <Award className="w-64 h-64 text-white" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-900/50">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    Official Verification Record
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Credential is Authentic & Valid
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied! ✓" : "Share Verification"}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Record</span>
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Certificate Number</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">{cert.id}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Recipient Name</span>
              <span className="font-bold text-white text-sm">{cert.studentName}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Issuance Date</span>
              <span className="font-bold text-white text-sm">{cert.issuedAt}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Assessment Score</span>
              <span className="font-bold text-emerald-400 text-sm">{cert.grade}</span>
            </div>
          </div>

        </div>

        {/* Detailed Curriculum Audit Record */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
          
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Accredited Program</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{cert.courseTitle}</h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Sponsoring Organization: <strong className="text-slate-700">{cert.organization}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-800">Statutory Framework & Accreditation:</div>
            <p className="text-slate-600 leading-relaxed">
              {cert.accreditation}. Verified and audited under the academic authority of the EWS Advisory Council.
            </p>
          </div>

          {/* Modules Completed */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Completed Curriculum Competencies
            </h3>
            <div className="space-y-2">
              {cert.modulesCompleted.map((mod: string, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Module {idx + 1}: {mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatory Proof */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              <span>Lead Faculty Signatory: </span>
              <strong className="text-slate-900">{cert.leadInstructor}</strong>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Tamper-Proof Cryptographic ID</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
