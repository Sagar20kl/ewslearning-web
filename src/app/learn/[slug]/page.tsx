"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PROGRAMS, Program, Lesson } from "@/data/programs";
import { CertificateModal } from "@/components/certificate-modal";
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Download, 
  Award, 
  ArrowLeft, 
  ChevronRight, 
  MessageSquare, 
  ShieldCheck, 
  BookOpen, 
  Lock,
  Sparkles,
  HelpCircle,
  Check,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Under the Hazardous and Other Wastes (HOWM) Rules 2016, how many copies are required in the Form 10 hazardous manifest system?",
    options: [
      "2 copies (Buyer and Seller)",
      "4 copies (Transporter and TSDF)",
      "6 copies color-coded for Generator, Transporter, and TSDF",
      "No physical copies required"
    ],
    correctIndex: 2,
    explanation: "HOWM Rules mandate a 6-copy color-coded manifest to maintain a strict statutory chain of custody."
  },
  {
    id: 2,
    question: "What is the maximum allowed on-site storage period for Category A/B hazardous waste without SPCB extension?",
    options: ["30 Days", "60 Days", "90 Days", "180 Days"],
    correctIndex: 2,
    explanation: "Industrial units can store hazardous waste on-site for a maximum of 90 days before dispatching to an authorized TSDF."
  },
  {
    id: 3,
    question: "Under CPCB Plastic Waste Management (PWM) EPR regulations, what falls under Category I?",
    options: [
      "Flexible multi-layered packaging (MLP)",
      "Rigid plastic packaging (Bottles, containers, drums)",
      "Agricultural plastic mulch sheets",
      "Single-use carry bags"
    ],
    correctIndex: 1,
    explanation: "Category I strictly refers to rigid plastic packaging, requiring 100% recycling and mandatory PCR content."
  },
  {
    id: 4,
    question: "Under SEBI BRSR Core Principles, how are Scope 2 Greenhouse Gas (GHG) emissions measured?",
    options: [
      "Direct diesel fuel consumption in company vehicles",
      "Purchased grid electricity multiplied by CEA regional grid emission factor",
      "Employee flight travel and hotel stays",
      "Packaging supplier emissions"
    ],
    correctIndex: 1,
    explanation: "Scope 2 covers indirect emissions from purchased electricity using the Central Electricity Authority (CEA) grid baseline."
  },
  {
    id: 5,
    question: "In an industrial 5-stream waste segregation model, which stream must achieve >90% landfill diversion?",
    options: [
      "Green (Wet Organics) and Blue (Dry Recyclables)",
      "Red (Sanitary Waste)",
      "Black (Inert Residue)",
      "Yellow (Batteries)"
    ],
    correctIndex: 0,
    explanation: "Segregated wet organics (composting/biogas) and dry recyclables form over 85-90% of total facility waste volume."
  }
];

