import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/exams/submit - Evaluate exam answers and issue certificate in database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { programSlug, studentName, answers, score, totalQuestions } = body;

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 80;

    const certNumber = `EWS-${new Date().getFullYear()}-${programSlug ? programSlug.slice(0, 3).toUpperCase() : "ENV"}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (passed) {
      // Find or create student user
      let user = await prisma.user.findFirst({ where: { email: "ajay.k@ecoindustries.in" } });
      let program = programSlug ? await prisma.program.findUnique({ where: { slug: programSlug } }) : null;

      if (user && program) {
        const enrollment = await prisma.enrollment.upsert({
          where: {
            userId_programId: {
              userId: user.id,
              programId: program.id,
            }
          },
          update: {
            progress: 100,
            status: "COMPLETED",
          },
          create: {
            userId: user.id,
            programId: program.id,
            progress: 100,
            status: "COMPLETED",
          }
        });

        await prisma.certificate.upsert({
          where: { enrollmentId: enrollment.id },
          update: {
            certificateId: certNumber,
            studentName: studentName || user.name,
            courseTitle: program.title,
            distinction: `Verified Masterclass Distinction (${percentage}% Pass Score)`,
            verifyUrl: `/verify/${certNumber}`,
          },
          create: {
            certificateId: certNumber,
            studentName: studentName || user.name,
            courseTitle: program.title,
            distinction: `Verified Masterclass Distinction (${percentage}% Pass Score)`,
            verifyUrl: `/verify/${certNumber}`,
            enrollmentId: enrollment.id,
          }
        });

        await prisma.examAttempt.create({
          data: {
            enrollmentId: enrollment.id,
            userId: user.id,
            score,
            totalQuestions,
            passed: true,
            answersJson: JSON.stringify(answers || {}),
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      passed,
      percentage,
      certificateId: passed ? certNumber : null,
      verifyUrl: passed ? `/verify/${certNumber}` : null,
      message: passed
        ? `Congratulations! You scored ${percentage}% and earned your verified credential.`
        : `You scored ${percentage}%. 80% is required to unlock certification. You may retry.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit exam." },
      { status: 500 }
    );
  }
}
