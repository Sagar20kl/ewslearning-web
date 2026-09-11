import { NextRequest, NextResponse } from "next/server";
import { generateCourseFromPDF, PDFCourseInput } from "@/lib/pdf-course-generator";
import { PROGRAMS } from "@/data/programs";

// POST /api/courses/generate-from-pdf - Convert PDF/Notes to Video Course & Publish
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, sector, mode, level, rawNotesOrPdfText, instructorName, instructorRole, voiceAccent } = body;

    if (!title || !rawNotesOrPdfText) {
      return NextResponse.json(
        { success: false, error: "Course title and PDF notes content are required." },
        { status: 400 }
      );
    }

    const input: PDFCourseInput = {
      title,
      sector: sector || "Corporate",
      mode: mode || "Hybrid",
      level: level || "Intermediate",
      rawNotesOrPdfText,
      instructorName,
      instructorRole,
      voiceAccent,
    };

    // Run AI Course & Video Generation Engine
    const generatedProgram = generateCourseFromPDF(input);

    // Auto-publish to live catalog
    PROGRAMS.unshift(generatedProgram);

    return NextResponse.json({
      success: true,
      message: `Course "${generatedProgram.title}" successfully synthesized from PDF notes and published with video lectures!`,
      data: generatedProgram,
      learnUrl: `/learn/${generatedProgram.slug}`,
      programUrl: `/programs/${generatedProgram.slug}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate course from PDF." },
      { status: 500 }
    );
  }
}
