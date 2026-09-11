"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROGRAMS } from "@/data/programs";
import { CertificateModal } from "@/components/certificate-modal";
import { RBACGuard } from "@/components/rbac-guard";
import { 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  PlayCircle, 
  Flame, 
  FileText, 
  Download, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export default function DashboardPage() {
  const [selectedCert, setSelectedCert] = useState<{
    courseTitle: string;
    completionDate: string;
    certId: string;
  } | null>(null);

  const enrolledCourses = [
    {
      program: PROGRAMS[0], // Waste Management
      progress: 66,
      currentLesson: "Conducting Source Segregation Audits & Material Flow Analysis",
      lastAccessed: "Today, 4:30 PM",
      status: "IN_PROGRESS"
    },
    {
      program: PROGRAMS[1], // Corporate ESG
      progress: 100,
      currentLesson: "Setting Science-Based Targets (SBTi) and Carbon Offsetting",
      lastAccessed: "Yesterday",
      status: "COMPLETED",
      certId: "EWS-2025-ESG-9142",
      completionDate: "August 14, 2025"
    },
    {
      program: PROGRAMS[2], // Sustainable Workforces
      progress: 25,
      currentLesson: "Smart Energy & Water Conservation Hacks",
      lastAccessed: "3 days ago",
      status: "IN_PROGRESS"
    }
  ];

  return (
    <RBACGuard allowedRoles={["STUDENT", "CORPORATE_CLIENT", "ADMIN"]} pageName="Student Learning Portal">
      <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile & Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Ajay Kushwaha"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black">Welcome back, Ajay!</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Scholar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Sustainability Manager • EcoIndustries Ltd.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/programs"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/40"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore New Programs</span>
            </Link>
          </div>
        </div>

        {/* Learning Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">In-Progress</span>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">2</div>
            <div className="text-[11px] text-slate-400 mt-1">Active certifications</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Completed</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-emerald-600 mt-2">1</div>
            <div className="text-[11px] text-slate-400 mt-1">Verified credential</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Hours Learned</span>
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">12.5</div>
            <div className="text-[11px] text-slate-400 mt-1">CPD training credits</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Weekly Streak</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-3xl font-black text-orange-500 mt-2">5 Days</div>
            <div className="text-[11px] text-slate-400 mt-1">Top 5% learner 🔥</div>
          </div>
        </div>

        {/* Active Enrolled Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Your Enrolled Programs</h2>
            <span className="text-xs text-slate-500">Auto-synced with company compliance tracker</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-500/60 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {item.program.sector}
                    </span>
                    {item.status === "COMPLETED" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700">
                        {item.progress}% Done
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {item.program.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    <span className="font-semibold text-slate-700">Current Lecture: </span>
                    {item.currentLesson}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.status === "COMPLETED" ? "bg-emerald-500" : "bg-emerald-600"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{item.lastAccessed}</span>

                  {item.status === "COMPLETED" ? (
                    <button
                      onClick={() =>
                        setSelectedCert({
                          courseTitle: item.program.title,
                          completionDate: item.completionDate || "August 14, 2025",
                          certId: item.certId || "EWS-2025-ESG-9142"
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificate</span>
                    </button>
                  ) : (
                    <Link
                      href={`/learn/${item.program.slug}`}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable Toolkits & Compliance Vault */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Compliance Vault & Downloads</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official statutory templates provided with your active enrollments.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700">3 Files Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Waste_Audit_2025.pdf</div>
                  <div className="text-[10px] text-slate-400">2.4 MB • Audit Kit</div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-200 text-slate-700">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-teal-600" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Scope_1_2_GHG.xlsx</div>
                  <div className="text-[10px] text-slate-400">850 KB • Excel Sheet</div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-200 text-slate-700">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">BRSR_Core_Matrix.pdf</div>
                  <div className="text-[10px] text-slate-400">3.2 MB • Whitepaper</div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-200 text-slate-700">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          studentName="Ajay Kushwaha"
          courseTitle={selectedCert.courseTitle}
          completionDate={selectedCert.completionDate}
          certificateId={selectedCert.certId}
        />
      )}

    </div>
    </RBACGuard>
  );
}
