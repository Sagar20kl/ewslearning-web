"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RBACGuard } from "@/components/rbac-guard";
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle2, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Plus, 
  Mail, 
  FileSpreadsheet, 
  BarChart3, 
  Sparkles,
  ArrowUpRight,
  Filter
} from "lucide-react";

interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  department: "Plant & Facilities" | "ESG & Compliance" | "Procurement" | "Executive Management";
  program: string;
  progress: number;
  assessmentScore: string;
  status: "COMPLETED" | "IN_PROGRESS" | "INVITED";
  completionDate?: string;
  certificateId?: string;
}

export default function CorporatePortalPage() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteProgram, setInviteProgram] = useState("Waste Management & Recycling Programs");
  const [inviteDept, setInviteDept] = useState("Plant & Facilities");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const [employees, setEmployees] = useState<EmployeeRecord[]>([
    {
      id: "emp-101",
      name: "Ajay Kushwaha",
      email: "ajay.k@ecoindustries.in",
      department: "Plant & Facilities",
      program: "Waste Management & Recycling Programs",
      progress: 100,
      assessmentScore: "96%",
      status: "COMPLETED",
      completionDate: "Aug 14, 2025",
      certificateId: "EWS-2025-WM-8492"
    },
    {
      id: "emp-102",
      name: "Priya Sundaram",
      email: "priya.s@ecoindustries.in",
      department: "ESG & Compliance",
      program: "Corporate Sustainability & ESG Strategy",
      progress: 100,
      assessmentScore: "98%",
      status: "COMPLETED",
      completionDate: "Aug 16, 2025",
      certificateId: "EWS-2025-ESG-9142"
    },
    {
      id: "emp-103",
      name: "Rohan Verma",
      email: "rohan.v@ecoindustries.in",
      department: "Procurement",
      program: "Circular Economy & Extended Producer Responsibility",
      progress: 75,
      assessmentScore: "Pending",
      status: "IN_PROGRESS"
    },
    {
      id: "emp-104",
      name: "Meera Nair",
      email: "meera.n@ecoindustries.in",
      department: "Executive Management",
      program: "Corporate Sustainability & ESG Strategy",
      progress: 100,
      assessmentScore: "92%",
      status: "COMPLETED",
      completionDate: "Aug 10, 2025",
      certificateId: "EWS-2025-ESG-8821"
    },
    {
      id: "emp-105",
      name: "Vikram Sengupta",
      email: "vikram.s@ecoindustries.in",
      department: "Plant & Facilities",
      program: "Waste Management & Recycling Programs",
      progress: 40,
      assessmentScore: "Pending",
      status: "IN_PROGRESS"
    }
  ]);

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();
    const rawList = inviteEmails.split(/[\n,]+/).map((e) => e.trim()).filter((e) => e.length > 5);
    
    const newRecords: EmployeeRecord[] = rawList.map((email, idx) => ({
      id: `emp-${Date.now()}-${idx}`,
      name: email.split("@")[0].replace(".", " "),
      email,
      department: inviteDept as any,
      program: inviteProgram,
      progress: 0,
      assessmentScore: "Not Started",
      status: "INVITED"
    }));

    setEmployees((prev) => [...newRecords, ...prev]);
    setInviteEmails("");
    setInviteSuccess(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteSuccess(false);
    }, 1500);
  };

  const handleExportBRSRPack = () => {
    const csvHeader = "EmployeeID,Name,Email,Department,Program,ProgressPercent,Score,Status,CertificateID,CompletionDate\n";
    const csvRows = employees
      .map(
        (e) =>
          `"${e.id}","${e.name}","${e.email}","${e.department}","${e.program}","${e.progress}%","${e.assessmentScore}","${e.status}","${e.certificateId || "N/A"}","${e.completionDate || "N/A"}"`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EWS_Corporate_BRSR_Compliance_Audit_Pack_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filtered = employees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.program.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === "All" || emp.department === selectedDept;
    return matchSearch && matchDept;
  });

  const completedCount = employees.filter((e) => e.status === "COMPLETED").length;
  const avgScore = "95.3%";

  return (
    <RBACGuard allowedRoles={["CORPORATE_CLIENT", "ADMIN"]} pageName="Corporate Enterprise Portal">
      <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Enterprise Client Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
              <Building2 className="w-3.5 h-3.5" />
              EcoIndustries Corp • B2B Enterprise Account
            </div>
            <h1 className="text-3xl font-black tracking-tight">Corporate Sustainability & Compliance Vault</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Track real-time employee training milestones, verify department completion ratios, and export auditor-ready evidence packs for SEBI BRSR Principle 6 compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportBRSRPack}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download BRSR Audit Pack</span>
            </button>

            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Bulk Enroll Employees</span>
            </button>
          </div>
        </div>

        {/* Enterprise Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>Trained Workforce</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">{employees.length} Staff</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Across 4 departments</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>Completion Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">
              {Math.round((completedCount / employees.length) * 100)}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{completedCount} certified graduates</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>Avg. Audit Score</span>
              <Award className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">{avgScore}</div>
            <div className="text-[11px] text-teal-600 font-semibold mt-1">CPCB benchmark compliant</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>Landfill Diversion</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-700 mt-2">184.2 T</div>
            <div className="text-[11px] text-slate-400 mt-1">Audited annual impact</div>
          </div>
        </div>

        {/* Employee Roster Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Enrolled Employee Roster & Compliance Status</h2>
              <p className="text-xs text-slate-500">Live progress tracking and verifiable digital credential hashes</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="All">All Departments</option>
                <option value="Plant & Facilities">Plant & Facilities</option>
                <option value="ESG & Compliance">ESG & Compliance</option>
                <option value="Procurement">Procurement</option>
                <option value="Executive Management">Executive Management</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Employee Details</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Enrolled Program</th>
                  <th className="py-3 px-4">Progress & Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{emp.name}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{emp.email}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {emp.department}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-emerald-800">{emp.program}</span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              emp.progress === 100 ? "bg-emerald-500" : "bg-teal-500"
                            }`}
                            style={{ width: `${emp.progress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700">{emp.progress}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Exam Score: {emp.assessmentScore}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          emp.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : emp.status === "IN_PROGRESS"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {emp.status === "COMPLETED" ? "Certified ✓" : emp.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      {emp.certificateId ? (
                        <Link
                          href={`/verify/${emp.certificateId}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 font-bold inline-flex items-center gap-1 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verify Cert</span>
                        </Link>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">In Progress</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Bulk Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Bulk Enroll Employee Batch</h3>
              <p className="text-xs text-slate-500">
                Paste corporate email addresses to grant instant training access and automated progress reporting.
              </p>
            </div>

            {inviteSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Invites sent successfully! Employees added to company dashboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSendInvites} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Program *</label>
                  <select
                    value={inviteProgram}
                    onChange={(e) => setInviteProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Waste Management & Recycling Programs">Waste Management & Recycling Programs</option>
                    <option value="Corporate Sustainability & ESG Strategy">Corporate Sustainability & ESG Strategy</option>
                    <option value="Circular Economy & Extended Producer Responsibility">Circular Economy & Extended Producer Responsibility</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Department *</label>
                  <select
                    value={inviteDept}
                    onChange={(e) => setInviteDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Plant & Facilities">Plant & Facilities</option>
                    <option value="ESG & Compliance">ESG & Compliance</option>
                    <option value="Procurement">Procurement</option>
                    <option value="Executive Management">Executive Management</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Employee Email Addresses (separated by commas or newlines) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                    placeholder="karan@ecoindustries.in&#10;sunil@ecoindustries.in&#10;neha@ecoindustries.in"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md"
                  >
                    Send Enrollment Passes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      </div>
    </RBACGuard>
  );
}
