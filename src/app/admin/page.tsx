"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROGRAMS, Program } from "@/data/programs";
import { INITIAL_BLOGS, BlogPost } from "@/data/blogs";
import { RBACGuard } from "@/components/rbac-guard";
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Mail, 
  Phone, 
  Download, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ArrowUpRight,
  Filter,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  Bot,
  Globe2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Video,
  FileUp,
  PlayCircle,
  FileText,
  Layers,
  Mic,
  Sliders,
  Check
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  programInterest: string;
  teamSize: string;
  mode: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "PROPOSAL_SENT" | "ENROLLED";
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "pdf_course_creator" | "blogs" | "programs">("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [programsList, setProgramsList] = useState<Program[]>(PROGRAMS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Blog Generator State
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [blogSuccessMessage, setBlogSuccessMessage] = useState("");

  // PDF Course Generator State
  const [courseTitle, setCourseTitle] = useState("Industrial Hazardous Waste & E-Waste Management Rules 2025");
  const [courseSector, setCourseSector] = useState<"Corporate" | "Industrial" | "Municipal" | "Universal">("Industrial");
  const [courseMode, setCourseMode] = useState<"Online" | "Offline" | "Hybrid">("Hybrid");
  const [courseLevel, setCourseLevel] = useState<"Beginner" | "Intermediate" | "Executive / Professional">("Intermediate");
  const [voiceAccent, setVoiceAccent] = useState("Indian English (Professional Female)");
  const [facultyName, setFacultyName] = useState("Dr. Rajeshwar Rao");
  const [pdfNotesText, setPdfNotesText] = useState(`
CHAPTER 1: STATUTORY COMPLIANCE UNDER HAZARDOUS AND OTHER WASTES RULES (HOWM)
All manufacturing and industrial facilities generating category A/B hazardous waste sludge, spent solvents, and toxic residues must comply with Form 10 hazardous manifest tracking. 

CHAPTER 2: STORAGE, LABELLING, AND TRANSPORTATION PROTOCOLS
Containers must be colour-coded and labelled with chemical hazard hazard warning symbols. Maximum onsite storage without State Pollution Control Board (SPCB) extension is 90 days for facilities generating over 10 tonnes per annum.

CHAPTER 3: CHAIN OF CUSTODY AUDITS & RECYCLING VENDOR VETTING
Before handing over waste to Treatment, Storage and Disposal Facilities (TSDF) or authorized coprocessing cement kilns, facility managers must verify the recycler's Consent to Operate (CTO) and annual processing capacity.
  `.trim());

  const [isGeneratingCourse, setIsGeneratingCourse] = useState(false);
  const [courseSuccessResult, setCourseSuccessResult] = useState<{
    title: string;
    learnUrl: string;
    programUrl: string;
  } | null>(null);

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setBlogs(json.data);
      }
    } catch (e) {
      console.log("Using cached blogs in admin:", e);
    }
  };

  useEffect(() => {
    const defaultInquiries: Inquiry[] = [
      {
        id: "inq-101",
        name: "Vikram Malhotra",
        email: "vikram@techcampuses.com",
        phone: "+91 98200 12345",
        organization: "TechCampuses SEZ Ltd",
        programInterest: "Waste Management & Recycling Programs",
        teamSize: "200 - 500 Employees",
        mode: "Hybrid (Online + Onsite Workshop)",
        message: "Need immediate waste stream characterization and BRSR audit training for our Gurugram facility.",
        status: "NEW",
        createdAt: "Today, 11:20 AM"
      },
      {
        id: "inq-102",
        name: "Sanjana Rao",
        email: "sanjana.rao@globalfmcg.in",
        phone: "+91 97111 88990",
        organization: "Global FMCG Brands",
        programInterest: "Circular Economy & Extended Producer Responsibility",
        teamSize: "50 - 200 Employees",
        mode: "100% Online Self-Paced & Live",
        message: "Looking to train our packaging sourcing engineers on CPCB plastic credit models.",
        status: "PROPOSAL_SENT",
        createdAt: "Yesterday, 3:45 PM"
      }
    ];

    if (typeof window !== "undefined") {
      const local = JSON.parse(localStorage.getItem("ews_inquiries") || "[]");
      setInquiries([...local, ...defaultInquiries]);
    }

    loadBlogs();
  }, []);

  const handleGenerateWeeklyBlog = async (category?: string) => {
    setIsGeneratingBlog(true);
    setBlogSuccessMessage("");
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setBlogSuccessMessage(`Successfully compiled and published: "${data.data.title}"!`);
          setBlogs((prev) => [data.data, ...prev.filter((b) => b.id !== data.data.id)]);
        }
      }
    } catch (e) {
      console.error("Failed to generate blog:", e);
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  const handleGenerateCourseFromPDF = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCourse(true);
    setCourseSuccessResult(null);

    try {
      const res = await fetch("/api/courses/generate-from-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseTitle,
          sector: courseSector,
          mode: courseMode,
          level: courseLevel,
          rawNotesOrPdfText: pdfNotesText,
          instructorName: facultyName,
          voiceAccent,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setCourseSuccessResult({
          title: json.data.title,
          learnUrl: json.learnUrl,
          programUrl: json.programUrl,
        });
        setProgramsList([json.data, ...PROGRAMS]);
      }
    } catch (err) {
      console.error("Course generation failed:", err);
    } finally {
      setIsGeneratingCourse(false);
    }
  };

  const loadPreset = (preset: "hazard" | "zerowaste" | "carbon") => {
    if (preset === "hazard") {
      setCourseTitle("Industrial Hazardous Waste & E-Waste Management Rules 2025");
      setCourseSector("Industrial");
      setPdfNotesText(`
MODULE 1: STATUTORY HAZARDOUS MANIFEST (FORM 10) & SPCB COMPLIANCE
Detailed breakdown of classification, storage limits, and annual filing under Hazardous and Other Wastes Rules.

MODULE 2: E-WASTE & BATTERY WASTE RECYCLER INTEGRATION
Standard operating procedures for battery take-back manifests and vetting R2-certified e-waste recyclers.

MODULE 3: EMERGENCY SPILL CONTAINMENT & AUDIT CERTIFICATION
Ground staff safety, PPE protocols, toxic runoff containment, and audit checklist execution.
      `.trim());
    } else if (preset === "zerowaste") {
      setCourseTitle("Zero-Waste Campus & Commercial Composting Masterclass");
      setCourseSector("Corporate");
      setPdfNotesText(`
MODULE 1: 5-STREAM RECYCLABLE & ORGANIC SEGREGATION
Deploying standardized color-coded bins, cafeteria food waste segregation, and contamination mitigation.

MODULE 2: ONSITE COMPOSTING & BIOMETHANATION SYSTEMS
Aerobic composting units, vermiculture maintenance, and calculating secondary soil fertilizer yields.

MODULE 3: EMPLOYEE GREEN AMBASSADORSHIP & CERTIFICATION
Gamification nudges, departmental green audits, and verifiable campus zero-waste certification.
      `.trim());
    } else if (preset === "carbon") {
      setCourseTitle("Carbon Accounting & Scope 1-3 GHG Measurement for Exporters");
      setCourseSector("Corporate");
      setPdfNotesText(`
MODULE 1: GHG PROTOCOL & SEBI BRSR CORE PRINCIPLES
Activity data collection for direct fuel combustion (Scope 1) and purchased electricity (Scope 2).

MODULE 2: SUPPLY CHAIN (SCOPE 3) & EU CBAM COMPLIANCE
Calculating embedded carbon intensity per tonne of exported goods to satisfy European import tariffs.

MODULE 3: SCIENCE-BASED TARGETS (SBTI) & DECARBONIZATION ROADMAPS
Renewable PPAs, energy efficiency retrofits, and high-integrity verified carbon credits.
      `.trim());
    }
  };

  const updateStatus = (id: string, newStatus: Inquiry["status"]) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("ews_inquiries", JSON.stringify(updated));
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Phone,Organization,Program,TeamSize,Mode,Status,CreatedAt\n";
    const rows = inquiries
      .map(
        (i) =>
          `"${i.id}","${i.name}","${i.email}","${i.phone}","${i.organization}","${i.programInterest}","${i.teamSize}","${i.mode}","${i.status}","${i.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EWS_Corporate_Leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.organization.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || inq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <RBACGuard allowedRoles={["ADMIN"]} pageName="Executive Admin CMS">
      <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              EWS Learning Executive Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Lead, AI Video Course & Blog CMS</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage corporate inquiries, convert PDF training manuals to interactive video courses, and publish weekly global blogs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Leads CSV</span>
            </button>
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Test Inquiry Form</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Total Leads</span>
              <Mail className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">{inquiries.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Active corporate quotes</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Live Programs</span>
              <BookOpen className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">{programsList.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">Active video curricula</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Published Blogs</span>
              <Globe2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">{blogs.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Automated news digests</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Est. Pipeline</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-700 mt-2">₹14.2 L</div>
            <div className="text-[11px] text-slate-400 mt-1">Corporate group quotes</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-8 text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-3 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "inquiries"
                ? "border-b-2 border-emerald-600 text-emerald-800"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Corporate Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pdf_course_creator")}
            className={`pb-3 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "pdf_course_creator"
                ? "border-b-2 border-emerald-600 text-emerald-800"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Video className="w-4 h-4 text-emerald-600" />
            <span>✨ AI PDF to Video Course Creator</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`pb-3 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "blogs"
                ? "border-b-2 border-emerald-600 text-emerald-800"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>AI Blog Studio ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("programs")}
            className={`pb-3 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "programs"
                ? "border-b-2 border-emerald-600 text-emerald-800"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>All Courses ({programsList.length})</span>
          </button>
        </div>

        {/* Tab 1: Inquiries Inbox */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leads by name or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold">Status:</span>
                {["All", "NEW", "CONTACTED", "PROPOSAL_SENT", "ENROLLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      filterStatus === st
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Organization & Contact</th>
                    <th className="py-3 px-4">Program Interest</th>
                    <th className="py-3 px-4">Group Size & Mode</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{inq.organization}</div>
                        <div className="text-slate-600">{inq.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{inq.email} • {inq.phone}</div>
                        {inq.message && (
                          <p className="text-[11px] text-slate-500 italic mt-1 max-w-sm line-clamp-1">
                            &quot;{inq.message}&quot;
                          </p>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {inq.programInterest}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-700">{inq.teamSize}</div>
                        <div className="text-[11px] text-slate-400">{inq.mode}</div>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => updateStatus(inq.id, e.target.value as Inquiry["status"])}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-hidden cursor-pointer ${
                            inq.status === "NEW"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : inq.status === "CONTACTED"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : inq.status === "PROPOSAL_SENT"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                          <option value="ENROLLED">ENROLLED ✓</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-slate-400 text-[11px]">
                        {inq.createdAt}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <a
                          href={`mailto:${inq.email}?subject=EWS Learning Proposal for ${inq.organization}`}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Email Lead</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: AI PDF to Video Course Creator */}
        {activeTab === "pdf_course_creator" && (
          <div className="space-y-8">
            
            {/* Header Box */}
            <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Autonomous PDF-to-Video Curriculum Engine
                </div>
                <h2 className="text-2xl sm:text-3xl font-black">AI Course & Video Lecture Studio</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Upload any training manual, statutory compliance PDF, or environmental guideline. The AI Agent breaks it down into bite-sized modules, creates spoken voiceover lectures, and publishes the course directly to your Academy.
                </p>
              </div>
            </div>

            {/* Success Result Box */}
            {courseSuccessResult && (
              <div className="bg-emerald-950 border border-emerald-500 p-6 rounded-3xl text-white shadow-xl space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-emerald-300">Course Synthesized & Published Successfully!</h3>
                    <p className="text-xs text-slate-300">
                      &quot;{courseSuccessResult.title}&quot; is now live with 3 modules and 5 video lectures.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={courseSuccessResult.learnUrl}
                    target="_blank"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Open in Interactive Learning Room</span>
                  </Link>

                  <Link
                    href={courseSuccessResult.programUrl}
                    target="_blank"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Public Enrollment Page</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Course Creator Form */}
            <form onSubmit={handleGenerateCourseFromPDF} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>Upload & Configure New Video Course</span>
                </h3>

                {/* 1-Click Sample Presets */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">Load Sample Presets:</span>
                  <button
                    type="button"
                    onClick={() => loadPreset("hazard")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold"
                  >
                    Hazardous Waste
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset("zerowaste")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold"
                  >
                    Zero Waste Campus
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset("carbon")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold"
                  >
                    Carbon Scope 1-3
                  </button>
                </div>
              </div>

              {/* Course Title & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="e.g. Industrial Hazardous Waste & E-Waste Management Rules 2025"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Industry Sector</label>
                  <select
                    value={courseSector}
                    onChange={(e) => setCourseSector(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Industrial">Industrial & Manufacturing</option>
                    <option value="Corporate">Corporate & IT Enterprises</option>
                    <option value="Municipal">Municipal & Urban Local Bodies</option>
                    <option value="Universal">Universal / All Employees</option>
                  </select>
                </div>
              </div>

              {/* Settings Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Delivery Mode</label>
                  <select
                    value={courseMode}
                    onChange={(e) => setCourseMode(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Hybrid">Hybrid (Online Videos + Workshop)</option>
                    <option value="Online">100% Online Self-Paced</option>
                    <option value="Offline">Onsite Masterclass</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">AI Voiceover Narrator</label>
                  <select
                    value={voiceAccent}
                    onChange={(e) => setVoiceAccent(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Indian English (Professional Female)">Indian English (Professional Female)</option>
                    <option value="Indian English (Authoritative Male)">Indian English (Authoritative Male)</option>
                    <option value="Global English (Neutral Female)">Global English (Neutral Female)</option>
                    <option value="Global English (Corporate Male)">Global English (Corporate Male)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Lead Faculty Name</label>
                  <input
                    type="text"
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* PDF Content / Notes Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    PDF Document Text / Course Chapters *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Paste raw guideline text, SOP chapters, or training handbook
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={pdfNotesText}
                  onChange={(e) => setPdfNotesText(e.target.value)}
                  placeholder="Paste compliance guidelines, chapters, or statutory requirements from your PDF document..."
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGeneratingCourse}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 active:scale-98 transition-all"
              >
                {isGeneratingCourse ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Deconstructing PDF, Drafting Video Lectures & Publishing Course...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>⚡ Generate Complete Video Course & Auto-Publish</span>
                  </>
                )}
              </button>

            </form>

          </div>
        )}

        {/* Tab 3: AI Blog Studio */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
                  <Bot className="w-3.5 h-3.5" />
                  Auto-Pilot Status: Active (Runs Weekly Every Monday 9:00 AM IST)
                </div>
                <h2 className="text-2xl font-black">AI Sustainability News & Blog Generator</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Automatically pulls regulatory updates (CPCB, SEBI BRSR, HOWM 2016, EU CBAM, BWMR), synthesizes verified analysis, and publishes full articles to your live blog.
                </p>

                {/* 1-Click Topic Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-400">Generate By Topic:</span>
                  <button
                    type="button"
                    onClick={() => handleGenerateWeeklyBlog("EPR & Waste Management")}
                    disabled={isGeneratingBlog}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    🌿 CPCB Plastic EPR
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateWeeklyBlog("ESG & Decarbonization")}
                    disabled={isGeneratingBlog}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    📊 SEBI BRSR Scope 1-3
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateWeeklyBlog("Regulatory Compliance")}
                    disabled={isGeneratingBlog}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    ☣️ Hazardous Sludge HOWM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateWeeklyBlog("Global Policy")}
                    disabled={isGeneratingBlog}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    🌍 EU CBAM Tariffs
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateWeeklyBlog("Circular Economy")}
                    disabled={isGeneratingBlog}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    🔄 Battery & Zero-Waste
                  </button>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => handleGenerateWeeklyBlog()}
                  disabled={isGeneratingBlog}
                  className="px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 active:scale-98 transition-all"
                >
                  {isGeneratingBlog ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Fresh Article...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>⚡ Generate Next Dynamic Blog</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {blogSuccessMessage && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{blogSuccessMessage}</span>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Published Blog Articles ({blogs.length})</h3>
                <Link href="/blog" target="_blank" className="text-xs font-bold text-emerald-700 flex items-center gap-1 hover:underline">
                  <span>View Public Blog Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {blogs.map((b) => (
                  <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{b.title}</span>
                        {b.isAutoGenerated && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Auto AI Digest
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {b.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{b.excerpt}</p>
                      <div className="text-[11px] text-slate-400">Published: {b.publishedAt} • {b.readTime}</div>
                    </div>

                    <Link
                      href={`/blog/${b.slug}`}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shrink-0 inline-flex items-center gap-1"
                    >
                      <span>Read Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: All Programs Manager */}
        {activeTab === "programs" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Current Academy Offerings ({programsList.length})</h2>
                <p className="text-xs text-slate-500">Live programs displayed on ewslearning.com</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {programsList.map((program) => (
                <div key={program.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{program.title}</span>
                      {program.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {program.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {program.sector}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{program.tagline}</p>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {program.curriculum.length} Modules • Duration: {program.duration} • {program.enrolledCount} Enrollments
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">₹{program.priceINR.toLocaleString()} / ${program.priceUSD}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">Active & Live</div>
                    </div>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 bg-slate-50"
                    >
                      View Live Page
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        </div>
      </div>
    </RBACGuard>
  );
}
