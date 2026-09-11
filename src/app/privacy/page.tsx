import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
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
            Data Protection & Privacy
          </div>
          <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Compliant with Digital Personal Data Protection (DPDP) Act</p>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
            <p>
              We collect corporate contact information (name, company email, phone number, organization name) submitted through our inquiry and newsletter forms solely to process training proposals and deliver academic course content.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. How Your Data is Used</h3>
            <p>
              Your data is utilized to manage course enrollments, issue verified completion certificates, and provide regulatory sustainability updates. We never sell or share corporate contact data with third-party marketers.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Data Security</h3>
            <p>
              All communication and student data are encrypted via TLS/HTTPS protocols and hosted in secure cloud databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
