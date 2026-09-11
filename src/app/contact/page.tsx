"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, Users, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    programInterest: "Waste Management & Recycling Programs",
    teamSize: "50 - 200 Employees",
    mode: "Hybrid (Online + Onsite Workshop)",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage for Admin CMS demonstration
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...formData,
      status: "NEW",
      createdAt: new Date().toLocaleString()
    };

    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("ews_inquiries") || "[]");
      localStorage.setItem("ews_inquiries", JSON.stringify([newInquiry, ...existing]));
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            Contact & Corporate Inquiries
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            We&apos;re Excited to Hear from You
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you have questions about our programs, certifications, custom group training proposals, or enterprise collaborations, fill out the form below and our advisors will respond within 24 hours.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Thank you, {formData.name}!</h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your corporate training inquiry has been securely logged. Our environmental advisors will reach out to <strong>{formData.email}</strong> shortly with your customized curriculum and proposal.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Request Corporate Training Proposal</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ajay Kushwaha"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ajay@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. EcoIndustries Ltd."
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Training Program</label>
                    <select
                      value={formData.programInterest}
                      onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 text-slate-900"
                    >
                      <option value="Waste Management & Recycling Programs">Waste Management & Recycling</option>
                      <option value="Corporate Sustainability & ESG Strategy">Corporate ESG & BRSR</option>
                      <option value="Sustainable Workforces & Green Skills">Sustainable Workforces</option>
                      <option value="Circular Economy & Extended Producer Responsibility">Circular Economy & EPR</option>
                      <option value="Custom Sector Masterclass">Custom Sector Masterclass</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimated Group Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 text-slate-900"
                    >
                      <option value="10 - 50 Employees">10 - 50 Employees</option>
                      <option value="50 - 200 Employees">50 - 200 Employees</option>
                      <option value="200 - 500 Employees">200 - 500 Employees</option>
                      <option value="500+ Employees">500+ Enterprise Wide</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Delivery Mode</label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 text-slate-900"
                    >
                      <option value="Hybrid (Online + Onsite Workshop)">Hybrid</option>
                      <option value="100% Online Self-Paced & Live">100% Online</option>
                      <option value="Onsite In-Person Workshop">Onsite In-Person Workshop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Specific Requirements / Objectives</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your facility type, current compliance goals, or any specific challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 font-bold text-sm text-white shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Corporate Inquiry</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  By clicking Submit, you agree to receive communications from EWS Learning.
                </p>
              </form>
            )}
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-8 text-white space-y-6">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our academic advisors and corporate sustainability leads directly.
              </p>

              <div className="space-y-4 text-xs pt-2">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400">General & Corporate Inquiries</div>
                    <div className="font-bold text-white">contact@ewslearning.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Direct Training Hotline</div>
                    <div className="font-bold text-white">+91 98100 00000 / +91 80 4000 0000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Headquarters</div>
                    <div className="font-bold text-white">EWS Sustainability Hub, Cyber City, Gurugram & Bengaluru, India</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Enterprise SLA Guarantee
                </div>
                <p className="text-slate-400">
                  Custom training proposals are delivered within 24 business hours.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
