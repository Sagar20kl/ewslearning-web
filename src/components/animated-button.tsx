"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "outline";
  className?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function AnimatedButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  icon = false,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-bold text-xs rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98] select-none";

  const variantStyles = {
    primary:
      "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 hover:shadow-emerald-700/30",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 shadow-xs hover:border-slate-300",
    dark:
      "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-950/30 border border-slate-800",
    outline:
      "bg-transparent hover:bg-emerald-500/10 text-emerald-700 hover:text-emerald-800 border border-emerald-600/30",
  };

  const content = (
    <>
      {/* Subtle sweeping light sheen on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

      {/* Button Children */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variantStyles[variant]} px-5 py-3 ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} px-5 py-3 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {content}
    </button>
  );
}
