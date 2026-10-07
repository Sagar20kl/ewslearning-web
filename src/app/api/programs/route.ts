import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PROGRAMS } from "@/data/programs";

// GET /api/programs - Retrieve list of active training programs from Database
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get("sector");

    const where: any = {};
    if (sector && sector !== "All") {
      where.sector = sector;
    }

    const dbPrograms = await prisma.program.findMany({
      where,
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
      orderBy: { createdAt: "desc" },
    });

    if (dbPrograms && dbPrograms.length > 0) {
      const formatted = dbPrograms.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        sector: p.sector,
        mode: p.mode,
        duration: p.duration,
        level: p.level,
        rating: p.rating,
        reviewCount: p.reviewCount,
        enrolledCount: p.enrolledCount,
        priceINR: p.priceINR,
        priceUSD: p.priceUSD,
        coverImage: p.coverImage,
        instructor: {
          name: p.instructorName,
          role: p.instructorRole,
        },
        highlights: JSON.parse(p.highlights || "[]"),
        learningOutcomes: JSON.parse(p.learningOutcomes || "[]"),
        targetAudience: JSON.parse(p.targetAudience || "[]"),
        prerequisites: JSON.parse(p.prerequisites || "[]"),
        curriculum: p.modules.map((m) => ({
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
      }));

      return NextResponse.json({
        success: true,
        source: "database",
        count: formatted.length,
        data: formatted,
      });
    }

    // Fallback to in-memory datasets if DB is newly initialized
    return NextResponse.json({
      success: true,
      source: "static_dataset",
      count: PROGRAMS.length,
      data: PROGRAMS,
    });
  } catch (error: any) {
    console.error("Programs query error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch programs" },
      { status: 500 }
    );
  }
}