export default function LearnRoomPage() {
  const params = useParams();
  const slug = params.slug as string;

  const program = PROGRAMS.find((p) => p.slug === slug) || PROGRAMS[0];

  const allLessons: (Lesson & { moduleTitle: string })[] = [];
  program.curriculum.forEach((mod) => {
    mod.lessons.forEach((l) => {
      allLessons.push({ ...l, moduleTitle: mod.title });
    });
  });

  const [activeLesson, setActiveLesson] = useState<Lesson & { moduleTitle: string }>(allLessons[0]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([allLessons[0]?.id]);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "notes" | "quiz" | "discussion">("overview");
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem(`ews_notes_${program.id}`);
    if (savedNotes) setNotes(savedNotes);
  }, [program.id]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    localStorage.setItem(`ews_notes_${program.id}`, e.target.value);
  };

  const toggleLessonCompletion = (lessonId: string) => {
    if (completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds(completedLessonIds.filter((id) => id !== lessonId));
    } else {
      const next = [...completedLessonIds, lessonId];
      setCompletedLessonIds(next);

      if (next.length === allLessons.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleQuizOptionSelect = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);

    if (scorePct >= 80) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const progressPercentage = Math.round((completedLessonIds.length / allLessons.length) * 100);
  const isEligibleForCert = progressPercentage === 100 || (quizScore !== null && quizScore >= 80);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      
      {/* Top Learning Navigation Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href={`/programs/${program.slug}`}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Program Overview</span>
          </Link>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <h1 className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-xs sm:max-w-md">
            {program.title}
          </h1>
        </div>

        {/* Progress & Certificate Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">{progressPercentage}% Completed</span>
            <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsCertModalOpen(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isEligibleForCert
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700"
            }`}
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>{isEligibleForCert ? "Claim Verified Certificate ✓" : "Certificate Preview"}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Video Player & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* 16:9 Video Canvas */}
          <div className="relative w-full aspect-video bg-black max-h-[520px] flex items-center justify-center border-b border-slate-800">
            <video
              key={activeLesson.id}
              src={activeLesson.videoUrl}
              controls
              className="w-full h-full object-contain"
              poster={program.coverImage}
            />
          </div>

          {/* Lesson Header Row */}
          <div className="p-6 border-b border-slate-800/80 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                {activeLesson.moduleTitle}
              </div>
              <h2 className="text-xl font-black text-white">{activeLesson.title}</h2>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Duration: {activeLesson.duration}</span>
                <span>•</span>
                <span>Instructor: {program.instructor.name}</span>
              </div>
            </div>

            <button
              onClick={() => toggleLessonCompletion(activeLesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                completedLessonIds.includes(activeLesson.id)
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedLessonIds.includes(activeLesson.id) ? "Marked as Completed ✓" : "Mark Lesson Completed"}
              </span>
            </button>
          </div>

          {/* Workspace Tabs Navigation */}
          <div className="p-6 space-y-6 flex-1">
            <div className="flex border-b border-slate-800 gap-6 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === "overview"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Overview & Takeaways</span>
              </button>

              <button
                onClick={() => setActiveTab("quiz")}
                className={`pb-3 transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === "quiz"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Certification Exam ({quizScore !== null ? `${quizScore}%` : "5 Questions"})</span>
              </button>

              <button
                onClick={() => setActiveTab("resources")}
                className={`pb-3 transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === "resources"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Downloadable Toolkits</span>
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-3 transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === "notes"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>My Saved Notes</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-w-3xl">
                <h3 className="text-sm font-bold text-white">Summary of Key Concepts:</h3>
                <p>{activeLesson.summary}</p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-semibold text-emerald-400">Statutory Mandate Reference:</div>
                  <p className="text-slate-400">
                    Compliant with Central Pollution Control Board (CPCB) Guidelines 2025 and SEBI BRSR Core Principles.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Certification Exam */}
            {activeTab === "quiz" && (
              <div className="space-y-6 max-w-3xl">
                
                {/* Exam Result Header */}
                {quizSubmitted ? (
                  <div
                    className={`p-6 rounded-2xl border ${
                      quizScore! >= 80
                        ? "bg-emerald-950/80 border-emerald-500 text-white"
                        : "bg-amber-950/80 border-amber-500 text-white"
                    } space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                            quizScore! >= 80 ? "bg-emerald-500 text-slate-950" : "bg-amber-500 text-slate-950"
                          }`}
                        >
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-black">
                            {quizScore! >= 80 ? "Assessment Passed with Distinction! ✓" : "Score Below 80% Requirement"}
                          </h3>
                          <p className="text-xs text-slate-300">
                            You scored <strong>{quizScore}%</strong> ({Math.round((quizScore! / 100) * QUIZ_QUESTIONS.length)} / {QUIZ_QUESTIONS.length} correct).
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleResetQuiz}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Exam</span>
                      </button>
                    </div>

                    {quizScore! >= 80 && (
                      <div className="pt-2">
                        <button
                          onClick={() => setIsCertModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <Award className="w-4 h-4" />
                          <span>Unlock & View Verified Digital Certificate</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-400 block">Statutory Knowledge Verification</span>
                      <span className="text-slate-400 text-[11px]">
                        Pass with 80% or higher (4/5 questions) to unlock your verified credential.
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px]">
                      {Object.keys(selectedAnswers).length} of {QUIZ_QUESTIONS.length} Answered
                    </span>
                  </div>
                )}

                {/* Questions List */}
                <div className="space-y-6">
                  {QUIZ_QUESTIONS.map((q, qIndex) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isCorrect = selectedAnswers[q.id] === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                            Q{qIndex + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-100 leading-snug">{q.question}</h4>
                        </div>

                        {/* Options */}
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[q.id] === optIdx;
                            let optionClass = "bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300";

                            if (quizSubmitted) {
                              if (optIdx === q.correctIndex) {
                                optionClass = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
                              } else if (isSelected && !isCorrect) {
                                optionClass = "bg-rose-950 border-rose-500 text-rose-200 line-through";
                              }
                            } else if (isSelected) {
                              optionClass = "bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionClass}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && optIdx === q.correctIndex && (
                                  <Check className="w-4 h-4 text-emerald-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                            <strong className="text-emerald-400">Explanation: </strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted && (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs transition-all shadow-md shadow-emerald-950/50"
                  >
                    Submit Exam & Calculate Score
                  </button>
                )}
              </div>
            )}

            {/* Tab 3: Resources */}
            {activeTab === "resources" && (
              <div className="space-y-3 max-w-2xl">
                <h3 className="text-sm font-bold text-white">Downloadable Compliance Toolkits:</h3>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Waste_Stream_Audit_Framework_2025.pdf</div>
                      <div className="text-[10px] text-slate-400">2.4 MB • Official EWS Checklist</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Notes */}
            {activeTab === "notes" && (
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Your notes are automatically saved to this browser.</span>
                </div>
                <textarea
                  rows={6}
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Type your notes, questions, or key statutory references here..."
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            )}

          </div>

        </div>

        {/* Right: Interactive Syllabus Curriculum Playlist */}
        <aside className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-auto lg:h-[calc(100vh-4rem)]">
          <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Course Syllabus</h3>
            <span className="text-[11px] text-emerald-400 font-semibold font-mono">
              {completedLessonIds.length}/{allLessons.length} Done
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {program.curriculum.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1">
                  {mod.title}
                </div>

                {mod.lessons.map((lesson) => {
                  const isActive = activeLesson.id === lesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson({ ...lesson, moduleTitle: mod.title })}
                      className={`w-full p-3 rounded-xl text-left text-xs transition-all flex items-start gap-3 ${
                        isActive
                          ? "bg-emerald-950/80 border border-emerald-500/50 text-white shadow-xs"
                          : "hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompletion(lesson.id);
                        }}
                        className="mt-0.5 shrink-0"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className={`font-semibold ${isActive ? "text-emerald-300" : ""}`}>
                          {lesson.title}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{lesson.duration}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        studentName="Ajay Kushwaha"
        courseTitle={program.title}
        completionDate={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        certificateId={`EWS-2025-WM-${Date.now().toString().slice(-4)}`}
      />

    </div>
  );
}
