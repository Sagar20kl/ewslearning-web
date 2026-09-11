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
  Users
} from "lucide-react";

function LoginFormContent() {
  const searchParams = useSearchParams();
  const { login, loginAs, isAuthenticated, role: activeRole } = useAuth();

  // Query parameter handling
  const callbackUrl = searchParams.get("callbackUrl");
  const isUnauthorized = searchParams.get("unauthorized") === "true";
  const initialWorkspaceParam = searchParams.get("workspace") as UserRole | null;

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
  const [activeTab, setActiveTab] = useState<"SIGN_IN" | "REGISTER">("SIGN_IN");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");

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
    setPassword(targetRole === "ADMIN" ? "admin2025" : "demo1234");
    setErrorMessage(null);
  };

  // Handle Sign In Submit
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your work or institutional email address.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please provide a valid email format (e.g., name@company.com).");
      return;
    }

    if (selectedWorkspace === "ADMIN" && !password) {
      setErrorMessage("Directorate Admin Passkey is required to access the AI Studio & CMS.");
      return;
    }

    setLoading(true);

    try {
      // Simulate authentic secure token verification
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = await login({
        email: email.trim(),
        password: password.trim(),
        workspace: selectedWorkspace,
        rememberMe,
        callbackUrl,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
      } else {
        setSuccessMessage(`Welcome back! Launching ${WORKSPACE_LABELS[selectedWorkspace].short}...`);
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

    if (!fullName.trim() || !email.trim()) {
      setErrorMessage("Please complete all required contact fields.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    // Register user with their requested workspace
    await login({
      email: email.trim(),
      workspace: selectedWorkspace,
      name: fullName.trim(),
      organization: companyName.trim() || undefined,
      rememberMe: true,
      callbackUrl,
    });
  };

  return (
    <div className="min-h-[92vh] bg-slate-50 py-10 sm:py-16 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden animate-in fade-in duration-300">
        
        {/* Left Side: Enterprise Trust & Accreditation Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
          
          {/* Subtle Ambient Background Watermark */}
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
          </div>

          {/* Testimonial & Security Badges */}
          <div className="space-y-4 pt-6 border-t border-slate-800 relative z-10 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-slate-300 italic text-[11px] leading-relaxed">
              &quot;EWS Learning streamlined our plant-level BRSR Core workforce audit training across 4 manufacturing units with 100% verifiable compliance.&quot;
              <div className="not-italic font-bold text-emerald-400 mt-2 text-[10px] uppercase tracking-wider">
                — Head of EHS & Sustainability, EcoIndustries Corp
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>CPCB & BRSR Aligned</span>
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
                <span className="text-[11px] text-slate-400 font-mono">v2.4 Secure</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                {activeTab === "SIGN_IN" ? "Sign In to Your Workspace" : "Request Workspace Access"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your target workspace and provide your credentials.
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
                onClick={() => setActiveTab("SIGN_IN")}
                className={`pb-2.5 px-3 transition-colors border-b-2 ${
                  activeTab === "SIGN_IN"
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Sign In with Credentials
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("REGISTER")}
                className={`pb-2.5 px-3 transition-colors border-b-2 ${
                  activeTab === "REGISTER"
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                New Registration / Request Access
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

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-bold text-slate-700">
                      {selectedWorkspace === "ADMIN" ? "Directorate Passkey (admin2025)" : "Password"}
                    </label>
                    <Link href="/contact" className="text-emerald-700 hover:underline text-[11px] font-semibold">
                      Forgot Passcode?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder={selectedWorkspace === "ADMIN" ? "admin2025" : "••••••••"}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-xs transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-slate-600 font-medium text-xs">Keep me authenticated for 30 days</span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                    selectedWorkspace === "ADMIN"
                      ? "bg-slate-900 text-emerald-400 hover:bg-slate-800"
                      : selectedWorkspace === "CORPORATE_CLIENT"
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-teal-700 text-white hover:bg-teal-600"
                  } ${loading ? "opacity-75 cursor-not-allowed" : "active:scale-[0.98]"}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating with EWS Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Sign In to {WORKSPACE_LABELS[selectedWorkspace].short}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* TAB 2: REGISTER / REQUEST ACCESS FORM */
              <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. EcoIndustries Corp"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provisioning Workspace...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account & Open {WORKSPACE_LABELS[selectedWorkspace].short}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Quick Evaluator Access Strip (1-Click Instant Login as any Role) */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <span className="text-slate-500 font-bold flex items-center gap-1 text-[11px]">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              1-Click Demo Evaluation:
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => loginAs("CORPORATE_CLIENT", callbackUrl)}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition-colors border border-emerald-200"
              >
                🏢 Corporate HR
              </button>
              <button
                type="button"
                onClick={() => loginAs("STUDENT", callbackUrl)}
                className="px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition-colors border border-teal-200"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => loginAs("ADMIN", callbackUrl)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-emerald-400 hover:bg-slate-800 text-[11px] font-bold transition-colors border border-emerald-500/30"
              >
                🛡️ Admin CMS
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}

