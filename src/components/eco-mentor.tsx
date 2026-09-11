"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Headphones, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  sources?: string[];
}

const PRESET_QUESTIONS = [
  "How do I file Form 10 for hazardous waste tracking?",
  "What are the 4 CPCB Plastic EPR credit categories?",
  "How to measure Scope 2 emissions under SEBI BRSR?",
  "What is the EU CBAM impact on Indian steel & aluminum?"
];

function getCopilotAnswer(query: string): { text: string; sources: string[] } {
  const q = query.toLowerCase();

  if (q.includes("form 10") || q.includes("hazardous") || q.includes("howm")) {
    return {
      text: `**Form 10 Manifest Protocols under HOWM Rules 2016:**\n\n1. **Six-Copy Color Coded System**: Every hazardous waste shipment requires a 6-copy manifest signed by the Generator, Transporter, and Operator of the TSDF (Treatment, Storage and Disposal Facility).\n2. **90-Day Storage Limit**: Manufacturing units cannot store category A/B hazardous sludge on-site for more than 90 days without written SPCB authorization.\n3. **Online SPCB Portals**: Form 10 must be reconciled quarterly against annual authorization quotas.`,
      sources: ["Hazardous & Other Wastes (HOWM) Rules 2016", "CPCB Form 10 Guidelines"]
    };
  }

  if (q.includes("epr") || q.includes("plastic") || q.includes("category")) {
    return {
      text: `**CPCB Plastic Waste Management EPR Categories:**\n\n- **Category I (Rigid Plastics)**: Heavy containers, bottles, pallets. (EPR Target: 100% recycling + mandatory 30% Post-Consumer Recycled content by 2026).\n- **Category II (Flexible Single Layer)**: LDPE/PP shopping bags, pouches, films.\n- **Category III (Multi-Layered Plastics - MLP)**: Metallized snack wrappers with at least one layer of plastic.\n- **Category IV (Plastic Sheets & Covers)**: Agricultural mulch films, protective shrink wrap.\n\n*Producers, Importers & Brand Owners (PIBOs) must trade registered EPR certificates through the CPCB Centralized Portal.*`,
      sources: ["CPCB Plastic Waste Management Amendment Rules 2024", "National EPR Portal Guidelines"]
    };
  }

  if (q.includes("scope") || q.includes("brsr") || q.includes("ghg") || q.includes("carbon")) {
    return {
      text: `**SEBI BRSR Core GHG Accounting Standards:**\n\n- **Scope 1 (Direct Emissions)**: Fuel burned onsite in company diesel generators, boilers, and owned vehicle fleets. Calculated using CPCB/IPCC emission factors (kg CO2e per liter).\n- **Scope 2 (Indirect Emissions - Electricity)**: Purchased grid electricity. Formula: *Total kWh consumed × Regional Grid Emission Factor (CEA India Grid Factor ~0.716 kg CO2/kWh)*.\n- **Scope 3 (Supply Chain)**: Upstream supplier transport, packaging, and business travel. Mandatory under BRSR Core value-chain assurance.`,
      sources: ["SEBI BRSR Core Circular 2023", "Central Electricity Authority (CEA) CO2 Baseline Database"]
    };
  }

  if (q.includes("cbam") || q.includes("europe") || q.includes("tariff") || q.includes("export")) {
    return {
      text: `**European Union Carbon Border Adjustment Mechanism (EU CBAM):**\n\n- **Affected Sectors**: Steel, Aluminum, Cement, Fertilizers, Hydrogen, and Electricity.\n- **Compliance Requirement**: Indian exporters must report audited direct and indirect emissions per tonne of finished product.\n- **Penalty Mitigation**: Investing in captive rooftop solar/wind PPAs and using scrap-based electric arc furnace (EAF) routes significantly lowers CBAM certificate purchase liabilities.`,
      sources: ["European Commission DG CLIMA CBAM Mandate", "DGFT India Trade Advisory"]
    };
  }

  if (q.includes("zero waste") || q.includes("segregation") || q.includes("compost")) {
    return {
      text: `**Zero-Waste Campus 5-Stream Standard Operating Procedure:**\n\n1. **Green Bin (Wet Organics)**: Cafeteria leftovers and horticulture waste -> directed to onsite aerated composting or biomethanation.\n2. **Blue Bin (Dry Recyclables)**: Paper, cardboard, PET bottles, clean aluminum cans.\n3. **Red Bin (Hazardous/Sanitary)**: Sanitary waste, biomedical items -> incinerated per statutory norms.\n4. **Yellow/Black Bin (E-Waste & Batteries)**: Defective IT assets and batteries -> handed over to authorized R2 recyclers.\n5. **Grey Bin (Inert Residue)**: Dust sweepings -> landfill diversion rate target: >90%.`,
      sources: ["Solid Waste Management (SWM) Rules 2016", "EWS Campus Zero-Waste Standard"]
    };
  }

  return {
    text: `Based on **EWS Learning's Regulatory Database**, compliance in this area involves:\n\n1. **Statutory Alignment**: Verify your facility's operations against relevant SPCB / CPCB circulars and ensure active Consent to Operate (CTO).\n2. **Internal Audit Trail**: Maintain verifiable manifests and third-party certified testing records.\n3. **Workforce Training**: Ground teams and plant supervisors must be upskilled on standard operating procedures.\n\n*Would you like to explore the dedicated module in our Programs catalog or download the compliance toolkit?*`,
    sources: ["EWS Learning Statutory Intelligence Repository", "CPCB National Guidelines"]
  };
}

