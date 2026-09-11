import { NextRequest, NextResponse } from "next/server";
import { PROGRAMS } from "@/data/programs";
import { prisma } from "@/lib/prisma";

// GET /api/programs - Retrieve list of active training programs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get("sector");

    if (!process.env.DATABASE_URL) {
      // Return rich mock dataset when database is in local staging
      let data = PROGRAMS;
      if (sector && sector !== "All") {
        data = data.filter((p) => p.sector === sector);
      }
      return NextResponse.json({
        success: true,
        source: "static_dataset",
        count: data.length,
        data,
      });
    }

    const where = sector && sector !== "All" ? { sector: sector as any } : {};
    const programs = await prisma.program.findMany({
      where,
      include: { curriculum: { include: { lessons: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch programs" },
      { status: 500 }
    );
  }
}
