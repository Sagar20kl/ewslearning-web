"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth, WORKSPACE_LABELS, UserRole } from "@/context/auth-context";
import { 
  Leaf, 
  Menu, 
  X, 
  ChevronDown, 
  BookOpen, 
  Building2, 
  Award, 
  FileText, 
  Phone, 
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  User,
  LogOut,
  GraduationCap,
  Lock,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, switchWorkspace, logout, isAuthenticated } = useAuth();

  const toggleCurrency = () => {
    const next = currency === "INR" ? "USD" : "INR";
    setCurrency(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("ews_currency", next);
      window.dispatchEvent(new Event("currency_change"));
    }
  };

  const navLinks = [
    { name: "Programs", href: "/programs", icon: BookOpen },
    { name: "Blog", href: "/blog", icon: Sparkles },
    { name: "Services", href: "/services", icon: Award },
    { name: "Resources", href: "/resources", icon: FileText },
    { name: "Company", href: "/company", icon: ShieldCheck },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="EWS Learning"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                EWS <span className="text-emerald-600 font-bold">Learning</span>
              </span>
              <span className="block text-[10px] tracking-wider font-semibold uppercase text-slate-500 -mt-1">
                Environmental & Sustainability Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive 
                      ? "text-emerald-700 bg-emerald-50/80 font-bold" 
                      : "text-slate-700 hover:text-emerald-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Currency Toggle */}
            <button
              onClick={toggleCurrency}
              title="Toggle Currency (₹ INR / $ USD)"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 bg-slate-50 transition-all flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {currency === "INR" ? "₹ INR" : "$ USD"}
            </button>

            {/* If Unauthenticated / Guest: Show Clean "Log In" Button */}
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/50 text-slate-800 hover:text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Log In</span>
              </Link>
            ) : (
              /* If Authenticated: Show Active Workspace Jump + User Profile Dropdown */
              <>
                {role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-md border border-emerald-500/30"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Admin CMS</span>
                  </Link>
                )}

                {role === "CORPORATE_CLIENT" && (
                  <Link
                    href="/corporate"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <Building2 className="w-4 h-4 text-white" />
                    <span>Corporate Hub</span>
                  </Link>
                )}

                {role === "STUDENT" && (
                  <Link
                    href="/dashboard"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-600 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <GraduationCap className="w-4 h-4 text-white" />
                    <span>My Courses</span>
                  </Link>
                )}

                {/* User Account & Workspace Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-white text-xs font-bold text-slate-800 transition-all flex items-center gap-2 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                      {role === "ADMIN" ? "AD" : role === "CORPORATE_CLIENT" ? "CO" : "ST"}
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase text-emerald-700 font-bold leading-none">
                        {role === "ADMIN" ? "Directorate" : role === "CORPORATE_CLIENT" ? "Enterprise HR" : "Learner"}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-900 truncate max-w-[90px]">{user.name}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 space-y-2.5 z-50 animate-in zoom-in-95">
                      {/* User Info Header */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                        {user.organization && (
                          <div className="text-[10px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            <span className="truncate">{user.organization}</span>
                          </div>
                        )}
                      </div>

                      {/* Workspace Navigation */}
                      <div className="space-y-1">
                        <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Workspaces:
                        </div>

                        <button
                          onClick={() => {
                            switchWorkspace("CORPORATE_CLIENT");
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                            role === "CORPORATE_CLIENT" ? "bg-emerald-900 text-white" : "hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-emerald-400" />
                            <span>Corporate Hub</span>
                          </div>
                          {role === "CORPORATE_CLIENT" && <span className="text-[10px] text-emerald-300 font-mono">Active</span>}
                        </button>

                        <button
                          onClick={() => {
                            switchWorkspace("STUDENT");
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                            role === "STUDENT" ? "bg-teal-900 text-white" : "hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-teal-400" />
                            <span>Student Room</span>
                          </div>
                          {role === "STUDENT" && <span className="text-[10px] text-teal-300 font-mono">Active</span>}
                        </button>

                        <button
                          onClick={() => {
                            switchWorkspace("ADMIN");
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                            role === "ADMIN" ? "bg-slate-900 text-emerald-400" : "hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>Admin CMS</span>
                          </div>
                          {role === "ADMIN" && <span className="text-[10px] text-emerald-400 font-mono">Active</span>}
                        </button>
                      </div>

                      {/* Log Out Button */}
                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full p-2 rounded-xl text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Request Proposal CTA */}
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 transition-all shadow-md shadow-emerald-700/20"
            >
              Request Proposal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleCurrency}
              className="px-2 py-1 rounded text-xs font-bold border border-slate-200 text-slate-700"
            >
              {currency === "INR" ? "₹" : "$"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-3 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2 px-2">
              {!isAuthenticated ? (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Log In to Workspace</span>
                </Link>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold uppercase">{WORKSPACE_LABELS[role].label}</div>
                  </div>
                  <Link
                    href={WORKSPACE_LABELS[role].path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 rounded-xl bg-slate-900 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Open {WORKSPACE_LABELS[role].short}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-50"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
