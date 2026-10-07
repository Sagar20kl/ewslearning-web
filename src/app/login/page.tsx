"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAuth, UserRole, WORKSPACE_LABELS, DEMO_ACCOUNTS } from "@/context/auth-context";
import { 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Sparkles,
  HelpCircle,
  Briefcase,
  Users,
  Database,
  Globe2,
  X,
  Send
} from "lucide-react";

function LoginFormContent() {
  const searchParams = useSearchParams();
  const { login, register, loginAs, isAuthenticated, role: activeRole } = useAuth();

  // Query parameter handling
  const callbackUrl = searchParams.get("callbackUrl");
  const isUnauthorized = searchParams.get("unauthorized") === "true";
  const initialWorkspaceParam = searchParams.get("workspace") as UserRole | null;
  const initialTabParam = searchParams.get("tab") || searchParams.get("mode");

  // Selected Workspace state
  const [selectedWorkspace, setSelectedWorkspace] = useState<UserRole>(() => {
    if (initialWorkspaceParam && ["CORPORATE_CLIENT", "STUDENT", "ADMIN"].includes(initialWorkspaceParam)) {
      return initialWorkspaceParam;
    }
    if (callbackUrl?.startsWith("/admin")) return "ADMIN";
    if (callbackUrl?.startsWith("/corporate")) return "CORPORATE_CLIENT";
    if (callbackUrl?.startsWith("/dashboard")) return "STUDENT";
    return "CORPORATE_CLIENT";
  });

  // Active form tab: "SIGN_IN" or "REGISTER"
  const [activeTab, setActiveTab] = useState<"SIGN_IN" | "REGISTER">(
    initialTabParam === "register" ? "REGISTER" : "SIGN_IN"
  );

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [department, setDepartment] = useState("");

  // Modals state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [showSsoModal, setShowSsoModal] = useState(false);

  // Feedback State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-clear errors on field change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  // Quick Autofill helper for demo evaluators
  const handleAutofillDemo = (targetRole: UserRole) => {
    setSelectedWorkspace(targetRole);
    const demo = DEMO_ACCOUNTS[targetRole];
    setEmail(demo.email);
    setPassword("admin2025");
    setErrorMessage(null);
  };

  // Handle Sign In Submit
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your work or institutional email address.");
      return;
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setErrorMessage("Please provide a valid email format (e.g., name@company.com).");
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        email: trimmedEmail,
        password: trimmedPassword || "admin2025",
        workspace: selectedWorkspace,
        rememberMe,
        callbackUrl,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
      } else {
        setSuccessMessage(`Welcome back! Connecting you to ${WORKSPACE_LABELS[selectedWorkspace].short}...`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during login.");
      setLoading(false);
    }
  };

  // Handle Registration / Workspace Request Submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail) {
      setErrorMessage("Please complete all required fields (Full Name and Email).");
      return;
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setErrorMessage("Please provide a valid work or institutional email address.");
      return;
    }

    if (trimmedPassword && trimmedPassword.length < 4) {
      setErrorMessage("Password must be at least 4 characters long.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword || "admin2025",
        workspace: selectedWorkspace,
        organization: companyName.trim() || undefined,
        department: department.trim() || undefined,
        rememberMe: true,
        callbackUrl,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Failed to complete registration.");
        setLoading(false);
      } else {
        setSuccessMessage(`Account registered successfully! Welcome to EWS Learning.`);
      }
    } catch (e: any) {
      setErrorMessage(e.message || "Failed to complete registration.");
      setLoading(false);
    }
  };

  // Handle SSO Mock Authentication
  const handleSsoLogin = (provider: string) => {
    setLoading(true);
    setShowSsoModal(false);
    setTimeout(() => {
      loginAs(selectedWorkspace, callbackUrl);
    }, 600);
  };

  return (
    <div className="min-h-[92vh] bg-slate-50 py-10 sm:py-16 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden animate-in fade-in duration-300">
        
        {/* Left Side: Enterprise Trust & Accreditation Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
          
          {/* Ambient Background Watermark */}
          <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
            <ShieldCheck className="w-80 h-80 text-white" />
          </div>

          <div className="space-y-6 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-300 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Public Homepage</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center bg-white/10 rounded-2xl p-1 backdrop-blur-md border border-white/20">
                <Image src="/logo.png" alt="EWS Learning" width={40} height={40} className="object-contain" priority />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  EWS <span className="text-emerald-400 font-bold">Learning</span>
                </span>
                <span className="block text-[10px] tracking-wider font-semibold uppercase text-emerald-300">
                  Enterprise Authentication Gateway
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white">
                Access Your Sustainable Training Hub
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Centralized gateway for enterprise clients, certified environmental auditors, and corporate workforces across India and international markets.
              </p>
            </div>

            {/* Quick 1-Click Fast Passes */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                ⚡ 1-Click Evaluator Fast Pass
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => loginAs("ADMIN", callbackUrl)}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-400 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200 flex items-center gap-1">
                    🛡️ Admin
                  </div>
                  <div className="text-[10px] text-slate-400">Directorate</div>
                </button>
                <button
                  type="button"
                  onClick={() => loginAs("CORPORATE_CLIENT", callbackUrl)}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-400 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-teal-300 group-hover:text-teal-200 flex items-center gap-1">
                    🏢 Corp
                  </div>
                  <div className="text-[10px] text-slate-400">BRSR Vault</div>
                </button>
                <button
                  type="button"
                  onClick={() => loginAs("STUDENT", callbackUrl)}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-400 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-cyan-300 group-hover:text-cyan-200 flex items-center gap-1">
                    🎓 Student
                  </div>
                  <div className="text-[10px] text-slate-400">Classroom</div>
                </button>
              </div>
            </div>

          </div>

          {/* Testimonial & Security Badges */}
          <div className="space-y-4 pt-4 border-t border-slate-800 relative z-10 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-slate-300 italic text-[11px] leading-relaxed">
              &quot;EWS Learning streamlined our plant-level BRSR Core workforce audit training across 4 manufacturing units with 100% verifiable compliance.&quot;
              <div className="not-italic font-bold text-emerald-400 mt-1.5 text-[10px] uppercase tracking-wider">
                — Head of EHS & Sustainability, EcoIndustries Corp
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Prisma DB Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Workspace & Authentication Suite */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-white">
          
          <div className="space-y-6">
            
            {/* Header & Tabs */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Identity & Access Management
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono font-bold">
                  🟢 Database Connected
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                {activeTab === "SIGN_IN" ? "Sign In to Your Workspace" : "Request Workspace Access"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your target workspace and provide your authorized credentials.
              </p>
            </div>

            {/* Unauthorized / Callback Notice Banner */}
            {isUnauthorized && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Authentication Required</span>
                  <span className="text-[11px] text-amber-800">
                    Please sign in with authorized workspace credentials to access{" "}
                    <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[10px]">{callbackUrl || "the requested portal"}</code>.
                  </span>
                </div>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Success Message Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-bold">{successMessage}</div>
              </div>
            )}

            {/* WORKSPACE SELECTOR: 3 Options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Step 1: Select Workspace</span>
                  <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Click to switch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 1. Corporate Client Hub */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWorkspace("CORPORATE_CLIENT");
                    setErrorMessage(null);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    selectedWorkspace === "CORPORATE_CLIENT"
                      ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      selectedWorkspace === "CORPORATE_CLIENT" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}>
                      🏢
                    </div>
                    {selectedWorkspace === "CORPORATE_CLIENT" && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 ring-4 ring-emerald-200"></span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Corporate Hub</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Enterprise ESG & HR</div>
                  </div>
                </button>

                {/* 2. Learner / Student Room */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWorkspace("STUDENT");
                    setErrorMessage(null);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    selectedWorkspace === "STUDENT"
                      ? "border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      selectedWorkspace === "STUDENT" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}>
                      🎓
                    </div>
                    {selectedWorkspace === "STUDENT" && (
                      <span className="w-2 h-2 rounded-full bg-teal-600 ring-4 ring-teal-200"></span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Learner Room</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Courses & Exams</div>
                  </div>
                </button>

                {/* 3. Directorate Admin CMS */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWorkspace("ADMIN");
                    setErrorMessage(null);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    selectedWorkspace === "ADMIN"
                      ? "border-slate-900 bg-slate-900 text-white ring-2 ring-slate-900/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      selectedWorkspace === "ADMIN" ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                    }`}>
                      🛡️
                    </div>
                    {selectedWorkspace === "ADMIN" && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/30"></span>
                    )}
                  </div>
                  <div>
                    <div className={`font-bold text-xs ${selectedWorkspace === "ADMIN" ? "text-white" : "text-slate-900"}`}>
                      Admin CMS
                    </div>
                    <div className={`text-[10px] line-clamp-1 mt-0.5 ${selectedWorkspace === "ADMIN" ? "text-slate-300" : "text-slate-500"}`}>
                      AI Studio & Ops
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Workspace Context Highlight */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-base">{WORKSPACE_LABELS[selectedWorkspace].iconEmoji}</span>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">
                    {WORKSPACE_LABELS[selectedWorkspace].label}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {WORKSPACE_LABELS[selectedWorkspace].description}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAutofillDemo(selectedWorkspace)}
                className="shrink-0 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 font-bold text-[11px] transition-colors shadow-2xs"
                title="Autofill verified demo test credentials"
              >
                ⚡ Autofill Demo
              </button>
            </div>

            {/* Toggle Tabs (Sign In vs Register / Request) */}
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("SIGN_IN");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`pb-2.5 px-3 transition-colors border-b-2 cursor-pointer ${
                  activeTab === "SIGN_IN"
                    ? "border-emerald-600 text-emerald-700 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Sign In with Credentials
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("REGISTER");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`pb-2.5 px-3 transition-colors border-b-2 cursor-pointer ${
                  activeTab === "REGISTER"
                    ? "border-emerald-600 text-emerald-700 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                New Registration / Create Account
              </button>
            </div>

            {/* TAB 1: MAIN SIGN IN FORM */}
            {activeTab === "SIGN_IN" ? (
              <form onSubmit={handleSignIn} className="space-y-4 text-xs">
                
                {/* Email Field */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    {selectedWorkspace === "ADMIN" ? "Directorate Admin Email" : selectedWorkspace === "CORPORATE_CLIENT" ? "Work / Corporate Email" : "Learner Email Address"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={
                        selectedWorkspace === "ADMIN"
                          ? "director@ewslearning.com"
                          : selectedWorkspace === "CORPORATE_CLIENT"
                          ? "vikram.m@ecoindustries.in"
                          : "ajay.k@ecoindustries.in"
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field with Eye Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-700">
                      {selectedWorkspace === "ADMIN" ? "Directorate Passkey (admin2025)" : "Account Password"}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder={selectedWorkspace === "ADMIN" ? "Enter directorate passkey (admin2025)" : "••••••••"}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & SSO Button */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    <span>Remember this device (30 Days)</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowSsoModal(true)}
                    className="text-[11px] font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>🏢 Enterprise SSO</span>
                  </button>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                      <span>Authenticating with Security Vault...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to {WORKSPACE_LABELS[selectedWorkspace].short}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </>
                  )}
                </button>

              </form>
            ) : (
              /* TAB 2: REGISTRATION FORM */
              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Corporate / Institutional Email <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Organization / Plant</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. EcoIndustries Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Department / Role</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. EHS Operations"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="At least 4 characters (leave blank for demo passkey)"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration & Open {WORKSPACE_LABELS[selectedWorkspace].short}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Footer Security Notice */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ISO 27001 Security Standard
            </span>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">
              Privacy & Data Policy
            </Link>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <KeyRound className="w-4 h-4 text-emerald-600" />
                Reset Workspace Password
              </div>
              <button onClick={() => setShowForgotModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="space-y-3 text-center py-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Recovery Instructions Sent</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We have dispatched a password recovery link to <strong className="text-slate-800">{forgotEmail || email || "your email"}</strong>. (For demo testing, you can sign in directly with passkey <code>admin2025</code>).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your registered institutional email to receive an instant authentication reset pass.
                </p>
                <input
                  type="email"
                  value={forgotEmail || email}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 text-xs focus:outline-hidden focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Recovery Email</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enterprise SSO Modal */}
      {showSsoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Enterprise Single Sign-On (SSO)
              </div>
              <button onClick={() => setShowSsoModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Authenticate using your company&apos;s corporate identity provider (IdP). Supported with SAML 2.0 and OpenID Connect.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSsoLogin("Microsoft Azure AD")}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🟦</span>
                  <span>Microsoft Azure Active Directory (Office 365)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleSsoLogin("Google Workspace SAML")}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🔴</span>
                  <span>Google Workspace SAML 2.0</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleSsoLogin("Okta Enterprise")}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🔘</span>
                  <span>Okta Identity Management</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-500 font-semibold">Initializing Security Gateway...</p>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
