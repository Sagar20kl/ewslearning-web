import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/corporate/roster - Get all corporate team members from Database
export async function GET() {
  try {
    const members = await prisma.corporateMember.findMany({
      orderBy: { joinedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch corporate roster." },
      { status: 500 }
    );
  }
}

// POST /api/corporate/roster - Add a new team member to Corporate Vault
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, department, role } = body;

    if (!name || !email || !department || !role) {
      return NextResponse.json(
        { success: false, error: "Name, email, department, and role are required." },
        { status: 400 }
      );
    }

    const member = await prisma.corporateMember.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        department,
        role,
        coursesCompleted: 0,
        totalHours: 0,
        brsrStatus: "ENROLLED",
        organization: "EcoIndustries Corp",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Enrolled ${name} into corporate training roster.`,
      data: member,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add corporate team member." },
      { status: 500 }
    );
  }
}
