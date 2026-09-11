"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RESOURCES } from "@/data/resources";
import { ArrowLeft, Clock, Calendar, Download, Share2, Award, ChevronRight, Bookmark } from "lucide-react";

export default function ResourceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const resource = RESOURCES.find((r) => r.slug === slug) || RESOURCES[0];

  return (
    <article className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources Hub</span>
        </Link>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {resource.category}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {resource.readTime}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {resource.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {resource.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed italic border-l-4 border-emerald-500 pl-4">
            {resource.excerpt}
          </p>

          {/* Author Profile */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                <Image src={resource.author.avatar} alt={resource.author.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{resource.author.name}</div>
                <div className="text-xs text-emerald-700">{resource.author.role}</div>
              </div>
            </div>

            {resource.downloadablePdf && (
              <button className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>PDF Guide ({resource.downloadablePdf.size})</span>
              </button>
            )}
          </div>

        </div>

        {/* Featured Cover Image */}
        <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md">
          <Image src={resource.coverImage} alt={resource.title} fill className="object-cover" />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs prose prose-slate max-w-none">
          <div 
            className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: resource.content.replace(/\n\n/g, "<br/><br/>") }}
          />
        </div>

        {/* Bottom CTA to Related Training Program */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Want to Master This in Your Organization?</h3>
            <p className="text-xs text-slate-400 max-w-md">
              Enroll your team in EWS Learning&apos;s interactive certified masterclass.
            </p>
          </div>
          <Link
            href="/programs"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Explore Related Course
          </Link>
        </div>

      </div>
    </article>
  );
}
