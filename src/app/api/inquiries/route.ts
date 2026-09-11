import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/inquiries - List all corporate training leads (for Admin CMS)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // In local demo mode if DB is not yet connected, return graceful response
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        source: "demo_memory",
        message: "Cloud database URL not configured yet. Add DATABASE_URL to .env to persist to PostgreSQL.",
        data: []
      });
    }

    const where = status && status !== "All" ? { status: status as any } : {};
    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

// POST /api/inquiries - Submit a new corporate training quote / inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, programInterest, teamSize, mode, message } = body;

    if (!name || !email || !organization) {
      return NextResponse.json(
        { success: false, error: "Name, email, and organization are required." },
        { status: 400 }
      );
    }

    // In local demo mode if DB is not yet connected, return graceful success
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        source: "demo_mode",
        message: "Inquiry received in local demo mode! (Add DATABASE_URL to persist to Cloud Postgres).",
        data: {
          id: `inq-${Date.now()}`,
          name,
          email,
          phone,
          organization,
          programInterest,
          teamSize,
          mode,
          message,
          status: "NEW",
          createdAt: new Date().toISOString()
        }
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        organization,
        programInterest: programInterest || "General Sustainability Inquiry",
        teamSize: teamSize || "10 - 50 Employees",
        mode: mode || "Hybrid",
        message,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Corporate inquiry successfully submitted.",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
