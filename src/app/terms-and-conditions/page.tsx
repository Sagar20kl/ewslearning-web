import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Statutory & Legal Notice
          </div>
          <h1 className="text-3xl font-black text-slate-900">Terms and Conditions</h1>
          <p className="text-xs text-slate-400">Last updated: August 2025</p>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p>
              By accessing and enrolling in courses offered by EWS Learning (&ldquo;EWS&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Educational & Advisory Scope</h3>
            <p>
              All training programs, whitepapers, calculators, and materials provided on ewslearning.com are designed for educational and operational guidance in environmental compliance, waste management, and corporate ESG reporting. While prepared in accordance with CPCB and SEBI frameworks, they do not replace formal state pollution control board filings.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Verified Certification</h3>
            <p>
              Certificates of Achievement issued by EWS Learning are granted upon verified completion of module lessons and assessments. Credentials carry unique verification IDs that can be validated by employers and compliance auditors.
            </p>

            <h3 className="text-base font-bold text-slate-900">4. Intellectual Property</h3>
            <p>
              All course videos, curriculum toolkits, spreadsheets, and instructional design remain the exclusive intellectual property of EWS Learning. Unauthorized reproduction or resale is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
