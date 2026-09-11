"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Mail, Send, CheckCircle2, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      
      {/* Top Banner: Newsletter & Mission */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Leaf className="w-3.5 h-3.5" />
                Stay Ahead of Sustainability Regulations
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Subscribe to the EWS Sustainability Dispatch
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-lg">
                Receive curated monthly breakdowns on BRSR disclosures, CPCB recycling rules, net-zero industry masterclasses, and EPR compliance updates.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <p className="text-sm font-medium">
                    Thank you! You are now subscribed to the EWS Learning Dispatch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your corporate email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-900/30"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-xs text-slate-500 mt-2">
                We respect your privacy. Unsubscribe at any time with one click.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 bg-white rounded-xl p-1 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="EWS Learning"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                EWS <span className="text-emerald-400 font-bold">Learning</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Empowering sustainable futures through AI-driven environmental education, circular economy masterclasses, and actionable corporate sustainability training across India and globally.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                Corporate Hub: Cyber City, Gurugram / Bengaluru, India
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                contact@ewslearning.com
              </p>
            </div>
          </div>

          {/* Col 1: Training Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Training Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/programs/waste-management-recycling" className="hover:text-emerald-400 transition-colors">
                  Waste Management & Segregation
                </Link>
              </li>
              <li>
                <Link href="/programs/corporate-sustainability" className="hover:text-emerald-400 transition-colors">
                  Corporate ESG & BRSR Masterclass
                </Link>
              </li>
              <li>
                <Link href="/programs/sustainable-workforces" className="hover:text-emerald-400 transition-colors">
                  Sustainable Workforces & Green Skills
                </Link>
              </li>
              <li>
                <Link href="/programs/circular-economy-epr" className="hover:text-emerald-400 transition-colors">
                  Circular Economy & Plastic EPR
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-emerald-400 font-medium inline-flex items-center gap-1 hover:underline pt-1">
                  View all programs <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Services & Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#waste" className="hover:text-emerald-400 transition-colors">
                  Waste Management Audits
                </Link>
              </li>
              <li>
                <Link href="/services#corporate" className="hover:text-emerald-400 transition-colors">
                  Corporate ESG Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#recycling" className="hover:text-emerald-400 transition-colors">
                  Recycling Industry Enablement
                </Link>
              </li>
              <li>
                <Link href="/services#green-campus" className="hover:text-emerald-400 transition-colors">
                  Green Campus Transformation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Custom Sector Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/company" className="hover:text-emerald-400 transition-colors">
                  About EWS Learning
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Sustainability Calendar 2026
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-emerald-400 transition-colors">
                  Resources & Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors text-emerald-300 font-medium">
                  Student Learning Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors text-slate-400">
                  Admin CMS Panel
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EWS Learning. All rights reserved. Empowering Sustainable Futures.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms-and-conditions" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              EPR Compliance Notice
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
