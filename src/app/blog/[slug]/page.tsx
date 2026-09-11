"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { INITIAL_BLOGS, BlogPost } from "@/data/blogs";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Bot, 
  Globe2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Bookmark
} from "lucide-react";

// Robust, High-Fidelity Markdown to Semantic HTML Parser
function formatMarkdownContent(markdown: string): string {
  if (!markdown) return "";

  // Split into raw lines
  const lines = markdown.split("\n");
  const output: string[] = [];

  let inList: "ul" | "ol" | null = null;

  const closeListIfOpen = () => {
    if (inList === "ul") {
      output.push("</ul>");
      inList = null;
    } else if (inList === "ol") {
      output.push("</ol>");
      inList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. Empty lines
    if (!line) {
      closeListIfOpen();
      continue;
    }

    // 2. Horizontal Divider (---)
    if (line === "---" || line === "***" || line === "___") {
      closeListIfOpen();
      output.push('<hr class="my-8 border-slate-200" />');
      continue;
    }

    // 3. Headings
    if (line.startsWith("## ")) {
      closeListIfOpen();
      const text = line.substring(3).trim();
      output.push(
        `<h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-10 mb-4 pb-2 border-b border-slate-200/80 flex items-center gap-2.5">
          <span class="w-2.5 h-6 rounded-full bg-emerald-500 inline-block"></span>
          <span>${formatInlineMarkdown(text)}</span>
        </h2>`
      );
      continue;
    }

    if (line.startsWith("### ")) {
      closeListIfOpen();
      const text = line.substring(4).trim();
      output.push(
        `<h3 class="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 text-emerald-950">
          ${formatInlineMarkdown(text)}
        </h3>`
      );
      continue;
    }

    if (line.startsWith("#### ")) {
      closeListIfOpen();
      const text = line.substring(5).trim();
      output.push(
        `<h4 class="text-base sm:text-lg font-bold text-emerald-800 mt-6 mb-2 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          <span>${formatInlineMarkdown(text)}</span>
        </h4>`
      );
      continue;
    }

    // 4. Bulleted List Items (- or *)
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      if (inList !== "ul") {
        closeListIfOpen();
        output.push('<ul class="space-y-3 my-4">');
        inList = "ul";
      }
      const itemContent = bulletMatch[1];
      output.push(
        `<li class="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed shadow-2xs">
          <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
          <div class="flex-1">${formatInlineMarkdown(itemContent)}</div>
        </li>`
      );
      continue;
    }

    // 5. Numbered List Items (1. , 2. )
    const numberMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      if (inList !== "ol") {
        closeListIfOpen();
        output.push('<ol class="space-y-3 my-4">');
        inList = "ol";
      }
      const itemNum = numberMatch[1];
      const itemContent = numberMatch[2];
      output.push(
        `<li class="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 leading-relaxed shadow-2xs">
          <span class="w-6 h-6 rounded-xl bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">${itemNum}</span>
          <div class="flex-1">${formatInlineMarkdown(itemContent)}</div>
        </li>`
      );
      continue;
    }

    // 6. Regular Paragraphs
    closeListIfOpen();
    output.push(
      `<p class="text-slate-700 leading-relaxed text-sm sm:text-base my-4">
        ${formatInlineMarkdown(line)}
      </p>`
    );
  }

  closeListIfOpen();
  return output.join("\n");
}

// Inline Markdown Parser: Replaces **bold**, *italic*, `code` tags safely
function formatInlineMarkdown(text: string): string {
  return text
    // Replace bold **text** with strong tag
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    // Replace italic *text* with em tag
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>')
    // Replace inline code `code`
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-xs text-emerald-800 font-semibold">$1</code>');
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((res) => {
        const found = res.data?.find((b: BlogPost) => b.slug === slug);
        if (found) setBlog(found);
        else {
          const fallback = INITIAL_BLOGS.find((b) => b.slug === slug) || INITIAL_BLOGS[0];
          setBlog(fallback);
        }
      })
      .catch(() => {
        const fallback = INITIAL_BLOGS.find((b) => b.slug === slug) || INITIAL_BLOGS[0];
        setBlog(fallback);
      });
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-semibold">Loading Sustainability Briefing...</p>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sustainability Dispatches</span>
        </Link>

        {/* Article Main Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {blog.category}
              </span>
              {blog.isAutoGenerated && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-emerald-300 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  Auto-Compiled Global Dispatch
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-emerald-700 hover:border-emerald-500 transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Link Copied! ✓" : "Share Article"}</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {blog.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed italic border-l-4 border-emerald-500 pl-4">
            {blog.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-emerald-500/30">
                <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{blog.author.name}</div>
                <div className="text-xs text-emerald-700">{blog.author.role}</div>
              </div>
            </div>

            <div className="text-right text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Cover Image */}
        <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority />
        </div>

        {/* Global News Intelligence Sources Citation Box */}
        {blog.sourceCitations && blog.sourceCitations.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              Verified Regulatory & Statutory Intelligence Sources
            </div>
            <p className="text-xs text-slate-300">
              This briefing was synthesized from verified regulatory authorities, international policy communiqués, and gazette notifications:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {blog.sourceCitations.map((source, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formatted Article Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div
            className="prose prose-slate max-w-none text-slate-800"
            dangerouslySetInnerHTML={{
              __html: formatMarkdownContent(blog.content)
            }}
          />
        </div>

        {/* Related Training CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Statutory Workforce Enablement
            </div>
            <h3 className="text-xl font-bold">Prepare Your Enterprise for These Regulatory Mandates</h3>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Explore EWS Learning&apos;s verified corporate masterclasses in SEBI BRSR Core, CPCB Plastic EPR, and Hazardous Waste Auditing.
            </p>
          </div>
          <Link
            href="/programs"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-xs shrink-0 transition-colors shadow-lg flex items-center gap-2"
          >
            <span>Explore Masterclasses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </article>
  );
}
