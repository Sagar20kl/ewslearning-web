"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Printer, Award, ShieldCheck, Download, CheckCircle, ExternalLink, Share2 } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
}

export function CertificateModal({
  isOpen,
  onClose,
  studentName,
  courseTitle,
  completionDate,
  certificateId,
}: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const linkedInAddUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    courseTitle
  )}&organizationName=EWS%20Learning&issueYear=2025&issueMonth=8&certUrl=${encodeURIComponent(
    `https://ewslearning.com/verify/${certificateId}`
  )}&certId=${encodeURIComponent(certificateId)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 text-white gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Verified Digital Certificate of Completion
            </h3>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href={linkedInAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Add to LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-6 sm:p-10 bg-slate-100 flex justify-center">
          <div
            ref={certRef}
            className="w-full bg-[#FCFBF7] border-[12px] border-double border-emerald-900/40 p-8 sm:p-12 rounded-lg shadow-xl relative text-center text-slate-900"
            style={{ minHeight: "520px" }}
          >
            {/* Background Pattern Watermark */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <Award className="w-96 h-96 text-emerald-950" />
            </div>

            {/* Top Logo & Academy Header */}
            <div className="mb-6 flex flex-col items-center">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src="/logo.png"
                  alt="EWS Learning"
                  width={64}
                  height={64}
                  className="object-contain mx-auto"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-emerald-950">
                EWS <span className="text-emerald-600 font-bold">Learning</span>
              </span>
              <p className="text-[11px] uppercase tracking-widest font-bold text-emerald-800 mt-1">
                Academy for Environmental Education & Corporate Sustainability
              </p>
            </div>

            {/* Certificate Title */}
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight my-4">
              Certificate of Achievement
            </h1>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-6">
              This is officially awarded and verified to
            </p>

            {/* Student Name */}
            <div className="py-2 border-b-2 border-emerald-800/30 max-w-md mx-auto mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950">
                {studentName}
              </h2>
            </div>

            {/* Course Information */}
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
              for successfully mastering and completing all modules, case study assessments, and practical statutory frameworks for:
            </p>
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl py-3 px-6 max-w-lg mx-auto mb-8 shadow-xs">
              <h3 className="text-lg font-bold text-emerald-900">
                {courseTitle}
              </h3>
            </div>

            {/* Footer Signatures & QR Verification */}
            <div className="grid grid-cols-3 items-end pt-6 border-t border-slate-200 text-xs">
              
              {/* Verification Info */}
              <div className="text-left space-y-1">
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Authenticity</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">ID: {certificateId}</p>
                <p className="text-[10px] text-slate-500">Issued: {completionDate}</p>
              </div>

              {/* Gold Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-1 shadow-md flex items-center justify-center text-slate-950">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900 flex flex-col items-center justify-center text-[8px] font-black uppercase">
                    <span>EWS</span>
                    <span>VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Instructor Signature */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-slate-800 font-semibold">
                  Dr. Rajeshwar Rao
                </div>
                <div className="w-32 ml-auto border-t border-slate-400 pt-0.5"></div>
                <p className="text-[10px] font-semibold text-slate-600">Director of Academic Affairs</p>
                <p className="text-[9px] text-slate-400">EWS Advisory Board</p>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Tamper-proof record:</span>
            <Link
              href={`/verify/${certificateId}`}
              target="_blank"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>View Public Verification Registry</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
