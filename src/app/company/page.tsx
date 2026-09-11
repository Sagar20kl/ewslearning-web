"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, ShieldCheck, Users, Target, CheckCircle2, ArrowRight } from "lucide-react";

export default function CompanyPage() {
  const leadership = [
    {
      name: "Dr. Rajeshwar Rao",
      role: "Lead Environmental Engineer & Circular Economy Advisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Former CPCB technical consultant with over 20 years of experience in industrial solid waste management, hazardous waste handling, and municipal recycling ecosystems."
    },
    {
      name: "Ananya Deshmukh",
      role: "Global ESG Strategist & Certified GRI Practitioner",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "Advises listed enterprises on SEBI BRSR Core disclosures, carbon pricing models, and GHG Protocol Scope 1-3 decarbonization pathways."
    },
    {
      name: "Vikram Malhotra",
      role: "Director of People & Cultural Transformation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Specializes in workforce behavioral economics, employee gamification, and translating complex environmental goals into everyday green habits."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            About EWS Learning
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Leading the Way in Environmental Education & Corporate Sustainability
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            We empower businesses, institutions, and professionals to adopt practical, compliant, and profitable sustainability practices through innovative training and field-tested solutions.
          </p>
        </div>

        {/* 3 Pillars of Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Commitment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We believe environmental responsibility is not a cost burden, but a core strategic asset. We empower businesses to adopt sustainable practices through innovative training and verified ROI.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Collaborative Partnerships</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Partnering with industries, municipal corporations, and global academic councils, we ensure best practices and 100% compliance with current sustainability standards.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tailored Solutions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our deep expertise in waste management, EPR filing, and green space development provides customized programs for lasting corporate and municipal impact.
            </p>
          </div>

        </div>

        {/* Leadership & Faculty */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Academic Council & Faculty</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Meet the environmental engineers, ESG auditors, and behavioral scientists leading our training curricula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image src={leader.avatar} alt={leader.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{leader.role}</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-emerald-900 text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Collaborate With EWS Learning</h3>
            <p className="text-xs text-emerald-200 max-w-lg">
              Whether you are an enterprise seeking customized workforce upskilling or a municipal partner, we are excited to work together.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs shrink-0 transition-colors"
          >
            Get In Touch
          </Link>
        </div>

      </div>
    </div>
  );
}