export function EcoMentorCopilot() {
  const [activeView, setActiveView] = useState<"closed" | "menu" | "copilot" | "live_support" | "callback">("closed");
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  // Copilot Chat States
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "Hello! I am **EcoMentor**, your 24/7 AI Sustainability & Regulatory Copilot. How can I help you with CPCB rules, BRSR ESG reporting, or waste compliance today?",
      timestamp: "Just now",
      sources: ["EWS Learning Advisory Desk"]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick Support Ticket State
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketData, setTicketData] = useState({ name: "", email: "", message: "" });

  // Quick Callback Request State
  const [callbackSent, setCallbackSent] = useState(false);
  const [callbackData, setCallbackData] = useState({ name: "", phone: "", topic: "Corporate ESG Training" });

  useEffect(() => {
    if (activeView === "copilot") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeView]);

  // Auto-close popup menu when user scrolls the page
  useEffect(() => {
    if (activeView === "closed") return;

    let initialScrollY = window.scrollY;

    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls more than 10px in either direction, dismiss popup menu
      if (Math.abs(currentScrollY - initialScrollY) > 10) {
        setActiveView("closed");
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [activeView]);

  // Magnetic Auto-Snap to Nearest Screen Corner / Edge
  const handleDragEnd = (event: any, info: any) => {
    setTimeout(() => setIsDragging(false), 150);

    if (typeof window === "undefined") return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const currentPoint = info.point;

    // Determine nearest X boundary (Left vs Right)
    const isLeft = currentPoint.x < screenW / 2;
    // Determine nearest Y boundary (Top vs Bottom)
    const isTop = currentPoint.y < screenH / 2;

    // Compute snap targets relative to bottom-right origin
    let targetX = 0;
    let targetY = 0;

    if (isLeft) {
      targetX = -(screenW - 90); // Snap to Left Corner
    } else {
      targetX = 0; // Snap to Right Corner (default origin)
    }

    if (isTop) {
      targetY = -(screenH - 120); // Snap to Top Corner
    } else {
      targetY = 0; // Snap to Bottom Corner (default origin)
    }

    // Animate smoothly to nearest corner with spring physics
    controls.start({
      x: targetX,
      y: targetY,
      transition: { type: "spring", stiffness: 450, damping: 30 }
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getCopilotAnswer(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: response.sources
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleWhatsAppClick = () => {
    const phone = "919876543210";
    const text = encodeURIComponent("Hello EWS Learning Team! I want to inquire about corporate ESG compliance training and curriculum certifications.");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    setActiveView("closed");
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setActiveView("closed");
      setTicketData({ name: "", email: "", message: "" });
    }, 2500);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
      setActiveView("closed");
      setCallbackData({ name: "", phone: "", topic: "Corporate ESG Training" });
    }, 2500);
  };

  return (
    <>
      {/* 1. ICON-ONLY MAGNETIC DRAGGABLE FLOATING BUTTON (Auto-Snaps to Nearest Corner) */}
      <motion.div
        drag
        dragMomentum={false}
        animate={controls}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        className="fixed bottom-6 right-6 z-[9999] select-none cursor-grab active:cursor-grabbing touch-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <button
          onClick={() => {
            if (!isDragging) {
              setActiveView(activeView === "closed" ? "menu" : "closed");
            }
          }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-slate-950 via-emerald-950 to-emerald-700 text-white shadow-2xl hover:shadow-emerald-500/50 border-2 border-emerald-400 flex items-center justify-center transition-all duration-300 group"
          aria-label="Open Assistance Menu"
        >
          {/* Ambient Glowing Outer Ring */}
          <div className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-sm group-hover:bg-emerald-500/50 transition-all pointer-events-none animate-pulse" />

          {/* Central Icon */}
          <div className="relative w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>

          {/* Pulsing Active Status Beacon */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
        </button>
      </motion.div>

      {/* 2. ICON-FIRST SPEED-DIAL POPUP MENU */}
      <AnimatePresence>
        {activeView === "menu" && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveView("closed")}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs pointer-events-auto"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative w-full max-w-xs bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-5 shadow-2xl border border-slate-800 pointer-events-auto space-y-3.5 mb-20 sm:mb-0 sm:mr-20"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">Quick Assistance</span>
                </div>
                <button
                  onClick={() => setActiveView("closed")}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Icon-Driven Action Cards */}
              <div className="space-y-2">
                
                {/* 1. EcoMentor AI */}
                <button
                  onClick={() => setActiveView("copilot")}
                  className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-800 hover:from-emerald-900 hover:to-slate-750 border border-emerald-500/40 transition-all flex items-center gap-3 group text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>EcoMentor AI</span>
                      <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-emerald-500/30 text-emerald-300">24/7</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">CPCB & BRSR Assistant</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. WhatsApp Direct */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full p-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center gap-3 group text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">WhatsApp</div>
                    <div className="text-[10px] text-slate-400 truncate">Chat with Consultant</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </button>

                {/* 3. Live Support Desk */}
                <button
                  onClick={() => setActiveView("live_support")}
                  className="w-full p-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-teal-500/50 transition-all flex items-center gap-3 group text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>Live Helpdesk</span>
                      <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-teal-600/30 text-teal-300">&lt;5m</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">Course & Billing Support</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 4. Request Callback */}
                <button
                  onClick={() => setActiveView("callback")}
                  className="w-full p-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all flex items-center gap-3 group text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">Request Callback</div>
                    <div className="text-[10px] text-slate-400 truncate">Speak with Director</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. OPTION 1: FULL ECOMANTOR AI COPILOT CHAT MODAL */}
      <AnimatePresence>
        {activeView === "copilot" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end p-3 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveView("closed")}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-sm sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-4 px-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveView("menu")}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mr-1"
                  >
                    ← Menu
                  </button>
                  <div className="relative w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                    <Bot className="w-4 h-4" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                  </div>
                  <div>
                    <div className="text-xs font-black flex items-center gap-1.5">
                      <span>EcoMentor AI</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-emerald-500/30 text-emerald-300">
                        Copilot
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">CPCB • BRSR • EPR • Zero-Waste</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView("closed")}
                  className="w-7 h-7 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Topic Chips */}
              <div className="bg-slate-50 border-b border-slate-200/80 p-2.5 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                {PRESET_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 text-[10px] font-semibold transition-all shrink-0 flex items-center gap-1 shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-slate-900 text-white rounded-br-none shadow-xs"
                          : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-xs"
                      }`}
                    >
                      <div
                        className="space-y-1.5 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br/>")
                        }}
                      />

                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[9.5px] text-slate-400">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Verified: {msg.sources.join(" • ")}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs bg-white border border-slate-200/80 rounded-2xl rounded-bl-none p-2.5 w-fit shadow-xs">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700">Searching regulatory knowledge...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask any environmental compliance question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. OPTION 2: LIVE HELPDESK & SUPPORT TICKET MODAL */}
      <AnimatePresence>
        {activeView === "live_support" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveView("closed")}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-sm sm:max-w-sm bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 pointer-events-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveView("menu")}
                    className="text-xs text-slate-400 hover:text-slate-800 mr-1"
                  >
                    ← Back
                  </button>
                  <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Live Support Desk</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Support Team Online (&lt; 5m avg response)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveView("closed")}
                  className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {ticketSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">Support Ticket Created!</div>
                  <p className="text-xs text-slate-500">Our senior environmental desk will email you in under 5 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={ticketData.name}
                      onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@company.com"
                      value={ticketData.email}
                      onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">How can we help?</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your course, certificate, or corporate billing inquiry..."
                      value={ticketData.message}
                      onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-teal-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Dispatch Support Ticket</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. OPTION 3: REQUEST CALLBACK MODAL */}
      <AnimatePresence>
        {activeView === "callback" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveView("closed")}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-sm sm:max-w-sm bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 pointer-events-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveView("menu")}
                    className="text-xs text-slate-400 hover:text-slate-800 mr-1"
                  >
                    ← Back
                  </button>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Request Instant Callback</div>
                    <div className="text-[10px] text-slate-400">Speak with an environmental director</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveView("closed")}
                  className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {callbackSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">Callback Scheduled!</div>
                  <p className="text-xs text-slate-500">Our directorate will reach out to your phone within 15 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={callbackData.name}
                      onChange={(e) => setCallbackData({ ...callbackData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number (with Country Code)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={callbackData.phone}
                      onChange={(e) => setCallbackData({ ...callbackData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Inquiry Topic</label>
                    <select
                      value={callbackData.topic}
                      onChange={(e) => setCallbackData({ ...callbackData, topic: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500"
                    >
                      <option value="Corporate ESG Training">Corporate ESG & BRSR Training</option>
                      <option value="CPCB Plastic EPR Compliance">CPCB Plastic EPR Compliance</option>
                      <option value="Hazardous Waste HOWM 2016">Hazardous Waste HOWM 2016</option>
                      <option value="Campus Zero-Waste Consulting">Campus Zero-Waste Consulting</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request Callback Now</span>
                    <PhoneCall className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
