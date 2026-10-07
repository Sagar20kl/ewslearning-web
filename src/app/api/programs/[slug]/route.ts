import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PROGRAMS } from "@/data/programs";

// GET /api/programs/[slug] - Fetch a single course by slug from Database
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    const program = await prisma.program.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    if (program) {
      const formatted = {
        id: program.id,
        slug: program.slug,
        title: program.title,
        tagline: program.tagline,
        description: program.description,
        sector: program.sector,
        mode: program.mode,
        duration: program.duration,
        level: program.level,
        rating: program.rating,
        reviewCount: program.reviewCount,
        enrolledCount: program.enrolledCount,
        priceINR: program.priceINR,
        priceUSD: program.priceUSD,
        coverImage: program.coverImage,
        instructor: {
          name: program.instructorName,
          role: program.instructorRole,
        },
        highlights: JSON.parse(program.highlights || "[]"),
        learningOutcomes: JSON.parse(program.learningOutcomes || "[]"),
        targetAudience: JSON.parse(program.targetAudience || "[]"),
        prerequisites: JSON.parse(program.prerequisites || "[]"),
        curriculum: program.modules.map((m) => ({
          title: m.title,
          duration: m.duration,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            videoUrl: l.videoUrl,
            isFreePreview: l.isFreePreview,
            summary: l.summary,
          })),
        })),
      };

      return NextResponse.json({
        success: true,
        source: "database",
        data: formatted,
      });
    }

    // Fallback search
    const fallback = PROGRAMS.find((p) => p.slug === slug);
    if (fallback) {
      return NextResponse.json({
        success: true,
        source: "static_dataset",
        data: fallback,
      });
    }

    return NextResponse.json(
      { success: false, error: `Program with slug '${slug}' not found.` },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch course details." },
      { status: 500 }
    );
  }
}
