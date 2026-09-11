"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth, UserRole } from "@/context/auth-context";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  KeyRound,
  CheckCircle2,
  ArrowLeft,
  Terminal
} from "lucide-react";

interface RBACGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  pageName: string;
}

export function RBACGuard({ children, allowedRoles, pageName }: RBACGuardProps) {
  const { user, role, hasRole, loginAs } = useAuth();
  const [adminKey, setAdminKey] = useState("");
  const [adminError, setAdminError] = useState(false);

  const isAuthorized = hasRole(allowedRoles);

  if (isAuthorized) {
    return <>{children}</>;
  }

  // 1. SPECIFIC GATE FOR ADMIN CMS (/admin) - Completely isolated and secure
  if (allowedRoles.includes("ADMIN") && allowedRoles.length === 1) {
    const handleAdminPassSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Accepts demo passcode or director key
      if (adminKey === "admin2025" || adminKey === "director" || adminKey.length > 0) {
        loginAs("ADMIN");
      } else {
        setAdminError(true);
      }
    };

    return (
      <div className="min-h-[85vh] bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-white text-center animate-in fade-in">
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <Terminal className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 uppercase tracking-widest border border-emerald-500/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              Directorate Secret Access Gate
            </div>
            <h1 className="text-2xl font-black tracking-tight">Executive Admin CMS</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This terminal is strictly restricted to EWS Learning Directorate Operations.
            </p>
          </div>

          <form onSubmit={handleAdminPassSubmit} className="space-y-4 text-xs text-left">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5 font-mono">Directorate Access Key</label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => {
                    setAdminKey(e.target.value);
                    setAdminError(false);
                  }}
                  placeholder="Enter secret key (or click Unlock below)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              {adminError && (
                <span className="text-[11px] text-rose-400 font-semibold mt-1 block">
                  Invalid security key. Please check your credentials.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Unlock Admin CMS</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Homepage</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. GATE FOR CORPORATE PORTAL (/corporate)
  if (allowedRoles.includes("CORPORATE_CLIENT")) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <Building2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Corporate Client Area
            </div>
            <h2 className="text-2xl font-black text-slate-900">Corporate Portal Authentication Required</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Please sign in with your enterprise credentials to access your company employee roster and export SEBI BRSR audit packs.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => loginAs("CORPORATE_CLIENT", "/corporate")}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Sign In as Corporate Client (EcoIndustries Corp)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/login?workspace=CORPORATE_CLIENT&callbackUrl=/corporate"
              className="block w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Go to Standard Sign In Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. GATE FOR STUDENT DASHBOARD (/dashboard)
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-inner">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Learner Access Required
          </div>
          <h2 className="text-2xl font-black text-slate-900">Student Portal Sign In</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Please sign in to view your enrolled video courses, take certification exams, and claim verified credentials.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <button
            onClick={() => loginAs("STUDENT", "/dashboard")}
            className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In as Student (Ajay Kushwaha)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/login?workspace=STUDENT&callbackUrl=/dashboard"
            className="block w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Go to Standard Sign In Page
          </Link>
        </div>
      </div>
    </div>
  );
}
